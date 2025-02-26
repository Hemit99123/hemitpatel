import {
  Cylinder,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  useCursor,
} from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { Torii } from "./models/Torii";
import { useThree } from "@react-three/fiber";
import { useState, useCallback } from "react";
import * as THREE from "three";
import Sun from "./models/Sun";
import { Cloud } from "./models/Cloud";
  
export const Experience = () => {
  const { scene } = useThree();
  scene.background = new THREE.Color("#87CEEB");

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const handleClick = useCallback(() => {
    alert("You clicked a Torii gate!");
  }, []);

  // Adjusted cloud positions: brought a bit closer (z = -30)
  const cloudPositions = [
    { position: [-15, 12, -30] },
    { position: [10, 7, -30] },
    { position: [-5, 9, -30] },
    { position: [5, 11, -30] },
    { position: [12, 10, -30] },
  ];

  return (
    <>
      <OrbitControls />

      <Environment preset="sunset" />
      <ambientLight intensity={1} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.3}
        castShadow
        color={"#9e69da"}
      />

      {/* BACKGROUND GROUND */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#87CEEB" toneMapped={false} />
      </mesh>

      <Sun />

      {/* CLOUDS */}
      {cloudPositions.map((cloud, index) => (
        <Cloud key={index} scale={[1, 1, 1]} position={cloud.position} />
      ))}

      {/* INTERACTIVE ELEMENTS */}
      {/* Moving these elements closer to the origin so they’re more in view */}
      <Torii
        scale={[1, 1, 1]}
        position={[0, -1.5, -17]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      <Torii
        scale={[10, 10, 10]}
        position={[-6, -1, -15]}
        rotation-y={1.4 * Math.PI}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      <Torii
        scale={[10, 10, 10]}
        position={[6, -1, -15]}
        rotation-y={Math.PI}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      <group position-y={-1}>
        <RigidBody
          colliders={false}
          type="fixed"
          position-y={-0.5}
          friction={2}
        >
          <CylinderCollider args={[1 / 2, 5]} />
          <Cylinder scale={[5, 1, 5]} receiveShadow>
            <meshStandardMaterial color="white" />
          </Cylinder>
        </RigidBody>
      </group>
    </>
  );
};
