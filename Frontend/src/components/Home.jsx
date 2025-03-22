import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();
  const handleContact = () => {
    navigate("/contact");
  }

  return (
    <>
      <Navbar />
      <div className='h-[75vh] w-full flex transition-opacity duration-2000 ease-in-out' style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',transition: 'background-image 1s ease-in-out' }}>
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

      <div className='text-white bg-black flex'>
        <div className='w-full md:w-2/5 lg:w-2/5 flex flex-col justify-center items-center pl-4 py-3'>
          <h1 className='text-4xl md:text-3xl lg:text-3xl font-medium'>Need Help? Check Out Our Help Center</h1>
          <span className='mt-10'>Click here to Contact Us</span>
          <button className='py-3 px-7 border-2 border-blue-900 mt-5 rounded-full bg-white text-blue-900 hover:text-white hover:bg-blue-900 cursor-pointer' onClick={handleContact}>Contact Us</button>

        </div>
        <div className='w-3/5 hidden md:flex lg:flex justify-end'>
          <img className=' w-full h-[53vh]' src="/contact.png" alt="" />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home