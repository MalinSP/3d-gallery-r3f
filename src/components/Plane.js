import React, { useRef, useMemo } from 'react'
import { useScroll, useIntersect } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
import * as THREE from 'three'

const Plane = ({ picture, index, name, setName }) => {
  const scroll = useScroll()
  const meshRef = useRef()
  const namesArr = ['image1', 'image2', 'image3', 'image4', 'image5']

  const [springs, api] = useSpring(
    () => ({
      from: { scale: 0 },
      to: { scale: 1 },
      config: {
        duration: 1000,
      },
    }),
    []
  )

  const ref = useIntersect((isVisible) => {
    isVisible === true &&
      api.start({
        from: {
          scale: 0,
        },
        to: {
          scale: 1,
        },
      })
  })

  useFrame((state, delta) => {
    const offset = 1 - scroll.offset
    const offsetRounded = Math.round(scroll.offset * 5)
    setName(namesArr[offsetRounded])
    state.camera.position.set(0, 0, offset * 31)
    let distance = state.camera.position.distanceTo(meshRef.current.position)
    if (distance < 5) {
      meshRef.current.material.opacity = THREE.MathUtils.damp(
        meshRef.current.material.opacity,
        0,
        5,
        delta * 0.25
      )
    } else {
      meshRef.current.material.opacity = THREE.MathUtils.damp(
        meshRef.current.material.opacity,
        1,
        5,
        delta * 0.25
      )
    }
  })
  const positions = useMemo(() => {
    const randomX = Math.random() < 0.5 ? 1.5 : 0
    const randomY = Math.random() < 0.5 ? 1.2 : -1.2
    return { randomX, randomY }
  }, [])
  const handlePointerEnter = () => {
    api.start({
      from: {
        scale: 1,
      },
      to: {
        scale: 1.1,
      },
      config: {
        duration: 1000,
      },
    })
  }
  const handlePointerLeave = () => {
    api.start({
      from: {
        scale: 1.1,
      },
      to: {
        scale: 1,
      },
      config: {
        duration: 1000,
      },
    })
  }

  return (
    <>
      <a.mesh
        ref={meshRef}
        position={[positions.randomX, positions.randomY, index * 6]}
        scale={springs.scale}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <planeGeometry args={[4, 6]} />
        <a.meshBasicMaterial
          ref={ref}
          map={picture}
          transparent
          opacity={springs.opacity}
        />
        {/* <a.mesh ref={ref} /> */}
      </a.mesh>
    </>
  )
}

export default Plane
