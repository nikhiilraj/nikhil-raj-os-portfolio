'use client';

/**
 * Synthesized UI sounds using the Web Audio API.
 * No external audio files needed — everything is generated on the fly.
 * All sounds are short, subtle, and designed for a premium OS feel.
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

/** Resume audio context after user gesture (required by browsers). */
function ensureResumed() {
  const ctx = getCtx();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// ── Boot chime ─────────────────────────────────────────────────────────────────
// A warm two-tone chord reminiscent of a Mac startup — plays when the OS finishes booting.
export function playBootChime() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.18, now);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
  masterGain.connect(ctx.destination);

  // Chord: C5 + E5 + G5 — a warm major triad
  const frequencies = [523.25, 659.25, 783.99];

  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0, now);
    // Stagger the attack slightly for a lush feel
    gain.gain.linearRampToValueAtTime(0.3 - i * 0.05, now + 0.08 + i * 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 2.2);
  });
}

// ── Boot loading tick ──────────────────────────────────────────────────────────
// A faint digital tick that plays during the boot progress bar — gives life to the loading.
export function playBootTick() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  // Slightly randomize pitch so it doesn't sound robotic
  osc.frequency.setValueAtTime(1200 + Math.random() * 300, now);

  gain.gain.setValueAtTime(0.015, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

// ── Dock click ─────────────────────────────────────────────────────────────────
// A short, soft "pop" when opening an app from the dock.
export function playDockClick() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.12);
}

// ── Window close ───────────────────────────────────────────────────────────────
// A soft descending tone when closing a window.
export function playWindowClose() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(350, now + 0.12);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.16);
}

// ── Message sent ───────────────────────────────────────────────────────────────
// A bright ascending "whoosh" when a message is sent successfully.
export function playMessageSent() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(500, now);
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.12);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
}

// ── Message received ───────────────────────────────────────────────────────────
// A gentle two-note "ding" when a reply message appears.
export function playMessageReceived() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  [660, 880].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.1);

    gain.gain.setValueAtTime(0, now + i * 0.1);
    gain.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.1);
    osc.stop(now + i * 0.1 + 0.22);
  });
}

// ── Key tick (terminal) ────────────────────────────────────────────────────────
// A very faint mechanical keystroke sound for the easter-egg terminal input.
export function playKeyTick() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(1800 + Math.random() * 400, now);

  gain.gain.setValueAtTime(0.03, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
}

// ── Copy to clipboard ──────────────────────────────────────────────────────────
// A quick chirp for the email copy action.
export function playCopySound() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1000, now);
  osc.frequency.setValueAtTime(1400, now + 0.06);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.14);
}

// ── Error / rate-limit ─────────────────────────────────────────────────────────
// A low "bonk" when something goes wrong.
export function playErrorSound() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.22);
}

// ── Section transition ─────────────────────────────────────────────────────────
// A very subtle ambient wash that plays when scrolling into a new section.
export function playSectionTransition() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.linearRampToValueAtTime(520, now + 0.3);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.04, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.65);
}

// ── Card hover hum ─────────────────────────────────────────────────────────────
// An almost subliminal low hum when hovering over project cards.
export function playCardHover() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.linearRampToValueAtTime(360, now + 0.15);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.025, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.22);
}

// ── Terminal command enter ──────────────────────────────────────────────────────
// A distinct "command accepted" beep when the user hits Enter in the terminal.
export function playCommandEnter() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  // Two quick beeps in sequence
  [1000, 1320].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    const t = now + i * 0.06;
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.06, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.06);
  });
}

// ── Notification bell ──────────────────────────────────────────────────────────
// A soft bell sound for toasts or notifications.
export function playNotificationBell() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  // Bell is a damped sine at a high freq with harmonics
  [1200, 2400, 3600].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    const vol = 0.08 / (i + 1); // harmonics are quieter
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.65);
  });
}

// ── Resume download / paper shuffle ────────────────────────────────────────────
// A quick broadband "shhhk" resembling paper being slid across a desk.
export function playPaperShuffle() {
  const ctx = ensureResumed();
  const now = ctx.currentTime;

  // White noise burst shaped like paper sliding
  const bufferSize = ctx.sampleRate * 0.18; // 180ms
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  // Bandpass filter to make it sound papery (not harsh white noise)
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(3000, now);
  filter.Q.setValueAtTime(0.8, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.start(now);
  source.stop(now + 0.2);
}
