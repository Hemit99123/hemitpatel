import { OrbitControls, Text3D } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Iceberg } from "../models/Iceberg";
import { useEffect } from "react";
import { Water } from "../models/Water";

export default function IdentityIceberg() {
  const { gl, scene } = useThree();

  useEffect(() => {
    scene.background = null; // Removes the cube-like background
    gl.setClearColor(0x000000, 0); // Makes the background transparent
    scene.fog = null;
  }, [scene, gl]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={3} />
      <group position={[6, 1, -20]}>
        <Iceberg scale={[2.5, 2.5, 2.5]} position={[0, -1.5, 1]} />
        <Water position={[0, -4, 0]} />

        {/* Surface-level texts (above the water) */}
        <Text3D font="./fonts/Poppins-Black.json" position={[6, 2, 4]}  rotation-y={1.80 * Math.PI}>
          Name
          <meshStandardMaterial color="black" toneMapped={false} />
        </Text3D>
        <Text3D font="./fonts/Poppins-Black.json" position={[-6,3, 0]}>
          Appearance
          <meshStandardMaterial color="black" toneMapped={false} />
        </Text3D>
        <Text3D font="./fonts/Poppins-Black.json" position={[-25, 3, -2]}>
          Occupation
          <meshStandardMaterial color="black" toneMapped={false} />
        </Text3D>
        <Text3D font="./fonts/Poppins-Black.json" position={[14,-1, 2]} rotation-y={1.80 * Math.PI}>
          Hobbies
          <meshStandardMaterial color="black" toneMapped={false} />
        </Text3D>

        {/* Deep-level texts (below the water) */}
        <Text3D font="./fonts/Poppins-Black.json" position={[10, -8, 0]}>
          Values
          <meshStandardMaterial color="black" toneMapped={false} />
        </Text3D>
        <Text3D font="./fonts/Poppins-Black.json" position={[15, -10, 1]}  rotation-y={1.80 * Math.PI}>
          Beliefs
          <meshStandardMaterial color="black" toneMapped={false} />
        </Text3D>
        <Text3D font="./fonts/Poppins-Black.json" position={[-25, -10, -1]}>
          Experiences
          <meshStandardMaterial color="black" toneMapped={false} />
        </Text3D>
        <Text3D font="./fonts/Poppins-Black.json" position={[-20, -12, 0]}>
          Inner Self
          <meshStandardMaterial color="black" toneMapped={false} />
        </Text3D>
      </group>
    </>
  );
}
