// @ts-nocheck
import { Text3D, Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";

const loadTexture = (url) => {
  const textureLoader = new THREE.TextureLoader();
  return textureLoader.load(url);
};

const GridItem = ({ position, size, id, imageUrl }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const targetPosition = [...position];
  if (hovered || clicked) {
    targetPosition[2] = 0.5;
  }

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x += (targetPosition[0] - meshRef.current.position.x) * 0.1;
      meshRef.current.position.y += (targetPosition[1] - meshRef.current.position.y) * 0.1;
      meshRef.current.position.z += (targetPosition[2] - meshRef.current.position.z) * 0.1;

      if (hovered) {
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
      args={[3, 3, 0.2]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        setClicked(!clicked);
        alert(`Skill ${id} selected!`);
      }}
    >
      <meshStandardMaterial
        map={loadTexture(imageUrl)}
        color={"#ffffff"}
        metalness={0.5}
        roughness={0.2}
      />
    </Box>
  );
};

export const Experience3 = () => {
    const gridItems = [
      { id: 1, position: [-4, 4, 0], size: { width: 3, height: 3 }, imageUrl: "https://plus.unsplash.com/premium_photo-1672837630994-5c0a5f890fd8?q=80&w=2355&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 2, position: [0, 4, 0], size: { width: 3, height: 3 }, imageUrl: "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 3, position: [4, 4, 0], size: { width: 2, height: 2 }, imageUrl: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=2403&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 4, position: [-4, 0, 0], size: { width: 2, height: 2 }, imageUrl: "https://source.unsplash.com/400x400/?forest" },
      { id: 5, position: [0, 0, 0], size: { width: 2, height: 2 }, imageUrl: "https://source.unsplash.com/400x400/?mountain" },
      { id: 6, position: [4, 0, 0], size: { width: 2, height: 2 }, imageUrl: "https://source.unsplash.com/400x400/?desert" },
      { id: 7, position: [-4, -4, 0], size: { width: 2, height: 2 }, imageUrl: "https://source.unsplash.com/400x400/?space" },
      { id: 8, position: [0, -4, 0], size: { width: 2, height: 2 }, imageUrl: "https://source.unsplash.com/400x400/?abstract" },
      { id: 9, position: [4, -4, 0], size: { width: 2, height: 2 }, imageUrl: "https://source.unsplash.com/400x400/?abstract" }
    ];
  
    return (
      <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Text3D position={[-1, 3.5, 0]} font="./fonts/Poppins-Black.json" size={1}>
          My Skills
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </Text3D>
        {/* Wrap grid items in a group with an offset */}
        <group position={[2, -3.5, 0]}>
          {gridItems.map((item) => (
            <GridItem
              key={item.id}
              id={item.id}
              position={item.position}
              size={item.size}
              imageUrl={item.imageUrl}
            />
          ))}
        </group>
      </>
    );
  };
  
  export const App = () => {
    return <Experience3 />;
  };
  