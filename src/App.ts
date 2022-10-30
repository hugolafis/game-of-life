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
    this.canvasContext = canvas.getContext('2d', {
      willReadFrequently: true,
    } as CanvasRenderingContext2DSettings);
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
        const neighbors = this.canvasContext.getImageData(x - 1, y - 1, 3, 3).data;
        let aliveNeighbors = 0;

        // Are any neighbors valid?
        // e.g. not white and not 0 alpha
        for (let i = 0; i < neighbors.length; i += 4) {
          // Skip itself
          if (i === 16) {
            continue;
          }

          // Skip out of range
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
}
