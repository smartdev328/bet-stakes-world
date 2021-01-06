/* eslint-disable @typescript-eslint/no-var-requires */
const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  /* config for next-optimized-images */
  handleImages: ['jpg', 'jpeg', 'png', 'svg'],
  mozjpeg: {
    quality: 80
  },
  optipng: {
    optimizationLevel: 3
  },
  svgo: {
    optimizationLevel: 3
  }
  // your config for other plugins or the general next.js here...
});
