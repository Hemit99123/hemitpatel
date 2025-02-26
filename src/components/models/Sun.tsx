import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null!);

  // Animate rotation to give a subtle burning effect
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={sunRef} position={[-10, 10, -40]}> {/* Move sun to the top-right */}
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        emissive={"#ffcc00"} // Glowing yellow
        emissiveIntensity={5}
        color={"#ffaa00"}
        roughness={0.4}
      />
      <pointLight color={"#ffcc00"} intensity={4} distance={20} />
    </mesh>
  );
};

export default Sun;
