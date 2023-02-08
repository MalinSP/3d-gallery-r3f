import React, { useRef, useState, useMemo, useEffect } from 'react'
import vertexPlaneShader from '../shaders/vertex.js'
import fragmentPlaneShader from '../shaders/fragment.js'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated, useInView } from '@react-spring/three'

const Plane = ({ picture, index }) => {
  const meshRef = useRef()
  const scroll = useScroll()

  useFrame((state, delta) => {
    const offset = 1 - scroll.offset
    state.camera.position.set(0, 0, offset * 32)
    const distance = state.camera.position.distanceTo(meshRef.current.position)
  })
  const positions = useMemo(() => {
    const randomX = Math.random() < 0.5 ? 1.5 : 0
    const randomY = Math.random() < 0.5 ? 1.2 : -1.2
    return { randomX, randomY }
  }, [])
  // console.log(meshRef.current.material.opacity)

  const [styles, api] = useSpring(() => ({ opacity: 1 }))

  const handleClick = (e) => {
    console.log(e.eventObject.material.opacity)
    api.start({
      x: 1,
    })
  }

  return (
    <animated.mesh
      style={styles.opacity}
      ref={meshRef}
      position={[positions.randomX, positions.randomY, index * 6]}
      onClick={handleClick}
    >
      <planeGeometry args={[3, 5]} />
      <shaderMaterial
        uniforms={{
          uTime: { value: 0 },
          uTexture: { value: picture },
        }}
        vertexShader={vertexPlaneShader}
        fragmentShader={fragmentPlaneShader}
      />
    </animated.mesh>
  )
}

export default Plane
