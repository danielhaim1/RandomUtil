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

/**
 * The global element counter.
 */
let globalElementCounter = 0;

export class RandomImageUtil {
	constructor (elements, count = null, query = null, orientation = null, accessKey = null, uniqueId = null) {
		this.elements = elements;
		this.count = count;
		this.query = query;
		this.orientation = orientation;
		this.accessKey = accessKey || process.env.UNSPLASH_API_KEY;
		this.uniqueId = uniqueId || Math.random().toString(36).substring(7);

		if (!this.accessKey) {
			console.error('No Unsplash API key provided.');
			return;
		}

		this.cacheKey = generateCacheKey(this.query, this.orientation, this.uniqueId);

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

		if (window.location.protocol === 'file:') {
		    console.error("Cannot use Cache API with 'file://' protocol. Please run on a server.");
		    return;
		}

	    const cache = await caches.open("randomutil-cache");

	    for (const element of this.elements) {
	        let elementId = element.getAttribute('data-element-id');
	        if (!elementId) {
	            elementId = `element-${globalElementCounter++}`;
	            element.setAttribute('data-element-id', elementId);
	        }

	        const specificQuery = element.getAttribute('data-random-img') || this.query;
	        const specificOrientation = element.getAttribute('data-random-orientation') || this.orientation;

        const elementCacheKey = generateCacheKey(specificQuery, specificOrientation, elementId);

        let cachedResponse = await cache.match(elementCacheKey);

        if (!cachedResponse) {
            const apiUrl = this.createApiUrl(specificQuery, specificOrientation);

            if (!/^https?:/.test(apiUrl)) {
                console.error("API URL must be an HTTP or HTTPS URL");
                continue; // Skip caching for this URL
            }
            try {
                cachedResponse = await fetch(apiUrl, {
                    headers: { "Cache-Control": this.cacheControlHeader }
                });
                await cache.put(elementCacheKey, cachedResponse.clone());
            } catch (error) {
                console.error('Error fetching or caching data:', error);
            }

	        } else {
	            console.log('Cached data found for key:', elementCacheKey, '. Using cached image.');
	        }

	        this.applyImagesFromCache(cachedResponse, [element]);
	    }
	}

	/**
	 * Create the API URL.
	 * 
	 * @param {String} query - The query to search for.
	 * @param {String} orientation - The orientation of the images to fetch.
	 * 
	 * @returns {String} The API URL.
	 */
	createApiUrl(query, orientation) {
		return `https://api.unsplash.com/photos/random/?client_id=${this.accessKey}&count=${this.count}&orientation=${orientation}&query=${encodeURIComponent(query)}`;
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
		cachedResponse.json().then(images => {
			this.distributeImages(elements, images);
		}).catch(error => {
			console.error('Error applying images from cache. Details:', error);
			console.error('Response that caused error:', cachedResponse);
		});
	}


	/**
	 * Fetch the images and apply them
	 * 
	 * @param {Cache} cache - The cache to store the images in.
	 * @param {Array} elements - The elements to apply the images to.
	 * 
	 * @returns {void}
	 */
async fetchAndApplyImages(cache, elements, cacheKey) {
    try {
        if (!/^https?:/.test(cacheKey)) {
            throw new Error("cacheKey must be an HTTP or HTTPS URL");
        }
        const response = await fetch(cacheKey, {
            headers: {
                "Cache-Control": this.cacheControlHeader
            }
        });
        cache.put(new Request(cacheKey), response.clone());
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
		if (!Array.isArray(images) || images.length === 0) {
			console.error('No images available to distribute', images);
			return;
		}

		elements.forEach((element, index) => {
			try {
				const imageData = images[index % images.length];
				this.updateImage(element, imageData);
				// console.log(`Image distributed to element ${index}:`, imageData);
			} catch (error) {
				console.error(`Error distributing image to element ${index}:`, error);
			}
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

/**
 * Generate the cache key.
 * 
 * @param {String} query - The query to search for.
 * @param {String} orientation - The orientation of the images to fetch.
 * 
 * @returns {String} The cache key.
 */
function generateCacheKey(query, orientation, uniqueId) {
	return `randomutil-cache-${query}-${orientation}-${uniqueId}`;
}
