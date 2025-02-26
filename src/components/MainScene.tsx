import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";

function App() {
  return (
    <Canvas style={{height: "100vh"}} shadows camera={{ position: [0,6,14], fov: 33 }}>
      <Suspense>
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
    </Canvas>
  );
}

export default App;