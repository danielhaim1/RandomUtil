import { palette } from "../sets/palette.4.json";

export class RandomAvatarUtil {
  constructor({ variant = "bauhaus", colors, square = true, size = 80 }) {
    this.variant = variant;
    this.colors = colors || RandomAvatarHelper.loadPaletteData();
    this.square = square;
    this.size = size;
    this.elementsCount = 4;

    const RandomHash = RandomAvatarHelper.hashCode(Math.random().toString());

    this.elementsProperties = RandomAvatarHelper.generateColors(
      RandomHash,
      this.size,
      this.elementsCount,
      this.colors
    );

    this.smileProperties = RandomAvatarHelper.generateSmileData(
      RandomHash,
      this.size,
      this.elementsCount,
      this.colors
    );

    this.variantGenerator = new RandomAvatarVariant(
      this.size,
      this.elementsProperties,
      this.square,
      this.colors
    );
  }

  loadPaletteData() {
    const selectedPalette = palette[Math.floor(Math.random() * palette.length)];
    return selectedPalette;
  }

  static getPalette() {
    return this.colors;
  }

  init() {
    switch (this.variant) {
      case "bauhaus":
        return this.variantGenerator.createBauhausVariant();
      case "pixel":
        const pixelColors = RandomAvatarHelper.generatePixelColors(this.colors);
        return this.variantGenerator.createPixelVariant(pixelColors);
      case "smile":
        return this.variantGenerator.createSmileVariant(this.smileProperties);
      default:
        return this.variantGenerator.createBauhausVariant();
    }
  }
}

export class RandomAvatarHelper {
  static hashCode(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      const character = name.charCodeAt(i);
      hash = (hash << 5) - hash + character;
      hash &= hash;
    }
    return Math.abs(hash);
  }

  static getModulus(num, max) {
    return num % max;
  }

  static getDigit(number, ntn) {
    return Math.floor((number / Math.pow(10, ntn)) % 10);
  }

  static getBoolean(number, ntn) {
    return !(this.getDigit(number, ntn) % 2);
  }

  static getAngle(x, y) {
    return (Math.atan2(y, x) * 180) / Math.PI;
  }

  static getUnit(number, range, index) {
    const value = number % range;
    return index && this.getDigit(number, index) % 2 === 0 ? -value : value;
  }

  static getRandomColor(number, colors, range) {
    return colors[number % range];
  }

  static getContrast(hexcolor) {
    const hex = hexcolor.slice(0, 1) === "#" ? hexcolor.slice(1) : hexcolor;

    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "#000000" : "#FFFFFF";
  }

  static generateColors(RandomHash, size, elementsCount, colors) {
    const range = colors.length;

    return Array.from(
      {
        length: elementsCount
      },
      (_, i) => ({
        color: this.getRandomColor(RandomHash + i, colors, range),
        translateX: this.getUnit(RandomHash * (i + 1), size / 2 - (i + 17), 1),
        translateY: this.getUnit(RandomHash * (i + 1), size / 2 - (i + 17), 2),
        rotate: this.getUnit(RandomHash * (i + 1), 360),
        isSquare: this.getBoolean(RandomHash, 2)
      })
    );
  }

  static generatePixelColors(colors) {
    const range = colors.length;
    const pixelCount = 64;

    return Array.from(
      {
        length: pixelCount
      },
      () => colors[Math.floor(Math.random() * range)]
    );
  }

  static generateSmileData(RandomHash, size, elementsCount, colors) {
    const range = colors && colors.length;
    const wrapperColor = this.getRandomColor(RandomHash, colors, range);
    const preTranslateX = this.getUnit(RandomHash, 10, 1);
    const wrapperTranslateX =
      preTranslateX < 5 ? preTranslateX + size / 9 : preTranslateX;
    const preTranslateY = this.getUnit(RandomHash, 10, 2);
    const wrapperTranslateY =
      preTranslateY < 5 ? preTranslateY + size / 9 : preTranslateY;

    const data = {
      wrapperColor: wrapperColor,
      faceColor: this.getContrast(wrapperColor),
      backgroundColor: this.getRandomColor(RandomHash + 13, colors, range),
      wrapperTranslateX: wrapperTranslateX,
      wrapperTranslateY: wrapperTranslateY,
      wrapperRotate: this.getUnit(RandomHash, 360),
      wrapperScale: 1 + this.getUnit(RandomHash, size / 12) / 10,
      isMouthOpen: this.getBoolean(RandomHash, 2),
      isCircle: this.getBoolean(RandomHash, 1),
      eyeSpread: this.getUnit(RandomHash, 5),
      mouthSpread: this.getUnit(RandomHash, 3),
      faceRotate: this.getUnit(RandomHash, 10, 3),
      faceTranslateX:
        wrapperTranslateX > size / 3
          ? wrapperTranslateX / 3
          : this.getUnit(RandomHash, 8, 1),
      faceTranslateY:
        wrapperTranslateY > size / 3
          ? wrapperTranslateY / 3
          : this.getUnit(RandomHash, 7, 2)
    };

    return data;
  }

  static loadPaletteData() {
    const selectedPalette = palette[Math.floor(Math.random() * palette.length)];
    return selectedPalette;
  }
}

export class RandomAvatarVariant {
  constructor(size, elementsProperties, square, colors) {
    this.size = size;
    this.elementsProperties = elementsProperties;
    this.square = square;
    this.colors = colors;
  }

  createBauhausVariant() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.size} ${this.size}`);
    svg.setAttributeNS(null, "fill", "none");
    svg.setAttributeNS(null, "role", "img");
    svg.setAttributeNS(null, "width", this.size);
    svg.setAttributeNS(null, "height", this.size);

    // Add the first rectangle
    const rect1 = document.createElementNS(svgNS, "rect");
    rect1.setAttributeNS(null, "width", this.size);
    rect1.setAttributeNS(null, "height", this.size);
    rect1.setAttributeNS(null, "fill", this.elementsProperties[0].color);
    svg.appendChild(rect1);

    // Add the second rectangle
    const rect2 = document.createElementNS(svgNS, "rect");
    rect2.setAttributeNS(null, "x", (this.size - 60) / 2);
    rect2.setAttributeNS(null, "y", (this.size - 20) / 2);
    rect2.setAttributeNS(null, "width", this.size);
    rect2.setAttributeNS(
      null,
      "height",
      this.elementsProperties[1].isSquare ? this.size : this.size / 8
    );
    rect2.setAttributeNS(null, "fill", this.elementsProperties[1].color);
    rect2.setAttributeNS(
      null,
      "transform",
      `translate(${this.elementsProperties[1].translateX} ${
        this.elementsProperties[1].translateY
      }) rotate(${this.elementsProperties[1].rotate} ${this.size / 2} ${
        this.size / 2
      })`
    );
    svg.appendChild(rect2);

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttributeNS(null, "cx", this.size / 2);
    circle.setAttributeNS(null, "cy", this.size / 2);
    circle.setAttributeNS(null, "fill", this.elementsProperties[2].color);
    circle.setAttributeNS(null, "r", this.size / 5);
    circle.setAttributeNS(
      null,
      "transform",
      `translate(${this.elementsProperties[2].translateX} ${this.elementsProperties[2].translateY})`
    );
    svg.appendChild(circle);

    const line = document.createElementNS(svgNS, "line");
    line.setAttributeNS(null, "x1", "0");
    line.setAttributeNS(null, "y1", this.size / 2);
    line.setAttributeNS(null, "x2", this.size);
    line.setAttributeNS(null, "y2", this.size / 2);
    line.setAttributeNS(null, "stroke-width", "2");
    line.setAttributeNS(null, "stroke", this.elementsProperties[3].color);
    line.setAttributeNS(
      null,
      "transform",
      `translate(${this.elementsProperties[3].translateX} ${
        this.elementsProperties[3].translateY
      }) rotate(${this.elementsProperties[3].rotate} ${this.size / 2} ${
        this.size / 2
      })`
    );
    svg.appendChild(line);

    return svg;
  }

  createPixelVariant(pixelColors) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.size} ${this.size}`);
    svg.setAttributeNS(null, "fill", "none");
    svg.setAttributeNS(null, "role", "img");
    svg.setAttributeNS(null, "width", this.size);
    svg.setAttributeNS(null, "height", this.size);

    const mask = document.createElementNS(svgNS, "mask");
    mask.setAttributeNS(null, "id", "mask__pixel");
    mask.setAttributeNS(null, "mask-type", "alpha");
    mask.setAttributeNS(null, "maskUnits", "userSpaceOnUse");
    mask.setAttributeNS(null, "x", "0");
    mask.setAttributeNS(null, "y", "0");
    mask.setAttributeNS(null, "width", this.size);
    mask.setAttributeNS(null, "height", this.size);

    const rectMask = document.createElementNS(svgNS, "rect");
    rectMask.setAttributeNS(null, "width", this.size);
    rectMask.setAttributeNS(null, "height", this.size);
    rectMask.setAttributeNS(null, "rx", this.square ? undefined : this.size * 2);
    rectMask.setAttributeNS(null, "fill", "#FFFFFF");
    mask.appendChild(rectMask);
    svg.appendChild(mask);

    const g = document.createElementNS(svgNS, "g");
    g.setAttributeNS(null, "mask", "url(#mask__pixel)");

    for (let i = 0; i < 64; i++) {
      const pixelRect = document.createElementNS(svgNS, "rect");
      const x = (i % 8) * (this.size / 8) + Math.random() * (this.size / 8); // Randomize x position
      const y =
        Math.floor(i / 8) * (this.size / 8) + Math.random() * (this.size / 8); // Randomize y position
      pixelRect.setAttributeNS(null, "x", x);
      pixelRect.setAttributeNS(null, "y", y);
      pixelRect.setAttributeNS(null, "width", this.size / 8);
      pixelRect.setAttributeNS(null, "height", this.size / 8);
      pixelRect.setAttributeNS(null, "fill", pixelColors[i]);
      g.appendChild(pixelRect);
    }

    svg.appendChild(g);

    return svg;
  }

  createSmileVariant(data) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.size} ${this.size}`);
    svg.setAttributeNS(null, "fill", "none");
    svg.setAttributeNS(null, "role", "img");
    svg.setAttributeNS(null, "width", this.size);
    svg.setAttributeNS(null, "height", this.size);

    const mask = document.createElementNS(svgNS, "mask");
    mask.setAttributeNS(null, "id", "mask__beam");
    mask.setAttributeNS(null, "maskUnits", "userSpaceOnUse");
    mask.setAttributeNS(null, "x", "0");
    mask.setAttributeNS(null, "y", "0");
    mask.setAttributeNS(null, "width", this.size);
    mask.setAttributeNS(null, "height", this.size);
    svg.appendChild(mask);

    const rectMask = document.createElementNS(svgNS, "rect");
    rectMask.setAttributeNS(null, "width", this.size);
    rectMask.setAttributeNS(null, "height", this.size);
    rectMask.setAttributeNS(null, "fill", "#FFFFFF");
    rectMask.setAttributeNS(null, "rx", this.square ? undefined : this.size * 2);
    mask.appendChild(rectMask);

    const group = document.createElementNS(svgNS, "g");
    group.setAttributeNS(null, "mask", "url(#mask__beam)");
    svg.appendChild(group);

    const rectBackground = document.createElementNS(svgNS, "rect");
    rectBackground.setAttributeNS(null, "width", this.size);
    rectBackground.setAttributeNS(null, "height", this.size);
    rectBackground.setAttributeNS(null, "fill", data.backgroundColor);
    group.appendChild(rectBackground);

    const rectWrapper = document.createElementNS(svgNS, "rect");
    rectWrapper.setAttributeNS(null, "x", "0");
    rectWrapper.setAttributeNS(null, "y", "0");
    rectWrapper.setAttributeNS(null, "width", this.size);
    rectWrapper.setAttributeNS(null, "height", this.size);
    rectWrapper.setAttributeNS(
      null,
      "transform",
      `translate(${data.wrapperTranslateX} ${data.wrapperTranslateY}) rotate(${
        data.wrapperRotate
      } ${this.size / 2} ${this.size / 2}) scale(${data.wrapperScale})`
    );
    rectWrapper.setAttributeNS(null, "fill", data.wrapperColor);
    rectWrapper.setAttributeNS(
      null,
      "rx",
      data.isCircle ? this.size : this.size / 6
    );
    group.appendChild(rectWrapper);

    const groupFace = document.createElementNS(svgNS, "g");
    groupFace.setAttributeNS(
      null,
      "transform",
      `scale(3) translate(${data.faceTranslateX} ${data.faceTranslateY}) rotate(${
        data.faceRotate
      } ${this.size / 2} ${this.size / 2})`
    );
    group.appendChild(groupFace);

    if (data.isMouthOpen) {
      const pathMouth = document.createElementNS(svgNS, "path");
      pathMouth.setAttributeNS(
        null,
        "d",
        `M15 ${19 + data.mouthSpread}c2 1 4 1 6 0`
      );
      pathMouth.setAttributeNS(null, "stroke", data.faceColor);
      pathMouth.setAttributeNS(null, "fill", "none");
      pathMouth.setAttributeNS(null, "strokeLinecap", "round");
      groupFace.appendChild(pathMouth);
    } else {
      const pathMouth = document.createElementNS(svgNS, "path");
      pathMouth.setAttributeNS(
        null,
        "d",
        `M13,${19 + data.mouthSpread} a1,0.75 0 0,0 10,0`
      );
      pathMouth.setAttributeNS(null, "fill", data.faceColor);
      groupFace.appendChild(pathMouth);
    }

    const rectEyeLeft = document.createElementNS(svgNS, "rect");
    rectEyeLeft.setAttributeNS(null, "x", `${14 - data.eyeSpread}`);
    rectEyeLeft.setAttributeNS(null, "y", "14");
    rectEyeLeft.setAttributeNS(null, "width", "1.5");
    rectEyeLeft.setAttributeNS(null, "height", "2");
    rectEyeLeft.setAttributeNS(null, "rx", "1");
    rectEyeLeft.setAttributeNS(null, "stroke", "none");
    rectEyeLeft.setAttributeNS(null, "fill", data.faceColor);
    groupFace.appendChild(rectEyeLeft);

    const rectEyeRight = document.createElementNS(svgNS, "rect");
    rectEyeRight.setAttributeNS(null, "x", `${20 + data.eyeSpread}`);
    rectEyeRight.setAttributeNS(null, "y", "14");
    rectEyeRight.setAttributeNS(null, "width", "1.5");
    rectEyeRight.setAttributeNS(null, "height", "2");
    rectEyeRight.setAttributeNS(null, "rx", "1");
    rectEyeRight.setAttributeNS(null, "stroke", "none");
    rectEyeRight.setAttributeNS(null, "fill", data.faceColor);
    groupFace.appendChild(rectEyeRight);

    return svg;
  }
}