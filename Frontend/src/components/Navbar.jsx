import React from 'react'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate();

    const handleLogin = ()=>{
        navigate("/login")
    }
  return (
    <div className='py-4 px-8 flex justify-between items-center'>
        <h1 className='text-2xl md:text-4xl lg:text-4xl font-medium'>Shop Sphere</h1>
        <div className='w-2/5 relative flex items-center'>
            <input className='w-1/2 md:w-full lg:w-full h-12 bg-gray-200 rounded-full outline-none text-xl px-5 placeholder:text-xl' placeholder='Search Product....' type="search" name="" id="" />
            <img className='absolute right-4' src="search.svg" alt="" />
        </div>
        <div className='flex gap-12 items-center'>
            <div className='flex gap-4 cursor-pointer' onClick={handleLogin}>
                <img src="user.svg" alt="" />
                <p className='text-xl'>Log In</p>
            </div>
            <div className='relative flex'>
                <img src="cart.svg" alt="" />
                <span className='absolute -right-4 -top-2 bg-blue-200 rounded-full px-2'>0</span>
            </div>
        </div>
    </div>
  )
}

export default Navbar