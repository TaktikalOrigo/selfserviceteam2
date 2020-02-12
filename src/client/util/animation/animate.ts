import BezierEasing from "bezier-easing";

export const interpolate = (a: number, b: number, t: number) => a * (1 - t) + b * t;

interface Options {
  from: number;
  to: number | (() => number);
  duration: number;
  bezier: [number, number, number, number];
}


const defaultOpts: Options = {
  from: 0,
  to: 1,
  duration: 500,
  bezier: [0.46, 0.19, 0.13, 0.98],
};

export function animate(options: Partial<Options>, fn: (t: number) => void): Promise<void> {
  return new Promise(resolve => {
    const opts = {
      ...defaultOpts,
      ...options,
    };

    const [p0, p1, p2, p3] = opts.bezier;
    const easing = BezierEasing(p0, p1, p2, p3);
    const startTime = Date.now();

    let f = opts.from;

    const tick = () => {
      const actualF = (Date.now() - startTime) / opts.duration;
      f = easing(actualF);

      if (actualF >= 1) {
        f = 1;
      } else {
        requestAnimationFrame(tick);
      }

      const to = typeof opts.to === "number" ? opts.to : opts.to();

      fn(interpolate(opts.from, to, f));

      if (f === 1) {
        resolve();
      }
    };

    tick();
  });
}
