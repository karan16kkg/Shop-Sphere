import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
const Home = () => {

  const image = [
    '/front1.png',
    'front2.png',
    '/front3.png'
  ]

  const [background, setbackground] = useState(image[0])
  useEffect(() => {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % image.length;
      setbackground(image[i]);
    }, 3000);

  }, []);

  return (
    <>
      <Navbar />
      <div className='h-[75vh] w-full flex' style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='w-3/5 flex flex-col items-center justify-center font-medium'>
          <h1 className='text-3xl md:text-7xl lg:text-7xl'>Incredible Prices</h1>
          <br />
          <h1 className='text-3xl md:text-7xl lg:text-7xl'>on All Your</h1>
          <br />
          <h1 className='text-3xl md:text-7xl lg:text-7xl'>Favorite Items</h1>
          <p className='mt-14 text-xl w-1/2'>Get more for less on selected brands</p>

          <div className='w-1/2 mt-10'>
            <button className='border-2 border-blue-900 px-10 py-1 md:py-3 lg:py-3 text-xl rounded-full bg-blue-900 text-white cursor-pointer hover:bg-white hover:text-blue-900'>Shop Now</button>
          </div>

        </div>
      </div>

      <div className='style flex gap-8 md:justify-between lg:justify-between overflow-scroll px-10 py-8'>
        <div className='bg-sky-50 p-8 flex flex-col items-center rounded-2xl'>
          <img className='w-20' src="/delivery.png" alt="" />
          <span>Super Fast Delivery</span>
        </div>
        <div className='bg-sky-50 p-8 flex flex-col items-center rounded-2xl'>
          <img className='w-20' src="/shipping.png" alt="" />
          <span>Free shipping on</span>
          <span>orders over $50</span>
        </div>
        <div className='bg-sky-50 p-8 flex flex-col items-center rounded-2xl'>
          <img className='w-20' src="/lowPrice.png" alt="" />
          <span>Low prices guaranteed</span>
        </div>
        <div className='bg-sky-50 p-8 flex flex-col items-center rounded-2xl'>
          <img className='w-20' src="/time.png" alt="" />
          <span>Available to you 24/7</span>
        </div>
      </div>
    </>
  )
}

export default Home