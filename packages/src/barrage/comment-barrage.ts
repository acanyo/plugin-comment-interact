import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { barrageStyles } from './barrage-styles';
import type { CommentData } from '../comment/comment-types';

// Helper function to strip HTML tags for plain text display
function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

// 扩展 CommentData 以包含运行时状态
interface BarrageItem {
  id: string; // 唯一ID，用于 repeat key
  data: CommentData;
  top: number; // 轨道垂直位置
  duration: number; // 动画时长(s)
  startTime: number; // 开始时间，用于清理
}

@customElement('comment-barrage')
export class CommentBarrage extends LitElement {
  static styles = barrageStyles;

  // 外部传入的评论列表
  @property({ type: Array })
  comments: CommentData[] = [];

  // 轨道数量
  @property({ type: Number })
  rows: number = 8;

  // 弹幕滚动一屏的基准时间（秒）
  @property({ type: Number })
  baseTime: number = 10;

  // 是否循环播放
  @property({ type: Boolean })
  loop: boolean = true;

  // 容器高度，用于计算轨道间距
  @property({ type: Number })
  height: number = 0; // 0 表示 100%

  @state()
  private activeBarrages: BarrageItem[] = [];

  @query('.barrage-container')
  private container!: HTMLElement;

  private isPlaying: boolean = false;
  private currentIndex: number = 0;
  private trackAvailability: number[] = []; // 记录每个轨道何时可用 (timestamp)
  private animationFrameId?: number;
  private spawnInterval: number = 1000; // 尝试发射弹幕的间隔 ms
  private lastSpawnTime: number = 0;

  connectedCallback() {
    super.connectedCallback();
    // 初始化轨道状态
    this.trackAvailability = new Array(this.rows).fill(0);

    // 启动
    this.start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('rows')) {
      this.trackAvailability = new Array(this.rows).fill(0);
    }
  }

  /**
   * 开始/恢复播放
   */
  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.loopLogic();
  }

  /**
   * 暂停
   */
  pause() {
    this.isPlaying = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  /**
   * 停止
   */
  stop() {
    this.pause();
    this.activeBarrages = [];
    this.currentIndex = 0;
    this.trackAvailability.fill(0);
  }

  /**
   * 添加单条弹幕（插队）
   */
  addBarrage(comment: CommentData) {
    this.spawnBarrage(comment);
  }

  /**
   * 设置评论数据
   */
  setComments(comments: CommentData[]) {
    this.comments = comments;
    // 如果之前已经播完了，重新开始
    if (this.currentIndex >= this.comments.length && this.loop) {
      this.currentIndex = 0;
    }
  }

  private loopLogic = () => {
    if (!this.isPlaying) return;

    const now = performance.now();

    // 清理已完成的弹幕（滚出屏幕后立即销毁）
    this.activeBarrages = this.activeBarrages.filter(b => {
      return now < b.startTime + b.duration * 1000;
    });

    // 尝试发射新弹幕
    if (now - this.lastSpawnTime > this.spawnInterval) {
      if (this.comments.length > 0) {
         this.trySpawnNext();
      }
      this.lastSpawnTime = now;
    }
    if (!this.loop && this.currentIndex >= this.comments.length && this.activeBarrages.length === 0) {
      this.stop();
      this.dispatchEvent(new CustomEvent('barrage-complete', {
        bubbles: true,
        composed: true
      }));
      return;
    }

    this.animationFrameId = requestAnimationFrame(this.loopLogic);
  };

  private async trySpawnNext() {
    if (this.currentIndex >= this.comments.length) {
      if (this.loop) {
        this.currentIndex = 0;
      } else {
        return;
      }
    }

    const comment = this.comments[this.currentIndex];
    const success = await this.spawnBarrage(comment);

    if (success) {
      this.currentIndex++;
      this.spawnInterval = 500 + Math.random() * 1500;
    } else {
      this.spawnInterval = 200;
    }
  }

  private async spawnBarrage(comment: CommentData): Promise<boolean> {
    const now = Date.now();
    let trackIndex = -1;

    const availableTracks: number[] = [];
    for (let i = 0; i < this.rows; i++) {
      if (this.trackAvailability[i] <= now) {
        availableTracks.push(i);
      }
    }

    if (availableTracks.length === 0) {
      return false;
    }
    trackIndex = availableTracks[Math.floor(Math.random() * availableTracks.length)];
    const duration = this.baseTime + (Math.random() * 2 - 1);
    const textLength = comment.content.length;
    const estimatedWidth = 50 + textLength * 14;
    const containerWidth = this.container?.clientWidth || 1000;
    const speed = containerWidth / duration;
    const occupyTime = ((estimatedWidth + 100) / speed) * 1000; // ms, +100px 间距

    this.trackAvailability[trackIndex] = now + occupyTime;

    const barrageItem: BarrageItem = {
      id: Math.random().toString(36).substr(2, 9),
      data: comment,
      top: trackIndex * (100 / this.rows), // 百分比位置
      duration: duration,
      startTime: performance.now()
    };

    this.activeBarrages = [...this.activeBarrages, barrageItem];
    return true;
  }

  render() {
    return html`
      <div class="barrage-container">
        ${repeat(
          this.activeBarrages,
          (item) => item.id,
          (item) => html`
            <div
              class="barrage-item"
              style=${styleMap({
                top: `${item.top}%`,
                animationDuration: `${item.duration}s`,
                animationName: 'moveLeft'
              })}
              @animationend=${() => this.removeBarrage(item.id)}
            >
              <span class="barrage-author">${item.data.displayName}:</span>
              <span class="barrage-content" title="${stripHtml(item.data.content)}">${stripHtml(item.data.content)}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  private removeBarrage(id: string) {
    this.activeBarrages = this.activeBarrages.filter(item => item.id !== id);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comment-barrage': CommentBarrage;
  }
}
