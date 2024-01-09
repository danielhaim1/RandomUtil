import { RandomDateUtil } from './util.date.js';
import { RandomImageUtil } from './util.image.js';
import { RandomAvatar } from './util.avatar.js';

export class RandomUtil {
    constructor (selectors = {}) {
        this.initializeElements(selectors);
        this.dateManager = new RandomDateUtil(this);
        this.imageManager = new RandomImageUtil(this);
        this.avatarManager = new RandomAvatar(this);
    }

    initializeElements({ topics, titles, time, excerpts, date, avatarSelector }) {
        this.topicElements = this.getElements(topics);
        this.titleElements = this.getElements(titles);
        this.readTimeEls = this.getElements(time);
        this.excerptElements = this.getElements(excerpts);
        this.dateElements = this.getElements(date);
        this.avatarElements = this.getElements(avatarSelector || '[data-random="avatar"]');
    }

    getElements(selector) {
        return selector ? document.querySelectorAll(selector) : [];
    }


    updateElements(elements, values, formatter = (v) => v) {
        if (!elements) {
            console.log("No elements found");
            return;
        }
        elements.forEach((el, index) => {
            el.textContent = formatter(values[index % values.length]);
        });
    }

    randomTopic(topics) {
        if (!this.topicElements || this.topicElements.length === 0) {
            console.warn("No topic elements found.");
            return;
        }
        this.updateElements(this.topicElements, topics);
    }

    randomTitle(titles) {
        if (!this.titleElements || this.titleElements.length === 0) {
            console.warn("No title elements found.");
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
        if (!this.dateElements || this.dateElements.length === 0) {
            console.warn("No date elements found.");
            return;
        }

        this.dateManager.randomDate(format);
    }

    randomImages({ count = 12, query = "nature", orientation = "landscape" }) {
        const imageManager = new RandomImageUtil(count, query, orientation);
        imageManager.init();
    }

    randomAvatar({ avatarOptions = {} }) {
        this.avatarElements.forEach(element => {
            const avatarManager = new RandomAvatar(avatarOptions);
            element.innerHTML = '';
            element.appendChild(avatarManager.generateAvatar());
        });
    }
    
}

