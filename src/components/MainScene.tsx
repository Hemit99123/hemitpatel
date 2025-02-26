import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";

function App() {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }} shadows camera={{ position: [0,4,14], fov: 30 }}>
    <color attach="background" args={["#ececec"]} />
      <Suspense>
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
    </Canvas>
  );
}

export default App;