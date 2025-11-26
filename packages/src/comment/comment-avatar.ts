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

// 缓存配置
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7天失效
const MAX_CACHE_SIZE = 1000; // 最大缓存条数

interface CacheEntry {
  url: string;
  timestamp: number;
}

// 全局头像缓存
const avatarCache = new Map<string, CacheEntry>();

function getCachedUrl(key: string): string | null {
  const entry = avatarCache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.timestamp > CACHE_DURATION) {
    avatarCache.delete(key);
    return null;
  }

  return entry.url;
}

function setCachedUrl(key: string, url: string) {
  if (avatarCache.size >= MAX_CACHE_SIZE) {
    const firstKey = avatarCache.keys().next().value;
    if (firstKey) avatarCache.delete(firstKey);
  }

  avatarCache.set(key, {
    url,
    timestamp: Date.now()
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

const pendingRequests = new Map<string, Promise<string | null>>();

export async function getAvatarUrl(comment: CommentData | null): Promise<string | null> {
  if (!comment) return null;

  const cacheKey = comment.email?.trim().toLowerCase() || comment.name;
  if (!cacheKey) return comment.userAvatar || null;

  const cached = getCachedUrl(cacheKey);
  if (cached) return cached;

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey)!;
  }
  const task = (async () => {
    if (comment.userAvatar) {
      setCachedUrl(cacheKey, comment.userAvatar);
      return comment.userAvatar;
    }
    if (comment.email) {
      const email = comment.email.trim().toLowerCase();
      if (email) {
        try {
          const hash = await sha256(email);
          const format = await detectImageFormat();
          const url = `https://weavatar.com/avatar/${hash}.${format}`;
          setCachedUrl(cacheKey, url);
          return url;
        } catch (error) {
          console.error('Failed to generate avatar URL:', error);
          return null;
        }
      }
    }
    return null;
  })();
  pendingRequests.set(cacheKey, task);
  task.finally(() => {
    pendingRequests.delete(cacheKey);
  });

  return task;
}
