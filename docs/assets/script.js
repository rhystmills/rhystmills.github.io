let typeHeading = document.getElementById('type-heading');
if (typeHeading) {
  let text = typeHeading.textContent;

  function teletype(id, string, rate){
    let type = document.getElementById(id);
    let displayString = '';
    for (let i=0; i<string.length; i++){
      setTimeout(function(){
        if (i===0){
          typeHeading.setAttribute("class","visible teletype")
        }
        while (type.firstChild) {
          type.removeChild(type.lastChild);
        }
        displayString += string[i];
        let textNode = document.createTextNode(displayString);
        type.appendChild(textNode);
      }, i * rate);
    }
  }


  setTimeout(function(){
    teletype("type-heading", text, 50);
  }, 1000);
}

// Wiggle

let wiggleTexts = document.getElementsByClassName("wiggle");
let wiggleArray = [...wiggleTexts];
wiggleArray.map(text => {
  let theText = text.textContent;
  if (typeof theText != null){
    while (text.firstChild) {
      text.removeChild(text.lastChild);
    }
    for (i = 0; i < theText.length; i++){
      let letter = theText[i];
      let letterNode = document.createElement("span");
      let num = (i % 4) + 1;
      let letterClass = "wiggle" + num;
      letterNode.appendChild(document.createTextNode(letter));
      letterNode.setAttribute("class",letterClass);
      text.appendChild(letterNode);
      console.log(letterNode)
    }
  }
})

// Rolling pageview counter

document.querySelectorAll('[data-pageview-counter]').forEach(counter => {
  const digitWindows = [...counter.querySelectorAll('.pageview-counter__digit')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reelStates = [];

  digitWindows.forEach((digitWindow, digitPosition) => {
    digitWindow.textContent = '';
    digitWindow.classList.add('is-ready');
    reelStates[digitPosition] = { digit: 0, index: 1, element: digitWindow };
  });

  const moveReel = (state, index, animate) => {
    state.index = index;
    state.element.style.transitionDuration = animate && !reduceMotion.matches ? '' : '0s';
    state.element.style.backgroundPositionY = `-${index * state.element.clientHeight}px`;
  };

  const setValue = (value, animate = true) => {
    const digits = String(value).padStart(6, '0').split('').map(Number);

    reelStates.forEach((state, index) => {
      const nextDigit = digits[index];

      if (!animate) {
        state.digit = nextDigit;
        moveReel(state, nextDigit + 1, false);
        return;
      }

      if (state.digit === nextDigit) return;

      state.digit = nextDigit;
      moveReel(state, state.index + 1, true);

      if (state.index > 10) {
        window.setTimeout(() => {
          moveReel(state, 1, false);
        }, reduceMotion.matches ? 0 : 760);
      }
    });

    counter.setAttribute('aria-label', `Page views: ${value.toLocaleString('en-GB')}`);
  };

  const randomNumber = maximum => {
    if (window.crypto && window.crypto.getRandomValues) {
      const randomValue = new Uint32Array(1);
      window.crypto.getRandomValues(randomValue);
      return randomValue[0] % maximum;
    }

    return Math.floor(Math.random() * maximum);
  };

  // Keep the starting value six digits long while staying below 300,000.
  let pageviews = 100000 + randomNumber(200000);
  setValue(pageviews, false);

  // Keep the sprite aligned if a responsive layout changes the digit size.
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(() => {
      reelStates.forEach(state => moveReel(state, state.index, false));
    });

    resizeObserver.observe(counter);
  }

  const scheduleIncrement = () => {
    const delay = 2200 + Math.random() * 4800;

    window.setTimeout(() => {
      if (!document.hidden) {
        pageviews = pageviews === 999999 ? 0 : pageviews + 1;
        setValue(pageviews);
      }

      scheduleIncrement();
    }, delay);
  };

  scheduleIncrement();
});

// Live dwell time

document.querySelectorAll('[data-dwell-time]').forEach(timer => {
  const value = timer.querySelector('[data-dwell-time-value]');

  const updateTimer = () => {
    const elapsedSeconds = Math.floor(performance.now() / 1000);
    const unit = elapsedSeconds === 1 ? 'second' : 'seconds';

    value.textContent = elapsedSeconds;
    timer.setAttribute('aria-label', `Dwell time: ${elapsedSeconds} ${unit}`);
  };

  updateTimer();
  window.setInterval(updateTimer, 1000);
});

// Active attention time

document.querySelectorAll('[data-active-attention]').forEach(widget => {
  const timer = widget.querySelector('[role="timer"]');
  const value = widget.querySelector('[data-active-attention-value]');
  const eventList = widget.querySelector('[data-active-attention-events]');
  const eventViewport = widget.querySelector('[data-attention-events-viewport]');
  const idleAfterSeconds = 2;
  const idleAfterMilliseconds = idleAfterSeconds * 1000;
  const pageStartedAt = performance.now();
  let activeStartedAt = pageStartedAt;
  let accumulatedActiveMilliseconds = 0;
  let isActive = true;
  let idleTimeout;
  let lastLoggedScrollAt = -Infinity;

  const activeMilliseconds = () => {
    const currentPeriod = isActive ? performance.now() - activeStartedAt : 0;
    return accumulatedActiveMilliseconds + currentPeriod;
  };

  const renderTimer = () => {
    const activeSeconds = (activeMilliseconds() / 1000).toFixed(1);

    value.textContent = activeSeconds;
    timer.setAttribute('aria-label', `Active attention time: ${activeSeconds} seconds`);
  };

  const logEvent = message => {
    const item = document.createElement('li');
    const elapsedSeconds = Math.floor((performance.now() - pageStartedAt) / 1000);
    item.textContent = `${elapsedSeconds}s — ${message}`;
    eventList.append(item);

    eventViewport.scrollTop = eventViewport.scrollHeight;
    eventViewport.classList.toggle('has-previous-events', eventViewport.scrollTop > 1);
  };

  const updateLogFade = () => {
    eventViewport.classList.toggle('has-previous-events', eventViewport.scrollTop > 1);
  };

  const pauseForInactivity = () => {
    if (!isActive) return;

    accumulatedActiveMilliseconds += performance.now() - activeStartedAt;
    isActive = false;
    renderTimer();
    logEvent(`${idleAfterSeconds}s inactive · timer paused`);
  };

  const restartIdleTimeout = () => {
    window.clearTimeout(idleTimeout);
    idleTimeout = window.setTimeout(pauseForInactivity, idleAfterMilliseconds);
  };

  const registerActivity = type => {
    const now = performance.now();
    const restarted = !isActive;

    if (restarted) {
      activeStartedAt = now;
      isActive = true;
    }

    restartIdleTimeout();

    if (type !== 'scroll' || restarted || now - lastLoggedScrollAt >= 750) {
      logEvent(restarted ? `${type} · timer restarted` : type);
      if (type === 'scroll') lastLoggedScrollAt = now;
    }
  };

  logEvent('timer started');
  restartIdleTimeout();
  renderTimer();

  document.addEventListener('click', () => registerActivity('click'));
  document.addEventListener('scroll', () => registerActivity('scroll'), { passive: true });
  eventViewport.addEventListener('scroll', updateLogFade, { passive: true });
  window.setInterval(renderTimer, 100);
});
