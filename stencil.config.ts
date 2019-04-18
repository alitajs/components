import { Config } from '@stencil/core';
import { less } from '@stencil/less';
export const config: Config = {
  namespace: 'Alita',
  plugins: [
    less({
      injectGlobalPaths: [
        'src/css/index.less',
        'src/css/mixins/index.less'
      ]
    })
  ],
  outputTargets: [
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
