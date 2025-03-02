// @ts-nocheck
import { Text3D, Box, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";

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
      <meshStandardMaterial
        map={loadTexture(item.imageUrl)}
        color={"#ffffff"}
        metalness={0.5}
        roughness={0.2}
      />
    </Box>
  );
};

export const Experience3 = () => {
  const [selected, setSelected] = useState(null);

  const handleReset = () => {
    setSelected(null);
  };

  const gridItems = [
    { id: 1, position: [-4, 4, 0], imageUrl: "https://plus.unsplash.com/premium_photo-1672837630994-5c0a5f890fd8?q=80&w=2355&auto=format&fit=crop", skill: "Communication", description: "d" },
    { id: 2, position: [0, 4, 0], imageUrl: "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?q=80&w=2942&auto=format&fit=crop", skill: "Problem solving", description: "d" },
    { id: 3, position: [4, 4, 0], imageUrl: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=2403&auto=format&fit=crop", skill: "Writing", description: "d" },
    { id: 4, position: [-4, 0, 0], imageUrl: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=3087&auto=format&fit=crop", skill: "Leadership", description: "d" },
    { id: 5, position: [0, 0, 0], imageUrl: "https://images.unsplash.com/photo-1620424393934-04e772be09f4?q=80&w=3087&auto=format&fit=crop", skill: "Critical thinking", description: "d" },
    { id: 6, position: [4, 0, 0], imageUrl: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=3163&auto=format&fit=crop", skill: "Time Management", description: "d" },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Text3D position={[-1, 3.5, 0]} font="./fonts/Poppins-Black.json" size={1}>
        My Skills
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </Text3D>
      {selected ? (
        <Html position={[0, 0, 0]}>
          <div className="w-screen">
            <h1 className="text-2xl font-bold">{selected.skill}</h1>
            <div className="max-w-xl">
              <p>{selected.description}</p>
            </div>
            <button onClick={handleReset} className="bg-black rounded-lg text-white py-2 px-5">Cancel</button>
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
