import { palette } from "../sets/palette.4.json";

export class RandomAvatarUtil {
  constructor({ variant = "bauhaus", colors, square = true, size = 80 }) {
    this.variant = variant;
    this.colors = colors || RandomAvatarUtils.loadPalette();
    this.square = square;
    this.size = size;
    this.elementsCount = 4;
    const randomHash = RandomAvatarUtils.hashCode(Math.random().toString());
    this.elementProps = RandomAvatarUtils.generateElementProps(randomHash, this.size, this.elementsCount, this.colors);
    this.smileProps = RandomAvatarUtils.generateSmileProps(randomHash, this.size, this.elementsCount, this.colors);
    this.variantGenerator = new AvatarVariantGenerator(this.size, this.elementProps, this.square, this.colors);
  }

  static loadPalette() {
    return palette[Math.floor(Math.random() * palette.length)];
  }

  generateAvatar() {
    switch (this.variant) {
      case "bauhaus":
        return this.variantGenerator.createBauhaus();
      case "pixel":
        const pixelColors = RandomAvatarUtils.generatePixelColors(this.colors);
        return this.variantGenerator.createPixel(pixelColors);
      case "smile":
        return this.variantGenerator.createSmile(this.smileProps);
      default:
        return this.variantGenerator.createBauhaus();
    }
  }
}

export class RandomAvatarUtils {
  static hashCode(input) {
    let hash = 0;
    for (const char of input) {
      hash = (hash << 5) - hash + char.charCodeAt(0);
    }
    return Math.abs(hash);
  }

  static generateElementProps(hash, size, count, colors) {
    return Array.from({ length: count }, (_, i) => ({
      color: colors[hash % colors.length],
      translateX: RandomAvatarUtils.calculateUnit(hash, size, i, 1),
      translateY: RandomAvatarUtils.calculateUnit(hash, size, i, 2),
      rotate: RandomAvatarUtils.calculateUnit(hash, 360, i),
      isSquare: hash % 2 === 0
    }));
  }

  static generatePixelColors(colors) {
    const pixelCount = 64;
    return Array.from({ length: pixelCount }, () => colors[Math.floor(Math.random() * colors.length)]);
  }

  static generateSmileProps(hash, size, count, colors) {
    const colorIndex = (hash + 13) % colors.length;
    return {
      wrapperColor: colors[hash % colors.length],
      faceColor: RandomAvatarUtils.calculateContrast(colors[hash % colors.length]),
      backgroundColor: colors[colorIndex],
      wrapperTransform: RandomAvatarUtils.calculateTransform(hash, size),
      isMouthOpen: hash % 2 === 0,
      isCircle: hash % 2 !== 0,
      eyeSpread: RandomAvatarUtils.calculateUnit(hash, 5),
      mouthSpread: RandomAvatarUtils.calculateUnit(hash, 3),
      faceTransform: RandomAvatarUtils.calculateFaceTransform(hash, size)
    };
  }

  static calculateUnit(hash, range, index, modifier = 0) {
    const value = hash % range;
    return index % 2 === 0 ? -value : value;
  }

  static calculateTransform(hash, size) {
    const translateX = RandomAvatarUtils.calculateUnit(hash, 10, 1);
    const translateY = RandomAvatarUtils.calculateUnit(hash, 10, 2);
    return {
      translateX: translateX < 5 ? translateX + size / 9 : translateX,
      translateY: translateY < 5 ? translateY + size / 9 : translateY,
      rotate: RandomAvatarUtils.calculateUnit(hash, 360),
      scale: 1 + RandomAvatarUtils.calculateUnit(hash, size / 12) / 10
    };
  }

  static calculateFaceTransform(hash, size) {
    const translateX = RandomAvatarUtils.calculateUnit(hash, 8, 1);
    const translateY = RandomAvatarUtils.calculateUnit(hash, 7, 2);
    return {
      translateX: translateX > size / 3 ? translateX / 3 : translateX,
      translateY: translateY > size / 3 ? translateY / 3 : translateY,
      rotate: RandomAvatarUtils.calculateUnit(hash, 10, 3)
    };
  }

  static calculateContrast(hexcolor) {
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? "#000000" : "#FFFFFF";
  }
}

class AvatarVariantGenerator {
  constructor(size, elementProps, square, colors) {
    this.size = size;
    this.elementProps = elementProps;
    this.square = square;
    this.colors = colors;
  }

  createBauhaus() {
    // Implementation of Bauhaus
  }

  createPixel(pixelColors) {
    // Implementation of Pixel
  }

  createSmile(data) {
    // Implementation of Smile
  }
}


class AvatarVariantGeneratorV2__ {
  constructor(size, elementProps, square, colors) {
    this.size = size;
    this.elementProps = elementProps;
    this.square = square;
    this.colors = colors;
    this.svgNS = "http://www.w3.org/2000/svg";
  }

  createSvgBase() {
    const svg = document.createElementNS(this.svgNS, "svg");
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.size} ${this.size}`);
    svg.setAttributeNS(null, "fill", "none");
    svg.setAttributeNS(null, "role", "img");
    svg.setAttributeNS(null, "width", this.size);
    svg.setAttributeNS(null, "height", this.size);
    return svg;
  }

  appendElement(svg, element) {
    svg.appendChild(element);
  }

  createRectangle(attributes) {
    const rect = document.createElementNS(this.svgNS, "rect");
    Object.entries(attributes).forEach(([key, value]) => rect.setAttributeNS(null, key, value));
    return rect;
  }

  createCircle(attributes) {
    const circle = document.createElementNS(this.svgNS, "circle");
    Object.entries(attributes).forEach(([key, value]) => circle.setAttributeNS(null, key, value));
    return circle;
  }

  createLine(attributes) {
    const line = document.createElementNS(this.svgNS, "line");
    Object.entries(attributes).forEach(([key, value]) => line.setAttributeNS(null, key, value));
    return line;
  }

  createBauhausVariant() {
    const svg = this.createSvgBase();
    this.appendElement(svg, this.createRectangle({ width: this.size, height: this.size, fill: this.elementProps[0].color }));

    const rect2Attributes = {
      x: (this.size - 60) / 2,
      y: (this.size - 20) / 2,
      width: this.size,
      height: this.elementProps[1].isSquare ? this.size : this.size / 8,
      fill: this.elementProps[1].color,
      transform: `translate(${this.elementProps[1].translateX} ${this.elementProps[1].translateY}) rotate(${this.elementProps[1].rotate} ${this.size / 2} ${this.size / 2})`
    };
    this.appendElement(svg, this.createRectangle(rect2Attributes));
    // ...

    return svg;
  }

  createPixelVariant(pixelColors) {
    // ...
  }

  createSmileVariant(data) {
    // ...
  }
}
