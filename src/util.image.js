export class RandomImageUtil {
    constructor(count = 12, query = "nature", orientation = "landscape") {
        this.count = count;
        this.orientation = orientation;
        this.query = query;
        this.accessKey = process.env.UNSPLASH_API_KEY;
        this.cacheTime = 86400;
        this.cacheControlHeader = `public, max-age=${this.cacheTime}`;
        this.tooltip = true;
    }

    get apiUrl() {
        return `https://api.unsplash.com/photos/random/?client_id=${this.accessKey}&count=${this.count}&orientation=${this.orientation}&query=${this.query}`;
    }

    async init() {
        const imageElements = document.querySelectorAll("[data-random='img']");
        if (!imageElements.length) return;

        const cache = await caches.open("disco-cache");
        const cachedResponse = await cache.match(this.apiUrl);

        if (cachedResponse) {
            this.applyImagesFromCache(cachedResponse, imageElements);
        } else {
            this.fetchAndApplyImages(cache, imageElements);
        }
    }

    applyImagesFromCache(cachedResponse, elements) {
        cachedResponse.json().then((images) => this.distributeImages(elements, images));
    }

    async fetchAndApplyImages(cache, elements) {
        try {
            const response = await fetch(this.apiUrl, { headers: { "Cache-Control": this.cacheControlHeader } });
            cache.put(new Request(this.apiUrl), response.clone());
            const images = await response.json();
            this.distributeImages(elements, images);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    distributeImages(elements, images) {
        elements.forEach((element, index) => {
            const imageData = images[index % images.length];
            this.updateImage(element, imageData);
        });
    }

    updateImage(element, imageData) {
        const imageUrl = imageData.urls.regular;
        const photographer = imageData.user.name;
        const unsplashLink = imageData.links.html;

        if (element.tagName === "IMG") {
            element.src = imageUrl;
        } else {
            element.style.backgroundImage = `url(${imageUrl})`;
        }

        if (this.tooltip) {
            this.addTooltip(element, `Photo by ${photographer} on Unsplash`, unsplashLink);
        }
    }


    addTooltip(element, text, link) {
        const tooltip = document.createElement("span");
        tooltip.classList.add("unsplash-credit-tooltip");
        tooltip.textContent = text;
        tooltip.style.display = "none";
        tooltip.onclick = () => window.open(link, "_blank");

        element.appendChild(tooltip);
        element.onmouseover = () => setTimeout(() => tooltip.style.display = "block", 1000); // 1000ms delay
        element.onmouseout = () => tooltip.style.display = "none";
    }

}