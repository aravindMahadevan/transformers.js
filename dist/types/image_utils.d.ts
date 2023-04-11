export class CustomImage {
    /**
     * Helper method for reading an image from a variety of input types.
     * @param {CustomImage|string|URL} input
     * @returns The image object.
     */
    static read(input: CustomImage | string | URL): Promise<CustomImage>;
    /**
     * Read an image from a URL or file path.
     * @param {string|URL} url - The URL or file path to read the image from.
     * @returns {Promise<CustomImage>} - The image object.
     */
    static fromURL(url: string | URL): Promise<CustomImage>;
    /**
     * Helper method to create a new canvas, draw an image/canvas to it, then return the pixel data.     * @param {ImageClass|CanvasClass} img - The image/canvas to draw to the canvas.
     * @param {number} [width=null] - Width of the canvas. If null, the width of the image is used.
     * @param {number} [height=null] - Height of the canvas. If null, the height of the image is used.
     * @returns {CustomImage} - The image object.
     */
    static createCanvasAndDraw(img: any, width?: number, height?: number): CustomImage;
    /**
     * Create a new CustomImage object.
     * @param {Uint8ClampedArray} data - The pixel data.
     * @param {number} width - The width of the image.
     * @param {number} height - The height of the image.
     * @param {number} channels - The number of channels.
     */
    constructor(data: Uint8ClampedArray, width: number, height: number, channels: number);
    /**
     * Convert the image to grayscale format.
     * @returns {CustomImage} - `this` to support chaining.
     */
    grayscale(): CustomImage;
    /**
     * Convert the image to RGB format.
     * @returns {CustomImage} - `this` to support chaining.
     */
    rgb(): CustomImage;
    /**
     * Convert the image to RGBA format.
     * @returns {CustomImage} - `this` to support chaining.
     */
    rgba(): CustomImage;
    /**
     * Resize the image to the given dimensions. This method uses the canvas API to perform the resizing.
     * @param {number} width - The width of the new image.
     * @param {number} height - The height of the new image.
     * @returns {CustomImage} - `this` to support chaining.
     */
    resize(width: number, height: number): CustomImage;
    toCanvas(): any;
    /**
     * Helper method to update the image data.
     * @param {Uint8ClampedArray} data - The new image data.
     * @param {number} width - The new width of the image.
     * @param {number} height - The new height of the image.
     * @param {number} channels - The new number of channels of the image.
     */
    _update(data: Uint8ClampedArray, width: number, height: number, channels?: number): CustomImage;
    data: Uint8ClampedArray;
    width: number;
    height: number;
    channels: number;
    /**
     * Clone the image
     * @returns {CustomImage} - The cloned image
     */
    clone(): CustomImage;
    /**
     * Helper method for converting image to have a certain number of channels
     * @param {number} numChannels - The number of channels. Must be 1, 3, or 4.
     * @returns {CustomImage} - `this` to support chaining.
     */
    convert(numChannels: number): CustomImage;
    /**
     * Save the image to the given path. This method is only available in environments with access to the FileSystem.
     * @param {string|Buffer|URL} path - The path to save the image to.
     * @param {string} [mime='image/png'] - The mime type of the image.
     */
    save(path: string | Buffer | URL, mime?: string): void;
}