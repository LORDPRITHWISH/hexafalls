import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  
  const particlesCount = 6000;
  

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      
      const radius = Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      
      const colorType = Math.random();
      if (colorType < 0.6) { 
        colors[i * 3] = 0.9;
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 1;
      } else if (colorType < 0.8) { 
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 0.8;
      } else if (colorType < 0.95) { 
        colors[i * 3] = 0.8;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 1;
      } else { 
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 0.8;
      }
      
      sizes[i] = Math.random() > 0.95 ? Math.random() * 3 + 2 : Math.random() * 1.5 + 0.5;
    }
    
    return [positions, colors, sizes];
  }, []);

  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
     
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
     
      starsRef.current.rotation.y += 0.0001;
     
      const time = state.clock.getElapsedTime();
      const colors = starsRef.current.geometry.attributes.color.array as Float32Array;
      const originalColors = colors.slice();
      
      for (let i = 0; i < particlesCount; i++) {
        if (Math.random() > 0.99) { 
          const i3 = i * 3;
          const twinkle = 0.5 + Math.sin(time * 10 + i) * 0.5;
          colors[i3] = originalColors[i3] * twinkle;
          colors[i3 + 1] = originalColors[i3 + 1] * twinkle;
          colors[i3 + 2] = originalColors[i3 + 2] * twinkle;
        }
      }
      
      starsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particlesCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation={true}
        map={starTexture}
        transparent={true}
        alphaMap={starTexture}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true }}
      >
        <Stars />
      </Canvas>
    </div>
  );
}