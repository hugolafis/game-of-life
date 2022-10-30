import { LifeController } from './App';

const canvas = document.getElementById('#canvas') as HTMLCanvasElement;
const stats = document.getElementById('#stats') as HTMLDivElement;

const lifeController = new LifeController(canvas);

window.requestAnimationFrame(loop);

let lastUpdate = performance.now();
const targetMs = 50;
let dt: number = 0;
let generation: number = 0;
function loop() {
  const now = performance.now();
  dt += now - lastUpdate;
  lastUpdate = now;

  if (dt > targetMs) {
    // do updates

    lifeController.update(dt);

    dt = 0;
    generation++;
    stats.innerHTML = `Generation: ${generation}`;
  }

  window.requestAnimationFrame(loop);
}
