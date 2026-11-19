'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const outMp3 = path.join(root, 'assets', 'bgm-loop.mp3');
const SR = 44100;
const BPM = 86;
const beat = 60 / BPM;
const noteLen = beat * 0.32;
const gap = beat * 1.28;
const pitches = [392, 440, 493.88, 523.25, 440, 392, 349.23, 392, 440];
const count = pitches.length;
const hazePeriod = beat * 4;
const hazeNotes = [587.33, 659.25, 783.99];
const tail = beat * 1.8;
const duration = Math.max((count - 1) * gap + noteLen + tail, hazePeriod * 2);
const samples = Math.round(duration * SR);
const left = new Float32Array(samples);
const right = new Float32Array(samples);

function pluckEnv(x) {
  if (x < 0 || x >= 1) return 0;
  return Math.min(1, x / 0.05) * Math.exp(-x * 7.5);
}

function breathe(pos) {
  if (pos <= 0 || pos >= 1) return 0;
  return Math.pow(Math.sin(Math.PI * pos), 1.6);
}

for (let i = 0; i < samples; i++) {
  const t = i / SR;
  let mixL = 0;
  let mixR = 0;
  const haze = breathe((t % hazePeriod) / hazePeriod);
  if (haze > 0.002) {
    const h = hazeNotes[(Math.floor(t / hazePeriod) % hazeNotes.length)];
    const tone = Math.sin(2 * Math.PI * h * t) * haze * 0.012;
    mixL += tone * 0.98;
    mixR += tone * 1.02;
  }
  for (let n = 0; n < count; n++) {
    const start = n * gap;
    const x = (t - start) / noteLen;
    const e = pluckEnv(x);
    if (!e) continue;
    const f = pitches[n];
    const w = 2 * Math.PI * f * t;
    const tone = Math.sin(w) * e * 0.118;
    mixL += tone * (n % 2 === 0 ? 0.96 : 1.02);
    mixR += tone * (n % 2 === 0 ? 1.02 : 0.96);
  }
  const fade = Math.min(1, t / 0.05, (duration - t) / 0.35);
  left[i] = mixL * fade;
  right[i] = mixR * fade;
}

const pcm = new Int16Array(samples * 2);
for (let i = 0; i < samples; i++) {
  pcm[i * 2] = Math.max(-32767, Math.min(32767, Math.round(left[i] * 32767 * 0.44)));
  pcm[i * 2 + 1] = Math.max(-32767, Math.min(32767, Math.round(right[i] * 32767 * 0.44)));
}

let mp3;
try {
  const vm = require('node:vm');
  const lameCode = fs.readFileSync(require.resolve('lamejs/lame.all.js'), 'utf8');
  const ctx = { console, Int8Array, Int16Array, Uint8Array, Float32Array, Math, Array, Error };
  vm.runInNewContext(`${lameCode};this.__lame=lamejs;`, ctx);
  const enc = new ctx.__lame.Mp3Encoder(2, SR, 128);
  const sampleCount = pcm.length / 2;
  const block = 1152;
  const parts = [];
  for (let o = 0; o < sampleCount; o += block) {
    const n = Math.min(block, sampleCount - o);
    const L = new Int16Array(n);
    const R = new Int16Array(n);
    for (let j = 0; j < n; j++) {
      L[j] = pcm[(o + j) * 2];
      R[j] = pcm[(o + j) * 2 + 1];
    }
    const buf = enc.encodeBuffer(L, R);
    if (buf?.length) parts.push(Buffer.from(buf));
  }
  const end = enc.flush();
  if (end?.length) parts.push(Buffer.from(end));
  mp3 = Buffer.concat(parts);
} catch (err) {
  console.error(err);
  process.exit(1);
}
fs.mkdirSync(path.dirname(outMp3), { recursive: true });
fs.writeFileSync(outMp3, mp3);
console.log(`Wrote ${outMp3} (${mp3.length} bytes, ~${duration.toFixed(1)}s, thin sine + high haze)`);