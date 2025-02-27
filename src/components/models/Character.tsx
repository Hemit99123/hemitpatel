// @ts-nocheck

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useCharacterStore } from "../store/character";

export default function Character(props) {
  const group  = useRef();
  const { nodes, materials, animations } = useGLTF("./models/character.gltf");
  const characterState = useCharacterStore((state) => state.characterState)
  const { actions } = useAnimations(animations, group)

  // play the animation made in blender
  useEffect(() => {
    actions[characterState]?.reset().fadeIn(0.2).play()

    return () => {
      actions[characterState]?.fadeOut(0,2);
    }
  }, [characterState])

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.64}>
        <primitive object={nodes.LeftFootCtrl} />
        <primitive object={nodes.RightFootCtrl} />
        <primitive object={nodes.HipsCtrl} />
        <skinnedMesh
          geometry={nodes.characterMedium.geometry}
          material={materials["skin.001"]}
          skeleton={nodes.characterMedium.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./models/character.gltf");
