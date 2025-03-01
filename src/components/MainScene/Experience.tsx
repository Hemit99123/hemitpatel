// @ts-nocheck

import { Environment, OrbitControls, Html } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Torii } from "./models/Torii";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useState, useEffect } from "react";
import Sun from "./models/Sun";
import { CharacterController } from "./CharacterController";
import { Stage } from "./Stage";
import { Background } from "./models/Background";
import { Naruto } from "./models/Naruto";
import { Portal } from "./models/Portal";
import { IndiaGate } from "./models/IndiaGate";
import { FlagIndia } from "./models/FlagIndia";
import { Diya } from "./models/Diya";
import { Gada } from "./models/Gada";
import { Maple } from "./models/Maple";
import { Avro } from "./models/Avro";
import { TotemPole } from "./models/TotemPole";
import { CNTower } from "./models/CNTower";
import { modelDescriptions } from "@/data/model";

// Component for the full-screen modal (rendered outside the canvas)
const FullScreenModal = ({ modelName, description, onClose }) => {
  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed w-96 inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 ">
      <div className="bg-white w-full p-8 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <h2 className="text-3xl font-bold mb-4 text-purple-800 text-center">{modelName}</h2>
        <p className="text-lg leading-relaxed mb-6 text-center">{description}</p>
        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for an interactive model with cursor pointer and full-screen modal
const InteractiveModel = ({ children, position, rotation, scale, modelName, description }) => {
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { gl } = useThree();
  
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  return (
    <>
      <group
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Add subtle highlight effect when hovered */}
        {hovered && (
          <mesh position={[0, 0, 0]} scale={1.05}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="#9e69da" transparent opacity={0.2} />
          </mesh>
        )}
        
        {/* The 3D model */}
        {children}
      </group>
      
      {/* Full-screen modal rendered outside the canvas */}
      {showModal && (
        <Html portal={gl.domElement.parentNode}>
          <FullScreenModal
            modelName={modelName}
            description={description}
            onClose={() => setShowModal(false)}
          />
        </Html>
      )}
    </>
  );
};

export const Experience = () => {
  const { scene } = useThree();
  scene.background = new THREE.Color("#e3daf7");

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={1.2} />
      <directionalLight position={[8, 8, 8]} intensity={0.6} castShadow color={"#9e69da"} />
      
      {/* BACKGROUND GROUND */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[70, 70]} />
        <meshBasicMaterial color="#e3daf7" toneMapped={false} />
      </mesh>

      <Sun />
      <Background position={[0, -1.8, -17]} />

      {/* INTERACTIVE ELEMENTS */}
      <InteractiveModel 
        position={[0, 2.5, -26]} 
        rotation-y={1.25 * Math.PI} 
        scale={[20, 20, 20]}
        modelName="Torii Gates"
        description={modelDescriptions.torii}
      >
        <Torii />
      </InteractiveModel>
      
      <InteractiveModel 
        position={[-11, 1.2, -24]} 
        rotation-y={1.4 * Math.PI} 
        scale={[13, 13, 13]}
        modelName="Torii Gates"
        description={modelDescriptions.torii}
      >
        <Torii />
      </InteractiveModel>

      <InteractiveModel 
        position={[0, 1.2, -15]}
        scale={[0.3, 0.3, 0.3]}
        modelName="Naruto"
        description={modelDescriptions.naruto}
      >
        <Naruto />
      </InteractiveModel>
      
      <InteractiveModel 
        position={[11, 1.2, -24]} 
        rotation-y={Math.PI} 
        scale={[13, 13, 13]}
        modelName="Torii Gates"
        description={modelDescriptions.torii}
      >
        <Torii />
      </InteractiveModel>

      {/* INDIA CULTURE */}
      <InteractiveModel 
        position={[-9, 0, -2]} 
        rotation-y={1.25 * Math.PI} 
        scale={[0.2, 0.2, 0.2]}
        modelName="India Gate"
        description={modelDescriptions.indiaGate}
      >
        <IndiaGate />
      </InteractiveModel>
      
      <InteractiveModel 
        position={[-15, -3, -15]} 
        scale={[3, 3, 3]}
        modelName="Indian Flag"
        description={modelDescriptions.flagIndia}
      >
        <FlagIndia />
      </InteractiveModel>
      
      <InteractiveModel 
        position={[-10, -0.2, 1]} 
        scale={[0.3, 0.3, 0.3]}
        modelName="Diya"
        description={modelDescriptions.diya}
      >
        <Diya />
      </InteractiveModel>
      
      <InteractiveModel 
        position={[-7, 0, 2.5]} 
        rotation-y={1.25 * Math.PI}
        scale={[4, 4, 4]}
        modelName="Gada"
        description={modelDescriptions.gada}
      >
        <Gada />
      </InteractiveModel>

      {/* STAGE */}
      <RigidBody colliders={false} type="fixed" position-y={-0.7} friction={2.4}>
        <Stage scale={[1.35, 1.2, 1.2]} position={[0.5, 0, 0]} />
        <Portal position={[3.5, 1.2, -3.5]} text="Me" text_x={0.1} text_y={0.8} />
        <Portal position={[-2.5, 1.2, -3.5]} text="Vibe" text_x={-0.05} text_y={0.8} />
        <Portal position={[3.5, 1.2, 3.5]} text="Skills" text_x={-0.01} text_y={1} />
        <Portal position={[-3, 1.2, 3.5]} text="Coping" text_x={0} text_y={1} />

        {/* Use CuboidCollider instead for a solid collision surface */}
        <CuboidCollider
          args={[6, 0.06, 6]} // [half-width, half-height, half-depth]
          position={[0.5, 0.07, 0]} // Slightly raised to avoid sinking
        />

        {/* CANADIAN CULTURE */}
        <InteractiveModel 
          position={[12, 1, -11]} 
          rotation-y={-1.25 * Math.PI} 
          scale={[0.15, 0.15, 0.15]}
          modelName="Maple Leaf"
          description={modelDescriptions.maple}
        >
          <Maple />
        </InteractiveModel>
        
        <InteractiveModel 
          position={[12, 0, -6]} 
          scale={[0.25, 0.25, 0.25]}
          modelName="Avro Arrow"
          description={modelDescriptions.avro}
        >
          <Avro />
        </InteractiveModel>
        
        <InteractiveModel 
          position={[14, -15.5, -5]} 
          rotation-y={-1.80 * Math.PI}
          scale={[15, 15, 15]}
          modelName="Totem Pole"
          description={modelDescriptions.totemPole}
        >
          <TotemPole />
        </InteractiveModel>
        
        <InteractiveModel 
          position={[20, 0, -15]} 
          scale={[0.35, 0.35, 0.35]}
          modelName="CN Tower"
          description={modelDescriptions.cnTower}
        >
          <CNTower />
        </InteractiveModel>
        
        <CharacterController />
      </RigidBody>
    </>
  );
};