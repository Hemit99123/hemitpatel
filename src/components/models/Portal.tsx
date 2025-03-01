import { useViewTypeStore } from "@/store/view";
import { Center, Cylinder, Sphere, Text3D } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface PortalProps {
  position: [number, number, number];
  text: string;
  text_x: number;
  text_y: 0.8 | 1;
}

export const Portal: FC<PortalProps> = ({ position, text, text_x, text_y }) => {

  const {setType} = useViewTypeStore.getState()
  
  const config = useControls({
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    samples: { value: 10, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.17, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 1, min: 0, max: 1 },
    anisotropy: { value: 0, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationDistance: { value: 1, min: 0, max: 10, step: 0.01 },
    attenuationColor: "#ffffff",
    color: "#fffff",
    bg: "#ffffff",
  });
  
  const router = useRouter()

  return (
    <group rotation-y={Math.PI * 2}>
      <group position={position}>
        <RigidBody
          colliders={false}
          type="fixed"
          onCollisionEnter={() => {
            setType("personality")
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
