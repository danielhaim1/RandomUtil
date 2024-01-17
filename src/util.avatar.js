import palette from "../sets/palette.json";

/**
 * @name RandomAvatar
 * @description: Generates a random avatar.
 * 
 * @param {Object} options - The options for the avatar.
 * @param {String} options.variant - The variant of the avatar to generate.
 * @param {Array} options.colors - The colors to use for the avatar.
 * @param {Boolean} options.square - Whether the avatar should be square or not.
 * @param {Number} options.size - The size of the avatar.
 * 
 * @returns {void}
 * 
 * @example: new RandomAvatar({ variant: "smile", colors: ["#000000", "#FFFFFF"], square: true, size: 128 });
 */

export class RandomAvatar {
	constructor ({
		variant,
		colors,
		square,
		size = 128
	}) {
		this.variant = variant || "pixel";
		this.colors = colors || RandomAvatarUtils.loadPalette();
		this.square = square !== undefined ? square : true;
		this.size = size;
		this.elementsCount = 4;
		const randomHash = RandomAvatarUtils.hashCode(Math.random().toString());
		this.elementProps = RandomAvatarUtils.createAvatarElements(randomHash, this.size, this.elementsCount, this.colors);
		this.smileProps = RandomAvatarUtils.AvatarVariantSmileAttributes(randomHash, this.size, this.elementsCount, this.colors);
		this.variantGenerator = new AvatarVariantGenerator(this.size, this.elementProps, this.square, this.colors);
	}

	/**
	 * @name generateAvatar
	 * @description: Generates the avatar.
	 * 
	 * @returns {SVGElement} The generated avatar.
	 * 
	 * @example: generateAvatar();
	 */
	generateAvatar() {
		const pixelColors = RandomAvatarUtils.AvatarVariantPixelColorArray(this.colors);

		switch (this.variant) {
			case "abstract":
				return this.variantGenerator.AvatarVariantAbstract();
			case "pixel":
				return this.variantGenerator.AvatarVariantPixel(pixelColors);
			case "smile":
				return this.variantGenerator.AvatarVariantSmile(this.smileProps);
			default:
				return this.variantGenerator.AvatarVariantPixel(pixelColors);
		}
	}
}

/**
 * @name RandomAvatarUtils
 * @description: A utility class for generating random avatars.
 *  
 * @returns {void}
 */
const RandomAvatarUtils = {
	loadPalette() {
		return palette[Math.floor(Math.random() * palette.length)];
	},

	hashCode(input) {
		let hash = 0;
		for (const char of input) {
			hash = (hash << 5) - hash + char.charCodeAt(0);
		}
		return Math.abs(hash);
	},

	computePosition(hash, range, index, modifier = 0) {
		const value = (hash + modifier) % range;
		return index % 2 === 0 ? -value : value;
	},

	createAvatarElements(hash, avatarSize, elementCount, colorPalette) {
		return Array.from({
			length: elementCount
		}, (_, index) => {
			// Ensure each element gets a different color by using the index and palette length
			const colorIndex = (hash + index) % colorPalette.length;
			return {
				color: colorPalette[colorIndex],
				translateX: this.computePosition(hash, avatarSize, index, 1),
				translateY: this.computePosition(hash, avatarSize, index, 2),
				rotate: this.computePosition(hash, 360, index),
				isSquare: hash % 2 === 0
			};
		});
	},

	/**
	 * @name AvatarVariantPixelColorArray
	 * @description: Generates an array of random colors for the pixel variant.
	 * 
	 * @param {Array} colorPalette - The color palette to use.
	 * 
	 * @returns {Array} An array of random colors.
	 */
	AvatarVariantPixelColorArray(colorPalette) {
		const pixelCount = 128;
		return Array.from({
			length: pixelCount
		}, () => colorPalette[Math.floor(Math.random() * colorPalette.length)]);
	},

	/**
	 * @name AvatarVariantSmileAttributes
	 * @description: Generates the attributes for the smile variant.
	 * 
	 * @param {Number} hash - The hash to use.
	 * @param {Number} avatarSize - The size of the avatar.
	 * @param {Number} elementCount - The number of elements.
	 * @param {Array} colorPalette - The color palette to use.
	 * 
	 * @returns {Object} The attributes for the smile variant.
	 * 
	 * @example: AvatarVariantSmileAttributes(123456789, 128, 4, ["#000000", "#FFFFFF"]);
	 */
	AvatarVariantSmileAttributes(hash, avatarSize, elementCount, colorPalette) {
		const colorIndex = (hash + 13) % colorPalette.length;
		return {
			wrapperColor: colorPalette[hash % colorPalette.length],
			faceColor: this.calculateContrast(colorPalette[hash % colorPalette.length]),
			backgroundColor: colorPalette[colorIndex],
			wrapperTransform: this.calculateTransform(hash, avatarSize),
			isMouthOpen: hash % 2 === 0,
			isCircle: hash % 2 !== 0,
			eyeSpread: this.computePosition(hash, 5),
			mouthSpread: this.computePosition(hash, 3),
			faceTransform: this.calculateFaceTransform(hash, avatarSize)
		};
	},

	/**
	 * @name calculateTransform
	 * @description: Calculates the transform for the smile variant.
	 * 
	 * @param {Number} hash - The hash to use.
	 * @param {Number} size - The size of the avatar.
	 *
	 * @returns {Object} The transform for the smile variant.
	 */
	calculateTransform(hash, size) {
		const translateX = this.computePosition(hash, 10, 1);
		const translateY = this.computePosition(hash, 10, 2);
		return {
			translateX: translateX < 5 ? translateX + size / 9 : translateX,
			translateY: translateY < 5 ? translateY + size / 9 : translateY,
			rotate: this.computePosition(hash, 360),
			scale: 1 + this.computePosition(hash, size / 12) / 10
		};
	},

	/**
	 * @name calculateFaceTransform
	 * @description: Calculates the transform for the face of the smile variant.
	 * 
	 * @param {Number} hash - The hash to use.
	 * @param {Number} size - The size of the avatar.
	 * 
	 * @returns {Object} The transform for the face of the smile variant.
	 * 
	 * @example: calculateFaceTransform(123456789, 128);
	 */
	calculateFaceTransform(hash, size) {
		const translateX = this.computePosition(hash, 8, 1);
		const translateY = this.computePosition(hash, 7, 2);
		return {
			translateX: translateX > size / 3 ? translateX / 3 : translateX,
			translateY: translateY > size / 3 ? translateY / 3 : translateY,
			rotate: this.computePosition(hash, 10, 3)
		};
	},

	/**
	 * @name calculateContrast
	 * @description: Calculates the contrast for the smile variant.
	 * 
	 * @param {String} hexcolor - The hex color to use.
	 * 
	 * @returns {String} The contrast for the smile variant.
	 * 
	 * @example: calculateContrast("#000000");
	 */
	calculateContrast(hexcolor) {
		const r = parseInt(hexcolor.slice(1, 3), 16);
		const g = parseInt(hexcolor.slice(3, 5), 16);
		const b = parseInt(hexcolor.slice(5, 7), 16);
		const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
		return yiq >= 128 ? "#000000" : "#FFFFFF";
	}
};

/**
 * @name AvatarVariantGenerator
 * @description: Generates the avatar variant.
 * 
 * @param {Number} size - The size of the avatar.
 * @param {Array} elementProps - The properties of the elements.
 * @param {Boolean} square - Whether the avatar should be square or not.
 * @param {Array} colors - The colors to use for the avatar.
 * 
 * @returns {void}
 */
class AvatarVariantGenerator {
	constructor (size, elementProps, square, colors) {
		this.size = size;
		this.elementProps = elementProps;
		this.square = square;
		this.colors = colors;
	}

	/**
	 * @name _createSvgElement
	 * @description: Creates an SVG element.
	 * 
	 * @returns {SVGElement} The SVG element.
	 * 
	 */
	_createSvgElement() {
		const svgNS = "http://www.w3.org/2000/svg";
		const svg = document.createElementNS(svgNS, "svg");
		svg.setAttributeNS(null, "style", `overflow: hidden;`);
		svg.setAttributeNS(null, "width", this.size);
		svg.setAttributeNS(null, "height", this.size);
		svg.setAttributeNS(null, "viewBox", `0 0 ${this.size} ${this.size}`);
		svg.setAttributeNS(null, "fill", "none");
		svg.setAttributeNS(null, "role", "img");
		return svg;
	}

	/**
	 * @name _createMask
	 * @description: Creates a mask.
	 * 
	 * @returns {SVGElement} The mask.
	 */
	_createMask() {
		// randomHash is used to generate a unique ID for the mask
		const randomHash = RandomAvatarUtils.hashCode(Math.random().toString());
		const svgNS = "http://www.w3.org/2000/svg";
		const mask = document.createElementNS(svgNS, "mask");
		mask.setAttributeNS(null, "id", randomHash);
		mask.setAttributeNS(null, "maskUnits", "userSpaceOnUse");
		mask.setAttributeNS(null, "x", "0");
		mask.setAttributeNS(null, "y", "0");
		mask.setAttributeNS(null, "width", this.size);
		mask.setAttributeNS(null, "height", this.size);
		return mask;
	}

	/**
	 * @name _createGroup
	 * @description: Creates an SVG group element with optional transform and mask.
	 * 
	 * @param {String} transform - The transform to use (e.g., "translate(10, 20)").
	 * @param {String} mask - The ID of the mask to use (optional).
	 * @return {SVGElement} The created SVG group element.
	 */
	_createGroup(transform, mask) {
		const svgNS = "http://www.w3.org/2000/svg";
		const group = document.createElementNS(svgNS, "g");

		if (transform) {
			group.setAttributeNS(null, "transform", transform);
		}

		if (mask) {
			group.setAttributeNS(null, "mask", `url(#${mask})`);
		}

		return group;
	}

	/**
	 * @name _createPath
	 * @description: Creates a path.
	 * 
	 * @param {String} d - The d to use.
	 * @param {String} stroke - The stroke to use.
	 * @param {String} fill - The fill to use.
	 * @param {String} strokeLinecap - The strokeLinecap to use.
	 * 
	 * @returns {SVGElement} The path.
	 */
	_createPath(d, stroke, fill, strokeLinecap) {
		const svgNS = "http://www.w3.org/2000/svg";
		const path = document.createElementNS(svgNS, "path");
		path.setAttributeNS(null, "d", d);
		if (stroke) {
			path.setAttributeNS(null, "stroke", stroke);
			path.setAttributeNS(null, "strokeLinecap", strokeLinecap || "round");
		}
		if (fill) {
			path.setAttributeNS(null, "fill", fill);
		}
		return path;
	}

	/**
	 * @name _createRectangle
	 * @description: Creates a rectangle.
	 * 
	 * @param {Object} elementProps - The properties of the element.
	 * @param {Number} x - The x to use.
	 * @param {Number} y - The y to use.
	 * @param {Number} width - The width to use.
	 * @param {Number} height - The height to use.
	 * @param {String} fill - The fill to use.
	 * @param {String} transform - The transform to use.
	 * 
	 * @returns {SVGElement} The rectangle.
	 */
	_createRectangle(elementProps, x, y, width, height, fill, transform) {
		const svgNS = "http://www.w3.org/2000/svg";
		const rect = document.createElementNS(svgNS, "rect");
		rect.setAttributeNS(null, "x", x);
		rect.setAttributeNS(null, "y", y);
		rect.setAttributeNS(null, "width", width);
		rect.setAttributeNS(null, "height", height);
		rect.setAttributeNS(null, "fill", fill);
		if (transform) {
			rect.setAttributeNS(null, "transform", transform);
		}
		return rect;
	}

	/**
	 * @name _createCircle
	 * @description: Creates a circle.
	 * 
	 * @param {Object} elementProps - The properties of the element.
	 * @param {Number} cx - The cx to use.
	 * @param {Number} cy - The cy to use.
	 * @param {Number} radius - The radius to use.
	 * @param {String} fill - The fill to use.
	 * @param {String} transform - The transform to use.
	 * 
	 * @returns {SVGElement} The circle.
	 */
	_createCircle(elementProps, cx, cy, radius, fill, transform) {
		const svgNS = "http://www.w3.org/2000/svg";
		const circle = document.createElementNS(svgNS, "circle");
		circle.setAttributeNS(null, "cx", cx);
		circle.setAttributeNS(null, "cy", cy);
		circle.setAttributeNS(null, "r", radius);
		circle.setAttributeNS(null, "fill", fill);
		if (transform) {
			circle.setAttributeNS(null, "transform", transform);
		}
		return circle;
	}

	/**
	 * @name _createLine
	 * @description: Creates a line.
	 * 
	 * @param {Object} elementProps - The properties of the element.
	 * @param {Number} x1 - The x1 to use.
	 * @param {Number} y1 - The y1 to use.
	 * @param {Number} x2 - The x2 to use.
	 * @param {Number} y2 - The y2 to use.
	 * @param {Number} strokeWidth - The strokeWidth to use.
	 * @param {String} stroke - The stroke to use.
	 * @param {String} transform - The transform to use.
	 * 
	 * @returns {SVGElement} The line.
	 * 
	 * @example: _createLine({ stroke: "#000000" }, 0, 0, 128, 128, 3, "#000000", "rotate(45 64 64)");
	 */
	_createLine(elementProps, x1, y1, x2, y2, strokeWidth, stroke, transform) {
		const svgNS = "http://www.w3.org/2000/svg";
		const line = document.createElementNS(svgNS, "line");
		line.setAttributeNS(null, "x1", x1);
		line.setAttributeNS(null, "y1", y1);
		line.setAttributeNS(null, "x2", x2);
		line.setAttributeNS(null, "y2", y2);
		line.setAttributeNS(null, "stroke-width", strokeWidth);
		line.setAttributeNS(null, "stroke", stroke);
		if (transform) {
			line.setAttributeNS(null, "transform", transform);
		}
		return line;
	}

	/**
	 * @name AvatarVariantSmile
	 * @description: Generates the smile variant.
	 * 
	 * @param {Object} smileProps - The properties of the smile variant.
	 * 
	 * @returns {SVGElement} The smile variant.
	 */
	AvatarVariantSmile() {
		const randomHash = RandomAvatarUtils.hashCode(Math.random().toString());
		const range = this.colors.length;

		// Generate data for smile variant
		const wrapperColor = this.colors[randomHash % range];
		const preTranslateX = RandomAvatarUtils.computePosition(randomHash, 10, 1);
		const wrapperTranslateX = preTranslateX < 5 ? preTranslateX + this.size / 9 : preTranslateX;
		const preTranslateY = RandomAvatarUtils.computePosition(randomHash, 10, 2);
		const wrapperTranslateY = preTranslateY < 5 ? preTranslateY + this.size / 9 : preTranslateY;

		const data = {
			wrapperColor: wrapperColor,
			faceColor: RandomAvatarUtils.calculateContrast(wrapperColor),
			backgroundColor: this.colors[(randomHash + 13) % range],
			wrapperTranslateX: wrapperTranslateX,
			wrapperTranslateY: wrapperTranslateY,
			wrapperRotate: RandomAvatarUtils.computePosition(randomHash, 360),
			wrapperScale: 1 + RandomAvatarUtils.computePosition(randomHash, this.size / 12) / 10,
			isMouthOpen: randomHash % 2 === 0,
			// isCircle: randomHash % 2 !== 0,
			eyeSpread: RandomAvatarUtils.computePosition(randomHash, 5),
			mouthSpread: RandomAvatarUtils.computePosition(randomHash, 3),
			faceRotate: RandomAvatarUtils.computePosition(randomHash, 10, 3),
			faceTranslateX: wrapperTranslateX > this.size / 3 ? wrapperTranslateX / 3 : wrapperTranslateX,
			faceTranslateY: wrapperTranslateY > this.size / 3 ? wrapperTranslateY / 3 : wrapperTranslateY
		};

		const svg = this._createSvgElement();

		const mask = this._createMask();
		svg.appendChild(mask);

		const rectMask = this._createRectangle({}, 0, 0, this.size, this.size, "#FFFFFF");
		mask.appendChild(rectMask);

		const group = this._createGroup(data.wrapperTransform, mask.getAttributeNS(null, "id"));
		svg.appendChild(group);

		const rectBackground = this._createRectangle({}, 0, 0, this.size, this.size, data.backgroundColor);
		group.appendChild(rectBackground);

		const wrapperTransform = `translate(${data.wrapperTranslateX} ${data.wrapperTranslateY}) rotate(${data.wrapperRotate} ${this.size / 2} ${this.size / 2}) scale(${data.wrapperScale})`;
		const rectWrapper = this._createRectangle({}, 0, 0, this.size, this.size, data.wrapperColor, wrapperTransform);
		rectWrapper.setAttributeNS(null, "rx", data.isCircle ? this.size : this.size / 4);
		group.appendChild(rectWrapper);

		const faceTransform = `scale(2) translate(${data.faceTranslateX} ${data.faceTranslateY}) rotate(${data.faceRotate} ${this.size / 2} ${this.size / 2})`;
		const groupFace = this._createGroup(faceTransform);
		group.appendChild(groupFace);

		const pathMouthD = data.isMouthOpen ?
			`M15 ${19 + data.mouthSpread}c1 0.5 3 0.5 5 0` // Adjust the control points for open mouth
			:
			`M13,${19 + data.mouthSpread}c1 6 10 3 11 0`; // Keep the original closed mouth path
		const pathMouth = this._createPath(pathMouthD, data.isMouthOpen ? data.faceColor : null, data.isMouthOpen ? null : data.faceColor);
		groupFace.appendChild(pathMouth);

		const rectEyeLeft = this._createRectangle({}, 14 - data.eyeSpread, 14, 4, 1, data.faceColor);
		rectEyeLeft.setAttributeNS(null, "rx", "1");
		groupFace.appendChild(rectEyeLeft);

		const rectEyeRight = this._createRectangle({}, 20 + data.eyeSpread, 14, 4, 1, data.faceColor);
		rectEyeRight.setAttributeNS(null, "rx", "1");
		groupFace.appendChild(rectEyeRight);

		return svg;
	}

	/**
	 * @name AvatarVariantAbstract
	 * @description: Generates the abstract variant.
	 * 
	 * @returns {SVGElement} The abstract variant.
	 */
	AvatarVariantAbstract() {
		const svg = this._createSvgElement();

		// Rectangle 1: Full size, centered
		const rect1 = this._createRectangle(this.elementProps[0], 0, 0, this.size, this.size, this.elementProps[0].color);
		svg.appendChild(rect1);
	   
		// Rectangle 2: Ensure it stays within bounds of rect1
		const rect2MaxSize = this.size * 0.5; // Limit to 50% of the main rectangle size
		const rect2Width = this.elementProps[1].isSquare ? rect2MaxSize : rect2MaxSize * 0.5;
		const rect2Height = rect2Width;
		const rect2Transform = `translate(${Math.min(this.elementProps[1].translateX, this.size - rect2Width)} ${Math.min(this.elementProps[1].translateY, this.size - rect2Height)}) rotate(${this.elementProps[1].rotate} ${rect2Width / 2} ${rect2Height / 2})`;
		const rect2 = this._createRectangle(this.elementProps[1], 0, 0, rect2Width, rect2Height, this.elementProps[1].color, rect2Transform);
		svg.appendChild(rect2);
	   
		// Circle: Ensure it stays within bounds of rect1
		const circleRadius = Math.min(this.size * 0.25, (this.size - Math.max(this.elementProps[2].translateX, this.elementProps[2].translateY)) / 2);
		const circleTransform = `translate(${Math.min(this.elementProps[2].translateX, this.size - circleRadius * 2)} ${Math.min(this.elementProps[2].translateY, this.size - circleRadius * 2)})`;
		const circle = this._createCircle(this.elementProps[2], circleRadius, circleRadius, circleRadius, this.elementProps[2].color, circleTransform);
		svg.appendChild(circle);
	   
		// Line: Ensure it stays within bounds of rect1
		const lineLength = this.size * 0.9; // 90% of the main rectangle size
		const lineTransform = `translate(${Math.min(this.elementProps[3].translateX, this.size - lineLength)} ${Math.min(this.elementProps[3].translateY, this.size / 2)}) rotate(${this.elementProps[3].rotate} ${lineLength / 2} 0)`;
		const line = this._createLine(this.elementProps[3], 0, 0, lineLength, 0, "3", this.elementProps[3].color, lineTransform);
		svg.appendChild(line);
		
		return svg;
	}

	/**
	 * @name AvatarVariantPixel
	 * @description: Generates the pixel variant.
	 * 
	 * @param {Array} pixelColors - The colors to use for the pixel variant.
	 * 
	 * @returns {SVGElement} The pixel variant.
	 */
	AvatarVariantPixel(pixelColors) {
		// Size of the outer square
		const size = 128;
		const svg = this._createSvgElement();

		// Calculate the size of each smaller square
		const smallSquareSize = size / 8;

		// Loop through rows and columns to create the smaller squares
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				// Create a rectangle for each small square
				const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
				rect.setAttribute("x", col * smallSquareSize);
				rect.setAttribute("y", row * smallSquareSize);
				rect.setAttribute("width", smallSquareSize);
				rect.setAttribute("height", smallSquareSize);

				// Set a random fill color from the provided pixelColors array
				const randomColor = pixelColors[Math.floor(Math.random() * pixelColors.length)];
				rect.setAttribute("fill", randomColor);

				// Set the same color as the stroke to eliminate gaps
				rect.setAttribute("stroke", randomColor);
				rect.setAttribute("stroke-width", "1");

				// Append the rectangle to the SVG
				svg.appendChild(rect);
			}
		}

		// Return the SVG element with the pixel
		return svg;
	}
}