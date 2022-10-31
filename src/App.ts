import './App.scss';

export class LifeController {
  private imageData: ImageData;
  private buffer: number[][] = [];
  private swapBuffer: number[][] = [];
  private readonly canvasContext: CanvasRenderingContext2D;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly xSize: number,
    private readonly ySize: number
  ) {
    // Canvas sizes
    canvas.width = xSize;
    canvas.height = ySize;

    this.canvasContext = canvas.getContext('2d', {
      willReadFrequently: true,
    } as CanvasRenderingContext2DSettings);
    this.canvasContext.imageSmoothingEnabled = false;

    // Populate with random data
    const weight = 0.1;
    for (let y = 0; y < ySize; y++) {
      let row: number[] = [];
      for (let x = 0; x < xSize; x++) {
        const random = Math.random() < weight ? 0 : 255;
        //const random = 255;
        row.push(random);
      }

      this.buffer.push(row);
    }

    this.imageData = this.canvasContext.createImageData(xSize, ySize);
  }

  update = (dt: number): void => {
    console.log('\ntick');
    const timeBefore = performance.now();

    // Copy buffer to swapBuffer
    // Read from buffer, write to swapBuffer
    this.swapBuffer = this.deepCopyArray(this.buffer);

    // Pixels to array values
    const fixedWidth = this.xSize - 1;
    const fixedHeight = this.ySize - 1;

    // Loop for each pixel
    for (let y = 0; y < this.ySize; y++) {
      for (let x = 0; x < this.xSize; x++) {
        let aliveNeighbors = 0;

        let aboveY;
        let belowY;
        let leftX;
        let rightX;

        // Calculate wrapping
        if (y - 1 < 0) {
          aboveY = fixedHeight;
        } else {
          aboveY = y - 1;
        }

        if (y + 1 > fixedHeight) {
          belowY = 0;
        } else {
          belowY = y + 1;
        }

        if (x - 1 < 0) {
          leftX = fixedWidth;
        } else {
          leftX = x - 1;
        }

        if (x + 1 > fixedWidth) {
          rightX = 0;
        } else {
          rightX = x + 1;
        }

        // Access neighboring pixels
        const neighbors: number[] = [
          this.buffer[aboveY][leftX],
          this.buffer[aboveY][x],
          this.buffer[aboveY][rightX],
          this.buffer[y][leftX],
          this.buffer[y][x],
          this.buffer[y][rightX],
          this.buffer[belowY][leftX],
          this.buffer[belowY][x],
          this.buffer[belowY][rightX],
        ];

        // Check values of neighbors
        for (let i = 0; i < neighbors.length; i++) {
          // Skip itself
          if (i === 4) {
            continue;
          }

          if (neighbors[i] === 0) {
            aliveNeighbors++;
          }
        }

        // Update pixel
        const newPixelValue = this.updatePixel(x, y, aliveNeighbors);
        this.swapBuffer[y][x] = newPixelValue;

        // Write the value into the ImageData
        const indice = (x + 1 + y * this.xSize) * 4;
        this.imageData.data[indice] = newPixelValue;
        this.imageData.data[indice + 1] = newPixelValue;
        this.imageData.data[indice + 2] = newPixelValue;
        this.imageData.data[indice + 3] = 255;
      }
    }

    // Draw image
    this.canvasContext.putImageData(this.imageData, 0, 0);

    // Update buffer
    this.buffer = this.deepCopyArray(this.swapBuffer);

    // Debug
    const timeNow = performance.now();
    console.log(timeNow - timeBefore);
  };

  private readonly updatePixel = (x: number, y: number, neighbors: number): number => {
    // Is the pixel alive?
    if (this.buffer[y][x] === 0) {
      // If two or three neighbors, stay alive
      if (neighbors === 2 || neighbors === 3) {
        return 0;
      } else {
        // It dies
        return 255;
      }
    }

    // If the pixel is dead, does it have three neighbors?
    if (neighbors === 3) {
      // Come back to life
      return 0;
    }

    // Die
    return 255;
  };

  private readonly deepCopyArray = (array: number[][]): number[][] => {
    const newParentArray = [];

    for (let i = 0; i < array.length; i++) {
      const newLine = [...array[i]];
      newParentArray.push(newLine);
    }

    return newParentArray;
  };
}
