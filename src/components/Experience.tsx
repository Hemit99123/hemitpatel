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
import {Portal}  from "./models/Portal";
import { IndiaGate } from "./models/IndiaGate";
import { FlagIndia } from "./models/FlagIndia";
import { Diya } from "./models/Diya";
import { Gada } from "./models/Gada";
import { Maple } from "./models/Maple";
import { Avro } from "./models/Avro";
import { TotemPole } from "./models/TotemPole";
import { CNTower } from "./models/CNTower";

export const Experience = () => {
  const { scene } = useThree();
  scene.background = new THREE.Color("#e3daf7");

  return (
    <>
    <OrbitControls />
      <Environment preset="sunset" />
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

      {/* INDIA CULTURE */}
      <IndiaGate scale={[0.2,0.2,0.2]} position={[-9,0,-2]} rotation-y={1.25 * Math.PI} />
      <FlagIndia scale={[3,3,3]} position={[-15,-3,-15]}/>
      <Diya scale={[0.3,0.3,0.3]} position={[-10, -0.2, 1]}/>
      <Gada scale={[4,4,4]} position={[-7, 0, 2.5]} rotation-y={1.25 * Math.PI}/>

      {/* STAGE */}
      <RigidBody 
        colliders={false} 
        type="fixed" 
        position-y={-0.7} 
        friction={2.4}
      >
      <Stage scale={[1.35, 1.2, 1.2]} position={[0.5, 0, 0]} />
      <Portal position={[3.5,1.2,-3.5]} text="Me" text_x={0.1} text_y={0.8}/>
      <Portal position={[-2.5,1.2,-3.5]} text="Vibe" text_x={-0.05} text_y={0.8}/>
      <Portal position={[3.5,1.2,3.5]} text="Skills" text_x={-0.01} text_y={1}/>
      <Portal position={[-3,1.2,3.5]} text="Coping" text_x={0} text_y={1}/>


  {/* Use CuboidCollider instead for a solid collision surface */}
  <CuboidCollider 
    args={[6, 0.06, 6]} // [half-width, half-height, half-depth]
    position={[0.5, 0.07, 0]} // Slightly raised to avoid sinkingwas
  />
  
    {/* CANADIAN CULTURE */}
    <Maple scale={[0.15,0.15,0.15]} position={[12,1,-11]} rotation-y={-1.25 * Math.PI}  />
    <Avro scale={[0.25,0.25, 0.25]} position={[12,0,-6]} rotation-y={-1.80 * Math.PI}/>
    <TotemPole scale={[15,15,15]} position={[14,-15.5,-5]} rotation-y={-1.80 * Math.PI}/>
    <CNTower scale={[0.35,0.35,0.35]} position={[20,0,-15]} />
  <CharacterController/>
</RigidBody>

    </>
  );
};
