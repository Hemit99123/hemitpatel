import { useViewTypeStore, ViewType } from "@/store/view";
import { Center, Cylinder, Sphere, Text3D } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { FC } from "react";

interface PortalProps {
  position: [number, number, number];
  text;
  text_x;
  text_y: 0.8 | 1;
  view;
}

export const Portal: FC = ({ position, text, text_x, text_y, view }) => {

  const {setType} = useViewTypeStore.getState()

  const config = useControls({
    meshPhysicalMaterial,
    transmissionSampler,
    backside,
    samples: { value, min, max, step: 1 },
    resolution: { value, min, max, step: 256 },
    transmission: { value, min, max: 1 },
    roughness: { value: 0.0, min, max, step: 0.01 },
    thickness: { value, min, max, step: 0.01 },
    ior: { value: 1.17, min, max, step: 0.01 },
    chromaticAberration: { value, min, max: 1 },
    anisotropy: { value, min, max, step: 0.01 },
    distortion: { value: 0.0, min, max, step: 0.01 },
    distortionScale: { value, min: 0.01, max, step: 0.01 },
    temporalDistortion: { value, min, max, step: 0.01 },
    clearcoat: { value, min, max: 1 },
    attenuationDistance: { value, min, max, step: 0.01 },
    attenuationColor: "#ffffff",
    color: "#fffff",
    bg: "#ffffff",
  });
  

  return (
    <group rotation-y={Math.PI * 2}>
      <group position={position}>
        <RigidBody
          colliders={false}
          type="fixed"
          onCollisionEnter={() => {
            setType(view)
          }}
        >
          <CylinderCollider args={[0.25 / 2, 1]} />
          <Cylinder scale={[1, 0.25, 1]}>
            <meshStandardMaterial color="white" />
          </Cylinder>
        </RigidBody>

<Sphere scale={[1.22, 1.22, 1.22]} position={[0, 0.8, 0]} renderOrder={1}>
  <meshPhysicalMaterial {...config} />
</Sphere>
<Center position-y={text_y} position-x={text_x}>
        <Text3D
            font={"./fonts/Poppins-Black.json"}
            size={0.4}
          >
            {text}
            <meshStandardMaterial color="#ebbe89" toneMapped={false} />
          </Text3D>
</Center>
      </group>
    </group>
  );
};
