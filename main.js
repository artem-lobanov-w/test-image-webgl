import * as THREE from "three";

async function loadShaderFile(url) {
  const response = await fetch(url);
  const shaderCode = await response.text();
  return shaderCode;
}

async function main() {
  let scene;
  let camera;
  let renderer;

  function scene_setup() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true } );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }

  scene_setup();

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("img/2a.png");
  const texture2 = textureLoader.load("img/2a.png");

  let varX = 0.1;
  let varY = 0.1;

  let uniforms = {
    mouse: { type: "v3", value: new THREE.Vector3() },
    mouseReal: { type: "v2", value: new THREE.Vector2() },
    pos: { type: "v2", value: new THREE.Vector2() },
    imageSize: { type: "v2", value: new THREE.Vector2(1402.0, 637.0) },
    tex: { type: "t", value: texture },
    tex2: { type: "t", value: texture2 },
    res: {
      type: "v2",
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    variable: { type: "v2", value: new THREE.Vector3(varX, varY) },
    videoTexture: { type: "t" },
  };

  const shaderCode = await loadShaderFile("glsl.glsl");

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: shaderCode,
  });

  let geometry = new THREE.PlaneGeometry(10, 10);
  let sprite = new THREE.Mesh(geometry, material);

  scene.add(sprite);
  camera.position.z = 2;

  const coords = { x: 0, y: 0 };
  const circles = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  let startX;
  let startY;
  let posX = 0;
  let posY = 0;

  window.addEventListener("mousedown", function (e) {
    startX = e.clientX + posX;
    startY = e.clientY + posY;
  });

  window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = -e.clientY + window.innerHeight;
    uniforms.mouseReal.value.x = coords.x;
    uniforms.mouseReal.value.y = coords.y;

    if (e.buttons === 1) {
      const x = e.clientX;
      const y = e.clientY;
      posX = startX - x;
      posY = startY - y;

      uniforms.pos.value.x = -posX;
      uniforms.pos.value.y = posY;
    }
  });

  uniforms.mouse.value.z = 0.05;

  function render() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
      uniforms.mouse.value.x = x;
      uniforms.mouse.value.y = y;
      circle.x = x;
      circle.y = y;

      uniforms.mouseReal.value.x = circle.x;
      uniforms.mouseReal.value.y = circle.y;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.91;
      y += (nextCircle.y - y) * 0.91;
    });

    uniforms.variable.value.x += 0.05;
    uniforms.variable.value.y += 0.05;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();

  document.onmousemove = function (event) {
    uniforms.mouse.value.x = event.clientX;
    uniforms.mouse.value.y = -event.clientY + window.innerHeight;
  };
}

main();
