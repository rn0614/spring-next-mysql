// import * as THREE from "three";
// import {
//   useThree,
//   useFrame,
//   ThreeEvent,
//   ThreeElements,
// } from "@react-three/fiber";
// import { useEffect, useRef } from "react";
// import { useControls } from "leva";
// import { Box, Environment, useHelper } from "@react-three/drei";
// import { useTexture } from "@react-three/drei";

// export default function InteractiveThreeElement() {
//   const { camera, scene, raycaster, pointer } = useThree();

//   const meshClickHandler = (e: any) => {
//     e.stopPropagation();
//     //e.object.material.color = new THREE.Color("green");
//   };

//   const groupClickHandler = (e: ThreeEvent<MouseEvent>) => {
//     raycaster.setFromCamera(pointer, camera);
//     const intersects = raycaster.intersectObject(e.eventObject, true);

//     if(intersects.length>0){
//       console.log("첫번째 요소", intersects[0]);
//       const mesh = intersects[0].object as any;
//       mesh.material.color = new THREE.Color('blue');
//     }
//   };

//   return (
//     <>
//       <ambientLight />
//       <directionalLight intensity={2} position={[1, 1, 1]} />
//       <group onClick={groupClickHandler}>
//         <mesh
//           //onPointerOver={meshOverHandler}
//           //onPointerOut={meshOutHandler}
//           position={[-2, 0, 0]}
//         >
//           <boxGeometry />
//           <meshStandardMaterial color="red" />
//         </mesh>
//         <mesh
//           position={[0, 0, 0]}
//         >
//           <boxGeometry />
//           <meshStandardMaterial color="red" />
//         </mesh>
//         <mesh
//           position={[2, 0, 0]}
//         >
//           <boxGeometry />
//           <meshStandardMaterial color="red" />
//         </mesh>
//       </group>
//     </>
//   );
// }
