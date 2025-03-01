import React, { useState, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Experience } from "./World";
import { Experience as Experience2 } from "./ScrollView";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { useViewTypeStore } from "@/store/view";
import { Experience3 } from "./Skills";
import { Personality } from "./scroll_view/Personality";
import { Coping } from "./scroll_view/Coping";

// This component handles the content switching without remounting Canvas
const SceneSwitcher = () => {
  const { type } = useViewTypeStore();
  
  return (
    <Suspense fallback={null}>
      <Physics>
        {type === "world" ? <Experience /> : type === "persoanlity" ? <Experience2 overlay={Personality} /> : type === "coping" ? <Experience2 overlay={Coping} /> : type === "skills" ? <Experience3 /> : null}
      </Physics>
    </Suspense>
  );
};

const App = () => {
  // Use a ref to ensure the DOM container is stable
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Only mount the Canvas once
    setMounted(true);
    
    // Clean up function
    return () => {
      setMounted(false);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh", 
        width: "100vw" 
      }}
    >
      {mounted && (
        <Canvas 
          shadows 
          camera={{ position: [0.5, 9.5, 22], fov: 50 }}
          // Force a stable canvas by using the same DOM container
          gl={{ 
            // Force a single WebGL context
            preserveDrawingBuffer: true,
            // These options might help with stability
            powerPreference: "high-performance",
            antialias: true
          }}
        >
          <SceneSwitcher />
        </Canvas>
      )}
    </div>
  );
};

export default App;