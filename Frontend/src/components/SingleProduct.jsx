import React, { useState } from 'react'
import { ProductState } from '../context/ProductProvider'
import Navbar from './Navbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Star from './Star';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import axios from 'axios';

const SingleProduct = () => {

  const { user, selectedProduct,setcartCount,cartCount } = ProductState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProduct) {
      navigate("/products")
    }
  }, [selectedProduct])

  const [selectedImage, setselectedImage] = useState(selectedProduct.images[0])
  const [quantity, setquantity] = useState(1)

  const handleDecrease = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
  }
  const handleIncrease = () => {
    if (selectedProduct.qty > quantity) {
      setquantity(quantity + 1);
    }
  }

  const handleOutOfStock = () => {
    toast("Currently Out of Stock", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const handleAddToCart = () => {
    if (!user) {
      toast("You need to Login", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    }
    else {
      axios.post("http://localhost:3000/cart", ({ user_id: user.id, product_id: selectedProduct.id, qty: quantity }))
        .then((response) => {
          let x = response.data.message;
          // if(x){
            toast(x, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          // }
        })
        setcartCount(cartCount=>cartCount+1)
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce" />
      <ToastContainer />
      <div className='h-screen flex flex-col bg-gray-50'>
        <Navbar />
        <div className='flex-1 block md:flex lg:flex'>
          <div className='w-full md:w-1/2 lg:w-1/2 flex gap-3'>
            <div className='max-h-2/3 overflow-y-scroll w-fit px-3 mt-10'>
              {selectedProduct && selectedProduct.images.map((data, index) => {
                return <div className={`w-18 mt-5 p-2 rounded-2xl cursor-pointer bg-white ${selectedImage === data ? 'border-2 border-blue-700' : 'border-1 border-blue-500'}`} key={index} onClick={() => { setselectedImage(data) }}><img src={data} alt="" /></div>
              })}
            </div>
            <div className='flex justify-center items-center w-full px-7 bg-white rounded-3xl'>
              <img className='w-full md:w-2/3 lg:w-2/3' src={selectedImage} alt="" />
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/2 px-6 py-4'>
            <h1 className='text-4xl mt-6'>{selectedProduct.name}</h1>
            <Star rating={selectedProduct.rating} reviews={selectedProduct.reviews} />
            <div className='mt-7'>{selectedProduct.description}</div>
            <div className='mt-10 flex flex-col gap-2'>
              <span className='text-4xl mb-6'>
                ₹ {selectedProduct.price}
              </span>
              {selectedProduct.qty > 0 ? <span className='text-xl font-light text-gray-500'>Availability: <span className='text-black font-normal'>In Stock</span></span> : <span className='text-xl font-light text-gray-500'>Availability: <span className='text-red-500 font-normal'>Out Of Stock</span></span>}
              <span className='text-xl font-light text-gray-500'>Brand: <span className='text-black font-normal'>{selectedProduct.company}</span></span>
              <div className='w-full border-b-1 border-gray-400 mt-4'></div>
              {selectedProduct.qty > 0 ? <div className='flex gap-4 pl-10 text-xl items-center'>
                <span className='text-3xl cursor-pointer' onClick={handleDecrease}>-</span>
                <span className='border-1 border-gray-400 px-3'>{quantity}</span>
                <span className='text-3xl cursor-pointer' onClick={handleIncrease}>+</span>
              </div> : <span></span>}

              <div className='w-full mt-8 flex justify-center'>
                {selectedProduct.qty > 0 ? <button className='px-12 py-3 rounded-full bg-yellow-400 cursor-pointer' onClick={handleAddToCart}>Add to Cart</button> : <button className='px-12 py-3 rounded-full bg-yellow-400 text-red-500 cursor-pointer' onClick={handleOutOfStock}>Out Of Stock</button>}

              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default SingleProduct