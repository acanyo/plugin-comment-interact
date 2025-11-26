import { css } from 'lit';

export const conversationStyles = css`
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.5;

    /* Modern Palette - Compact & Refined */
    --cc-primary: #3b82f6;
    --cc-primary-light: #eff6ff;
    --cc-success: #10b981;
    --cc-text-main: #111827;
    --cc-text-sub: #4b5563;
    --cc-text-muted: #9ca3af;

    --cc-bg-container: #ffffff;
    --cc-border-container: #e5e7eb;

    --cc-bubble-bg: #f9fafb;
    --cc-bubble-border: #f3f4f6;
    --cc-bubble-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);

    --cc-bubble-hover-bg: #ffffff;
    --cc-bubble-hover-border: #e5e7eb;
    --cc-bubble-hover-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);

    /* Dark Mode Variables */
    --cc-bg-container-dark: #1f2937;
    --cc-border-container-dark: #374151;
    --cc-text-main-dark: #f3f4f6;
    --cc-text-sub-dark: #d1d5db;
    --cc-text-muted-dark: #9ca3af;
    --cc-bubble-bg-dark: #374151;
    --cc-bubble-hover-bg-dark: #4b5563;

    color: var(--cc-text-main);
  }

  :host(.dark) {
    --cc-bg-container: var(--cc-bg-container-dark);
    --cc-border-container: var(--cc-border-container-dark);
    --cc-text-main: var(--cc-text-main-dark);
    --cc-text-sub: var(--cc-text-sub-dark);
    --cc-text-muted: var(--cc-text-muted-dark);
    --cc-bubble-bg: var(--cc-bubble-bg-dark);
    --cc-bubble-hover-bg: var(--cc-bubble-hover-bg-dark);
  }

  /* Container */
  .conversation-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background: var(--cc-bg-container);
    border: 1px solid var(--cc-border-container);
    border-radius: 12px;
    max-width: 600px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  /* Source Info */
  .conversation-source {
    font-size: 0.75rem;
    color: var(--cc-text-muted);
    padding: 0.5rem 0.75rem;
    background: var(--cc-bubble-bg);
    border-radius: 8px;
    border: 1px solid var(--cc-bubble-border);
    margin-bottom: 0.25rem;
  }

  .conversation-source a {
    color: var(--cc-primary);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
  }

  .conversation-source a:hover {
    color: #2563eb;
    text-decoration: underline;
  }

  /* Date Divider */
  .date-divider {
    text-align: center;
    font-size: 0.7rem;
    color: var(--cc-text-muted);
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    font-weight: 500;
  }

  .date-divider::before,
  .date-divider::after {
    content: '';
    height: 1px;
    background: var(--cc-border-container);
    width: 20px;
    display: block;
  }

  :host(.dark) .date-divider::before,
  :host(.dark) .date-divider::after {
    background: var(--cc-border-container-dark);
  }

  /* Message Item */
  .message-item {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    animation: slideIn 0.3s ease-out forwards;
    opacity: 0;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .message-item:nth-child(1) { animation-delay: 0.05s; }
  .message-item:nth-child(2) { animation-delay: 0.1s; }
  .message-item:nth-child(3) { animation-delay: 0.15s; }
  .message-item:nth-child(n+4) { animation-delay: 0.2s; }

  /* Avatar */
  .avatar {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 8px;
    overflow: hidden;
    background: var(--cc-border-container);
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    transition: transform 0.2s ease;
    cursor: pointer;
  }

  .avatar:hover {
    transform: scale(1.05);
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--cc-text-muted);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  /* Content Wrapper */
  .content-wrapper {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    line-height: 1;
    padding-left: 2px;
  }

  .author-name {
    color: var(--cc-text-sub);
    font-weight: 600;
  }

  .badge {
    font-size: 0.6rem;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .badge-owner {
    background: rgba(16, 185, 129, 0.1);
    color: var(--cc-success);
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  /* Message Bubble */
  .message-bubble {
    position: relative;
    padding: 0.5rem 0.85rem;
    background: var(--cc-bubble-bg);
    border: 1px solid var(--cc-bubble-border);
    border-radius: 2px 12px 12px 12px;
    box-shadow: var(--cc-bubble-shadow);
    color: var(--cc-text-main);
    font-size: 0.875rem;
    line-height: 1.5;
    max-width: 100%;
    width: fit-content;
    transition: all 0.2s ease;
  }

  .message-bubble:hover {
    background: var(--cc-bubble-hover-bg);
    border-color: var(--cc-bubble-hover-border);
    box-shadow: var(--cc-bubble-hover-shadow);
    transform: translateY(-1px);
  }

  .message-content {
    margin: 0;
  }

  .message-content p {
    margin: 0.25em 0;
  }
  .message-content p:first-child { margin-top: 0; }
  .message-content p:last-child { margin-bottom: 0; }

  /* Links & Mentions */
  .message-content a,
  .message-content .mention {
    color: var(--cc-primary);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
  }

  .message-content .mention {
    background: var(--cc-primary-light);
    padding: 0 3px;
    border-radius: 3px;
    margin: 0 1px;
    font-size: 0.9em;
    display: inline-block;
  }

  :host(.dark) .message-content .mention {
    background: rgba(59, 130, 246, 0.15);
  }

  .message-content a:hover,
  .message-content .mention:hover {
    color: #2563eb;
    text-decoration: underline;
  }

  /* Time Display */
  .time-display {
    font-size: 0.7rem;
    color: var(--cc-text-muted);
    margin-left: 0.4rem;
    align-self: flex-end;
    margin-bottom: 3px;
    font-variant-numeric: tabular-nums;
    opacity: 0.8;
  }

  /* Mobile Responsive */
  @media (max-width: 640px) {
    .conversation-container {
      padding: 0.75rem;
      gap: 0.75rem;
    }
    .message-item {
      gap: 0.5rem;
    }
    .avatar {
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 6px;
    }
    .message-bubble {
      padding: 0.4rem 0.75rem;
      font-size: 0.85rem;
    }
  }
`;
