(() => {
  const GRID_SIZE = 12;
  const BOARD_CELL_COUNT = GRID_SIZE * GRID_SIZE;
  const BASE_STEP_MS = 280;
  const SPEED_FACTOR = 0.99;
  const DIRECTIONS = {
    ArrowUp: { x: 0, y: -1 },
    ArrowRight: { x: 1, y: 0 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 }
  };
  const directionValues = Object.values(DIRECTIONS);

  const wrap = value => (value + GRID_SIZE) % GRID_SIZE;
  const sameCell = (a, b) => a.x === b.x && a.y === b.y;

  document.querySelectorAll("[data-snake-game]").forEach(game => {
    const board = game.querySelector(".snake-game-board");
    const canvas = game.querySelector(".snake-game-canvas");
    const meta = game.querySelector(".snake-game-meta");
    const scoreElement = game.querySelector(".snake-game-score");
    const audioButton = game.querySelector(".snake-game-audio");
    const restart = game.querySelector(".snake-game-restart");
    const context = canvas.getContext("2d");

    let boardSize = 88;
    let cellSize = boardSize / GRID_SIZE;
    let snake = [];
    let food = randomFreeCell([]);
    let direction = DIRECTIONS.ArrowRight;
    let directionQueue = [];
    let score = 0;
    let roundStartingScore = 0;
    let running = false;
    let lastTick = 0;
    let stepMs = BASE_STEP_MS;
    let animationFrame = null;
    let audioContext = null;
    let muted = false;
    let crashed = false;

    function prepareAudio() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!audioContext) audioContext = new AudioContext();
      if (audioContext.state === "suspended") audioContext.resume();
    }

    function playTone({ frequency, endFrequency, duration, volume, type = "sine", delay = 0 }) {
      if (muted || !audioContext || audioContext.state !== "running") return;

      const start = audioContext.currentTime + delay;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, start);
      oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.01);
    }

    function playSound(name) {
      if (name === "move") {
        playTone({
          frequency: 160,
          endFrequency: 170,
          duration: 0.2,
          volume: 0.3,
          type: "triangle"
        });
      }

      if (name === "turn") {
        playTone({
          frequency: 150,
          endFrequency: 118,
          duration: 0.2,
          volume: 0.4,
          type: "triangle"
        });
      }

      if (name === "point") {
        playTone({
          frequency: 280,
          endFrequency: 330,
          duration: 0.055,
          volume: 0.75
        });
        playTone({
          frequency: 380,
          endFrequency: 440,
          duration: 0.065,
          volume: 0.075,
          delay: 0.075
        });
      }

      if (name === "death") {
        [
          { frequency: 880, volume: 0.22 },
          { frequency: 784, volume: 0.3 },
          { frequency: 698.46, volume: 0.4 },
          { frequency: 659.25, volume: 0.52 }
        ].forEach((note, index) => {
          playTone({
            frequency: note.frequency,
            endFrequency: note.frequency * 0.98,
            duration: 0.1,
            volume: note.volume,
            type: "triangle",
            delay: index * 0.075
          });
        });
      }
    }

    function randomFreeCell(occupied) {
      const freeCells = [];

      for (let y = 0; y < GRID_SIZE; y += 1) {
        for (let x = 0; x < GRID_SIZE; x += 1) {
          const candidate = { x, y };
          if (!occupied.some(cell => sameCell(cell, candidate))) {
            freeCells.push(candidate);
          }
        }
      }

      if (freeCells.length === 0) return null;
      return freeCells[Math.floor(Math.random() * freeCells.length)];
    }

    function readColor(name) {
      return getComputedStyle(game).getPropertyValue(name).trim();
    }

    function resizeCanvas() {
      const measuredSize = canvas.getBoundingClientRect().width;
      boardSize = measuredSize || 88;
      cellSize = boardSize / GRID_SIZE;

      const pixelRatio = Math.max(1, window.devicePixelRatio || 1);
      const pixelSize = Math.round(boardSize * pixelRatio);

      if (canvas.width !== pixelSize || canvas.height !== pixelSize) {
        canvas.width = pixelSize;
        canvas.height = pixelSize;
      }

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      render();
    }

    function drawDot(x, y, diameter, color) {
      const radius = diameter / 2;
      context.fillStyle = color;
      context.beginPath();
      context.arc(
        (x + 0.5) * cellSize,
        (y + 0.5) * cellSize,
        radius,
        0,
        Math.PI * 2
      );
      context.fill();
    }

    function render() {
      context.clearRect(0, 0, boardSize, boardSize);

      const gridColor = readColor("--snake-grid-color");
      const foodColor = readColor("--snake-food-color");
      const snakeColor = readColor(
        crashed ? "--snake-crash-color" : "--snake-body-color"
      );

      for (let y = 0; y < GRID_SIZE; y += 1) {
        for (let x = 0; x < GRID_SIZE; x += 1) {
          drawDot(x, y, 2, gridColor);
        }
      }

      if (food) drawDot(food.x, food.y, 4, foodColor);

      snake.forEach(cell => {
        drawDot(cell.x, cell.y, 4, snakeColor);
      });
    }

    function createSnake(avoidedCell = null) {
      let nextDirection;
      let nextSnake;

      do {
        nextDirection = directionValues[Math.floor(Math.random() * directionValues.length)];
        const head = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE)
        };

        nextSnake = [0, 1, 2].map(offset => ({
          x: wrap(head.x - nextDirection.x * offset),
          y: wrap(head.y - nextDirection.y * offset)
        }));
      } while (avoidedCell && nextSnake.some(cell => sameCell(cell, avoidedCell)));

      direction = nextDirection;
      return nextSnake;
    }

    function updateScore() {
      scoreElement.textContent = `Score: ${score}`;
    }

    function startGame() {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      prepareAudio();

      const continuesVictory = game.dataset.state === "victory";
      const initialFood = game.dataset.state === "idle" ? food : null;
      snake = createSnake(initialFood);
      food = initialFood || randomFreeCell(snake);
      directionQueue = [];

      if (!continuesVictory) {
        score = 0;
        stepMs = BASE_STEP_MS;
      }

      roundStartingScore = score;
      running = true;
      crashed = false;
      lastTick = performance.now();

      game.dataset.state = "playing";
      if (meta.hidden) {
        meta.hidden = false;
        requestAnimationFrame(() => {
          game.dataset.started = "true";
        });
      }
      restart.hidden = true;
      board.setAttribute("aria-label", "Snake game. Use the arrow keys to steer");
      updateScore();
      render();
      board.focus({ preventScroll: true });
      animationFrame = requestAnimationFrame(animate);
    }

    function endGame(didCrash = false) {
      running = false;
      crashed = didCrash;
      game.dataset.state = "game-over";
      scoreElement.textContent = `Final score: ${score}`;
      restart.hidden = false;
      board.setAttribute("aria-label", `Snake game over. Final score: ${score}`);
      if (didCrash) playSound("death");
      render();
      restart.focus({ preventScroll: true });
    }

    function winGame() {
      running = false;
      crashed = false;
      score = roundStartingScore + BOARD_CELL_COUNT;
      game.dataset.state = "victory";
      scoreElement.textContent = "Victory!";
      restart.hidden = false;
      board.setAttribute("aria-label", `Snake game won. Score: ${score}`);
      render();
      restart.focus({ preventScroll: true });
    }

    function advanceGame() {
      let changedDirection = false;

      if (directionQueue.length > 0) {
        const nextDirection = directionQueue.shift();
        changedDirection =
          nextDirection.x !== direction.x || nextDirection.y !== direction.y;
        direction = nextDirection;
      }

      const nextHead = {
        x: wrap(snake[0].x + direction.x),
        y: wrap(snake[0].y + direction.y)
      };
      const eatsFood = food && sameCell(nextHead, food);
      const collisionBody = eatsFood ? snake : snake.slice(0, -1);

      if (collisionBody.some(cell => sameCell(cell, nextHead))) {
        endGame(true);
        return;
      }

      snake = eatsFood
        ? [nextHead, ...snake]
        : [nextHead, ...snake.slice(0, -1)];

      if (eatsFood) {
        score += 1;
        stepMs *= SPEED_FACTOR;
        updateScore();
        food = randomFreeCell(snake);
        playSound("point");

        if (!food) winGame();
      } else {
        playSound(changedDirection ? "turn" : "move");
      }

      render();
    }

    function animate(now) {
      if (!running) {
        animationFrame = null;
        return;
      }

      if (now - lastTick > stepMs * 3) {
        lastTick = now - stepMs;
      }

      while (now - lastTick >= stepMs && running) {
        const elapsedStep = stepMs;
        advanceGame();
        lastTick += elapsedStep;
      }

      if (running) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        animationFrame = null;
      }
    }

    function queueDirection(event) {
      const nextDirection = DIRECTIONS[event.key];
      if (!running || !nextDirection) return;

      event.preventDefault();

      const comparison = directionQueue[directionQueue.length - 1] || direction;
      const reversesDirection =
        comparison.x + nextDirection.x === 0 &&
        comparison.y + nextDirection.y === 0;

      if (!reversesDirection && directionQueue.length < 2) {
        directionQueue.push(nextDirection);
      }
    }

    board.addEventListener("click", () => {
      if (game.dataset.state === "idle") startGame();
    });
    game.addEventListener("pointerdown", () => {
      game.dataset.input = "pointer";
    });
    game.addEventListener("keydown", () => {
      game.dataset.input = "keyboard";
    });
    board.addEventListener("keydown", queueDirection);
    restart.addEventListener("click", startGame);
    audioButton.addEventListener("click", () => {
      muted = !muted;
      audioButton.setAttribute("aria-pressed", String(muted));
      audioButton.setAttribute("aria-label", muted ? "Unmute game sounds" : "Mute game sounds");

      if (!muted) prepareAudio();
      board.focus({ preventScroll: true });
    });

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && running) lastTick = performance.now();
    });

    if (window.ResizeObserver) {
      new ResizeObserver(resizeCanvas).observe(canvas);
    } else {
      window.addEventListener("resize", resizeCanvas);
    }

    resizeCanvas();
  });
})();
