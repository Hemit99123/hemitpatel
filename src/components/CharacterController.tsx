//@ts-nocheck

import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react";
import Character from "./models/Character";
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

  // Track key states manually
  const [keys, setKeys] = useState({
    forward: false,
    back: false,
    left: false,
    right: false,
    jump: false
  });

  // Set up key listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') {
        setKeys(prev => ({ ...prev, forward: true }));
      } else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        setKeys(prev => ({ ...prev, back: true }));
      } else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        setKeys(prev => ({ ...prev, left: true }));
      } else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        setKeys(prev => ({ ...prev, right: true }));
      } else if (e.code === 'Space') {
        setKeys(prev => ({ ...prev, jump: true }));
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') {
        setKeys(prev => ({ ...prev, forward: false }));
      } else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        setKeys(prev => ({ ...prev, back: false }));
      } else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        setKeys(prev => ({ ...prev, left: false }));
      } else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        setKeys(prev => ({ ...prev, right: false }));
      } else if (e.code === 'Space') {
        setKeys(prev => ({ ...prev, jump: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!rigidBodyRef.current) return;

    try {
      const rigidbody = rigidBodyRef.current;
      const impulse = { x: 0, y: 0, z: 0 };

      // Handle jump
      if (keys.jump && isOnFloor) {
        impulse.y += JUMP_FORCE;
        setIsOnFloor(false);
      }

      // Get current velocity safely
      let currentVel = { x: 0, z: 0 };
      let linvel = null;
      try {
        if (typeof rigidbody.linvel === 'function') {
          linvel = rigidbody.linvel();
          if (linvel && typeof linvel.x === 'number' && typeof linvel.z === 'number') {
            currentVel.x = linvel.x;
            currentVel.z = linvel.z;
          }
        }
      } catch (e) {
        console.warn("Error getting linear velocity:", e);
        return;
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

      if (impulse.x !== 0 || impulse.y !== 0 || impulse.z !== 0) {
        try {
          rigidbody.applyImpulse(impulse, true);
        } catch (e) {
          console.warn("Error applying impulse:", e);
        }
      }

      if (changeRotation && characterRef.current && linvel) {
        const angle = Math.atan2(linvel.x, linvel.z);
        characterRef.current.rotation.y = angle;
      }

      // Use the store's getter to access and update state without a subscription
      const { characterState, setCharacterState } = useCharacterStore.getState();

      if (Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL) {
        if (characterState !== "Run") {
          setCharacterState("Run");
        }
      } else {
        if (characterState !== "Idle") {
          setCharacterState("Idle");
        }
      }
    } catch (e) {
      console.error("Error in character controller frame update:", e);
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
          <Character scale={[1.5, 1.5, 1.5]} position={[0, 1.6, 0]} />
        </group>
      </RigidBody>
    </group>
  );
};
