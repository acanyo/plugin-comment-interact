import type { CommentData } from './comment-types';

export function getAvatarInitial(displayName: string): string {
  return displayName?.charAt(0).toUpperCase() ?? '';
}

// 缓存检测结果
let detectedFormat: 'avif' | 'webp' | 'jpg' | null = null;

/**
 * 检测浏览器支持的最佳图片格式
 */
async function detectImageFormat(): Promise<'avif' | 'webp' | 'jpg'> {
  if (detectedFormat) return detectedFormat;

  // 检测 AVIF 支持
  const avifSupported = await canDisplayImage(
    'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A='
  );
  if (avifSupported) {
    detectedFormat = 'avif';
    console.log('Browser supports AVIF format');
    return 'avif';
  }
  const webpSupported = await canDisplayImage(
    'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='
  );
  if (webpSupported) {
    detectedFormat = 'webp';
    console.log('Browser supports WebP format');
    return 'webp';
  }
  detectedFormat = 'jpg';
  console.log('Browser fallback to JPG format');
  return 'jpg';
}

/**
 * 测试浏览器是否能显示指定格式的图片
 */
function canDisplayImage(dataUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = dataUrl;
  });
}

/**
 * 计算字符串的 SHA256 哈希值
 */
async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function getAvatarUrl(comment: CommentData | null): Promise<string | null> {
  if (!comment) return null;
  if (comment.userAvatar) {
    return comment.userAvatar;
  }
  if (comment.email) {
    const email = comment.email.trim().toLowerCase();
    if (email) {
      try {
        const hash = await sha256(email);
        const format = await detectImageFormat();
        console.log('Avatar format detected:', format);
        console.log('Avatar URL:', `https://weavatar.com/avatar/${hash}.${format}`);
        return `https://weavatar.com/avatar/${hash}.${format}`;
      } catch (error) {
        console.error('Failed to generate avatar URL:', error);
        return null;
      }
    }
  }

  return null;
}
