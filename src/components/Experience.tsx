import { Environment } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Torii } from "./models/Torii";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import Sun from "./models/Sun";
import { CharacterController } from "./CharacterController";
import { Stage } from "./Stage";
import { Background } from "./models/Background";
import { Naruto } from "./models/Naruto";

export const Experience = () => {
  const { scene } = useThree();
  scene.background = new THREE.Color("#e3daf7");

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={1} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.4}
        castShadow
        color={"#9e69da"}
      />
      {/* BACKGROUND GROUND */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#e3daf7" toneMapped={false} />
      </mesh>

      <Sun />

      <Background position={[0,-1.5,-13]}/>

      {/* INTERACTIVE ELEMENTS */}
      <Torii scale={[16, 16, 16]} position={[0, 2, -22]} rotation-y={1.25 * Math.PI} />
      <Torii scale={[10, 10, 10]} position={[-8, 0.8, -20]} rotation-y={1.4 * Math.PI} />

      <Naruto scale={[0.2,0.2,0.2]} position={[0, 0.8, -13]}/>
      <Torii scale={[10, 10, 10]} position={[8, 0.8, -20]} rotation-y={Math.PI} />

      {/* STAGE */}
      <RigidBody 
  colliders={false} 
  type="fixed" 
  position-y={-0.5} 
  friction={2}
>
  <Stage scale={[0.9, 0.9, 0.9]} position={[0.5, 0, 0]} />
  
  {/* Use CuboidCollider instead for a solid collision surface */}
  <CuboidCollider 
    args={[4.5, 0.05, 4.5]} // [half-width, half-height, half-depth]
    position={[0.5, 0.05, 0]} // Slightly raised to avoid sinking
  />
  
  <CharacterController/>
</RigidBody>

    </>
  );
};