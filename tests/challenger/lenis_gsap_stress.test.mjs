import assert from 'node:assert/strict';
import test from 'node:test';

// Setup minimal browser simulation environment for Lenis & GSAP
global.Window = function Window() {};
global.window = Object.create(global.Window.prototype);
Object.assign(global.window, {
  addEventListener: () => {},
  removeEventListener: () => {},
  matchMedia: () => ({ matches: false, addListener: () => {}, removeListener: () => {} }),
  scrollTo: () => {},
  requestAnimationFrame: (cb) => setTimeout(cb, 16),
  cancelAnimationFrame: (id) => clearTimeout(id),
  visualViewport: { width: 1024, height: 768 },
  innerWidth: 1024,
  innerHeight: 768,
});
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
const classList = {
  classes: new Set(),
  add(...c) { c.forEach((x) => this.classes.add(x)); },
  remove(...c) { c.forEach((x) => this.classes.delete(x)); },
  contains(c) { return this.classes.has(c); },
  [Symbol.iterator]() { return this.classes[Symbol.iterator](); },
};
global.document = {
  documentElement: { clientWidth: 1024, clientHeight: 768, scrollWidth: 1024, scrollHeight: 2000, classList },
  body: { clientWidth: 1024, clientHeight: 768, scrollWidth: 1024, scrollHeight: 2000, classList },
  addEventListener: () => {},
  removeEventListener: () => {},
  querySelector: () => null,
};

test('Lenis and GSAP Ticker Stress & Unmount Leak Oracle', async (t) => {
  const { default: Lenis } = await import('lenis');
  const { default: gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger.js');

  gsap.registerPlugin(ScrollTrigger);

  // Helper simulating the exact useLenis hook mount & unmount lifecycle
  function simulateUseLenisLifecycle(options) {
    const lenis = new Lenis({
      duration: options?.duration ?? 1.2,
      easing: options?.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: options?.smoothWheel ?? true,
      touchMultiplier: options?.touchMultiplier ?? 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let rafCallCount = 0;
    const updateTicker = (time) => {
      rafCallCount++;
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const unmount = () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };

    return { lenis, unmount, getRafCalls: () => rafCallCount };
  }

  await t.test('Test 1: Single mount/unmount cycle cleanly unbinds ticker and clears event listeners', () => {
    const initialListenerCount = gsap.ticker._listeners ? gsap.ticker._listeners.length : 0;

    const instance = simulateUseLenisLifecycle();
    
    // Ticker tick while mounted: should increment RAF calls
    gsap.ticker.tick();
    assert.ok(instance.getRafCalls() > 0, 'Tick while mounted must invoke lenis.raf');
    const callsDuringMount = instance.getRafCalls();

    // Verify scroll event attached
    assert.strictEqual(
      Object.keys(instance.lenis.emitter?.events || {}).length > 0,
      true,
      'Scroll listener must be registered on Lenis emitter'
    );

    // Unmount
    instance.unmount();

    // Verify emitter events cleared by lenis.destroy()
    assert.strictEqual(
      Object.keys(instance.lenis.emitter?.events || {}).length,
      0,
      'lenis.destroy() must clear all emitter events'
    );

    // Ticker tick after unmount: RAF count must NOT change
    gsap.ticker.tick();
    assert.strictEqual(
      instance.getRafCalls(),
      callsDuringMount,
      'After unmount, gsap.ticker must NOT invoke destroyed lenis.raf'
    );

    const postUnmountListenerCount = gsap.ticker._listeners ? gsap.ticker._listeners.length : 0;
    assert.strictEqual(
      postUnmountListenerCount,
      initialListenerCount,
      'GSAP ticker listener count must return to initial baseline after unmount'
    );
  });

  await t.test('Test 2: Stress-test 500 rapid mount/unmount cycles without listener leakage', () => {
    const initialListenerCount = gsap.ticker._listeners ? gsap.ticker._listeners.length : 0;
    const CYCLES = 500;

    for (let i = 0; i < CYCLES; i++) {
      const instance = simulateUseLenisLifecycle({ duration: 1.0 + (i % 5) * 0.1 });
      // Tick once to simulate a render frame
      gsap.ticker.tick();
      // Immediately unmount (simulating route rapid switching or fast unmount)
      instance.unmount();
    }

    const finalListenerCount = gsap.ticker._listeners ? gsap.ticker._listeners.length : 0;
    assert.strictEqual(
      finalListenerCount,
      initialListenerCount,
      `After ${CYCLES} cycles, listener count (${finalListenerCount}) must match baseline (${initialListenerCount}). No memory leak!`
    );

    // Tick again and ensure no errors thrown
    assert.doesNotThrow(() => {
      gsap.ticker.tick();
    }, 'Ticker tick after 500 cycles must execute cleanly without error');
  });

  await t.test('Test 3: Counter-factual stress test — omission of gsap.ticker.remove leads to ticker pollution', () => {
    // If someone forgot `gsap.ticker.remove(updateTicker)`:
    let zombieCalls = 0;
    const leakyLenis = new Lenis();
    const leakyTicker = (time) => {
      zombieCalls++;
      leakyLenis.raf(time * 1000);
    };

    gsap.ticker.add(leakyTicker);
    // Destroy lenis without removing from ticker:
    leakyLenis.destroy();

    // Now tick: leakyTicker still fires even though lenis is destroyed!
    gsap.ticker.tick();
    assert.ok(
      zombieCalls > 0,
      'Proves counter-factual: without gsap.ticker.remove, zombie callbacks accumulate and continue firing'
    );

    // Clean up our intentional leak
    gsap.ticker.remove(leakyTicker);
  });

  await t.test('Test 4: Options re-render churn stability', () => {
    // Simulate component re-rendering with new options object on each render
    let currentInstance = null;
    const baseListeners = gsap.ticker._listeners ? gsap.ticker._listeners.length : 0;

    for (let render = 0; render < 50; render++) {
      if (currentInstance) {
        currentInstance.unmount();
      }
      currentInstance = simulateUseLenisLifecycle({ duration: 1.2, touchMultiplier: 1.6 });
      assert.strictEqual(
        (gsap.ticker._listeners ? gsap.ticker._listeners.length : 0) - baseListeners,
        1,
        'At any given point during option updates, exactly 1 ticker listener should be active'
      );
    }

    currentInstance.unmount();
    assert.strictEqual(
      gsap.ticker._listeners ? gsap.ticker._listeners.length : 0,
      baseListeners,
      'Final unmount after options churn restores baseline listener count'
    );
  });
});
