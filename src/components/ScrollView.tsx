// @ts-nocheck

import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Office } from "./models/Office";

export const Experience = ({ overlay: Overlay }) => {
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls enableZoom={false} />
      <ScrollControls pages={3} damping={0.25}>
        {Overlay && <Overlay />}
        <Office />
      </ScrollControls>
    </>
  );
};
