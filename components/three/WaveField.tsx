'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  varying float vHeight;
  varying float vRipple;

  void main() {
    vec3 p = position;
    float t = uTime * 0.6;
    float wave = sin(p.x * 0.45 + t) * 0.55
               + cos(p.y * 0.6 + t * 0.8) * 0.45
               + sin((p.x + p.y) * 0.25 + t * 1.3) * 0.35;

    float d = distance(p.xy, uMouse);
    float ripple = exp(-d * 0.55) * sin(d * 2.6 - uTime * 4.0) * 0.9;
    p.z = wave + ripple;

    vHeight = p.z;
    vRipple = exp(-d * 0.5);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.2 + vRipple * 3.0) * uPixelRatio * (12.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uOrange;
  uniform vec3 uAmber;
  uniform vec3 uMint;
  varying float vHeight;
  varying float vRipple;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, r);
    float h = clamp((vHeight + 1.2) / 2.4, 0.0, 1.0);
    vec3 col = mix(uOrange, uAmber, h);
    col = mix(col, uMint, smoothstep(0.1, 0.9, vRipple));
    gl_FragColor = vec4(col, alpha * (0.35 + h * 0.65));
  }
`;

export default function WaveField({ cols = 170, rows = 70, width = 34, depth = 16 }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(100, 100));
  const { camera, gl } = useThree();

  const geometry = useMemo(() => {
    const positions = new Float32Array(cols * rows * 3);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions[i++] = (c / (cols - 1) - 0.5) * width;
        positions[i++] = (r / (rows - 1) - 0.5) * depth;
        positions[i++] = 0;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [cols, rows, width, depth]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(100, 100) },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.6) },
      uOrange: { value: new THREE.Color('#FF6A00') },
      uAmber: { value: new THREE.Color('#FFC46B') },
      uMint: { value: new THREE.Color('#00C27A') }
    }),
    [gl]
  );

  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const hit = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value += delta;
    // Project the cursor onto the wave's ground plane.
    ray.setFromCamera(state.pointer, camera);
    if (ray.ray.intersectPlane(plane, hit)) {
      // mesh is rotated -90deg on X, so world (x, z) maps to local (x, -y)
      mouse.current.lerp(new THREE.Vector2(hit.x, -hit.z), 0.12);
      mat.current.uniforms.uMouse.value.copy(mouse.current);
    }
  });

  return (
    <points geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
