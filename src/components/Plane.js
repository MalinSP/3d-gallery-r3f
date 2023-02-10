import React, { useRef, useState, useMemo, useEffect, forwardRef } from 'react'
import { shaderMaterial, useScroll, useIntersect } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import {
  useSpring,
  useSprings,
  a,
  useInView,
  useSpringValue,
  useSpringRef,
  easeInElastic,
  config,
} from '@react-spring/three'
import * as THREE from 'three'

const Plane = ({ picture, index }) => {
  const scroll = useScroll()
  const meshRef = useRef()

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
    state.camera.position.set(0, 0, offset * 32)
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

  return (
    <a.mesh
      ref={meshRef}
      position={[positions.randomX, positions.randomY, index * 6]}
      scale={springs.scale}
    >
      <planeGeometry args={[3, 5]} />
      <a.meshBasicMaterial
        ref={ref}
        map={picture}
        transparent
        opacity={springs.opacity}
      />
      {/* <a.mesh ref={ref} /> */}
    </a.mesh>
  )
}

export default Plane
