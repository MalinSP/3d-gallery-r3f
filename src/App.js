import './App.css'
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'
import Planes from './components/Planes'
import { Scroll, ScrollControls } from '@react-three/drei'

function App() {
  return (
    <CanvasContainerWrapper>
      <Canvas camera={{ position: [0, 0, 28], near: 3, far: 10 }}>
        <ambientLight intensity={1} />
        <pointLight position={[1, 2, 0]} />
        <ScrollControls infinite>
          <Scroll>
            <Planes />
          </Scroll>
        </ScrollControls>

        {/* <TrackballControls /> */}
      </Canvas>
    </CanvasContainerWrapper>
  )
}

const CanvasContainerWrapper = styled.section`
  width: 100%;
  height: 100%;
  position: fixed;
`

export default App
