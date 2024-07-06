import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import CameraThreeElement from "../../components/three/CameraThreeElement";
import styles from "./style.module.scss";

export default function InteractivePage() {
  const { color, segment } = useControls({
    color: "green",
    segment: { value: 10, min: 2, max: 100, step: 1 },
  });

  return (
    <div className={styles.wrapper}>
      <Canvas
        shadows
        //orthographic  // 기본이 perspective
        camera={{
          //zoom:150, // orthographic 의 거리
          near: 1,
          far: 20,
          fov: 75, // 카메라 각도
          position: [5, 5, 5],
        }}
      >
        {/* <color attach="background" args={["black"]} /> */}
        {/* <fog attach={"fog"} args={["white", 3, 10]} /> */}

        <axesHelper args={[5]} />
        <gridHelper args={[20, segment, 0xff0000, "teal"]} />
        {/* <ThreeElement/> */}
        {/* <InteractiveThreeElement/> */}
        {/* <InteractCar color={"red"}/> */}
        <CameraThreeElement />
      </Canvas>
    </div>
  );
}
