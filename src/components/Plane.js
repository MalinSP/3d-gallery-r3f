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
} from '@react-spring/three'

const Plane = ({ picture, index }) => {
  const scroll = useScroll()

  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: {
        duration: 1000,
        mass: 2,
        friction: 5,
        tension: 80,
        easing: easeInElastic,
      },
    }),
    []
  )

  const ref = useIntersect((visible) =>
    visible === true
      ? api.start({
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        })
      : api.start({
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        })
  )

  useFrame((state, delta) => {
    const offset = 1 - scroll.offset
    state.camera.position.set(0, 0, offset * 32)
  })
  const positions = useMemo(() => {
    const randomX = Math.random() < 0.5 ? 1.5 : 0
    const randomY = Math.random() < 0.5 ? 1.2 : -1.2
    return { randomX, randomY }
  }, [])

  return (
    <a.mesh
      ref={ref}
      opacity={props.opacity}
      position={[positions.randomX, positions.randomY, index * 6]}
    >
      <planeGeometry args={[3, 5]} />
      <a.meshBasicMaterial map={picture} transparent opacity={props.opacity} />
    </a.mesh>
  )
}

export default Plane
