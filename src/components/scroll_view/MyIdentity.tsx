import { Html, Float, Text3D } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Sun from "../models/Sun";

const IdentityOcean = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const oceanRef = useRef<THREE.Mesh>(null);
  const waveShaderRef = useRef<THREE.ShaderMaterial>(null);

  // Animate ocean and waves
  useFrame((state) => {
    if (oceanRef.current) {
      oceanRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      oceanRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
    if (waveShaderRef.current) {
      waveShaderRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  // Identity elements with vertical positions
  const identityElements = [
    {
      id: "name",
      content: "Name",
      info: "Surface: Visible to everyone",
      depth: "surface",
      position: new THREE.Vector3(-3, 4, 0),
      detailedInfo: "This section would be about the person's name, the importance of identity in the context of self-awareness, and more on the visible nature of one's outward persona, which is perceived by others. The name serves as the first point of interaction in identifying someone."
    },
    {
      id: "role",
      content: "Role",
      info: "Just below: Job title",
      depth: "shallow",
      position: new THREE.Vector3(-1, 0.5, 0),
      detailedInfo: "This section would explore the individual's role in various contexts. Whether in a professional setting or personal life, a role is often defined by one's job title or responsibilities. It's the next layer beneath the surface, revealing more about a person's duties and social identity."
    },
    {
      id: "passions",
      content: "Passions",
      info: "Depth: Hidden motivations",
      depth: "deep",
      position: new THREE.Vector3(2, -2, 0),
      detailedInfo: "Passions are the hidden drivers behind a person’s actions. Often not immediately visible, passions delve into what fuels someone’s desires, hobbies, and motivations, offering deeper insight into their core desires beyond the surface and role."
    },
    {
      id: "fears",
      content: "Fears",
      info: "Abyss: Core vulnerabilities",
      depth: "abyss",
      position: new THREE.Vector3(1, -4, 0),
      detailedInfo: "Fears are often considered the deepest and most vulnerable aspects of one's being. The abyss represents that which is hidden, that which might not be openly discussed. This section could explore the fears that shape a person’s decisions and interactions with the world around them."
    },
  ];

  return (
    <group position={[0, 0, 0]}>
      <Sun />
      {/* Main Ocean Surface */}
      <mesh
        ref={oceanRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[100, 100, 128, 128]} />
        <meshStandardMaterial
          color="#006994"
          transparent
          opacity={0.9}
          emissive="#000080"
          metalness={0.7}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Animated Waves */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <planeGeometry args={[100, 100, 256, 256]} />
        <shaderMaterial
          ref={waveShaderRef}
          transparent
          uniforms={{
            time: { value: 0 },
            waveSpeed: { value: 0.5 },
            waveHeight: { value: 0.2 },
          }}
          vertexShader={`
            varying vec2 vUv;
            uniform float time;
            uniform float waveSpeed;
            uniform float waveHeight;
            
            void main() {
              vUv = uv;
              vec3 pos = position;
              pos.y += sin(pos.x * 10.0 + time * waveSpeed) * waveHeight;
              pos.y += cos(pos.z * 8.0 + time * waveSpeed * 1.2) * waveHeight * 0.8;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            void main() {
              vec3 color = mix(vec3(0.0, 0.3, 0.6), vec3(0.0, 0.1, 0.3), vUv.x);
              gl_FragColor = vec4(color, 0.4);
            }
          `}
        />
      </mesh>

      {/* Your Identity Elements */}
      {identityElements.map((item) => (
        <group key={item.id} position={item.position}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Text3D
  font="/fonts/Poppins-Black.json"
  scale={0.4}
  onClick={() => setActivePopup(item.id)}
  onPointerOver={() => (document.body.style.cursor = 'pointer')}
  onPointerOut={() => (document.body.style.cursor = 'default')}
>
  {item.content}
  <meshStandardMaterial
    color={
      item.depth === "surface" ? "#ffffff" :
      item.depth === "shallow" ? "#88cefb" :
      item.depth === "deep" ? "#1e90ff" : "#000080"
    }
  />
</Text3D>

          </Float>

          <Html center>
            {activePopup === item.id && (
              <div
                style={{
                  background: "rgba(0,0,30,0.9)",
                  color: "white",
                  padding: "2rem",
                  borderRadius: "8px",
                  width: "300px",
                  maxHeight: "70vh", 
                  overflowY: "scroll", 
                  transform: "translateY(-50%)",
                  border: "1px solid #ffffff30",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.6)",
                }}
              >
                <h3 style={{ margin: 0, color: "#88cefb", fontSize: "1.2rem" }}>
                  {item.content.split(" ")[1]}
                </h3>
                <p style={{ fontSize: "0.9rem", margin: "1rem 0" }}>
                  {item.detailedInfo}
                </p>
                <button
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "none",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                  onClick={() => setActivePopup(null)}
                >
                  ×
                </button>
              </div>
            )}
          </Html>
        </group>
      ))}
    </group>
  );
};

export default IdentityOcean;
