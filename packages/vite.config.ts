import { fileURLToPath } from 'url';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';


function copyToStatic(): Plugin {
  return {
    name: 'copy-to-static',
    closeBundle() {
      const distDir = join(process.cwd(), 'dist');
      const staticDir = fileURLToPath(new URL('../src/main/resources/static', import.meta.url));

      // 确保 static 目录存在
      if (!existsSync(staticDir)) {
        mkdirSync(staticDir, { recursive: true });
      }

      // 复制 JS 文件
      const jsFile = 'comment-reference.umd.js';
      const jsSrc = join(distDir, jsFile);
      const jsDest = join(staticDir, jsFile);
      if (existsSync(jsSrc)) {
        copyFileSync(jsSrc, jsDest);
        console.log(`✓ Copied ${jsFile} to ${staticDir}`);
      }
    },
  };
}

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'CommentReference',
      fileName: (format) => {
        if (format === 'es') {
          return 'comment-reference.js';
        }
        return 'comment-reference.umd.js';
      },
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        // 确保样式和资源正确输出
        assetFileNames: 'comment-reference.[ext]'
      }
    }
  },
  plugins: [
    copyToStatic(),
  ],
  // 开发服务器配置
  server: {
    port: 3001
  }
});

