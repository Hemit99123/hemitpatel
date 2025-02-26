import { useGLTF } from "@react-three/drei";
import React from "react";

export function Torii(props: any) {
  const { nodes, materials } = useGLTF("./models/model.glb");

  return (
    <group {...props} dispose={null}>
      {/* @ts-ignore */}
      <mesh geometry={nodes["Node-Mesh"].geometry} material={materials.mat23} />
      {/* @ts-ignore */}
      <mesh geometry={nodes["Node-Mesh_1"].geometry} material={materials.mat14} />
    </group>
  );
}

useGLTF.preload("../models/model.glb");
