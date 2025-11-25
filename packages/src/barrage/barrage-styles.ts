import { css } from 'lit';

export const barrageStyles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
  }

  .barrage-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 10;
  }

  .barrage-item {
    position: absolute;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    white-space: nowrap;
    user-select: none;
    pointer-events: auto;
    will-change: transform;
    transition: background-color 0.2s;
    cursor: default;
    animation-timing-function: linear !important;
    animation-fill-mode: forwards;
  }

  .barrage-item:hover {
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 20;
    animation-play-state: paused;
  }

  .barrage-item.paused {
    animation-play-state: paused !important;
    z-index: 20;
  }

  .barrage-author {
    font-weight: bold;
    color: #ffcd38;
    margin-right: 4px;
  }

  .barrage-content {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @keyframes moveLeft {
    from {
      transform: translateX(100vw);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;
