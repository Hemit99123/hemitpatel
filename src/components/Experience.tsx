import { Environment, OrbitControls } from "@react-three/drei";
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
      <OrbitControls />
      <ambientLight intensity={1.2} />
      <directionalLight
        position={[8, 8, 8]}
        intensity={0.6}
        castShadow
        color={"#9e69da"}
      />
      {/* BACKGROUND GROUND */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[70, 70]} />
        <meshBasicMaterial color="#e3daf7" toneMapped={false} />
      </mesh>

      <Sun />

      <Background position={[0,-1.8,-17]}/>

      {/* INTERACTIVE ELEMENTS */}
      <Torii scale={[20, 20, 20]} position={[0, 2.5, -26]} rotation-y={1.25 * Math.PI} />
      <Torii scale={[13, 13, 13]} position={[-11, 1.2, -24]} rotation-y={1.4 * Math.PI} />

      <Naruto scale={[0.3,0.3,0.3]} position={[0, 1.2, -15]}/>
      <Torii scale={[13, 13, 13]} position={[11, 1.2, -24]} rotation-y={Math.PI} />

      {/* STAGE */}
      <RigidBody 
  colliders={false} 
  type="fixed" 
  position-y={-0.7} 
  friction={2.4}
>
  <Stage scale={[1.2, 1.2, 1.2]} position={[0.5, 0, 0]} />
  
  {/* Use CuboidCollider instead for a solid collision surface */}
  <CuboidCollider 
    args={[6, 0.06, 6]} // [half-width, half-height, half-depth]
    position={[0.5, 0.07, 0]} // Slightly raised to avoid sinking
  />
  
  <CharacterController/>
</RigidBody>

    </>
  );
};
