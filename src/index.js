import { RandomDateUtil } from './util.date.js';
import { RandomImageUtil } from './util.image.js';
import { RandomAvatar } from './util.avatar.js';

export class RandomUtilController {
    constructor (selectors = {}) {
        this.initializeElements(selectors);
        this.imageManager = null;
        this.dateManager = null;
        this.avatarManager = null;
    }

    initializeElements({ tag, title, time, excerpt, date, img, avatar }) {
        this.tagElements = this.getElements(tag || '[data-random="tag"]');
        this.titleElements = this.getElements(title || '[data-random="title"]');
        this.readTimeEls = this.getElements(time || '[data-random="read-time"]');
        this.excerptElements = this.getElements(excerpt || '[data-random="excerpt"]');
        this.imageElements = this.getElements(img || '[data-random="img"]');
        this.dateElements = this.getElements(date || '[data-random="date"]');
        this.dateSpecificElements = this.getElements('[data-random-date]');
        this.avatarElements = this.getElements(avatar || '[data-random="avatar"]');
    }

    getElements(selector) {
        return selector ? document.querySelectorAll(selector) : [];
    }

    updateElements(elements, values, formatter = (v) => v) {
        if (!elements || elements.length === 0) {
            // console.warn("No elements found for the selector");
            return;
        }
        elements.forEach((el, index) => {
            el.textContent = formatter(values[index % values.length]);
        });
    }


    randomTag(tags) {
        if (!this.tagElements || this.tagElements.length === 0) {
            // console.warn("No tag elements found.");
            return;
        }
        this.updateElements(this.tagElements, tags);
    }

    randomTitle(titles) {
        if (!this.titleElements || this.titleElements.length === 0) {
            // console.warn("No title elements found.");
            return;
        }
        this.updateElements(this.titleElements, titles);
    }

    randomReadTime() {
        const formatter = () => `${Math.floor(Math.random() * 11) + 2} min read`;
        this.updateElements(this.readTimeEls, Array(this.readTimeEls.length).fill(), formatter);
    }

    randomExcerpt(excerpts) {
        this.updateElements(this.excerptElements, excerpts);
    }

    randomDate(format) {
        this.dateManager = new RandomDateUtil(this);

        if (this.dateElements && this.dateElements.length > 0) {
            this.dateManager.randomDate(format, this.dateElements);
        } else {
            // console.warn("No general date elements found.");
        }

        if (this.dateSpecificElements && this.dateSpecificElements.length > 0) {
            this.dateSpecificElements.forEach(el => {
                const specificFormat = el.getAttribute('data-random-date');
                this.dateManager.randomDate(specificFormat, [el]);
            });
        } else {
            // console.warn("No specific date format elements found.");
        }
    }

    randomImages({ count = null, query = null, orientation = null, accessKey = null }) {
        if (!this.imageElements || this.imageElements.length === 0) {
            // console.warn("No image elements found.");
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

}

