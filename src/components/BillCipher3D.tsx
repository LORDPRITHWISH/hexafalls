import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Mesh, Group } from "three";
import { cn } from "@/lib/utils";

// Model component for Bill Cipher
function BillCipherModel(props) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);

  // Animation for Bill Cipher
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;

      if (clicked) {
        groupRef.current.rotation.z =
          Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
      }
    }
  });

  return (
    <group ref={groupRef} position={props.position || [0, 0, 0]}>
      {/* Bill's body - pyramid/triangle */}
      <mesh
        ref={meshRef}
        onClick={() => setClick(!clicked)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={clicked ? 1.2 : 1}
      >
        <cylinderGeometry args={[0, 1, 1.8, 3, 1]} />
        <meshStandardMaterial
          color={hovered ? "#ffcc00" : "#f9b72b"}
          metalness={0.8}
          roughness={0.2}
          emissive={clicked ? "#ffcc00" : "#f9b72b"}
          emissiveIntensity={clicked ? 0.5 : 0.2}
        />
      </mesh>

      {/* Bill's eye */}
      <mesh position={[0, 0, 0.7]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="white" />

        {/* Pupil */}
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </mesh>

      {/* Bill's limbs */}
      {[
        [-0.7, -0.3, 0] as [number, number, number], // Left arm
        [0.7, -0.3, 0] as [number, number, number], // Right arm
        [-0.4, -0.9, 0] as [number, number, number], // Left leg
        [0.4, -0.9, 0] as [number, number, number], // Right leg
      ].map((position, i) => (
        <mesh key={i} position={position}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
          <meshStandardMaterial color="black" />
        </mesh>
      ))}

      {/* Hat */}
      <mesh position={[0, 0.8, 0]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}

interface BillCipher3DProps {
  className?: string;
}

export default function BillCipher3D({ className }: BillCipher3DProps) {
  return (
    <div className={cn("relative w-full h-[500px]", className)}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]} // Optimize performance by setting device pixel ratio
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[-10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />

        <BillCipherModel position={[0, 0, 0]} />

        <Environment preset="night" />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
