import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// ─── Config ──────────────────────────────────────────────
const SVG_URL = 'g7-ghostly.svg';
const SVG_W = 768, SVG_H = 1024;
const TOTAL_DEPTH = 400;      // Z spread — wide enough to see on orbit
const CURVE_SEGMENTS = 6;     // tessellation per bezier
const PATHS_PER_LAYER = 5;    // fine-grained layers for smooth Z compositing
const AUTO_ROTATE_SPEED = 0.3;

// ─── Scene ───────────────────────────────────────────────
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x040201);

const camera = new THREE.PerspectiveCamera(
  40, innerWidth / innerHeight, 1, 5000
);
camera.position.set(0, 0, 1680);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
// Preserve SVG colors — they're sRGB, renderer should output sRGB
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = false;
controls.autoRotateSpeed = AUTO_ROTATE_SPEED;

// ─── Post-processing: Bloom ─────────────────────────────
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight),
  0.2,    // strength — restrained halo
  0.9,    // radius — wide soft spread
  0.4     // threshold — only brighter fragments bloom
);
composer.addPass(bloomPass);

// ─── Shaders ─────────────────────────────────────────────
const VERT = /* glsl */ `
  attribute float aAlpha;
  attribute float aDepth;
  attribute vec3 aCenter;     // per-path centroid for scale origin

  varying vec3 vColor;
  varying float vAlpha;
  varying float vDepth;

  uniform float uTime;
  uniform float uDepth;
  uniform float uBreath;
  uniform float uDrift;
  uniform float uPulse;       // per-path scale pulse intensity
  uniform float uNoise;       // vertex noise displacement intensity

  // --- Simplex-ish value noise (compact, good enough for displacement) ---
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
           + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                             dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vColor = color;
    vAlpha = aAlpha;
    vDepth = aDepth;

    // Z position from stacking order
    float baseZ = aDepth * uDepth;

    // Breathing: layers oscillate in Z
    float breath = sin(uTime * 0.3 + aDepth * 20.0) * uBreath;

    // Gentle XY drift, stronger for upper layers
    float dx = sin(uTime * 0.2 + aDepth * 15.0) * aDepth * uDrift;
    float dy = cos(uTime * 0.25 + aDepth * 12.0) * aDepth * uDrift * 0.75;

    vec3 pos = position;
    pos.z += baseZ + breath;
    pos.x += dx;
    pos.y += dy;

    // Per-path scale pulse around centroid
    if (uPulse > 0.0) {
      float phase = aDepth * 137.51;
      float speed = 0.15 + aDepth * 0.25;
      float s = 1.0 + sin(uTime * speed + phase) * 0.4 * uPulse;

      vec3 local = pos - aCenter;
      pos = aCenter + local * s;
    }

    // Vertex noise: displace edges to break geometric regularity
    if (uNoise > 0.0) {
      // Distance from centroid — edges get more displacement than interior
      float dist = length(position.xy - aCenter.xy);
      float edgeFactor = smoothstep(0.0, 30.0, dist); // ramp up toward edges

      // Two octaves of noise, slowly crawling over time
      float n1 = snoise(pos.xy * 0.015 + uTime * 0.06);
      float n2 = snoise(pos.xy * 0.04  + uTime * 0.03 + 100.0) * 0.5;
      float n  = (n1 + n2) * uNoise * edgeFactor;

      pos.x += n * 4.0;
      pos.y += n * 3.5;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDepth;

  uniform float uTime;

  void main() {
    // Gentle brightness lift
    vec3 col = vColor * 1.1;

    // Subtle alpha pulse per-fragment
    float pulse = 0.92 + 0.08 * sin(uTime * 0.15 + vDepth * 12.0);
    gl_FragColor = vec4(col, vAlpha * pulse);
  }
`;

// ─── Load & Build ────────────────────────────────────────
const loadingEl = document.getElementById('loading');
let artGroup = null; // hoisted for animate access

// Seeded PRNG for reproducible random depth assignment
function mulberry32(seed) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

fetch(SVG_URL)
  .then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.text();
  })
  .then(svgText => {
    loadingEl.textContent = 'parsing paths…';
    setTimeout(() => buildScene(new SVGLoader().parse(svgText)), 0);
  })
  .catch(err => {
    loadingEl.textContent = `load error: ${err.message}`;
  });

function buildScene(data) {
  const svgPaths = data.paths;
  const total = svgPaths.length;
  loadingEl.textContent = `building ${total} shapes…`;

  // Pre-assign each path a random depth so Z isn't banded by layer
  const rng = mulberry32(42); // seeded PRNG for reproducibility
  const pathDepths = new Float32Array(total);
  for (let i = 0; i < total; i++) pathDepths[i] = rng();

  // Group into layers for depth-sorted transparency
  const numLayers = Math.ceil(total / PATHS_PER_LAYER);
  artGroup = new THREE.Group();
  let totalVerts = 0;

  for (let li = 0; li < numLayers; li++) {
    const start = li * PATHS_PER_LAYER;
    const end = Math.min(start + PATHS_PER_LAYER, total);
    const geometries = [];

    for (let pi = start; pi < end; pi++) {
      const p = svgPaths[pi];
      const color = p.color;
      const opacity = p.userData?.style?.fillOpacity ?? 1;
      const depth = pathDepths[pi]; // random 0–1 per path

      let shapes;
      try { shapes = SVGLoader.createShapes(p); }
      catch { continue; }

      for (const shape of shapes) {
        const geo = new THREE.ShapeGeometry(shape, CURVE_SEGMENTS);
        const n = geo.attributes.position.count;
        const posArr = geo.attributes.position.array;

        // Compute centroid of this shape
        let cx = 0, cy = 0, cz = 0;
        for (let v = 0; v < n; v++) {
          cx += posArr[v * 3];
          cy += posArr[v * 3 + 1];
          cz += posArr[v * 3 + 2];
        }
        cx /= n; cy /= n; cz /= n;

        const colors  = new Float32Array(n * 3);
        const alphas  = new Float32Array(n);
        const depths  = new Float32Array(n);
        const centers = new Float32Array(n * 3);

        for (let v = 0; v < n; v++) {
          colors[v * 3]     = color.r;
          colors[v * 3 + 1] = color.g;
          colors[v * 3 + 2] = color.b;
          alphas[v] = opacity;
          depths[v] = depth;
          centers[v * 3]     = cx;
          centers[v * 3 + 1] = cy;
          centers[v * 3 + 2] = cz;
        }

        geo.setAttribute('color',   new THREE.BufferAttribute(colors, 3));
        geo.setAttribute('aAlpha',  new THREE.BufferAttribute(alphas, 1));
        geo.setAttribute('aDepth',  new THREE.BufferAttribute(depths, 1));
        geo.setAttribute('aCenter', new THREE.BufferAttribute(centers, 3));
        geo.deleteAttribute('normal');
        geo.deleteAttribute('uv');

        geometries.push(geo);
      }
    }

    if (geometries.length === 0) continue;

    const merged = mergeGeometries(geometries, false);
    for (const g of geometries) g.dispose();
    if (!merged) continue;

    totalVerts += merged.attributes.position.count;

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime:   { value: 0 },
        uDepth:  { value: TOTAL_DEPTH },
        uBreath: { value: 3.0 },
        uDrift:  { value: 2.0 },
        uPulse:  { value: 1.0 },
        uNoise:  { value: 1.0 },  // vertex noise displacement (0 = off)
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexColors: true,
    });

    const mesh = new THREE.Mesh(merged, material);
    mesh.renderOrder = li; // back to front
    mesh.userData.layer = li;
    artGroup.add(mesh);
  }

  // SVG: Y=0 at top, Y grows down → flip Y,  center on origin
  artGroup.scale.set(1, -1, 1);
  artGroup.position.set(-SVG_W / 2, SVG_H / 2, -TOTAL_DEPTH / 2);

  scene.add(artGroup);

  // ─ Liminal background: giant gradient sphere ─────────────
  const bgGeo = new THREE.SphereGeometry(2500, 64, 64);
  const BG_VERT = /* glsl */ `
    varying vec3 vPos;
    void main() {
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const BG_FRAG = /* glsl */ `
    varying vec3 vPos;
    uniform float uTime;
    void main() {
      // Distance from center, normalized
      float d = length(vPos.xy) / 2500.0;
      // Very subtle warm center -> cold edge
      vec3 warm = vec3(0.035, 0.025, 0.02);   // dark amber
      vec3 cold = vec3(0.012, 0.012, 0.018);  // near-black blue
      vec3 col = mix(warm, cold, smoothstep(0.0, 0.8, d));
      // Ultra-subtle slow breathing
      col *= 0.95 + 0.05 * sin(uTime * 0.08 + d * 3.0);
      gl_FragColor = vec4(col, 1.0);
    }
  `;
  const bgMat = new THREE.ShaderMaterial({
    vertexShader: BG_VERT,
    fragmentShader: BG_FRAG,
    uniforms: { uTime: { value: 0 } },
    side: THREE.BackSide,
    depthWrite: false,
  });
  const bgSphere = new THREE.Mesh(bgGeo, bgMat);
  bgSphere.renderOrder = -1;
  scene.add(bgSphere);

  loadingEl.style.display = 'none';
  console.log(`Scene ready: ${numLayers} layers, ${totalVerts.toLocaleString()} vertices`);
}

// ─── Animate ─────────────────────────────────────────────
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Update all layer materials
  scene.traverse(obj => {
    if (obj.isMesh && obj.material.uniforms?.uTime) {
      obj.material.uniforms.uTime.value = t;
    }
  });

  // Subtle head gaze — drifts off-center then returns to stare
  if (artGroup) {
    // Irrational frequency ratios → non-repeating, organic pattern
    // Envelope: mostly near center, occasionally drifts to ~3°
    const envX = Math.sin(t * 0.031) * Math.cos(t * 0.017);
    const envY = Math.sin(t * 0.023) * Math.cos(t * 0.013);
    const tiltX = envX * Math.sin(t * 0.11 + 0.5) * 0.52;  // ~30° max
    const tiltY = envY * Math.sin(t * 0.08 + 1.7) * 0.42;  // ~24° max
    // Z roll for life
    const roll  = Math.sin(t * 0.019) * Math.sin(t * 0.07) * 0.1;
    artGroup.rotation.x = tiltX;  // scale.y=-1 handles flip
    artGroup.rotation.y = tiltY;
    artGroup.rotation.z = roll;
  }

  controls.update();
  composer.render();
}

animate();

// ─── Audio ───────────────────────────────────────────────
const startEl = document.getElementById('start');

startEl.addEventListener('click', async () => {
  await Tone.start();
  startEl.style.display = 'none';
  initAudio();
});

function initAudio() {
  Tone.Transport.bpm.value = 55;

  // Master chain: reverb → delay → out
  const reverb = new Tone.Reverb({ decay: 12, wet: 0.7 }).toDestination();
  const delay = new Tone.FeedbackDelay('8n.', 0.35).connect(reverb);
  delay.wet.value = 0.3;

  // ─ Texture pad: filtered noise bed instead of obvious drone
  const noise = new Tone.Noise('pink').start();
  const noiseFilter = new Tone.AutoFilter({
    frequency: 0.08,
    baseFrequency: 60,
    octaves: 3,
    depth: 0.8,
  }).connect(reverb).start();
  const noiseGain = new Tone.Gain(-28).connect(noiseFilter);
  // Tone.Gain takes dB via .gain.value
  noiseGain.gain.value = 0.04;
  noise.connect(noiseGain);

  // ─ Sub: deep sine pulse (the heartbeat — keep this)
  const sub = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.8, decay: 2, sustain: 0.3, release: 3 },
    volume: -16,
  }).connect(reverb);

  const subPattern = new Tone.Pattern((time, note) => {
    sub.triggerAttackRelease(note, '2n', time);
  }, ['C1', 'C1', 'Eb1', 'C1', 'F1', 'C1', 'G1', 'Bb0'], 'up');
  subPattern.interval = '2n';

  // ─ Kick: very sparse, quiet — just a ghost thud
  const kick = new Tone.MembraneSynth({
    pitchDecay: 0.12,
    octaves: 3,
    envelope: { attack: 0.01, decay: 1.2, sustain: 0, release: 1.0 },
    volume: -28,
  }).connect(reverb);

  const kickLoop = new Tone.Loop(time => {
    if (Math.random() < 0.35) {  // only 35% of the time
      kick.triggerAttackRelease('C1', '8n', time);
    }
  }, '1m');  // once per measure at most

  // ─ Shimmer: rare metallic whisper — NOT a loop
  const shimmer = new Tone.MetalSynth({
    frequency: 120,
    envelope: { attack: 0.05, decay: 2.0, release: 1.5 },
    harmonicity: 5.1,
    modulationIndex: 8,
    resonance: 1200,
    octaves: 0.5,
    volume: -36,
  }).connect(delay);

  const shimmerLoop = new Tone.Loop(time => {
    // Only 15% chance, every 2 measures — very rare
    if (Math.random() < 0.15) {
      const offset = Math.random() * 0.4;
      shimmer.triggerAttackRelease('32n', time + offset);
    }
  }, '2m');

  // ─ Bell: sparse high tones
  const bell = new Tone.FMSynth({
    harmonicity: 8,
    modulationIndex: 4,
    oscillator: { type: 'sine' },
    modulation: { type: 'square' },
    envelope: { attack: 0.01, decay: 3, sustain: 0, release: 2 },
    modulationEnvelope: { attack: 0.01, decay: 0.5, sustain: 0.2, release: 1 },
    volume: -26,
  }).connect(delay);

  const bellNotes = ['C5', 'Eb5', 'G5', 'Bb5', 'C6', 'Eb6'];
  const bellLoop = new Tone.Loop(time => {
    if (Math.random() < 0.4) {
      const note = bellNotes[Math.floor(Math.random() * bellNotes.length)];
      bell.triggerAttackRelease(note, '8n', time);
    }
  }, '4n');

  // ─ Breath: AM pad that slowly drifts — replaces the drone
  const breath = new Tone.AMSynth({
    harmonicity: 2,
    oscillator: { type: 'triangle' },
    modulation: { type: 'sine' },
    envelope: { attack: 8, decay: 2, sustain: 0.6, release: 10 },
    modulationEnvelope: { attack: 6, decay: 2, sustain: 0.8, release: 8 },
    volume: -24,
  }).connect(reverb);

  const breathNotes = ['C3', 'Eb3', 'G2', 'Bb2'];
  let breathIdx = 0;
  const breathLoop = new Tone.Loop(time => {
    breath.triggerAttackRelease(breathNotes[breathIdx % breathNotes.length], '8m', time);
    breathIdx++;
  }, '8m');  // very slow — one note every 8 measures

  // Start everything
  subPattern.start(0);
  kickLoop.start('2m');
  shimmerLoop.start('1m');
  bellLoop.start('2m');
  breathLoop.start(0);

  Tone.Transport.start();
}

// ─── Resize ──────────────────────────────────────────────
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
});
