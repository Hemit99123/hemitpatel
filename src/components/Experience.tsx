import {
    Cylinder,
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
  
    // Cursor feedback
    useCursor(hovered);
  
    // Click handler
    const handleClick = useCallback(() => {
      alert("You clicked a Torii gate!");
    }, []);
  
    // Define natural cloud positions (x, y) while keeping z fixed
    const cloudPositions = [
      { position: [-15, 12, -40] },  // Slightly to the left and higher
      { position: [10, 7, -40] },   // To the right, lower altitude
      { position: [-5, 9, -40] },   // Centered, middle height
      { position: [5, 11, -40] },   // Slightly right, higher
      { position: [12, 10, -40] },  // Right side, middle height
    ];
  
    return (
      <>
        <OrbitControls />
        {/* LIGHTS */}
        <ambientLight intensity={1} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          color={"#9e69da"}
        />
  
        {/* BACKGROUND */}
        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[400, 400]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#dbecfb"
            metalness={0.6}
            roughness={1}
          />
        </mesh>
  
        <Sun />
  
        {/* Add multiple clouds at more natural positions */}
        {cloudPositions.map((cloud, index) => (
          <Cloud key={index} scale={[1, 1, 1]} position={cloud.position} />
        ))}
  
        {/* INTERACTIVE TORII GATES */}
        <Torii
          scale={[16, 16, 16]}
          position={[0, 0, -22]}
          rotation-y={1.25 * Math.PI}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        />
        <Torii
          scale={[10, 10, 10]}
          position={[-8, 0, -20]}
          rotation-y={1.4 * Math.PI}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        />
        <Torii
          scale={[10, 10, 10]}
          position={[8, 0, -20]}
          rotation-y={Math.PI}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        />
  
        <group position-y={-1}>
          {/* STAGE */}
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
  