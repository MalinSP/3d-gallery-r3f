import './App.css'
import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'
import Planes from './components/Planes'
import { Scroll, ScrollControls } from '@react-three/drei'

function App() {
  const [name, setName] = useState('')
  return (
    <CanvasContainerWrapper>
      <Canvas camera={{ position: [0, 0, 28], near: 3, far: 10 }}>
        <ambientLight intensity={1} />
        <pointLight position={[1, 2, 0]} />
        <ScrollControls infinite damping={0.5} speed={0.25}>
          <Scroll>
            <Planes name={name} setName={setName} />
          </Scroll>
        </ScrollControls>
      </Canvas>
      {name && <ImageTitle title={name} />}
    </CanvasContainerWrapper>
  )
}

const CanvasContainerWrapper = styled.section`
  width: 100%;
  height: 100%;
  position: fixed;
  h1 {
    font-size: 2rem;
    color: black;
    position: absolute;
    left: 2rem;
    bottom: 3rem;
    padding: 0.4rem 1rem;
    border: 1px solid gray;
    border-radius: 0.25rem;
  }
`

export default App

const ImageTitle = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}
