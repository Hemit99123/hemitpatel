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
    <mesh ref={sunRef} position={[-25,4,-50]}> {/* Move sun to the top-right */}
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        emissive={"#ffcc00"} // Glowing yellow
        emissiveIntensity={2}
        color={"#ffaa00"}
        roughness={0.4}
      />
    </mesh>
  );
};

export default Sun;
