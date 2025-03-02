// @ts-nocheck

import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Iceberg } from "../models/Iceberg";
import { useEffect } from "react";
import Sun from "../models/Sun";
import { Water } from "../models/Water";

export default function Ocean() {
  const { gl, scene } = useThree();

  useEffect(() => {
    scene.background = null; // Removes the cube-like background
    gl.setClearColor(0x000000, 0); // Makes the background transparent
    scene.fog = null
  }, [scene, gl]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <OrbitControls minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
      <group position={[0, 1, -20]}>
        <Iceberg scale={[2.5, 2.5, 2.5]} position={[0, -1.5, 2]} />
        <Water position={[0, -1, 0]} />
      </group>
    </>
  );
}
