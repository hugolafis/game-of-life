import "./App.scss";

export class LifeController {
  private canvasContext: CanvasRenderingContext2D;
  private readonly imageData: ImageData;

  constructor(private readonly canvas: HTMLCanvasElement) {
    canvas.width = 640;
    canvas.height = 480;
    this.canvasContext = canvas.getContext('2d');
    this.canvasContext.imageSmoothingEnabled = false;

    this.imageData = this.canvasContext.createImageData(640, 480);

    this.imageData.data[0] = 0;
    this.imageData.data[1] = 0;
    this.imageData.data[2] = 0;
    this.imageData.data[3] = 255;

    this.canvasContext.putImageData(this.imageData, 0, 0);
  }

  update = (dt: number): void => {
    console.log('tick');
  };
}
