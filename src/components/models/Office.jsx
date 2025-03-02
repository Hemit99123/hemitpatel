/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

//@ts-nocheck
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";

// Adjust the floor height proportionally to the scale
export const FLOOR_HEIGHT = 5.5; // Increased from 2.3
export const NB_FLOORS = 3;

export function Office(props) {
  const { nodes, materials } = useGLTF("./models/WawaOffice.glb");
  const ref = useRef();
  const tl = useRef();
  const libraryRef = useRef();
  const atticRef = useRef();
  
  // Scale factor - adjust this to make the model bigger or smaller
  const scaleFactor = 3; // 1.5x the original size

  const scroll = useScroll();

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    // VERTICAL ANIMATION - adjusted for scale
    tl.current.to(
      ref.current.position,
      {
        duration: 2,
        y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
      },
      0
    );

    // Office Rotation - keep the same
    tl.current.to(
      ref.current.rotation,
      { duration: 1, x: 0, y: Math.PI / 6, z: 0 },
      0
    );
    tl.current.to(
      ref.current.rotation,
      { duration: 1, x: 0, y: -Math.PI / 6, z: 0 },
      1
    );

    // Office movement - adjusted for scale
    tl.current.to(
      ref.current.position,
      {
        duration: 1,
        x: -1.5, // Scaled from -1
        z: 3,    // Scaled from 2
      },
      0
    );
    tl.current.to(
      ref.current.position,
      {
        duration: 1,
        x: 1.5,  // Scaled from 1
        z: 3,    // Scaled from 2
      },
      1
    );

    // LIBRARY FLOOR - adjusted for scale
    tl.current.from(
      libraryRef.current.position,
      {
        duration: 0.5,
        x: -3,  // Scaled from -2
      },
      0.5
    );
    tl.current.from(
      libraryRef.current.rotation,
      {
        duration: 0.5,
        y: -Math.PI / 2,
      },
      0
    );

    // ATTIC - adjusted for scale
    tl.current.from(
      atticRef.current.position,
      {
        duration: 1.5,
        y: 3,  // Scaled from 2
      },
      0
    );

    tl.current.from(
      atticRef.current.rotation,
      {
        duration: 0.5,
        y: Math.PI / 2,
      },
      1
    );

    tl.current.from(
      atticRef.current.position,
      {
        duration: 0.5,
        z: -3,  // Scaled from -2
      },
      1.5
    );
  }, []);

  return (
    <group
      {...props}
      dispose={null}
      ref={ref}
      position={[0.75, -1.5, -1.5]} // Adjusted position
      rotation={[0, -Math.PI / 3, 0]}
      scale={[scaleFactor, scaleFactor, scaleFactor]} // Apply scale to entire model
    >
      <mesh geometry={nodes["01_office"].geometry} material={materials["01"]} />
      <group position={[0, 2.11, -2.23]}>
        <group ref={libraryRef}>
          <mesh
            geometry={nodes["02_library"].geometry}
            material={materials["02"]}
          />
        </group>
      </group>
      <group position={[-1.97, 4.23, -2.2]}>
        <group ref={atticRef}>
          <mesh
            geometry={nodes["03_attic"].geometry}
            material={materials["03"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./models/WawaOffice.glb");