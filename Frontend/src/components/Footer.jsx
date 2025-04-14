import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='flex justify-center mt-4 py-5 bg-gray-50'>
      <div className='w-5/6 block  md:flex lg:flex justify-between gap-20'>
        <div className='w-full md:w-2/6 lg:w-2/6 flex flex-col items-center px-4 mt-10 md:mt-0 lg:mt-0'>
          <h1 className='text-2xl font-medium mb-3'>
            Shop Sphere
          </h1>
          <p className='text-gray-600 font-extralight'>Phoenix Marketcity, 207, Nagar Rd, Clover Park, Viman Nagar, Pune, Maharashtra 411014</p>
          <span className='w-full font-extralight'>123-456-7890</span>
          <div className='w-full flex gap-4 mt-5'>nd
            <span className='text-2xl'><i class="bi bi-facebook"></i></span>
            <span className='text-2xl'><i class="bi bi-whatsapp"></i></span>
            <span className='text-2xl'><i class="bi bi-instagram"></i></span>
            <span className='text-2xl'><i class="bi bi-twitter"></i></span>
          </div>
        </div>
        <div className='w-full md:w-2/6 lg:w-2/6 flex flex-col items-center mt-10 md:mt-0 lg:mt-0'>
          <h1 className='text-2xl font-medium mb-3'>Customer Support</h1>
          <ul className='flex flex-col items-center text-gray-600 gap-3 font-extralight'>
            <li className=' hover:text-2xl text-gray-900 hover:font-normal'><Link to={"/"}>Home</Link></li>
            <li className=' hover:text-2xl text-gray-900 hover:font-normal'><Link to={"/contact"}>Contact Us</Link></li>
            <li className=' hover:text-2xl text-gray-900 hover:font-normal'><Link to={"/about"}>About Us</Link></li>
          </ul>
        </div>
        <div className='w-full md:w-2/6 lg:w-2/6 flex flex-col items-center mt-10 md:mt-0 lg:mt-0'>
          <h1 className='text-2xl font-medium mb-3'>Policy</h1>
          <ul className='flex flex-col items-center text-gray-600 gap-3 font-extralight'>
            <li>Shipping & Returns</li>
            <li>Terms & Consitions</li>
            <li>Payment Methods</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer