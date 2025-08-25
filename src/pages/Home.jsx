import React from 'react'
import Carousel from '../components/Carousel'
import MidBanner from '../components/MidBanner';
import Features  from '../components/Features';


function Home() {
  return (
    <>
      <Carousel />
      <MidBanner />
      <Features />
    </>
  );
}

export default Home