import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { barrageStyles } from './barrage-styles';
import type { CommentData } from '../comment/comment-types';
import { getAvatarInitial, getAvatarUrl } from '../comment/comment-avatar';

// 扩展 CommentData 以包含运行时状态
interface BarrageItem {
  id: string; // 唯一ID，用于 repeat key
  data: CommentData;
  top: number; // 轨道垂直位置
  duration: number; // 动画时长(s)
  avatarUrl: string | null;
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

  /**
   * 模拟 API 调用（预留）
   */
  async fetchComments(postId: string) {
    console.log('Fetching comments for post:', postId);
    // TODO: 对接真实 API
    // this.comments = await api.getComments(postId);
  }

  private loopLogic = () => {
    if (!this.isPlaying) return;

    const now = performance.now();

    // 清理已完成的弹幕 (简单的基于时间的清理，也可以监听 animationend)
    // 为了防止数组频繁变动导致性能问题，可以批量清理
    // 这里简单实现：过滤掉 startTime + duration * 1000 < now 的
    // 注意：CSS 动画结束后，元素还在 DOM 上，直到被移除

    // 优化：每秒检查一次清理即可，不需要每一帧都检查
    // 这里每一帧都检查是为了逻辑简单
    this.activeBarrages = this.activeBarrages.filter(b => {
      return now < b.startTime + b.duration * 1000 + 500; // 多留 500ms 缓冲
    });

    // 尝试发射新弹幕
    if (now - this.lastSpawnTime > this.spawnInterval) {
      if (this.comments.length > 0) {
         this.trySpawnNext();
      }
      this.lastSpawnTime = now;
    }

    this.animationFrameId = requestAnimationFrame(this.loopLogic);
  };

  private async trySpawnNext() {
    if (this.currentIndex >= this.comments.length) {
      if (this.loop) {
        this.currentIndex = 0;
      } else {
        return; // 播放完毕
      }
    }

    const comment = this.comments[this.currentIndex];
    const success = await this.spawnBarrage(comment);

    if (success) {
      this.currentIndex++;
      // 随机化下一次发射间隔，避免看起来太机械
      this.spawnInterval = 500 + Math.random() * 1500;
    } else {
      // 发射失败（没轨道），稍微缩短重试间隔
      this.spawnInterval = 200;
    }
  }

  private async spawnBarrage(comment: CommentData): Promise<boolean> {
    // 寻找可用轨道
    const now = Date.now();
    let trackIndex = -1;

    // 简单的轨道选择策略：找到第一个冷却完毕的轨道
    // 为了更均匀，可以随机从可用的轨道里选一个
    const availableTracks: number[] = [];
    for (let i = 0; i < this.rows; i++) {
      if (this.trackAvailability[i] <= now) {
        availableTracks.push(i);
      }
    }

    if (availableTracks.length === 0) {
      return false; // 无可用轨道
    }

    // 随机选择一个可用轨道
    trackIndex = availableTracks[Math.floor(Math.random() * availableTracks.length)];

    // 计算该弹幕的参数
    // 这里的 duration 可以根据弹幕长度动态调整，或者稍微随机化
    const duration = this.baseTime + (Math.random() * 2 - 1); // baseTime +/- 1s

    // 估算该弹幕占用的时间窗口
    // 假设弹幕平均文字宽度 200px，屏幕宽 1000px，速度 v = 1000/10 = 100px/s
    // 占用时间 = (文字宽度 + 间距) / 速度
    // 这里简单估算：文字越多，冷却时间越长
    const textLength = comment.content.length;
    const estimatedWidth = 50 + textLength * 14; // 头像 + 文字
    // 简单粗暴的冷却时间计算，实际应该获取容器宽度计算
    // 假设屏幕宽度 1000px (保守估计)
    const containerWidth = this.container?.clientWidth || 1000;
    const speed = containerWidth / duration;
    const occupyTime = ((estimatedWidth + 100) / speed) * 1000; // ms, +100px 间距

    this.trackAvailability[trackIndex] = now + occupyTime;

    // 获取头像
    const avatarUrl = await getAvatarUrl(comment);

    const barrageItem: BarrageItem = {
      id: Math.random().toString(36).substr(2, 9),
      data: comment,
      top: trackIndex * (100 / this.rows), // 百分比位置
      duration: duration,
      avatarUrl: avatarUrl,
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
              <div class="barrage-avatar">
                ${item.avatarUrl
                  ? html`<img src="${item.avatarUrl}" alt="${item.data.displayName}" class="barrage-avatar">`
                  : html`<div class="barrage-avatar-placeholder">${getAvatarInitial(item.data.displayName)}</div>`
                }
              </div>
              <span class="barrage-content" title="${item.data.content}">${item.data.content}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  private removeBarrage(id: string) {
    // 动画结束后的清理，虽然 loopLogic 也会清理，但这个更及时
    this.activeBarrages = this.activeBarrages.filter(item => item.id !== id);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comment-barrage': CommentBarrage;
  }
}
