import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      react(),
      viteCompression({
        verbose: true, // 압축 과정을 자세히 출력
        disable: !isProduction, // 프로덕션에서만 압축 활성화
        threshold: 10240, // 10KB 이상 파일만 압축
        algorithm: 'brotliCompress', // Brotli 압축 사용
        ext: '.br', // 확장자를 .br로 설정
        compressionOptions: {
          level: 11, // Brotli 압축 레벨 (1-11). 11이 가장 강력한 압축
        },
        deleteOriginFile: false, // 원본 파일을 유지 (true로 설정 시 원본 삭제)
      }),
      viteCompression({
        verbose: true,
        disable: !isProduction,
        threshold: 10240,
        algorithm: 'gzip', // 추가로 Gzip 압축 적용
        ext: '.gz', // 확장자를 .gz로 설정
        compressionOptions: {
          level: 9, // Gzip 압축 레벨 (1-9). 9가 가장 강력한 압축
        },
        deleteOriginFile: false, // 원본 파일 유지
      }),
      visualizer({
        filename: './dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    build: {
      target: 'esnext',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.info', 'console.debug', 'console.warn'],
        },
      },
      sourcemap: false,
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            if (id.includes('/src/pages/')) {
              return 'pages';
            }
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/global.scss";`,
        },
      },
      modules: {
        localsConvention: 'camelCaseOnly',
        scopeBehaviour: 'local',
      },
      postcss: {
        plugins: [
          autoprefixer(),
          cssnano({ preset: 'default' }),
        ],
      },
    },
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@assets': '/src/assets',
        '@styles': '/src/styles',
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      esbuildOptions: {
        target: 'es2017',
      },
    },
  };
});
