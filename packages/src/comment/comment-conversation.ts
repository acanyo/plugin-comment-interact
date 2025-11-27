import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getAvatarUrl } from './comment-avatar';
import { fetchCommentWithReplies } from './comment-api';
import type { CommentWithReplies } from './comment-api';
import type { CommentData } from './comment-types';
import { conversationStyles } from './conversation-styles';
import { detectDarkTheme, createThemeObserver } from '../utils/theme';

@customElement('comment-conversation')
export class CommentConversation extends LitElement {
  static styles = conversationStyles;

  @property({ type: String })
  name = '';

  @property({ type: String, attribute: 'user-name' })
  userName = '';

  @property({ type: String, attribute: 'user-avatar' })
  userAvatar = '';

  @state()
  private _data: CommentWithReplies | null = null;

  @state()
  private _loading = false;

  @state()
  private _error: string | null = null;
  
  @state()
  private isDark = false;

  private themeObserver?: MutationObserver;

  connectedCallback() {
    super.connectedCallback();
    this.detectTheme();
    this.observeTheme();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }
  }

  private detectTheme() {
    this.isDark = detectDarkTheme();
    if (this.isDark) {
      this.classList.add('dark');
    } else {
      this.classList.remove('dark');
    }
  }

  private observeTheme() {
    this.themeObserver = createThemeObserver(() => {
      this.detectTheme();
    });
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('name') && this.name) {
      this.fetchData();
    }
  }

  async fetchData() {
    if (!this.name) return;

    this._loading = true;
    this._error = null;
    try {
      const data = await fetchCommentWithReplies(this.name);
      if (data) {
        data.comment.userAvatar = await getAvatarUrl(data.comment) || undefined;
        for (const reply of data.replies) {
          reply.userAvatar = await getAvatarUrl(reply) || undefined;
        }
      }
      this._data = data;
    } catch (e) {
      this._error = (e as Error).message;
    } finally {
      this._loading = false;
    }
  }

  render() {
    if (this._loading) {
      return html`<div class="loading">加载对话中...</div>`;
    }

    if (this._error) {
      return html`<div class="error">加载失败: ${this._error}</div>`;
    }

    if (!this._data) {
      return nothing;
    }

    const { comment, replies } = this._data;

    const allMessages = [comment, ...replies].sort((a, b) => {
      const timeA = new Date(a.creationTime || 0).getTime();
      const timeB = new Date(b.creationTime || 0).getTime();
      return timeA - timeB;
    });

    let lastDateStr = '';

    const mainAuthorName = comment.displayName;
    const mainAuthorAvatar = comment.userAvatar;

    const sourceInfo = comment.refPost && comment.refUrl
      ? html`
          <div class="conversation-header">
            <a href="${comment.refUrl}" target="_blank" class="source-link" title="点击查看来源: ${comment.refPost}">
              <span class="source-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </span>
              <span class="source-label">引用自</span>
              <span class="source-title">${comment.refPost}</span>
              <span class="source-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </span>
            </a>
          </div>
        `
      : nothing;

    return html`
      <div class="conversation-container">
        ${sourceInfo}
        ${allMessages.map(msg => {
          const date = new Date(msg.creationTime || Date.now());
          const dateStr = this._formatDate(date);
          const showDivider = dateStr !== lastDateStr;
          lastDateStr = dateStr;

          // Check if this message is from the main comment author
          // Compare by displayName and userAvatar (email hash)
          const isOwner = msg.displayName === mainAuthorName &&
                         msg.userAvatar === mainAuthorAvatar;

          return html`
            ${showDivider ? html`<div class="date-divider">${dateStr}</div>` : nothing}
            ${this._renderMessage(msg, isOwner)}
          `;
        })}
      </div>
    `;
  }

  private _renderMessage(comment: CommentData, isOwner: boolean) {
    const timeStr = this._formatTime(new Date(comment.creationTime || Date.now()));

    let avatarUrl = comment.userAvatar;
    if (this.userName && this.userAvatar && comment.displayName === this.userName) {
      avatarUrl = this.userAvatar;
    }

    return html`
      <div class="message-item">
        <div class="avatar">
          ${avatarUrl
            ? html`<img src="${avatarUrl}" alt="${comment.displayName}" loading="lazy" />`
            : html`<div class="avatar-placeholder">${comment.displayName.charAt(0).toUpperCase()}</div>`
          }
        </div>
        <div class="content-wrapper">
          <div class="header">
            <span class="author-name">${comment.displayName}</span>
            ${isOwner ? html`<span class="badge badge-owner">楼主</span>` : nothing}
          </div>

          <div style="display: flex; align-items: flex-end; gap: 0.5rem;">
            <div class="message-bubble ${isOwner ? 'owner' : ''}">
              <div class="message-content">
                ${unsafeHTML(comment.content)}
              </div>
            </div>
            <span class="time-display">${timeStr}</span>
          </div>
        </div>
      </div>
    `;
  }

  private _formatDate(date: Date): string {
    const now = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    if (year === now.getFullYear()) {
      return `${month}月${day}日`;
    }
    return `${year}年${month}月${day}日`;
  }

  private _formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comment-conversation': CommentConversation;
  }
}
