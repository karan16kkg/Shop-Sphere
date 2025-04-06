import React from 'react'
import { useState, useEffect } from 'react'
import { ProductState } from '../context/ProductProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { user, setselectedProduct, selectedProduct,setcartCount,cartCount } = ProductState();
  const [products, setproducts] = useState([])

  const navigate = useNavigate();
  const getProducts = () => {
    if (user && user.id) {
      axios.get(`http://localhost:3000/cart/items/${user.id}`)
        .then((response) => {
          setproducts(response.data);
        })
    }
  }

  useEffect(() => {
    getProducts();
  }, [user])

  console.log(products);

  const handleSelect = (data) => {
    setselectedProduct(data);
    navigate("/singleproduct")
  }

  const handleDecrease = (id, product_id) => {
    axios.post("http://localhost:3000/cart/decrease", ({ id: id, product_id: product_id }))
      .then((response) => {
        console.log(response);
        let x = response.data.message;
        if (x === "Click on Delete Button") {
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
          setTimeout(() => {
            getProducts();
          }, 3000);
        }
        else {
          getProducts();
        }
      })
  }

  const handleIncrease = (id, product_id) => {
    axios.post("http://localhost:3000/cart/increase", ({ id: id, product_id: product_id }))
      .then((response) => {
        console.log(response);
        let x = response.data.message;
        if (x === "Currently Out Of Stock") {
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
          setTimeout(() => {
            getProducts();
          }, 3000);
        }
        getProducts();
      })
  }

  const handleDelete = (id)=>{
    axios.post("http://localhost:3000/cart/delete",({id:id}))
    .then((response)=>{
      console.log(response.data);
      let x = response.data.message

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
      setTimeout(() => {
        getProducts();
        setcartCount(cartCount=>cartCount-1)
      }, 3000);
    })
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
      <div className='h-screen'>
        <Navbar />
        <div className='style flex flex-col gap-4 px-4 h-[87vh] overflow-scroll'>
          {products && products.map((data, index) => {
            return <div key={index} className='border-1 border-gray-400 block md:flex lg:flex p-8 gap-5 rounded-3xl'>
              <div className='w-full md:w-1/6 lg:w-1/6 flex justify-center items-center cursor-pointer' onClick={() => { handleSelect(data) }}>
                <img className='w-36 h-fit' src={data.images[0]} alt="" />
              </div>
              <div className='flex flex-col justify-center items-center w-full md:w-5/6 lg:w-5/6 gap-3'>
                <span className='text-3xl font-semibold cursor-pointer w-full flex justify-center md:justify-start lg:justify-start' onClick={() => { handleSelect(data) }}>{data.name}</span>
                <span className='w-full justify-center md:justify-start lg:justify-start'>{data.description}</span>
                <span className='text-2xl w-full justify-center md:justify-start lg:justify-start'>Total Price: ₹{(Number(data.price.replace(/,/g, '')) * data.quantity).toLocaleString('en-IN')}</span>
                <div className='flex gap-5 items-center text-3xl w-full relative'>
                  <span className='cursor-pointer' onClick={() => { handleDecrease(data.cart_id, data.id) }}>-</span>
                  <span className='border-1 border-gray-500 px-4 py-1 text-xl'>{data.quantity}</span>
                  <span className='cursor-pointer' onClick={() => { handleIncrease(data.cart_id, data.id) }}>+</span>
                  <img className='absolute right-2 cursor-pointer' onClick={()=>{handleDelete(data.cart_id)}} src="/delete.svg" alt="" />
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default Cart