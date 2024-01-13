import { RandomContentManager } from './src/util.content.js';
import { RandomUtilController } from './src/index.js';

const exports = {
    RandomContentManager,
    RandomUtilController
};

// Export for Node.js environment
if (typeof module === 'object' && module.exports) {
    module.exports = exports;
}

// Export for web environment
if (typeof window === 'object') {
    Object.assign(window, exports);
}