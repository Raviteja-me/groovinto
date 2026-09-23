'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export type SceneVariant = 'hero' | 'course' | 'orb';

function Blob({ scale = 1.35, color = '#FF6A00', distort = 0.42, speed = 2.2 }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    ref.current.rotation.y = t * 0.12;
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.25;
  });
  return (
    <Float speed={1.3} rotationIntensity={0.35} floatIntensity={1.1}>
      <mesh ref={ref} scale={scale}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={speed}
          roughness={0.22}
          metalness={0.4}
          emissive="#7a2b00"
          emissiveIntensity={0.28}
        />
      </mesh>
    </Float>
  );
}

function Ring({ radius = 2.1, color = '#00C27A', tilt = 0.9, speed = 0.2 }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    ref.current.rotation.z = t * speed;
    ref.current.rotation.x = tilt + Math.sin(t * 0.3) * 0.15;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.012, 16, 200]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} roughness={0.4} />
    </mesh>
  );
}

function Shards({ count = 14 }) {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        pos: [(Math.random() - 0.5) * 7, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 3 - 1] as [number, number, number],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: 0.06 + Math.random() * 0.14,
        speed: 0.2 + Math.random() * 0.5,
        color: i % 3 === 0 ? '#00C27A' : i % 3 === 1 ? '#FF9F0D' : '#FF6A00'
      })),
    [count]
  );
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const it = items[i];
      child.rotation.x = it.rot[0] + t * it.speed;
      child.rotation.y = it.rot[1] + t * it.speed * 0.7;
      child.position.y = it.pos[1] + Math.sin(t * it.speed + i) * 0.25;
    });
  });
  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} scale={it.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={it.color} emissive={it.color} emissiveIntensity={0.8} roughness={0.3} metalness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Wireframe({ radius = 1.9, color = '#00C27A' }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.x = t * 0.08;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[radius, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.28} />
    </mesh>
  );
}

function Rig({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const targetY = state.pointer.x * strength;
    const targetX = -state.pointer.y * strength * 0.6;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, targetY, 3, delta);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, targetX, 3, delta);
  });
  return <group ref={ref}>{children}</group>;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#fff3e6" />
      <pointLight position={[-4, -2, 3]} intensity={28} color="#00C27A" />
      <pointLight position={[3, 2, -3]} intensity={34} color="#FF9F0D" />
    </>
  );
}

export default function Scene({ variant = 'hero', active = true, className }: { variant?: SceneVariant; active?: boolean; className?: string }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.6]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      frameloop={active ? 'always' : 'never'}
      style={{ background: 'transparent' }}
    >
      <Lights />
      <Rig>
        {variant === 'hero' && (
          <>
            <Blob />
            <Ring radius={2.15} />
            <Ring radius={2.6} color="#FF9F0D" tilt={-0.6} speed={-0.14} />
            <Shards count={16} />
            <Sparkles count={120} scale={9} size={2.2} speed={0.35} color="#FFC46B" opacity={0.7} />
          </>
        )}
        {variant === 'course' && (
          <>
            <Blob scale={1.05} distort={0.36} speed={1.8} />
            <Wireframe radius={1.85} />
            <Ring radius={2.4} color="#FF9F0D" tilt={1.2} speed={0.18} />
            <Sparkles count={80} scale={7} size={2} speed={0.3} color="#4DE0A8" opacity={0.6} />
          </>
        )}
        {variant === 'orb' && (
          <>
            <Blob scale={1.2} distort={0.3} speed={1.6} />
            <Sparkles count={60} scale={6} size={1.8} speed={0.25} color="#FFC46B" opacity={0.5} />
          </>
        )}
      </Rig>
    </Canvas>
  );
}
