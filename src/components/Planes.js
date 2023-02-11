import { useTexture } from '@react-three/drei'
import React from 'react'
import image1 from '../assets/images/image1.jpg'
import image2 from '../assets/images/image2.jpg'
import image3 from '../assets/images/image3.jpg'
import image4 from '../assets/images/image4.jpg'
import image5 from '../assets/images/image5.jpg'
import Plane from './Plane.js'

const Planes = ({ name, setName }) => {
  const textures = useTexture([image2, image1, image3, image4, image5])

  return (
    <>
      <group>
        {textures.map((picture, index) => {
          return (
            <Plane
              key={index}
              picture={picture}
              index={index}
              name={name}
              setName={setName}
            />
          )
        })}
      </group>
    </>
  )
}

export default Planes
