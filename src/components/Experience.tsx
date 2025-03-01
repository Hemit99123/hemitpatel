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

  // First-person narratives for each model
  const modelDescriptions = {
    torii: "The torii gates represent my journey into Japanese culture. When I first visited Kyoto, walking through these gates at Fushimi Inari Shrine, I felt a connection to centuries of tradition. They symbolize my transition from the mundane to the spiritual world.\n\nI remember the humid summer air, the sound of cicadas, and the way sunlight filtered through thousands of vermilion gates. Each step I took under these structures felt like stepping deeper into a part of myself I didn't know existed. I've carried that feeling with me ever since, trying to find that same boundary between worlds in everything I do.",
    naruto: "My childhood obsession! Naruto taught me about perseverance and never giving up on my dreams. I spent countless weekends watching this anime, and it shaped how I approach challenges in my life.\n\nI identified deeply with Naruto's journey as an outsider who gradually earned respect through determination and hard work. The concept of 'ninja way' became my personal philosophy during difficult times in high school. When I feel like giving up, I still hear those familiar soundtrack notes and remember that with enough shadow clones (or late nights), any problem can be overcome.",
    indiaGate: "Standing before India Gate reminded me of my heritage. My grandparents told me stories of independence struggles. This monument represents my roots and the pride I carry with me wherever I go.\n\nDuring my first visit to Delhi, I touched its sandstone walls and felt the weight of history. My grandmother's father had participated in the freedom movement, and she always said our family's story was intertwined with India's story. The eternal flame there made me think about how identities persist through generations, even as we move across oceans and continents.",
    flagIndia: "The Indian flag represents my cultural identity. The saffron courage, white truth, and green fertility reflect values my parents instilled in me. When I see it wave, I'm reminded of where I came from.\n\nAs a child, I would participate in Independence Day celebrations at the local Indian community center, proudly holding miniature flags. Though I was raised abroad, my parents made sure I understood what each color and the Ashoka Chakra symbolized. These elements have become internal compasses guiding my decisions, reminding me to act with courage, seek truth, and nurture growth in everything I do.",
    diya: "During Diwali, I would help my mother place these oil lamps around our home. The warm glow of diyas represents how knowledge dispels ignorance in my life and the spiritual journey I'm on.\n\nThe ritual of making cotton wicks, pouring mustard oil, and carefully lighting each lamp created a meditative space in our otherwise hectic household. My mother would explain that outer light is just a reflection of inner illumination. In my most difficult moments, I visualize these small flames and remember that darkness, no matter how pervasive, always gives way to light. This simple clay lamp represents my faith in that cycle.",
    gada: "My father introduced me to stories of Hanuman and his legendary mace. This gada symbolizes inner strength I try to cultivate—physical and mental power used responsibly.\n\nDuring Sunday mornings, we would watch Ramayana episodes together, and I was always fascinated by Hanuman's perfect balance of humility and power. In high school, I started weight training, and my father jokingly called my progress 'building my gada.' It became our metaphor for developing strength of character. Now, whenever I face ethical dilemmas, I think about wielding this symbolic mace with both restraint and courage.",
    maple: "The maple leaf reminds me of my college years in Canada. Those autumn walks through red-orange forests taught me to appreciate seasonal changes and transitions in life.\n\nI arrived in Toronto during fall semester, and the campus was ablaze with colors I'd never seen before. Coming from a tropical climate, watching leaves transform and fall was mesmerizing. I collected and pressed leaves in my textbooks, each one marking a different phase of my academic journey. Now, I see life's transitions differently—not as endings but as necessary preparations for renewal, just like those maple trees prepared for winter only to flourish again.",
    avro: "Aviation has always fascinated me. The Avro Arrow represents Canadian innovation that inspired my engineering studies. I built model airplanes as a child, dreaming of designing my own someday.\n\nMy aerospace professor shared the Arrow's story—a marvel of engineering canceled before reaching its potential. It became a powerful metaphor during my thesis project when funding was cut. Rather than abandoning my work, I found alternative approaches, determined not to let my 'Arrow' meet the same fate. The resilience I developed through that experience has served me well in my career, reminding me that technical excellence sometimes needs to be paired with strategic persistence.",
    totemPole: "Learning about Indigenous Canadian art opened my eyes to storytelling through symbols. This totem pole reminds me that my own life story is connected to ancestors and community.\n\nDuring a cultural exchange program, I was invited to witness a totem raising ceremony. The elder explained how each figure represented not just characters but relationships—between humans, animals, and the natural world. It fundamentally changed how I think about identity. I realized that who I am isn't just about personal achievement but about my connections to family, mentors, and even strangers who've shaped my path. The vertical nature of the pole reminds me that these connections span generations.",
    cnTower: "My first apartment overlooked this iconic tower. Late nights working on projects with this view taught me about urban life and ambition. It represents the vertical growth I seek in my career.\n\nI remember watching its lights change colors during special events while coding until dawn. Sometimes when stuck on difficult problems, I'd look up at this engineering marvel and find perspective. My tiny coding challenges seemed manageable compared to building something so massive yet graceful. Now whenever I start a new project, I think about the CN Tower's construction—how it was built methodically, section by section, just as great software is built function by function."
  };

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
          rotation-y={-1.80 * Math.PI}
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