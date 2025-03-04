/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

//@ts-nocheck

import { useGLTF } from "@react-three/drei";
import React from "react";

export function Stage(props) {
  const { nodes, materials } = useGLTF("./models/stage.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.footing_02.geometry}
        material={materials["Material.037"]}
        position={[0.07, 0.16, -0.09]}
        scale={4.92}
      >
        <mesh
          geometry={nodes.footing.geometry}
          material={materials["Material.036"]}
          position={[-0.01, -0.07, 0.02]}
          scale={1.03}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/stage.gltf");