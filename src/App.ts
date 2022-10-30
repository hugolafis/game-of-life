import "./App.scss";

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
    let i = this.bufferLength;
    while (i -= 4) {
      if (Math.random() < 0.5) {
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

    let i = this.bufferLength;
    while (i -= 4) {
      const numNeighbors = this.checkNeighbors(i);

      if (numNeighbors === 2) {
        // Pixel survives
        continue;
      } else if (numNeighbors === 3) {
        // Pixel spawns
        this.imageData.data[i] = 0;
        this.imageData.data[i + 1] = 0;
        this.imageData.data[i + 2] = 0;
        this.imageData.data[i + 3] = 255;

        continue;
      }

      // Pixel dies
      this.imageData.data[i] = 255;
      this.imageData.data[i + 1] = 255;
      this.imageData.data[i + 2] = 255;
      this.imageData.data[i + 3] = 255;
    }


    this.canvasContext.putImageData(this.imageData, 0, 0);
    const timeNow = performance.now();
    console.log(timeNow - timeBefore);
  };

  checkNeighbors = (i: number): number => {
    let alive = 0;

    // check the neighbors around this pixel to see if there's more than two alive
    alive += this.checkPixel(this.imageData.data[i - 4 - this.lineLength]);
    alive += this.checkPixel(this.imageData.data[i - this.lineLength]);
    alive += this.checkPixel(this.imageData.data[i + 4 - this.lineLength]);
    alive += this.checkPixel(this.imageData.data[i - 4])
    alive += this.checkPixel(this.imageData.data[i + 4]);
    alive += this.checkPixel(this.imageData.data[i - 4 + this.lineLength]);
    alive += this.checkPixel(this.imageData.data[i + this.lineLength]);
    alive += this.checkPixel(this.imageData.data[i + 4 + this.lineLength]);

    // two neighbors
    if (alive === 2) {
      return 2;
    }

    // three neighbors
    if (alive >= 3) {
      return 3;
    }

    return 0;
  }

  checkPixel = (pixel: number): number => {
    if (isNaN(pixel)) {
      return 0;
    }

    if (pixel === 0) {
      return 1;
    }

    return 0;
  }
}
