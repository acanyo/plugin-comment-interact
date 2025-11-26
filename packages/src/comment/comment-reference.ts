import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { commentStyles } from './comment-styles';
import type { CommentData } from './comment-types';
import { getAvatarInitial, getAvatarUrl } from './comment-avatar';
import { fetchCommentByName } from './comment-api';
import { detectDarkTheme, createThemeObserver } from '../utils/theme';

@customElement('comment-reference')
export class CommentReference extends LitElement {
  static styles = commentStyles;

  @property({ type: String })
  name: string = '';

  @state()
  private commentData: CommentData | null = null;

  @state()
  private isLoading: boolean = false;

  @state()
  private error: string = '';

  @state()
  private isDark: boolean = false;

  @state()
  private hasFetched: boolean = false;

  @state()
  private avatarUrl: string | null = null;

  private themeObserver?: MutationObserver;

  connectedCallback() {
    super.connectedCallback();
    this.detectTheme();
    this.observeTheme();
    if (this.name && !this.commentData && !this.isLoading) {
      this.fetchComment();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }
  }

  private detectTheme() {
    this.isDark = detectDarkTheme();
  }

  private observeTheme() {
    this.themeObserver = createThemeObserver(() => {
      this.detectTheme();
    });
  }

  private async fetchComment() {
    if (!this.name) {
      this.error = '缺少评论名称';
      return;
    }

    if (this.hasFetched) {
      return;
    }

    this.hasFetched = true;
    this.isLoading = true;
    this.error = '';

    try {
      const data = await fetchCommentByName(this.name);
      if (!data) {
        this.error = '未找到评论数据';
        this.commentData = null;
        this.avatarUrl = null;
      } else {
        this.commentData = data;
        // 异步获取头像 URL
        this.avatarUrl = await getAvatarUrl(data);
      }
    } catch (err) {
      this.error = err instanceof Error ? err.message : '获取评论失败';
      this.commentData = null;
      this.avatarUrl = null;
      console.error('Error fetching comment:', err);
    } finally {
      this.isLoading = false;
    }
  }

  private renderCommentContent() {
    if (!this.commentData) return '';

    const source = this.commentData.refPost && this.commentData.refUrl
      ? html`
          <div class="comment-source">
            来源于: <a href="${this.commentData.refUrl}" target="_blank">
              ${this.commentData.refPost}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 2px; vertical-align: middle;">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        `
      : '';

    return html`
      <div class="comment-header">
        <div class="comment-avatar">
          ${this.avatarUrl
            ? html`<img src="${this.avatarUrl}" alt="${this.commentData.displayName}">`
            : html`<span class="comment-avatar-placeholder">${getAvatarInitial(this.commentData.displayName)}</span>`
          }
        </div>
        <div class="comment-info">
          <div class="comment-author">${this.commentData.displayName}</div>
          ${source}
        </div>
      </div>
      <div class="comment-content">${unsafeHTML(this.commentData.raw)}</div>
    `;
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="comment-container ${this.isDark ? 'dark' : ''}">
          <div class="comment-loading">加载中...</div>
        </div>
      `;
    }

    if (this.error) {
      return html`
        <div class="comment-container ${this.isDark ? 'dark' : ''}">
          <div class="comment-error">${this.error}</div>
        </div>
      `;
    }

    if (!this.commentData) {
      return html`
        <div class="comment-container ${this.isDark ? 'dark' : ''}">
          <div class="comment-empty">暂无评论数据</div>
        </div>
      `;
    }

    return html`
      <div class="comment-container ${this.isDark ? 'dark' : ''}">
        ${this.renderCommentContent()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comment-reference': CommentReference;
  }
}
