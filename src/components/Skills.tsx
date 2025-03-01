// @ts-nocheck
import { Text3D, Box, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";

const loadTexture = (url) => {
  const textureLoader = new THREE.TextureLoader();
  return textureLoader.load(url);
};

const GridItem = ({ position, size, item, setSelected, hoveredItem, setHoveredItem }) => {
  const meshRef = useRef();
  const isHovered = hoveredItem?.id === item.id;
  const isSelected = setSelected?.id === item.id;

  const targetPosition = [...position];
  if (isHovered || isSelected) {
    targetPosition[2] = 0.5;
  }

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x += (targetPosition[0] - meshRef.current.position.x) * 0.1;
      meshRef.current.position.y += (targetPosition[1] - meshRef.current.position.y) * 0.1;
      meshRef.current.position.z += (targetPosition[2] - meshRef.current.position.z) * 0.1;

      if (isHovered) {
        meshRef.current.rotation.y += 0.01;
      } else {
        meshRef.current.rotation.y *= 0.95;
      }
    }
  });

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[3,3, 0.2]}
      onPointerOver={() => setHoveredItem(item)}
      onPointerOut={() => setHoveredItem(null)}
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
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleReset = () => {
    setSelected("")
  }

  const gridItems = [
    { id: 1, position: [-4, 4, 0], size: { width: 3, height: 3 }, imageUrl: "https://plus.unsplash.com/premium_photo-1672837630994-5c0a5f890fd8?q=80&w=2355&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", skill: "D", description: "d" },
    { id: 2, position: [0, 4, 0], size: { width: 3, height: 3 }, imageUrl: "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", skill: "D", description: "d" },
    { id: 3, position: [4, 4, 0], size: { width: 2, height: 2 }, imageUrl: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=2403&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", skill: "D", description: "d" },
    { id: 4, position: [-4, 0, 0], size: { width: 2, height: 2 }, imageUrl: "https://source.unsplash.com/400x400/?forest", skill: "D", description: "d" },
    { id: 5, position: [0, 0, 0], size: { width: 2, height: 2 }, imageUrl: "https://source.unsplash.com/400x400/?mountain", skill: "D", description: "d" },
    { id: 6, position: [4, 0, 0], size: { width: 2, height: 2 }, imageUrl: "https://source.unsplash.com/400x400/?desert", skill: "D", description: "d" },
    { id: 7, position: [-4, -4, 0], size: { width: 2, height: 2 }, imageUrl: "https://source.unsplash.com/400x400/?space", skill: "D", description: "d" },
    { id: 8, position: [0, -4, 0], size: { width: 2, height: 2 }, imageUrl: "https://source.unsplash.com/400x400/?abstract", skill: "D", description: "d" },
    { id: 9, position: [4, -4, 0], size: { width: 2, height: 2 }, imageUrl: "https://source.unsplash.com/400x400/?abstract", skill: "D", description: "d" }
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
  <Html position={[2, 0, 0]} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
   <h1 className="text-2xl font-bold">{selected.skill}</h1>
   <div className="max-w-xl">
    <p className="">{selected.description}</p>
   </div>
   <button onClick={handleReset} className="bg-black rounded-lg text-white py-2 px-5">Cancel</button>
        
  </Html>
) : (
  <group position={[2, -3.5, 0]}>
    {gridItems.map((item) => (
      <GridItem
        key={item.id}
        item={item}
        position={item.position}
        size={item.size}
        setSelected={setSelected}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
      />
    ))}
  </group>
)}


    </>
  );
};

export const App = () => {
  return <Experience3 />;
};
