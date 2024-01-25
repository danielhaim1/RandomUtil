import { RandomContentManager } from './src/util.content.js';
import { RandomUtilController } from './src/index.js';

const RandomUtil = {
    RandomContentManager,
    RandomUtilController
};

// Export for Node.js environment
if (typeof module === 'object' && module.exports) {
    module.exports = RandomUtil;
}

// Export for AMD environment
if (typeof define === 'function' && define.amd) {
    define('RandomUtil', [], function() {
        return RandomUtil;
    });
}

// Export for web environment
if (typeof window === 'object') {
    window.RandomUtil = RandomUtil;
}
