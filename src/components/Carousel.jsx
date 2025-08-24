import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/DataContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Carousel = () => {
    const {} = useContext(DataContext)
    
  return (
    <div>Carousel</div>
  )
}

export default Carousel