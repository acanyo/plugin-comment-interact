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
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    }
    comment-barrage {
      width: 100%;
      height: 100%;
    }
  `;

  @property({ type: String })
  kind: string = '';

  @property({ type: String })
  group: string = '';

  @property({ type: String })
  name: string = '';

  @state()
  private comments: CommentData[] = [];

  private hasFetched: boolean = false;

  connectedCallback() {
    super.connectedCallback();
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

  render() {
    if (this.comments.length === 0) {
      return html``;
    }

    return html`
      <comment-barrage
        .comments=${this.comments}
        .rows=${8}
        .loop=${true}
      ></comment-barrage>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'xhhao-barrage': XhhaoBarrage;
  }
}
