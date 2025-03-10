/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./public/models/maple.gltf 
Author: bimboxbob (https://sketchfab.com/bimboxbob)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/canadian-leaf-b9198ec97d1848948c3be62b5b569085
Title: Canadian Leaf
*/

// @ts-nocheck

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Maple(props) {
  const { nodes, materials } = useGLTF('./models/maple.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.initialShadingGroup} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('./models/maple.gltf')
