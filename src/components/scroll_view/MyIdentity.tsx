// @ts-nocheck

import { Html, Text3D } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Iceberg } from "../models/Iceberg";
import { useEffect, useState, useRef } from "react";
import { Water } from "../models/Water";

const topics = {
  Name: "Your name is a key part of your identity. It can reflect your heritage, culture, and personal history.",
  Appearance: "Your physical appearance is often the first impression people have of you. It includes features, clothing, and style.",
  Occupation: "Your job or career can be a defining part of your identity, shaping your daily life and sense of purpose.",
  Hobbies: "Hobbies reflect your interests and passions, providing enjoyment and a sense of fulfillment.",
  Values: "Your core values guide your decisions and behaviors, shaping your moral compass and interactions.",
  Beliefs: "Beliefs influence your worldview, religious perspectives, and the principles you uphold in life.",
  Experiences: "Life experiences shape who you are, providing lessons and personal growth through challenges and successes.",
  "Inner Self": "The inner self represents your true thoughts, emotions, and sense of identity beyond external influences."
};

function Modal({ onClose, children }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault(); // Prevent text selection or other behaviors
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: position.x + e.movementX,
        y: position.y + e.movementY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const modal = modalRef.current;
    modal?.addEventListener("mousemove", handleMouseMove);
    modal?.addEventListener("mouseup", handleMouseUp);
    modal?.addEventListener("mouseleave", handleMouseUp);

    return () => {
      modal?.removeEventListener("mousemove", handleMouseMove);
      modal?.removeEventListener("mouseup", handleMouseUp);
      modal?.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, position]);

  return (
    <div
      className="fixed w-screen inset-0 flex items-center justify-center bg-opacity-75 cursor-move"
      onMouseDown={handleMouseDown}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg max-w-lg w-full text-center"
      >
        {children}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function IdentityIceberg() {
  const { gl, scene } = useThree();
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handlePointerOver = () => {
    gl.domElement.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    gl.domElement.style.cursor = 'auto';
  };


  useEffect(() => {
    scene.background = null;
    gl.setClearColor(0x000000, 0);
    scene.fog = null;
  }, [scene, gl]);

  const handleOpenModal = (topic) => {
    setSelectedTopic(topic);
  };

  const handleCloseModal = () => {
    setSelectedTopic(null);
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={3} />
      <group position={[6, 1, -20]}>
        <Iceberg scale={[2.5, 2.5, 2.5]} position={[0, -1.5, 1]} />
        <Water position={[0, -4, 0]} />

        {/* Labels with click event */}
        {Object.keys(topics).map((topic, index) => {
          const positions = [
            [6, 2, 4], [-6, 3, 0], [-25, 3, -2], [14, -1, 2],
            [10, -8, 0], [15, -10, 1], [-25, -10, -1], [-20, -12, 0]
          ];
          const colors = ["red", "blue", "green", "orange", "purple", "yellow", "pink", "brown"];

          return (
            <Text3D
              key={topic}
              font="./fonts/Poppins-Black.json"
              position={positions[index]}
              rotation-y={index % 2 === 0 ? 1.8 * Math.PI : 0}
              onClick={() => handleOpenModal(topic)}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}         
            >
              {topic}
              <meshStandardMaterial color={colors[index]} toneMapped={false} />
            </Text3D>
          );
        })}
      </group>

      {/* Modal for displaying information */}
      {selectedTopic && (
        <Html position={[-9,2,0]}>
          <Modal onClose={handleCloseModal}>
            <h2 className="text-3xl font-bold">{selectedTopic}</h2>
            <p className="mt-4">{topics[selectedTopic]}</p>
          </Modal>
        </Html>
      )}
    </>
  );
}
