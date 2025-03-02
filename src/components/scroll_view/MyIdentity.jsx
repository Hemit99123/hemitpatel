// @ts-nocheck

import { Html, Text3D } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Iceberg } from "../models/Iceberg";
import { useEffect, useState, useRef } from "react";
import { Water } from "../models/Water";
import Image from "next/image";

// Define topics with images and descriptions
const topics = {
  Name: {
    text: "My name is Hemit Patel. In accordance to tradition, my aunt named me. My name comes from Hindu/Sanskrit tradition and means great friend.",
    image: "/images/hemit.png", // Example local image path
  },
  Appearance: {
    text: "I am 6 feet. I wear glasses, braces (light cyan), and have black thick hair. My hairstyle varies as I experiment a lot with it! I have some facial hair (goatee). I prefer to wear non-branded hoodies but I enjoy wearing formal attires like suits. They have a certain level of elegance which I enjoy and I feel pride when I am in one, like above.",
    image: "/images/me!.png", // Example local image path
  },
  Occupation: {
    text: "My occupation is a student who is studying to become a Software Engineer/AI Researcher. I hope to run a technology consultation firm while completing a Ph.D in the AI domain. Eventually, I wish to combine both my AI research and my firm together. Below check out some of my works.",
    image: "/images/mecoding2.png", // Example local image path
    works: [
      { name: "DailySAT", url: "https://dailysat.org/about" },
      { name: "StockSavvy", url: "https://stocksavvy-frontend.vercel.app" },
    ],
  },
  Hobby: {
    text: "The gym is really the only hobby I have. I am currently doing the PPL split, where I train my chest/triceps, back/biceps and lower body. I go to Gore Meadows Fitness but formerly attended Weightroom club.",
    image: "/images/gym2.png", // Example local image path
  },
  Values: {
    text: "The most important value I hold is family. W/o my family, I am nothing. They are the ones who provide for me, not only financially but also emotionally. They are there, regardless of what I did because they truly love me for me. My brother (pictured above) is particualry important because he provides me with non-judgemental company.",
    image: "/images/family.png", // Example local image path
  },
  Beliefs: {
    text: "The most important belief I hold is Hinduism/Sanatan Dharma. Pictured above is when I went to visit Akshardham in New Jersey. My religon brings me peace. I also learn a lot of ancient Hindu literature about life and EVEN SCIENCE!",
    image: "/images/mandir.png", // Example local image path
  },
  Experiences: {
    text: "Life experiences shape who you are, providing lessons through challenges. Personally, I was a coach for my brother's basketball team. It taught me discipline because there were many times, I did not want to go but I did anyways. Patience as well, because it took time for them to properly understand drills.",
    image: "/images/mecoaching.png", // Example local image path
  },
  "Hobby 2": {
    text: "Another hobby I truly enjoy is travelling. I have gone to 5 countries so far (🇺🇸, 🇲🇽, 🇩🇴, 🇮🇳, 🇧🇸) I find it fulfilling exploring the world and understanding how others live/cultures. In the image above, we went to Paradise Island, Nassau, Bahamas",
    image: "/images/bahamas.png", // Example local image path
  },
};

function Modal({ onClose, children, image, occupationWorks }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y: 0 });
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
        className="bg-white p-6 rounded-lg max-w-lg w-full text-center shadow-lg flex justify-center items-center flex-col"
      >
        {image && <Image src={image} alt={children} width={400} height={100} className="mb-4 rounded-lg" />}
        <div className="w-full">
          {children}
        </div>
        {occupationWorks && occupationWorks.length > 0 && (
          <div className="">
            {occupationWorks.map((work, index) => (
              <button
                key={index}
                onClick={() => window.open(work.url, "_blank")}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition ml-2"
              >
                {work.name}
              </button>
            ))}
          </div>
        )}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
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
    gl.domElement.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    gl.domElement.style.cursor = "auto";
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
        <Html position={[-9, 2, 0]}>
          <Modal
            onClose={handleCloseModal}
            image={topics[selectedTopic]?.image}
            occupationWorks={selectedTopic === "Occupation" ? topics[selectedTopic].works : null}
          >
            <h2 className="text-3xl font-bold">{selectedTopic}</h2>
            <div className="bg-blue-100 rounded-lg p-4 mt-4">
              <p className="text-lg">{topics[selectedTopic].text}</p>
            </div>
          </Modal>
        </Html>
      )}
    </>
  );
}
