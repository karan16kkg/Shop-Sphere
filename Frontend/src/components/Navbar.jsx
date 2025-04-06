import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { ProductState } from '../context/ProductProvider';

const Navbar = () => {
    const {user,cartCount,setcartCount} = ProductState()
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login")
    }

    const handleCart = ()=>{
        navigate("/cart")
    }

    useEffect(() => {
        if (user && user.id) {
            axios.get(`http://localhost:3000/cart/itemCount/${user.id}`)
            .then((response)=>{
                setcartCount(response.data[0].cnt)
            })
        }
    }, [user]);
    

    return (
        <div className='py-4 px-8 flex justify-between items-center bg-gray-50'>
            <h1 className='text-2xl md:text-4xl lg:text-4xl font-medium'>Shop Sphere</h1>
            <div className='w-2/5 relative flex items-center'>
                <input className='w-1/2 md:w-full lg:w-full h-12 bg-gray-200 rounded-full outline-none text-xl px-5 placeholder:text-xl' placeholder='Search Product....' type="search" name="" id="" />
                <img className='absolute right-4' src="search.svg" alt="" />
            </div>
            <div className='flex gap-12 items-center'>

                {user ? <div className='flex gap-4 items-center'>
                    <img className='w-14 rounded-full bg-transparent' src={user.pic} alt="" />
                    <p className='text-xl'>{user.name}</p>
                </div> 
                : <div className='flex gap-4 cursor-pointer' onClick={handleLogin}>
                    <img src="user.svg" alt="" />
                    <p className='text-xl'>Log In</p>
                </div>}


                <div className='relative flex'>
                    <img className='cursor-pointer' onClick={handleCart} src="cart.svg" alt="" />
                    <span className='absolute -right-4 -top-2 bg-blue-200 rounded-full px-2'>{cartCount}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar