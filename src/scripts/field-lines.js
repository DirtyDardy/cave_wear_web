// THE MOVING LINES behind Field conditions (Home). Only a picture: thin lines drifting over
// the map of Europe, no real wind data (decided 1 Nov – I'm not a weather site).
// <canvas> = an empty picture the script draws on, line by line.
// Runs only while the section is on screen. Reduced motion: one still picture.
// Moving longer than 5 seconds needs a way to stop it (WCAG 2.2.2): the pause button.

const section = document.querySelector(".home-conditions");

if (section) {
  const canvas = section.querySelector(".field-lines");
  const pauseButton = section.querySelector(".field-pause");
  const context = canvas.getContext("2d");
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const AREA_PER_LINE = 5000; // one line per this many square pixels, so phones draw fewer
  const PARTS = 3; // every line has 3 parts, each one fainter: the tail fades out
  const STEPS_PER_PART = 9;
  const STEP_LENGTH = 5; // pixels – together one line is about 135px long
  const SPEED = 10; // pixels per second
  const LIFE = 10; // seconds until a line has faded in and out again
  const STRENGTH = 0.26; // how visible a line gets at most (1 = solid Egret)
  const FRAME_TIME = 1000 / 30; // 30 pictures per second are enough for something this slow

  let lines = [];
  let width = 0;
  let height = 0;
  let clock = 0; // seconds, makes the flow change very slowly
  let paused = false;
  let inView = false;
  let frame = null;
  let lastTime = 0;

  // Which way the flow goes at one spot. A few overlapping waves give soft curves and
  // swirls; nearby spots get nearly the same angle, so the lines run side by side.
  function direction(x, y) {
    return (
      Math.sin(x * 0.0061 + clock * 0.04) * 1.5 + Math.cos(y * 0.0083 - clock * 0.03) * 1.5 + Math.sin((x + y) * 0.0027) * 1.8
    );
  }

  function newLine(age = 0) {
    return { x: Math.random() * width, y: Math.random() * height, age };
  }

  // Every line starts at its head and walks backwards along the flow, so it always
  // follows the curve. fade = 0 at birth, 1 in the middle of its life, 0 at the end.
  function draw() {
    context.clearRect(0, 0, width, height);
    context.lineWidth = 1;
    context.strokeStyle = getComputedStyle(section).color; // Egret

    for (const line of lines) {
      const fade = Math.sin((Math.PI * line.age) / LIFE);
      let { x, y } = line;

      for (let part = 0; part < PARTS; part++) {
        context.globalAlpha = STRENGTH * fade * (1 - part / PARTS);
        context.beginPath();
        context.moveTo(x, y);
        for (let step = 0; step < STEPS_PER_PART; step++) {
          const angle = direction(x, y);
          x -= Math.cos(angle) * STEP_LENGTH;
          y -= Math.sin(angle) * STEP_LENGTH;
          context.lineTo(x, y);
        }
        context.stroke();
      }
    }
  }

  // requestAnimationFrame = "call me before the next picture on screen". The browser
  // stops calling while the tab is hidden, so a hidden tab costs nothing.
  function tick(now) {
    frame = requestAnimationFrame(tick);
    if (now - lastTime < FRAME_TIME) return;

    const seconds = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    clock += seconds;

    lines = lines.map((line) => {
      if (line.age + seconds >= LIFE) return newLine();
      const angle = direction(line.x, line.y);
      return {
        x: line.x + Math.cos(angle) * SPEED * seconds,
        y: line.y + Math.sin(angle) * SPEED * seconds,
        age: line.age + seconds,
      };
    });
    draw();
  }

  function startOrStop() {
    const shouldRun = inView && !paused && !calm;
    if (shouldRun && frame === null) {
      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    } else if (!shouldRun && frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }
  }

  // The section changes size with the screen. A canvas has its own pixels, so they are
  // set again, a little sharper on fine screens (at most 2×, more only costs speed).
  new ResizeObserver(([entry]) => {
    ({ width, height } = entry.contentRect);
    const sharpness = Math.min(window.devicePixelRatio, 2);
    canvas.width = width * sharpness;
    canvas.height = height * sharpness;
    context.setTransform(sharpness, 0, 0, sharpness, 0, 0);

    const count = Math.round((width * height) / AREA_PER_LINE);
    while (lines.length < count) lines.push(newLine(Math.random() * LIFE));
    lines.length = count;
    draw();
  }).observe(canvas);

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    startOrStop();
  }).observe(section);

  // Pause / play. The label tells screen readers what a click will do.
  pauseButton.hidden = calm;
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    pauseButton.toggleAttribute("data-paused", paused);
    pauseButton.setAttribute("aria-label", paused ? "Play" : "Pause");
    startOrStop();
  });
}
