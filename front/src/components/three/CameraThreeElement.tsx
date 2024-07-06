import * as THREE from "three";
import {
  useFrame,
} from "@react-three/fiber";
import { Box, CameraControls, Environment, useHelper } from "@react-three/drei";

export default function CameraThreeElement() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      1.5 + state.pointer.x / 4,
      0.075
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      1.5 + state.pointer.y / 4,
      0.075
    );
  });


  return (
    <>
      <ambientLight />
      <directionalLight intensity={2} position={[1, 1, 1]} />
      <CameraControls
        enabled={true}
        dollyToCursor={true}
        minDistance={1.2}
        maxDistance={10}
        onChange={()=>console.log('chagne')}
      />
      <mesh
        //onClick={meshClickHandler}
        //onPointerOver={meshOverHandler}
        //onPointerOut={meshOutHandler}
        position={[-2, 0, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}
