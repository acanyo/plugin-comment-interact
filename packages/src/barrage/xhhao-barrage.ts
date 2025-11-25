import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fetchCommentList } from '../comment/comment-api';
import type { CommentData } from '../comment/comment-types';
import './comment-barrage';

@customElement('xhhao-barrage')
export class XhhaoBarrage extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 2147483647; /* Maximum z-index value */
    }
    comment-barrage {
      width: 100%;
      height: 100%;
    }
    .close-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 8px 16px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 20px;
      cursor: pointer;
      pointer-events: auto;
      font-size: 14px;
      z-index: 2147483647; /* Maximum z-index value */
      transition: all 0.2s;
      user-select: none;
    }
    .close-button:hover {
      background: rgba(0, 0, 0, 0.9);
      transform: scale(1.05);
    }
  `;

  @property({ type: String })
  kind: string = '';

  @property({ type: String })
  group: string = '';

  @property({ type: String })
  name: string = '';

  @property({ type: Number })
  speed: number = 20;

  @property({ type: Number })
  rows: number = 8;

  @property({
    type: Boolean,
    converter: (value) => {
      return value !== null && value !== 'false';
    }
  })
  loop: boolean = false;

  @state()
  private comments: CommentData[] = [];

  @state()
  private isVisible: boolean = true;

  private hasFetched: boolean = false;

  connectedCallback() {
    super.connectedCallback();

    if (this.parentElement !== document.body) {
      setTimeout(() => {
        document.body.appendChild(this);
      }, 0);
    }

    if (this.kind && this.group && this.name && !this.hasFetched) {
      this.fetchData();
    }
  }

  async fetchData() {
    this.hasFetched = true;
    try {
      const comments = await fetchCommentList({
        kind: this.kind,
        group: this.group,
        name: this.name
      });
      this.comments = comments;
    } catch (err) {
      console.error('Error fetching barrage comments:', err);
    }
  }

  private handleClose() {
    this.isVisible = false;
    setTimeout(() => {
      this.remove();
    }, 300);
  }

  private handleBarrageComplete() {
    this.handleClose();
  }

  render() {
    if (!this.isVisible || this.comments.length === 0) {
      return html``;
    }

    return html`
      <comment-barrage
        .comments=${this.comments}
        .rows=${this.rows}
        .baseTime=${this.speed}
        .loop=${this.loop}
        @barrage-complete=${this.handleBarrageComplete}
      ></comment-barrage>
      <button class="close-button" @click=${this.handleClose}>
        ✕ 关闭弹幕
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'xhhao-barrage': XhhaoBarrage;
  }
}
