import React, { Suspense, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
// import { Wave } from "./Wave";
import {
  useGLTF,
  // Text,
  Billboard,
  // Decal,
  Edges,
  // Sparkles,
  // Caustics,
  Environment,
  OrbitControls,
  // RenderTexture,
  // RandomizedLight,
  // PerspectiveCamera,
  // AccumulativeShadows,
  MeshTransmissionMaterial,
  // Lightformer,
  Loader,
  // Float,
  // Sky,
  // Stars,
  Html,
} from "@react-three/drei";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import { Geometry, Base, Subtraction } from "@react-three/csg";
// import coral from "./coral_blender.glb";
// import coral2 from "./coral_blender2.glb";
import coral3 from "./dirt_blend.glb";
import { LayerMaterial, Color, Depth, Noise } from "lamina";
import "./App.css";

import { Ocean } from "react-three-ocean";

export default function App() {
  const text2 = [
    "SOME DIRT",
    "In this dirt rendering,",
    "the essence of dirt",
    "has been captured ",
    "as an abstraction",
    "of its many morphologies.",
    "The sizes",
    "and shapes",
    "of dirt can",
    "widely vary.",
    "the common types of dirt",
    "are defined on Wikipedia as",
    "debris, dust, filth,",
    "grime, and soil.",
    "here, dirt",
    "is represented",
    "in a scene ",
    "of varied textures...",
    "sloshy liquids,",
    "fluorescent waste,",
    "and gleaming particulates.",
    "⊹₊｡ꕤ˚₊⊹",
    "☆⋆｡𖦹°‧★",
    "˚ ༘ ೀ⋆｡˚",
    ".𖥔 ݁ ˖๋ ࣭ ⭑",
    "𖡼𖤣𖥧𖡼𓋼𖤣𖥧𓋼𓍊",
  ];

  const [count, setCount] = useState(1);

  function handleClick() {
    const element = document.getElementById("id01");
    if (element.textContent) {
      // element.textContent = element.textContent + text2[count];
      element.textContent = text2[count];
    }

    if (count >= text2.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }

  return (
    <>
      <Canvas shadows camera={{ position: [-200, 10, -85], fov: 35 }}>
        <Suspense fallback={null}>
          <Ocean
            options={{ waterColor: 0x444444 }}
            dimensions={[10000, 10000]}
            normals="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
            distortionScale={20}
            size={10}
            position={[0, -6, 0]}
          ></Ocean>
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />
          <Coral color={"white"} url={coral3} scale={25} rotation={[0, 0, 0]} position={[-5, 4, -2]} />
          <Coral color={"white"} url={coral3} scale={30} rotation={[Math.PI / 6, Math.PI / 6, 0]} position={[60, 20, -2]} />
          <Coral color={"white"} url={coral3} scale={20} rotation={[-Math.PI / 3, Math.PI / 3, 0]} position={[30, 3, -40]} />
          <Html transform position={[20, 50, 0]}>
            <div style={{ height: "1375" }}>
              <img src={[require("./render.png")]} alt="grass" />
            </div>
          </Html>
          <Html transform position={[100, 10, 20]}>
            <div style={{ height: "1375" }}>
              <img src={[require("./render3.png")]} alt="grass" />
            </div>
          </Html>
          <Html transform position={[-20, 20, -30]}>
            <div style={{ height: "1375" }}>
              <img src={[require("./render2.png")]} alt="grass" />
            </div>
          </Html>
          <Billboard
            follow={true}
            lockX={false}
            lockY={false}
            lockZ={false} // Lock the rotation on the z axis (default=false)
          >
            <Html scale={10} transform position={[60, 30, 50]}>
              <a href="#" onClick={handleClick}>
                <p id="id01">
                  <big>{text2[0]}</big>
                </p>
              </a>
            </Html>
          </Billboard>
          <Environment background resolution={64}>
            <Striplight position={[10, 100, 0]} scale={[1, 3, 10]} />
            <Striplight position={[-10, 100, 0]} scale={[1, 3, 10]} />
            <mesh scale={100}>
              <sphereGeometry args={[1, 20, 20]} />
              <LayerMaterial side={THREE.BackSide}>
                <Color color="#302f2c" alpha={1} mode="normal" />
                <Depth colorA="#38332a" colorB="#ff8f00" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
                <Noise mapping="local" type="cell" scale={0.5} mode="softlight" />
              </LayerMaterial>
            </mesh>
          </Environment>
          <OrbitControls
            autoRotateSpeed={0.2}
            autoRotate={true}
            enablePan={false}
            minDistance={100}
            maxDistance={300}
            // maxAzimuthAngle={Math.PI}
            maxPolarAngle={Math.PI / 2}
            // minAzimuthAngle={-Math.PI}
            minPolarAngle={Math.PI / 6}
          />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

function Coral(props) {
  const { nodes } = useGLTF(props.url);
  return (
    <>
      <group transform scale={props.scale} rotation={props.rotation} position={props.position}>
        <mesh geometry={nodes.Mesh_0.geometry} material={nodes.Mesh_0.material}>
          <MeshTransmissionMaterial resolution={768} thickness={0.1} anisotropy={1} chromaticAberration={0.5} />

          <Edges scale={1} threshold={17}>
            <lineBasicMaterial color={new THREE.Color(0x2eff70)} toneMapped={false} />
          </Edges>
        </mesh>
      </group>
    </>
  );
}

function Striplight(props) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshBasicMaterial color="green" />
    </mesh>
  );
}
