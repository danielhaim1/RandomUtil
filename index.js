import { RandomContentManager } from './src/util.content.js';
import { RandomUtilController } from './src/index.js';

const RandomUtil = {
  RandomContentManager,
  RandomUtilController
};

// ----------------------------------------------------
// Existing exports for various environments
// ----------------------------------------------------

// 1.1. Export for Node.js (CommonJS) environment
if (typeof module === 'object' && module.exports) {
  module.exports = RandomUtil;
}

// 1.2. Export for AMD environment
// Allows "define(['RandomUtil'], function(RandomUtil) { ... })"
if (typeof define === 'function' && define.amd) {
  define('RandomUtil', [], function() {
    return RandomUtil;
  });
}

// 1.3. Export as a global for the web/browser environment
// Attaches "RandomUtil" onto the window object
if (typeof window === 'object') {
  window.RandomUtil = RandomUtil;
}

// ----------------------------------------------------
// 2. ES Module Export
// ----------------------------------------------------

export default RandomUtil;
export { RandomContentManager, RandomUtilController };
