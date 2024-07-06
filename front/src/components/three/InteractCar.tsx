"use client";
import * as THREE from "three";
import {
  CameraControls,
  ContactShadows,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useThree, useLoader, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";

type props ={
  color:string;
}

export default function InteractCar({ color }:props) {
  const { raycaster } = useThree();
  const cameraControlsRef = useRef<CameraControls>(null);
  const carRef = useRef(null);
  const [isFitting, setIsFitting] = useState(false);
  const gltf = useLoader(GLTFLoader, "../../models/free_car_001.glb");

  const shoesClick = (e: any) => {
    const intersects = raycaster.intersectObjects(gltf.scene.children, true);
    if (intersects.length > 0) {
      const firstMesh = intersects[0].object as any;
      const cloneMat = firstMesh.material.clone();
      firstMesh.material = cloneMat;
      firstMesh.material.color = new THREE.Color(color);

      setIsFitting(true);
      cameraControlsRef.current?.fitToBox(firstMesh, true).then(() => {
        //setIsFitting(false);
      });
    }
  };


  useEffect(() => {
    // gltf 내부 요소들의 그림자 가능하도록 변경

    cameraControlsRef.current?.setTarget(0, 0, 0, false);
    cameraControlsRef.current?.addEventListener("control", () => {
      console.log("control");
      setIsFitting(true);
    });
    cameraControlsRef.current?.addEventListener("sleep", () => {
      console.log("sleep");
      //setIsFitting(false);
    });
  });

  let angle = 0;
  useFrame(() => {
    if (!isFitting) {
      cameraControlsRef.current?.setPosition(
        2 * Math.sin(angle),
        0.8,
        2 * Math.cos(angle),
        true
      );
      angle = angle + 0.01;
    }
    gltf.scene.children.forEach((car:any) => {
      car.children.forEach((struct:any) => {
        if (struct.name.substring(0, 5) === "wheel") {
          struct.rotation.z += 0.1;
        }
      });
    });
  });

  return (
    <>
      <CameraControls
        ref={cameraControlsRef}
        enabled={true}
        dollyToCursor={true}
        minDistance={1.2}
        maxDistance={4}
      />
      <directionalLight position={[-1,1,-1]} intensity={10} />
      <directionalLight position={[1, 1, 1]} intensity={10} />
      <primitive
        ref={carRef}
        object={gltf.scene}
        onClick={shoesClick}
      ></primitive>
      <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        color="#000000"
        resolution={512}
        opacity={0.8}
        blur={0.5}
      />
    </>
  );
}
