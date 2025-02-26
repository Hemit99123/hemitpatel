import {
  Cylinder,
  Environment,
  OrbitControls,
  useCursor,
  Html,
} from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { Torii } from "./models/Torii";
import { useThree } from "@react-three/fiber";
import { useState, useEffect } from "react";
import * as THREE from "three";
import Sun from "./models/Sun";
import { Cloud } from "./models/Cloud";

export const Experience = () => {
  const { camera, scene } = useThree();
  
  scene.background = new THREE.Color("#87CEEB")
  const [cameraPos, setCameraPos] = useState(camera.position.clone());

  useEffect(() => {
    const updateCameraPosition = () => {
      setCameraPos(camera.position.clone());
    };

    const interval = setInterval(updateCameraPosition, 100);
    return () => clearInterval(interval);
  }, [camera]);

  return (
    <>
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
      {[[-15, 2, -30], [10, 4, -30], [-5, 3, -30], [5, 11, -30], [12, 3, -30]].map((pos, index) => (
        <Cloud key={index} scale={[1, 1, 1]} position={pos} />
      ))}

      {/* INTERACTIVE ELEMENTS */}
      <Torii scale={[16, 16, 16]} position={[0, 2, -22]} rotation-y={1.25 * Math.PI} />
      <Torii scale={[10, 10, 10]} position={[-8, 0.8, -20]} rotation-y={1.4 * Math.PI} />
      <Torii scale={[10, 10, 10]} position={[8, 0.8, -20]} rotation-y={Math.PI} />

      <group position-y={-1}>
        <RigidBody colliders={false} type="fixed" position-y={-0.5} friction={2}>
          <CylinderCollider args={[1 / 2, 5]} />
          <Cylinder scale={[5, 1, 5]} receiveShadow>
            <meshStandardMaterial color="white" />
          </Cylinder>
        </RigidBody>
      </group>
    </>
  );
};
