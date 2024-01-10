/**
 * Create and display random avatars based on specified options.
 *
 * Usage Example:
 * ```javascript
 * const randomUtil = new RandomUtil();
 * randomUtil.randomAvatar({ avatarOptions: { variant: "smile" } });
 * ```
 *
 * @method randomAvatar
 * @param {object} avatarOptions - An object containing avatar generation options.
 * @param {string} avatarOptions.variant - The type of avatar to generate (e.g., "pixel").
 * @param {Array<string>} avatarOptions.colors - An optional array of colors for the avatar.
 * @param {boolean} avatarOptions.square - Whether the avatar should be square (default is true).
 * @param {number} avatarOptions.size - The size of the avatar in pixels (default is 128).
 *
 * @description
 * The `randomAvatar` method creates and displays random avatars based on the specified options. It generates avatars with the specified variant, colors, squareness, and size. These avatars are then displayed in HTML elements with the `[data-random='avatar']` attribute.
 *
 * @errorHandling
 * This method includes error handling to manage any potential issues during avatar generation. Errors are logged to the console for debugging purposes. It's recommended to extend error handling for a production environment.
 */

import palette from "../sets/palette.0.json";

export class RandomAvatar {
  constructor ({ variant, colors, square, size = 128 }) {
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

  generateAvatar() {
    switch (this.variant) {
      case "abstract":
        return this.variantGenerator.AvatarVariantAbstract();
      case "pixel":
        const pixelColors = RandomAvatarUtils.AvatarVariantPixelColorArray(this.colors);
        return this.variantGenerator.AvatarVariantPixel(pixelColors);
      case "smile":
        return this.variantGenerator.AvatarVariantSmile(this.smileProps);
      default:
        return this.variantGenerator.AvatarVariantAbstract();
    }
  }
}

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
    return Array.from({ length: elementCount }, (_, index) => {
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

  AvatarVariantPixelColorArray(colorPalette) {
    const pixelCount = 128;
    return Array.from({ length: pixelCount }, () => colorPalette[Math.floor(Math.random() * colorPalette.length)]);
  },

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

  calculateFaceTransform(hash, size) {
    const translateX = this.computePosition(hash, 8, 1);
    const translateY = this.computePosition(hash, 7, 2);
    return {
      translateX: translateX > size / 3 ? translateX / 3 : translateX,
      translateY: translateY > size / 3 ? translateY / 3 : translateY,
      rotate: this.computePosition(hash, 10, 3)
    };
  },

  calculateContrast(hexcolor) {
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? "#000000" : "#FFFFFF";
  }
};

class AvatarVariantGenerator {
  constructor (size, elementProps, square, colors) {
    this.size = size;
    this.elementProps = elementProps;
    this.square = square;
    this.colors = colors;
  }

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

  _createMask() {
    const svgNS = "http://www.w3.org/2000/svg";
    const mask = document.createElementNS(svgNS, "mask");
    mask.setAttributeNS(null, "id", "mask__beam");
    mask.setAttributeNS(null, "maskUnits", "userSpaceOnUse");
    mask.setAttributeNS(null, "x", "0");
    mask.setAttributeNS(null, "y", "0");
    mask.setAttributeNS(null, "width", this.size);
    mask.setAttributeNS(null, "height", this.size);
    return mask;
  }

  _createGroup(transform) {
    const svgNS = "http://www.w3.org/2000/svg";
    const group = document.createElementNS(svgNS, "g");
    if (transform) {
      group.setAttributeNS(null, "transform", transform);
    }
    return group;
  }

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
    // if (data.isCircle) {
    //   rectMask.setAttributeNS(null, "rx", this.size * 2);
    // }
    mask.appendChild(rectMask);

    const group = this._createGroup("url(#mask__beam)");
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

    const pathMouthD = data.isMouthOpen
      ? `M15 ${19 + data.mouthSpread}c1 0.5 3 0.5 5 0` // Adjust the control points for open mouth
      : `M13,${19 + data.mouthSpread}c1 6 10 3 11 0`; // Keep the original closed mouth path
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

  AvatarVariantAbstract() {
    const svg = this._createSvgElement();

    const rect1 = this._createRectangle(this.elementProps[0], 0, 0, this.size, this.size, this.elementProps[0].color);
    svg.appendChild(rect1);

    const rect2Transform = `translate(${this.elementProps[1].translateX} ${this.elementProps[1].translateY}) rotate(${this.elementProps[1].rotate} ${this.size / 2} ${this.size / 2})`;
    const rect2 = this._createRectangle(this.elementProps[1], (this.size) / 2, (this.size) / 2, this.size, this.elementProps[1].isSquare ? this.size : this.size / 6, this.elementProps[1].color, rect2Transform);
    svg.appendChild(rect2);

    const circleTransform = `translate(${this.elementProps[2].translateX} ${this.elementProps[2].translateY})`;
    const circle = this._createCircle(this.elementProps[2], this.size / 2, this.size / 2, this.size / 4, this.elementProps[2].color, circleTransform);
    svg.appendChild(circle);

    const lineTransform = `translate(${this.elementProps[3].translateX} ${this.elementProps[3].translateY}) rotate(${this.elementProps[3].rotate} ${this.size / 2} ${this.size / 2})`;
    const line = this._createLine(this.elementProps[3], 1, this.size / 2, this.size, this.size / 2, "3", this.elementProps[3].color, lineTransform);
    svg.appendChild(line);

    return svg;
  }

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