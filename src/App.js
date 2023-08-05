import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
// import { Wave } from "./Wave";
import {
  useGLTF,
  // Text,
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

import { Ocean } from "react-three-ocean";

export default function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [-200, 10, -85], fov: 35 }}>
        <Suspense fallback={null}>
          {/* <Sky
            sunPosition={[-100, 10, -10000]}
            inclination={2.98}
            azimuth={0.23}
            mieDirectionalG={1.2}
            mieCoefficient={0}
            rayleigh={1}
            turbidity={6.7}
          /> */}
          <Ocean
            options={{ waterColor: 0x444444 }}
            dimensions={[10000, 10000]}
            normals="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
            distortionScale={20}
            size={10}
            // rotation={[Math.PI / 6, 0, 0]}
            position={[0, -6, 0]}
          ></Ocean>
          {/* <color attach="background" color="white" /> */}
          {/* <color attach="background" args={[new THREE.Color(0x2e4736)]} /> */}
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />
          {/* <Coral color={""} url={coral3} scale={25} rotation={[Math.PI / 2, 0, 0]} position={[2, 0, -5]} /> */}
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
  console.log(nodes);
  return (
    <>
      {/* <Caustics lightSource={[2.5, 5, -2.5]} intensity={0.1}> */}
      {/* // <Caustics debug color="hot" lightSource={[2.5, 5, -1]} worldRadius={0.01} ior={1.1} intensity={0.1}> */}
      <group transform scale={props.scale} rotation={props.rotation} position={props.position}>
        <mesh geometry={nodes.Mesh_0.geometry} material={nodes.Mesh_0.material}>
          {/* <meshStandardMaterial attach="material" wireframe={false} color={"#f3b64d"} flatShading={true} roughness={0.3} metalness={0.95} /> */}
          <MeshTransmissionMaterial resolution={768} thickness={0.1} anisotropy={1} chromaticAberration={0.5} />

          <Edges scale={1} threshold={17}>
            <lineBasicMaterial color={new THREE.Color(0x2eff70)} toneMapped={false} />
          </Edges>
        </mesh>
      </group>
      {/* </Caustics> */}
    </>
  );
}

// function Bunny({ cutterScale = 5, cutterPos = [-1.5, 2, 0.5], ...props }) {
//   const cutter = useRef();
//   // const { nodes } = useGLTF("https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/bunny/model.gltf");
//   useFrame((state, delta) => {
//     cutter.current.rotation.x = Math.sin(state.clock.elapsedTime / 10);
//     cutter.current.rotation.z = Math.cos(state.clock.elapsedTime / 10);
//   });
//   return (
//     <mesh ref={cutter} scale={cutterScale * 0.95} position={cutterPos}>
//       <coneGeometry />
//       <meshBasicMaterial transparent opacity={0} />
//       <Edges scale={0.95} threshold={1}>
//         <lineBasicMaterial color={[20, 0.5, 20]} toneMapped={false} />
//       </Edges>
//     </mesh>
//   );
// }

// function TickerTexture() {
//   const textRef = useRef();
//   useEffect(() => {
//     let count = 0;
//     const interval = setInterval(() => {
//       if (++count > 99) count = 0;
//       // textRef.current.text = `${count}%`;
//       textRef.current.text = `coral`;

//       textRef.current.sync();
//     }, 100);
//     return () => clearInterval(interval);
//   });
//   return (
//     <RenderTexture attach="map" anisotropy={16}>
//       <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[1.5, 0, 5]} />
//       <Text anchorX="right" rotation={[0, Math.PI, 0]} ref={textRef} fontSize={1.5} />
//     </RenderTexture>
//   );
// }

function Striplight(props) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshBasicMaterial color="green" />
    </mesh>
  );
}
