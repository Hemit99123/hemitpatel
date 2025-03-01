// @ts-nocheck

import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react";
import Character from "./MainScene/models/Character";
import * as THREE from "three";
import { useCharacterStore } from "./store/character";

const JUMP_FORCE = 0.5;
const MOVEMENT_SPEED = 0.1;
const RUN_VEL = 1;
const MAX_VEL = 3;

export const CharacterController = () => {
  const rigidBodyRef = useRef(null);
  const characterRef = useRef(null);
  const [isOnFloor, setIsOnFloor] = useState(true);

  const [keys, setKeys] = useState({ forward: false, back: false, left: false, right: false, jump: false });

  useEffect(() => {
    const handleKeyDown = (e: { code: any; }) => {
      setKeys((prev) => ({ ...prev, [getKey(e.code)]: true }));
    };
    const handleKeyUp = (e: { code: any; }) => {
      setKeys((prev) => ({ ...prev, [getKey(e.code)]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(({ camera }, delta) => {
    if (!rigidBodyRef.current) return;

    const rigidbody = rigidBodyRef.current;
    const impulse = { x: 0, y: 0, z: 0 };

    if (keys.jump && isOnFloor) {
      impulse.y += JUMP_FORCE;
      setIsOnFloor(false);
    }

    let currentVel = { x: 0, z: 0 };
    const linvel = rigidbody.linvel();
    if (linvel) {
      currentVel.x = linvel.x;
      currentVel.z = linvel.z;
    }

    let changeRotation = false;
    if (keys.right && currentVel.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (keys.left && currentVel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (keys.back && currentVel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (keys.forward && currentVel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED;
      changeRotation = true;
    }

    rigidbody.applyImpulse(impulse, true);

    if (changeRotation && characterRef.current) {
      const angle = Math.atan2(linvel.x, linvel.z);
      characterRef.current.rotation.y = angle;
    }

    const { characterState, setCharacterState } = useCharacterStore.getState();
    if (Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL) {
      if (characterState !== "Run") setCharacterState("Run");
    } else {
      if (characterState !== "Idle") setCharacterState("Idle");
    }

    const characterWorldPosition = characterRef.current?.getWorldPosition(new THREE.Vector3());
    if (characterWorldPosition) {
      const targetCameraPosition = new THREE.Vector3(characterWorldPosition.x, 6, characterWorldPosition.z + 14);
      camera.position.lerp(targetCameraPosition, delta * 2);
      camera.lookAt(characterWorldPosition);
    }
  });

  return (
    <group>
      <RigidBody
        ref={rigidBodyRef}
        colliders={false}
        scale={[0.5, 0.5, 0.5]}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => setIsOnFloor(true)}
        type="dynamic"
        position={[0, 2, 0]}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
        <group ref={characterRef}>
          <Character scale={[1.5, 1.5, 1.5]} position={[0, 2, 0]} />
        </group>
      </RigidBody>
    </group>
  );
};

const getKey = (code: any) => {
  switch (code) {
    case "KeyW": case "ArrowUp": return "forward";
    case "KeyS": case "ArrowDown": return "back";
    case "KeyA": case "ArrowLeft": return "left";
    case "KeyD": case "ArrowRight": return "right";
    case "Space": return "jump";
    default: return null;
  }
};
