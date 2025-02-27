import { Cylinder, Environment, OrbitControls, useCursor, Html, } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { Torii } from "./models/Torii";
import { useThree } from "@react-three/fiber";
import { useState, useEffect } from "react";
import * as THREE from "three";
import Sun from "./models/Sun";
import { CharacterController } from "./CharacterController";
import { Stage } from "./Stage";
import { Background } from "./models/Background";

export const Experience = () => {
  const { scene } = useThree();
  scene.background = new THREE.Color("#e3daf7");

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} castShadow color={"#9e69da"} />

      {/* BACKGROUND GROUND */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#e3daf7" toneMapped={false} />
      </mesh>

      <Sun />

      <Background position={[0,-1.5,-10]}/>

      {/* INTERACTIVE ELEMENTS */}
      <Torii scale={[16, 16, 16]} position={[0, 2, -22]} rotation-y={1.25 * Math.PI} />
      <Torii scale={[10, 10, 10]} position={[-8, 0.8, -20]} rotation-y={1.4 * Math.PI} />
      <Torii scale={[10, 10, 10]} position={[8, 0.8, -20]} rotation-y={Math.PI} />

      {/* STAGE */}
      <RigidBody colliders={false} type="fixed" position-y={-0.5} friction={2}>
        <Stage scale={[0.9, 0.9, 0.9]} position={[0.5, 0, 0]} />
        
        {/* CharacterController stays here and will not move */}
        <RigidBody type="fixed" position={[0, 1, 0]}>
          <CharacterController />
        </RigidBody>
      </RigidBody>
    </>
  );
};