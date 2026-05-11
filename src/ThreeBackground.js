import * as THREE from "three";

export function initThreeBackground(canvas) {
  if (!canvas) return;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    500,
  );
  camera.position.z = 28;
  const geo = new THREE.BufferGeometry();
  const N = 500;
  const pos = new Float32Array(N * 3),
    col = new Float32Array(N * 3);
  for (let i = 0; i < N * 3; i += 3) {
    pos[i] = (Math.random() - 0.5) * 90;
    pos[i + 1] = (Math.random() - 0.5) * 90;
    pos[i + 2] = (Math.random() - 0.5) * 40;
    const t = Math.random();
    if (t < 0.33) {
      col[i] = 0.75;
      col[i + 1] = 0.22;
      col[i + 2] = 0.17;
    } else if (t < 0.66) {
      col[i] = 0.1;
      col[i + 1] = 0.23;
      col[i + 2] = 0.36;
    } else {
      col[i] = 0.83;
      col[i + 1] = 0.63;
      col[i + 2] = 0.09;
    }
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const pts = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    }),
  );
  scene.add(pts);
  const rings = [
    new THREE.Mesh(
      new THREE.TorusGeometry(8, 0.3, 6, 32),
      new THREE.MeshBasicMaterial({
        color: 0xc0392b,
        wireframe: true,
        transparent: true,
        opacity: 0.04,
      }),
    ),
    new THREE.Mesh(
      new THREE.TorusGeometry(14, 0.2, 6, 40),
      new THREE.MeshBasicMaterial({
        color: 0x1a3a5c,
        wireframe: true,
        transparent: true,
        opacity: 0.03,
      }),
    ),
  ];
  rings[0].position.set(-12, 8, -15);
  rings[1].position.set(16, -6, -20);
  rings.forEach((r) => scene.add(r));
  let mx = 0,
    my = 0;

  const handleMouseMove = (e) => {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
  };
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  document.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", handleResize);

  let animationFrameId;
  (function animate() {
    animationFrameId = requestAnimationFrame(animate);
    const t = Date.now() * 0.0005;
    pts.rotation.y = t * 0.025;
    pts.rotation.x = t * 0.01;
    rings[0].rotation.x = t * 0.12;
    rings[0].rotation.z = t * 0.08;
    rings[1].rotation.y = t * 0.09;
    rings[1].rotation.x = t * 0.06;
    camera.position.x += (mx * 3 - camera.position.x) * 0.015;
    camera.position.y += (-my * 3 - camera.position.y) * 0.015;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  })();

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("resize", handleResize);
    cancelAnimationFrame(animationFrameId);
    renderer.dispose();
  };
}
