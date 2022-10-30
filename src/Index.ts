import { LifeController } from './App';

const canvas = document.getElementById('#canvas') as HTMLCanvasElement;

const lifeController = new LifeController(canvas);

window.requestAnimationFrame(loop);

let lastUpdate = performance.now();
const targetMs = 250;
let dt: number = 0;
function loop() {
  const now = performance.now();
  dt += now - lastUpdate;
  lastUpdate = now;

  if (dt > targetMs) {
    // do updates

    lifeController.update(dt);

    dt = 0;
  }

  window.requestAnimationFrame(loop);
}
