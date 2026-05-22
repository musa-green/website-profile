/* hero3d.js - MUSA Green homepage hero
 * Stylized industrial digital twin: factory blocks, emission stacks
 * with rising particle plumes, pulsing sensor nodes, slow auto-rotation
 * with mouse parallax. Mid-fidelity, self-contained, uses Three.js r128.
 *
 * Usage:  <div id="hero3d"></div>  +  <script src="assets/hero3d.js"></script>
 */
(function () {
  const mount = document.getElementById("hero3d");
  if (!mount || typeof THREE === "undefined") return;

  const W = () => mount.clientWidth;
  const H = () => mount.clientHeight;

  // ---- Scene basics
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x062F41, 24, 60);

  const camera = new THREE.PerspectiveCamera(38, W() / H(), 0.1, 200);
  camera.position.set(14, 10, 18);
  camera.lookAt(0, 1.4, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);

  // ---- Lighting
  scene.add(new THREE.AmbientLight(0x6E92A0, 0.65));
  const key = new THREE.DirectionalLight(0xCDEBE6, 1.0);
  key.position.set(8, 14, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x548e9b, 0.7);
  rim.position.set(-10, 6, -8);
  scene.add(rim);

  // ---- Ground grid (digital-twin baseplate)
  const grid = new THREE.GridHelper(40, 40, 0x548e9b, 0x1B4D63);
  grid.material.transparent = true;
  grid.material.opacity = 0.28;
  grid.position.y = 0;
  scene.add(grid);

  // soft glow disc beneath
  const discGeo = new THREE.CircleGeometry(14, 64);
  const discMat = new THREE.MeshBasicMaterial({ color: 0x548e9b, transparent: true, opacity: 0.06 });
  const disc = new THREE.Mesh(discGeo, discMat);
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = 0.01;
  scene.add(disc);

  // ---- Site root (we tilt-rotate this whole group)
  const site = new THREE.Group();
  scene.add(site);

  // material palette
  const matBuilding = new THREE.MeshStandardMaterial({ color: 0x14536B, roughness: 0.85, metalness: 0.05 });
  const matRoof = new THREE.MeshStandardMaterial({ color: 0x0E4456, roughness: 0.9 });
  const matStack = new THREE.MeshStandardMaterial({ color: 0xC4D3D6, roughness: 0.6, metalness: 0.2 });
  const matStackBand = new THREE.MeshStandardMaterial({ color: 0xE76A4A, roughness: 0.7 });
  const matTank = new THREE.MeshStandardMaterial({ color: 0xA5B7BB, roughness: 0.6, metalness: 0.25 });
  const matAccent = new THREE.MeshStandardMaterial({ color: 0x548e9b, emissive: 0x548e9b, emissiveIntensity: 0.25, roughness: 0.4 });

  // helper to add a building
  function building(x, z, w, d, h, roof = true) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), matBuilding);
    b.position.set(x, h / 2, z);
    site.add(b);
    if (roof) {
      const r = new THREE.Mesh(new THREE.BoxGeometry(w * 0.98, 0.1, d * 0.98), matRoof);
      r.position.set(x, h + 0.05, z);
      site.add(r);
    }
    return b;
  }

  // ---- Buildings layout (compact "estate")
  building(-4, -2, 4, 3, 2.2);
  building(-4, 2, 4, 3, 2.2);
  const main = building(0.5, 0, 5.5, 6, 3.0);
  building(5, -2.5, 3, 2.5, 1.8);
  building(5, 1.5, 3, 2.5, 2.4);

  // pipes on main roof
  for (let i = 0; i < 3; i++) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 4.6, 16), matStack);
    p.position.set(-1.4 + i * 1.2, 3.15, 0);
    p.rotation.z = Math.PI / 2;
    site.add(p);
  }

  // ---- Emission stacks (the centerpiece)
  const stacks = [];
  function stack(x, z, height) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, height, 24), matStack);
    body.position.y = height / 2;
    g.add(body);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.3, 24), matStackBand);
    band.position.y = height - 0.6;
    g.add(band);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.32, 0.18, 24), matStack);
    cap.position.y = height + 0.05;
    g.add(cap);
    g.position.set(x, 0, z);
    site.add(g);
    stacks.push({ group: g, top: height + 0.1 });
    return g;
  }
  stack(-3.8, -3.6, 5.0);
  stack(-3.8, 0.4, 4.4);
  stack(0.5, -3.0, 6.0);

  // ---- Storage tanks (cylinders)
  function tank(x, z, r, h) {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 28), matTank);
    t.position.set(x, h / 2, z);
    site.add(t);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r * 1.02, 0.04, 8, 32), matAccent);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x, h * 0.55, z);
    site.add(ring);
  }
  tank(5.2, 3.6, 0.9, 2.2);
  tank(7.2, 3.6, 0.7, 1.6);

  // ---- Emission particle plumes for each stack
  const plumes = [];
  const plumeColors = [0xE76A4A, 0xF2B544, 0xE76A4A]; // alert / warn / alert
  stacks.forEach((s, i) => {
    const count = 140;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count); // per-particle phase
    for (let p = 0; p < count; p++) {
      positions[p * 3 + 0] = (Math.random() - 0.5) * 0.3;
      positions[p * 3 + 1] = Math.random() * 4.0;
      positions[p * 3 + 2] = (Math.random() - 0.5) * 0.3;
      seeds[p] = Math.random();
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
    const mat = new THREE.PointsMaterial({
      color: plumeColors[i % plumeColors.length],
      size: 0.32,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geom, mat);
    points.position.copy(s.group.position);
    points.position.y = s.top;
    site.add(points);
    plumes.push({ points, geom, count });
  });

  // ---- Sensor nodes - pulsing rings around the site
  const sensors = [];
  function sensor(x, z, severity) {
    const colors = { good: 0x4FB04F, warn: 0xF2B544, alert: 0xE76A4A };
    const c = colors[severity] || 0x548e9b;
    const group = new THREE.Group();
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8), matStack);
    stem.position.y = 0.6;
    group.add(stem);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.9 }));
    head.position.y = 1.25;
    group.add(head);
    // ring (pulse)
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.18, 0.22, 32),
      new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.7, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(0, 0.02, 0);
    group.add(ring);
    group.position.set(x, 0, z);
    site.add(group);
    sensors.push({ ring, head, phase: Math.random() * Math.PI * 2 });
  }
  sensor(-2.2, 3.2, "good");
  sensor(2.2, -4.0, "warn");
  sensor(6.6, -2.6, "good");
  sensor(-5.6, -3.2, "alert");
  sensor(7.6, 1.2, "good");

  // ---- Slight initial tilt for isometric feel
  site.rotation.x = 0.0;
  site.rotation.y = -0.25;

  // ---- Mouse parallax
  let mouseX = 0, mouseY = 0, targetRotY = -0.25, targetTiltX = 0;
  mount.addEventListener("mousemove", (e) => {
    const r = mount.getBoundingClientRect();
    mouseX = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouseY = ((e.clientY - r.top) / r.height) * 2 - 1;
  });
  mount.addEventListener("mouseleave", () => { mouseX = 0; mouseY = 0; });

  // ---- Resize
  function resize() {
    renderer.setSize(W(), H());
    camera.aspect = W() / H();
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);

  // ---- Animate
  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();
    const dt = clock.getDelta();
    const atm = window.__musaAtmosphere || { speed: 1, opacity: 1, rise: 1, pulse: 1 };

    // Auto rotation + mouse parallax (smoothed) - speed factor from tweaks
    targetRotY = -0.25 + t * 0.04 * atm.speed + mouseX * 0.25;
    targetTiltX = 0.02 + mouseY * 0.06;
    site.rotation.y += (targetRotY - site.rotation.y) * 0.06;
    site.rotation.x += (targetTiltX - site.rotation.x) * 0.06;

    // animate particle plumes (rise + reset) - rise + opacity factor
    plumes.forEach((pl) => {
      pl.points.material.opacity = 0.55 * atm.opacity;
      const pos = pl.geom.attributes.position.array;
      for (let i = 0; i < pl.count; i++) {
        pos[i * 3 + 1] += (0.018 + (i % 5) * 0.003) * atm.rise;
        // gentle drift
        pos[i * 3 + 0] += Math.sin(t * 0.6 + i) * 0.0015;
        pos[i * 3 + 2] += Math.cos(t * 0.6 + i * 0.7) * 0.0015;
        if (pos[i * 3 + 1] > 4.2) {
          pos[i * 3 + 0] = (Math.random() - 0.5) * 0.3;
          pos[i * 3 + 1] = 0;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        }
      }
      pl.geom.attributes.position.needsUpdate = true;
    });

    // sensor pulses - pulse factor
    sensors.forEach((s, i) => {
      const phase = t * 1.4 * atm.pulse + s.phase;
      const scale = 1 + (Math.sin(phase) * 0.5 + 0.5) * 2.2;
      s.ring.scale.setScalar(scale);
      s.ring.material.opacity = Math.max(0, 0.7 - (scale - 1) * 0.3);
      s.head.material.emissiveIntensity = 0.6 + Math.sin(phase * 1.6) * 0.4;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
