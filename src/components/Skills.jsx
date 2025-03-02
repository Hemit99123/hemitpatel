// @ts-nocheck
import { Text3D, Box, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";
import { gridItems } from "../data/grid";

const loadTexture = (url) => {
  const textureLoader = new THREE.TextureLoader();
  return textureLoader.load(url);
};

const GridItem = ({ position, item, setSelected }) => {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.lerp(new THREE.Vector3(...position), 0.1);
    }
  });

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[3, 3, 0.2]}
      onClick={() => setSelected(item)}
    >
      <Text3D
        font="./fonts/Poppins-Black.json"
      >
        {item.skill}
      </Text3D>
    </Box>
  );
};

export const Experience3 = () => {
  const [selected, setSelected] = useState(null);

  const handleReset = () => {
    setSelected(null);
  };



  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Text3D position={[-1, 3.5, 0]} font="./fonts/Poppins-Black.json" size={1}>
        My Skills
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </Text3D>
      {selected ? (
        <Html position={[-3.5, 2, 0]} className="w-screen">
    <div className="relative max-w-2xl w-full bg-gradient-to-br from-white/90 to-white/50 p-8 rounded-3xl shadow-2xl space-y-6 border border-white/20">
      <div className="flex gap-8">
        {/* Image Section */}
        <div className="w-1/3 aspect-square rounded-2xl overflow-hidden shadow-lg">
          <img 
            src={selected.imageUrl} 
            alt={selected.skill}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Text Content */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {selected.skill}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            {selected.description}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button 
          onClick={handleReset}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-3 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-pink-500/20 rounded-full blur-xl"></div>
    </div>
</Html>
      ) : (
        <group position={[2, -3.5, 0]}>
          {gridItems.map((item) => (
            <GridItem key={item.id} item={item} position={item.position} setSelected={setSelected} />
          ))}
        </group>
      )}
    </>
  );
};

export const App = () => {
  return <Experience3 />;
};
