import React from 'react'
import { useNavigate } from 'react-router-dom'
// import {useProductContext } from '../context/ProductContext';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate("/")
    }

    // const myname = useProductContext();
  return (
    <div className='h-screen flex flex-col justify-center items-center space-y-4'>

        {/* {myname} */}

        <h1 className='text-7xl font-bold'>404</h1>
        <h2 className='text-3xl font-extralight'>UH OH! You're Lost</h2>
        <span className='text-xl text-gray-500'>The page you are looking for does not exist.How you got here is a mystery.But you can click the button below to go back to the homepage</span>
        <button className=' border-2 border-blue-500 px-8 py-3 text-xl rounded-full bg-blue-500 text-white cursor-pointer hover:text-blue-500 hover:bg-white' onClick={handleClick}>Home</button>
    </div>
  )
}

export default ErrorPage