/**
 * RandomImageUtil
 * 
 * A utility class for fetching random images from the Unsplash API.
 * 
 * @param {Array} elements - The elements to apply the images to.
 * @param {Number} count - The number of images to fetch.
 * @param {String} query - The query to search for.
 * @param {String} orientation - The orientation of the images to fetch.
 * @param {String} accessKey - The Unsplash API access key.
 * 
 */

export class RandomImageUtil {
	constructor(elements, count = null, query = null, orientation = null, accessKey = null) {
		this.elements = elements;
		this.count = count;
		this.query = query;
		this.orientation = orientation;
		this.accessKey = accessKey || process.env.UNSPLASH_API_KEY;

		if (!this.accessKey) {
			console.error('No Unsplash API key provided.');
			return;
		}

		this.cacheTime = 86400;
		this.cacheControlHeader = `public, max-age=${this.cacheTime}`;
		this.credits = true;
		this.isInitialized = true;
	}

	/** 
	 * The Unsplash API URL.
	 * 
	 * @returns {String} The Unsplash API URL.
	 * 
	 */
	get apiUrl() {
		if (!this.isInitialized) {
			console.error('RandomImageUtil instance not initialized properly.');
			return '';
		}
		return `https://api.unsplash.com/photos/random/?client_id=${this.accessKey}&count=${this.count}&orientation=${this.orientation}&query=${this.query}`;
	}

	/**
	 * Initialize the RandomImageUtil instance.
	 * 
	 * @returns {void}
	 */
	async init() {
		if (!this.isInitialized) return;

		try {
			if (!this.elements.length) {
				console.log('No image elements found for RandomImageUtil.');
				return;
			}

			// Check if the browser supports the Cache API.
			const cache = await caches.open("randomutil-cache");
			const cachedResponse = await cache.match(this.apiUrl);

			if (cachedResponse) {
				// If the response is cached, apply the images from the cache.
				this.applyImagesFromCache(cachedResponse, this.elements);
			} else {
				// If the response is not cached, fetch the images and apply them.
				this.fetchAndApplyImages(cache, this.elements);
			}
		} catch (error) {
			console.error('Error initializing RandomImageUtil:', error);
		}
	}

	/** 
	 * Apply the images from the cache.
	 * 
	 * @param {Response} cachedResponse - The cached response.
	 * @param {Array} elements - The elements to apply the images to.
	 * 
	 * @returns {void}
	 */
	applyImagesFromCache(cachedResponse, elements) {
		cachedResponse.json().then(images => this.distributeImages(elements, images))
			.catch(error => console.error('Error applying images from cache:', error));
	}

	/**
	 * Fetch the images and apply them
	 * 
	 * @param {Cache} cache - The cache to store the images in.
	 * @param {Array} elements - The elements to apply the images to.
	 * 
	 * @returns {void}
	 */
	async fetchAndApplyImages(cache, elements) {
		try {
			const response = await fetch(this.apiUrl, {
				headers: {
					"Cache-Control": this.cacheControlHeader
				}
			});
			cache.put(new Request(this.apiUrl), response.clone());
			const images = await response.json();
			this.distributeImages(elements, images);
		} catch (error) {
			console.error('Error fetching images:', error);
		}
	}

	/**
	 * Distribute the images to the elements.
	 *  
	 * @param {Array} elements - The elements to apply the images to.
	 * @param {Array} images - The images to apply.
	 * 
	 * @returns {void}
	 */
	distributeImages(elements, images) {
		elements.forEach((element, index) => {
			const imageData = images[index % images.length];
			this.updateImage(element, imageData);
		});
	}

	/**
	 * Update the image.
	 * 
	 * @param {HTMLElement} element - The element to apply the image to.
	 * @param {Object} imageData - The image data to apply.
	 * 
	 * @returns {void}
	 * 
	 * @todo Add support for background images.
	 * @todo Add support for image credits.
	 * 
	 * 
	 */
	updateImage(element, imageData) {
		const imageUrl = imageData.urls.regular;
		const photographer = imageData.user.name;
		const unsplashLink = imageData.links.html;

		if (element.tagName === "IMG") {
			element.src = imageUrl;
		} else {
			element.style.backgroundImage = `url(${imageUrl})`;
		}

		if (this.credits) {
			this.addCreditsToFigcaption(element, `Photo by ${photographer}`, unsplashLink);
		}
	}

	/**
	 * Add credits to the figcaption of the image.
	 * 
	 * @param {HTMLElement} element - The element to apply the credits to.
	 * @param {String} text - The text to apply.
	 * @param {String} link - The link to apply.
	 * @param {String} query - The query to search for.
	 * 
	 * @returns {void}
	 */
	addCreditsToFigcaption(element, text, link, query) {

		// check if parent is figure, and if the figure has a figcaption, if so, populate it.
		if (element.parentElement.tagName === "FIGURE") {
			const caption = element.parentElement.querySelector("figcaption");
			if (caption) {

				// To the `text`, add `via Unsplash` and a link to the photographer's Unsplash profile.
				const linkText = `${text} via <a href="${link}" target="_blank" rel="noopener noreferrer">Unsplash</a>`;
				caption.innerHTML = linkText;

				return;
			}
		}
	}
}