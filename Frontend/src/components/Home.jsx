import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProductState } from '../context/ProductProvider'
const Home = () => {

  const{setselectedProduct} = ProductState()

  const image = [
    '/front1.png',
    'front2.png',
    '/front3.png'
  ]

  const [background, setbackground] = useState(image[0])
  const [product, setproduct] = useState([])

  const getProducts = async()=>{
    await axios.get("http://localhost:3000/products/front")
    .then((response)=>{
      setproduct(response.data);
    })
  }

  useEffect(() => {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % image.length;
      setbackground(image[i]);
    }, 3000);

    getProducts();
  }, []);

  const navigate = useNavigate();
  const handleContact = () => {
    navigate("/contact");
  }

  const handleView = ()=>{
    navigate("/products");
  }

  const handleSelect = (data) => {
    setselectedProduct(data);
    navigate("/singleproduct")
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

      <div className='style flex gap-8 md:justify-between lg:justify-between overflow-scroll px-10 py-8 bg-gray-50'>
        <div className='bg-sky-50 p-8 flex flex-col items-center rounded-2xl shrink-0'>
          <img className='w-20' src="/delivery.png" alt="" />
          <span>Super Fast Delivery</span>
        </div>
        <div className='bg-sky-50 p-8 flex flex-col items-center rounded-2xl shrink-0'>
          <img className='w-20' src="/shipping.png" alt="" />
          <span>Free shipping on</span>
          <span>orders over $50</span>
        </div>
        <div className='bg-sky-50 p-8 flex flex-col items-center rounded-2xl shrink-0'>
          <img className='w-20' src="/lowPrice.png" alt="" />
          <span>Low prices guaranteed</span>
        </div>
        <div className='bg-sky-50 p-8 flex flex-col items-center rounded-2xl shrink-0'>
          <img className='w-20' src="/time.png" alt="" />
          <span>Available to you 24/7</span>
        </div>
      </div>

      <div className='my-4 bg-gray-50 py-4'>
        <h1 className='w-full flex justify-center text-6xl'>Best Sellers</h1>
        <div className='style w-full overflow-scroll flex gap-5 px-10 mt-6'>
          {product && product.map((data,index)=>{
            return <div key={index} className='border-1 border-gray-300 rounded-3xl flex flex-col items-center w-full py-4 cursor-pointer md:w-1/3 lg:w-1/3 shrink-0 bg-white hover:py-2' onClick={()=>{handleSelect(data)}}>
                <img className='w-2/4 h-fit' src={data.images[0]} alt="" />
              <div className='flex flex-col mt-2'>
                <span className='text-2xl'>{data.name}</span>
                <span className='font-extralight text-gray-500'>{data.company}</span>
                <span className='text-2xl font-bold'>₹ {data.price}</span>
              </div>
            </div>
          })}
        </div>
        <div className='w-full flex justify-center mt-10'>
          <button className=' border-2 border-blue-500 px-10 py-2 text-xl font-extralight rounded-full bg-blue-500 text-white hover:text-blue-500 hover:bg-white cursor-pointer' onClick={handleView}>View All</button>
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