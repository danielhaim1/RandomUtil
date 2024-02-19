import { RandomDateUtil } from './util.date.js';
import { RandomImageUtil } from './util.image.js';
import { RandomAvatar } from './util.avatar.js';
import palette from "../sets/palette.json";

export class RandomUtilController {
    constructor (selectors = {}) {
        // Initialization
        this.initializeElements(selectors);

        // Managers
        this.imageManager = null;
        this.dateManager = null;
        this.avatarManager = null;

        // Palettes
        this.paletteRgb = palette.map(row => row.map(hex => this.hexToRgb(hex)));
    }

    // Element selectors
    initializeElements({ tag, title, time, excerpt, date, img, avatar, color }) {
        this.tagElements = this.getElements(tag || '[data-random="tag"]');
        this.titleElements = this.getElements(title || '[data-random="title"]');
        this.readTimeEls = this.getElements(time || '[data-random="read-time"]');
        this.excerptElements = this.getElements(excerpt || '[data-random="excerpt"]');
        this.imageElements = this.getElements(img || '[data-random="img"]');
        this.dateElements = this.getElements(date || '[data-random="date"]');
        this.dateSpecificElements = this.getElements('[data-random-date]');
        this.avatarElements = this.getElements(avatar || '[data-random="avatar"]');
        this.colorElements = this.getElements(color || '[data-random="color"]'); // Corrected to use the color parameter
    }

    getElements(selector) {
        return selector ? document.querySelectorAll(selector) : [];
    }

    updateElements(elements, values, formatter = (v) => v) {
        if (!elements || elements.length === 0) {
            return;
        }
        elements.forEach((el, index) => {
            el.textContent = formatter(values[index % values.length]);
        });
    }

    randomTitle(titles) {
        if (!this.titleElements || this.titleElements.length === 0) {
            return;
        }
        this.updateElements(this.titleElements, titles);
    }

    randomTag(tags) {
        if (!this.tagElements || this.tagElements.length === 0) {
            return;
        }
        this.updateElements(this.tagElements, tags);
    }

    randomExcerpt(excerpts) {
        this.updateElements(this.excerptElements, excerpts);
    }

    randomDate(format) {
        this.dateManager = new RandomDateUtil(this);

        if (this.dateElements && this.dateElements.length > 0) {
            this.dateManager.randomDate(format, this.dateElements);
        } else {
        }

        if (this.dateSpecificElements && this.dateSpecificElements.length > 0) {
            this.dateSpecificElements.forEach(el => {
                const specificFormat = el.getAttribute('data-random-date');
                this.dateManager.randomDate(specificFormat, [el]);
            });
        } else {
        }
    }

    randomReadTime(text = 'min') {
        const readTime = `${Math.floor(Math.random() * 11) + 2} ${text}`;
        this.updateElements(this.readTimeEls, new Array(this.readTimeEls.length).fill(readTime));
    }

    randomImages({ count = null, query = null, orientation = null, accessKey = null }) {
        if (!this.imageElements || this.imageElements.length === 0) {
            return;
        }
        this.imageElements.forEach((element, index) => {
            const specificQuery = element.getAttribute('data-random-img') || query;
            const uniqueId = `${new Date().getTime()}-${index}`; // This ensures each key is unique
            const imageManager = new RandomImageUtil([element], count, specificQuery, orientation, accessKey, uniqueId);
            imageManager.init();
        });
    }
    
    randomAvatar({ avatarOptions = {} }) {
        this.avatarElements.forEach(element => {
            const specificVariant = element.getAttribute('data-random-avatar');
            const options = specificVariant ? { ...avatarOptions, variant: specificVariant } : avatarOptions;
            const avatarManager = new RandomAvatar(options);
            element.innerHTML = '';
            element.appendChild(avatarManager.generateAvatar());
        });
    }

    hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        // Validate hex format
        const validHex = /^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/;
        const result = validHex.exec(hex);
        if (result) {
            r = parseInt(result[1], 16);
            g = parseInt(result[2], 16);
            b = parseInt(result[3], 16);
            return [r, g, b];
        } else {
            // Log a warning and return a default/fallback RGB value on invalid input
            console.warn(`Invalid hex color: ${hex}. Falling back to default.`);
            return [0, 0, 0]; // Fallback color: black
        }
    }

    randomColor(options = {}) {
        const { customColors = null, varName = 'color' } = options;

        if (typeof varName !== 'string') {
            console.error('varName must be a string.');
            return;
        }

        if (!this.colorElements || this.colorElements.length === 0) {
            return;
        }

        let targetPalette;
        if (Array.isArray(customColors) && customColors.every(color => /^#([0-9A-F]{3}){1,2}$/i.test(color))) {
            targetPalette = customColors.map(hex => this.hexToRgb(hex)).filter(rgb => rgb !== null);
        } else if (!Array.isArray(customColors)) {
            targetPalette = this.paletteRgb.flat();
        } else {
            console.error('Invalid customColors array.');
            return;
        }

        const setColorStyle = (element) => {
            if (targetPalette.length === 0) {
                console.error('No valid colors available.');
                return;
            }

            const randomColor = targetPalette[Math.floor(Math.random() * targetPalette.length)];
            const hexColor = customColors ? customColors[targetPalette.indexOf(randomColor)] : palette.flat().find(hex => this.hexToRgb(hex).toString() === randomColor.toString()) || '#000000';
            const rgbValue = randomColor ? randomColor.join(', ') : '0, 0, 0';

            element.style.removeProperty('--color-rgb');
            element.style.removeProperty('--color-hex');

            element.style.setProperty(`--${varName}-rgb`, rgbValue);
            element.style.setProperty(`--${varName}-hex`, hexColor);
        };

        this.colorElements.forEach(el => setColorStyle(el));
    }
}