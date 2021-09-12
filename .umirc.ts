import { defineConfig } from 'dumi';

const repo = '@alita/components';

export default defineConfig({
  title: repo,
  theme: {
    '@hd': '0.02rem',
  },
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  targets: {
    ios: 8,
  },
  // Because of using GitHub Pages
  base: `/comps/`,
  publicPath: `/comps/`,
  styles: [
    `.__dumi-default-mobile-demo-layout {
      min-height: 100vh;
      background: #f5f5f5;
      padding: 0 !important;
      overflow: hidden;
      font-size: 0.26rem;
    }
    .__dumi-default-device-status {
      border-bottom: 1px solid #e3e3e3;
    }
    .__dumi-default-mobile-previewer {
      font-size: initial;
    }
    .am-icon {
      fill: currentColor;
      background-size: cover;
      width: 22px;
      height: 22px;
    }
    `,
  ],
});
