import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useControls } from "leva";
import { Box, Environment, useHelper } from "@react-three/drei";
import { useTexture } from "@react-three/drei";

export default function ThreeElement() {
  const { gl, scene, camera } = useThree();
  const boxRef = useRef<THREE.Mesh>(null);

  const groupRef = useRef<THREE.Group>(null);
  const dLight = useRef<THREE.DirectionalLight>(null!);

  //const matcap = useTexture('./imgs/matcap.jpg');

  // const boxCopyRef = useRef<THREE.Mesh>(null);
  // const boxCopyRef2 = useRef<THREE.Mesh>(null);
  // const boxCopyRef3 = useRef<THREE.Mesh>(null);

  const boxControl = useControls({
    width: { value: 1, min: 0.1, max: 3, step: 0.1 },
    height: { value: 1, min: 0.1, max: 3, step: 0.1 },
    depth: { value: 1, min: 0.1, max: 3, step: 0.1 },
    widthSeg: { value: 1, min: 1, max: 10, step: 1 },
    heightSeg: { value: 1, min: 1, max: 10, step: 1 },
    depthSeg: { value: 1, min: 1, max: 10, step: 1 },
  });

  // 일반적인 Three js 에서 모델을 삽입하는 방법
  // const geometry = new THREE.BoxGeometry(1,1,1);
  // const material = new THREE.MeshBasicMaterial({color:0x000000})
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube)

  useFrame((state, delta) => {
    // console.log('state : ', state);
    // console.log('boxRef :', boxRef);
    // boxRef.current.rotation.x+=delta;
    // boxRef.current.position.x+=delta;
    // boxRef.current.scale.z+=0.01;
    // 카메라 이동
    //scene.position.x +=0.01
  });

  useEffect(() => {
    groupRef.current!.children.map((item:any, index) => {
      item.geometry = boxRef.current?.geometry;
      item.position.x = (index % 5) * 2;
      item.position.z = -Math.floor(index / 5) * 2;
    });

    // boxCopyRef.current.geometry = boxRef.current?.geometry;
    // boxCopyRef2.current.geometry = boxRef.current?.geometry;
    // boxCopyRef3.current.geometry = boxRef.current?.geometry;
  }, []);

  useHelper(dLight, THREE.DirectionalLightHelper);

  return (
    <>
      <directionalLight //직사광
        castShadow
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        shadow-camera-right={10}

        shadow-mapSize={[512,512]}

        ref={dLight}
        position={[5, 5, 5]}
        intensity={3}
        target-position={[0, 0, 2]}
      />
      {/* <ambientLight // 주변광
        color={"#fff"}
        intensity={0.1}
      /> */}
      {/* <hemisphereLight // dom light
        args={["blue", "yellow", 5]}
      />  */}
      {/* <pointLight // 점조명
        color={"#fff"}
        position={[0, 0, 0]}
        intensity={1}
      /> */}
      {/* <spotLight // 원뿔 스팟
        color={"#fff"}
        position={[0, 0, 0]}
        intensity={1}
        distance={5}
        angle={THREE.MathUtils.degToRad(40)}
        target-position={[0,0,0]}
        penumbra={0.8}  // 가장자리 그라데이션
      /> */}
      {/* <Environment
        files={'./threeImage/red_hill_cloudy_4k.hdr'}
        background
      /> */}

      {/* <fog attach={"fog"} args={["white", 3, 10]} /> */}
      <mesh
        onClick={()=>console.log('click')}
        rotation-x={[THREE.MathUtils.degToRad(-90)]}
        position-y={-1}
        receiveShadow
      >
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color={"#020059"} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        ref={boxRef}
        position={[0, 0, 2]}
        //position-x={[1]}
        scale={[1, 1, 1]}
        rotation={[
          THREE.MathUtils.degToRad(45),
          THREE.MathUtils.degToRad(45),
          0,
        ]}
      >
        {/* <boxGeometry
          args={[
            boxControl.width,
            boxControl.height,
            boxControl.depth,
            boxControl.heightSeg,
            boxControl.widthSeg,
            boxControl.depthSeg,
          ]}
        /> */}
        <sphereGeometry args={[1, 32, 6]} />
        <meshStandardMaterial wireframe color={"#020059"} />
      </mesh>
      <group ref={groupRef}>
        <mesh
          castShadow
          receiveShadow
          //ref={boxCopyRef}
        >
          <meshBasicMaterial
            color={"red"}
            visible={true}
            //transparent={true}
            //opacity={0.5}
            //side={THREE.FrontSide} //보이는 방향 FrontSide, BackSide, DoubleSide
            alphaTest={0.5} // 최소 투명도
            depthTest={false} // 렌더링 시 무조건 전체 다 보이도록 렌더링
            depthWrite={true} // ?
            fog={true} // 안개영향 여부
          />
        </mesh>
        <mesh
        
        castShadow
        receiveShadow
        //ref={boxCopyRef2}
        >
          <meshLambertMaterial // 거친표면(나무, 흙, 종이등)
            emissive={"yellow"} // 발광 색깔
          />
        </mesh>

        <mesh
        //ref={boxCopyRef3}
        >
          <meshPhongMaterial // 매끈한 표면(금속, 유리, 플라스틱)
            specular={"#fff"} // 빛 반사 색
            shininess={40}
            flatShading={true} // 표면이 평면같은 느낌
          />
        </mesh>
        <mesh>
          <meshNormalMaterial // 빛을 전체적으로 반사하는 방향으로 표현
          />
        </mesh>

        <mesh>
          <meshStandardMaterial // 물리기반 렌더링
            roughness={0.5}
            metalness={0.8}
          />
        </mesh>

        <mesh>
          <meshPhysicalMaterial
            transparent={true}
            opacity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            transmission={1} // 투명조절
            thickness={1}
            ior={0.8} // 굴절율
          />
        </mesh>
        <mesh>
          <meshDepthMaterial />
        </mesh>
        <mesh>{/* <meshMatcapMaterial matcap={matcap}/> */}</mesh>
        <mesh>{/* <meshToonMaterial gradientMap={tone}/> */}</mesh>
      </group>
    </>
  );
}
