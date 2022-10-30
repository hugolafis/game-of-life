import './App.scss';

export class LifeController {
  private canvasContext: CanvasRenderingContext2D;
  private readonly imageData: ImageData;
  private readonly size = 100;
  private readonly bufferLength = this.size * this.size * 4;
  private readonly lineLength = this.size * 4;

  constructor(private readonly canvas: HTMLCanvasElement) {
    canvas.width = this.size;
    canvas.height = this.size;
    this.canvasContext = canvas.getContext('2d');
    this.canvasContext.imageSmoothingEnabled = false;

    this.imageData = this.canvasContext.createImageData(this.size, this.size);

    // Randomise data
    // for (i = this.bufferLength; (i -= 4); ) {
    for (let i = 0; i < this.bufferLength; i += 4) {
      if (Math.random() < 0.5) {
        this.imageData.data[i] = 255;
        this.imageData.data[i + 1] = 255;
        this.imageData.data[i + 2] = 255;
        this.imageData.data[i + 3] = 255;
        continue;
      }

      const random = Math.round(Math.random()) * 255;

      this.imageData.data[i] = random;
      this.imageData.data[i + 1] = random;
      this.imageData.data[i + 2] = random;
      this.imageData.data[i + 3] = 255;
    }

    this.canvasContext.putImageData(this.imageData, 0, 0);
  }

  update = (dt: number): void => {
    console.log('\ntick');

    const timeBefore = performance.now();

    for (let y = 0; y < this.canvas.height; y++) {
      for (let x = 0; x < this.canvas.width; x++) {
        const neighbors = this.canvasContext.getImageData(y, x, 3, 3).data;
        let aliveNeighbors = 0;

        // Are any neighbors valid?
        // e.g. not white and not 0 alpha
        for (let i = 0; i < neighbors.length; i += 4) {
          if (neighbors[i + 3] === 0) {
            continue;
          }

          if (neighbors[i] === 0) {
            aliveNeighbors++;
          }
        }

        // Update pixel
        const indice = (x + y * this.canvas.width) * 4;

        this.updatePixel(indice, aliveNeighbors);
      }
    }

    /*
    for (let i = 0; i < this.imageData.data.length; i += 4) {
      // while ((i -= 4)) {

      const numNeighbors = this.checkNeighbors(i);

      // Check alive cells
      if (this.imageData.data[i] === 0) {
        if (numNeighbors > 2) {
          // Pixel survives

          continue;
        } else {
          // Pixel dies
          this.imageData.data[i] = 255;
          this.imageData.data[i + 1] = 255;
          this.imageData.data[i + 2] = 255;
          this.imageData.data[i + 3] = 255;

          continue;
        }
      } else {
        if (numNeighbors >= 3) {
          // Pixel spawns
          this.imageData.data[i] = 0;
          this.imageData.data[i + 1] = 0;
          this.imageData.data[i + 2] = 0;
          this.imageData.data[i + 3] = 255;

          continue;
        }
      }
    }
    */

    this.canvasContext.putImageData(this.imageData, 0, 0);
    const timeNow = performance.now();
    console.log(timeNow - timeBefore);
  };

  updatePixel = (i: number, aliveNeighbors: number): void => {
    // Is the current pixel alive?
    if (this.imageData.data[i] === 0) {
      // If 2 or 3 neighbors, survive
      if (aliveNeighbors === 2 || aliveNeighbors === 3) {
        return;
      }
    } else {
      // Dead pixels resurrect if they have 3 alive neighbors
      if (aliveNeighbors === 3) {
        this.imageData.data[i] = 0;
        this.imageData.data[i + 1] = 0;
        this.imageData.data[i + 2] = 0;
        this.imageData.data[i + 3] = 255;

        return;
      }
    }

    // Otherwise, it dies
    this.imageData.data[i] = 255;
    this.imageData.data[i + 1] = 255;
    this.imageData.data[i + 2] = 255;
    this.imageData.data[i + 3] = 255;
  };

  checkNeighbors = (i: number): number => {
    let alive = 0;
    debugger;
    alive += this.checkPixel(this.imageData.data[i - this.lineLength - 4]); // Top Left
    alive += this.checkPixel(this.imageData.data[i - this.lineLength]); // Top
    alive += this.checkPixel(this.imageData.data[i - this.lineLength + 4]); // Top Right
    alive += this.checkPixel(this.imageData.data[i + 4]); // Right
    alive += this.checkPixel(this.imageData.data[i + this.lineLength + 4]); // Bottom Right
    alive += this.checkPixel(this.imageData.data[i + this.lineLength]); // Bottom
    alive += this.checkPixel(this.imageData.data[i + this.lineLength - 4]); // Bottom Left
    alive += this.checkPixel(this.imageData.data[i - 4]); // Left

    // check the neighbors around this pixel to see if there's more than two alive
    // alive += this.checkPixel(this.imageData.data[i - 4 - this.lineLength]);
    // alive += this.checkPixel(this.imageData.data[i - this.lineLength]);
    // alive += this.checkPixel(this.imageData.data[i + 4 - this.lineLength]);
    // alive += this.checkPixel(this.imageData.data[i - 4]);
    // alive += this.checkPixel(this.imageData.data[i + 4]);
    // alive += this.checkPixel(this.imageData.data[i - 4 + this.lineLength]);
    // alive += this.checkPixel(this.imageData.data[i + this.lineLength]);
    // alive += this.checkPixel(this.imageData.data[i + 4 + this.lineLength]);

    return alive;
  };

  checkPixel = (pixel: number): number => {
    if (isNaN(pixel) || pixel === undefined) {
      return 0;
    }

    if (pixel === 0) {
      return 1;
    }

    return 0;
  };
}
