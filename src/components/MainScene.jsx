import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./World";
import { Experience as Experience2 } from "./ScrollView";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { useViewTypeStore } from "../store/view";
import { Experience3 } from "./Skills";
import { Personality } from "./scroll_view/Personality";
import { Coping } from "./scroll_view/Coping";
import MyIdentity from "./MyIdentity";
import { Html, Loader } from "@react-three/drei";
import { Leva } from "leva";

const AlertTip = ({ message, onClose }) => {
  return (
    <Html>
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50">
        {message}
        <button onClick={onClose} className="ml-4 text-red-500">✖</button>
      </div>
    </Html>
  );
};

const SceneSwitcher = () => {
  const { type, setType } = useViewTypeStore();
  const [tipIndex, setTipIndex] = useState(0);
  const [tip, setTip] = useState(null);
  const dismissedTips = useRef(new Set()); // Use ref instead of state for dismissed tips
  const tips = ["Use WASD to move around", "Collide with the glass portals to navigate", "Click on the modals to learn more about them."];

  useEffect(() => {
    if (tipIndex < tips.length) {
      if (dismissedTips.current.has(tips[tipIndex])) {
        // Skip dismissed tips safely without triggering an infinite loop
        setTimeout(() => setTipIndex((prev) => prev + 1), 0);
        return;
      }
  
      setTip(tips[tipIndex]);
      const timer = setTimeout(() => {
        setTip(null);
        setTipIndex((prev) => prev + 1);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [tipIndex]); // Remove `tips` dependency to prevent unnecessary re-renders
  

  const dismissTip = () => {
    dismissedTips.current.add(tips[tipIndex]); // Add to ref instead of state
    setTip(null);
  };

  const goToWorld = () => setType("world");

  return (
    <Suspense fallback={null}>
      <Physics>
        {type === "world" ? <Experience /> :
         type === "personality" ? <><Experience2 overlay={Personality} /><Html position={[7,5,0]}><button onClick={goToWorld} className="bg-black text-white rounded-full h-10 w-48">Go back</button></Html></> :
         type === "coping" ? <><Experience2 overlay={Coping} /><Html position={[7,5,0]}><button onClick={goToWorld} className="bg-black text-white rounded-full h-10 w-48">Go back</button></Html></> :
         type === "me" ? <><MyIdentity /><Html position={[8,6,0]}><button onClick={goToWorld} className="bg-black text-white rounded-full h-10 w-48">Go back</button></Html></> :
         type === "skills" ? <><Experience3 /><Html position={[7,5,0]}><button onClick={goToWorld} className="bg-black text-white rounded-full h-10 w-48">Go back</button></Html></> :
         null}
      </Physics>
      {tip && <AlertTip message={tip} onClose={dismissTip} />}
    </Suspense>
  );
};

const App = () => {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div ref={containerRef} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
      {mounted && (
        <Canvas shadows camera={{ position: [0.5, 9.5, 22], fov: 50 }} gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance", antialias: true }}>
          <Leva hidden />
          <SceneSwitcher />
          <Html>
            <Loader />
          </Html>
        </Canvas>
      )}
    </div>
  );
};

export default App;
