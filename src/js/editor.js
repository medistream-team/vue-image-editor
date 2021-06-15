import Cropper from 'cropperjs';
import { fabric } from './fabric.js';
import 'cropperjs/dist/cropper.css';
import './editor.css';

export class photoEditor {
  constructor(selector, options) {
    /*
     * Create a new Cropper for edit Photo
     * @param {string} selector - id of img/canvas element(The target element for cropping.)
     * @param {Object} options - The configuration options.
     */
    if (!selector) throw new Error('Please provide a selector.');
    this.userImage = document.getElementById(selector);
    this.cropper = new Cropper(this.userImage, {
      viewMode: 2,
      autoCrop: false,
      ...options
    });
  }

  //controllers
  reset() {
    this.cropper.reset();
  }

  clear() {
    this.cropper.clear();
  }

  //tools
  getCropped() {
    const canvas = this.cropper.getCroppedCanvas();
    const croppedImgSrc = canvas.toDataURL();
    return croppedImgSrc;
  }

  /*
   * Set two number for calculate ratio (x/y) of crop box
   * @param {number} x - numerator
   * @param {number} y - denominator
   */
  setCropRatio(x, y) {
    if (!x && !y) throw new Error('Please provide a ratio of crop box.');
    this.cropper.setAspectRatio(x / y);
  }

  setFreeCrop() {
    this.cropper.setAspectRatio(NaN);
  }

  /*
   * Set sign of rotate direction
   * @param {string} sign - '+' or '-'
   */
  rotate(sign) {
    if (sign === '+') this.cropper.rotate(90);
    if (sign === '-') this.cropper.rotate(-90);
  }

  /*
   * Set direction of flip canvas
   * @param {string} direction - 'X' or 'Y'
   */
  flip(direction) {
    if (direction === direction.toLowerCase())
      direction = direction.toUpperCase();

    if (direction === 'X') this.cropper.scaleX(-1);
    if (direction === 'Y') this.cropper.scaleY(-1);
  }
}

export class stickerEditor {
  /*
   * Create a new fabric Canvas for add Sticker
   * @param {Element} canvasID - The id of canvas element
   * @param {Object} options - The option of image
   */
  constructor(canvasID) {
    if (!canvasID)
      throw new Error('Please provide a canvas element with id canvas.');
    this.stickerCanvas = new fabric.Canvas(canvasID);
    this.stickerCanvas.backgroundColor = null;
    this.stickerCanvas.renderAll.bind(this.stickerCanvas)();
  }

  /*
   * @param {string} src - The src of sticker image
   * @param {Object} options - The options of sticker image
   */
  addSticker(src, options) {
    fabric.Image.fromURL(
      src,
      sticker => {
        this.stickerCanvas.add(sticker);
      },
      options
    );
  }

  /*
   * @param {number} width - The width of photoEditor Canvas
   * @param {number} height - The height of photoEditor Canvas
   */
  setCanvasDimensions(width, height) {
    this.stickerCanvas.setDimensions({ width, height });
  }

  hideCanvas() {
    this.stickerCanvas.classList.add('hide');
  }

  showCanvas() {
    this.stickerCanvas.classList.remove('hide');
  }
}
