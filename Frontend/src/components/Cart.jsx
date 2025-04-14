import React from 'react'
import { useState, useEffect } from 'react'
import { ProductState } from '../context/ProductProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { user, setselectedProduct, selectedProduct, setcartCount, cartCount } = ProductState();
  const [products, setproducts] = useState([])
  const [totalSum, settotalSum] = useState(0)

  const navigate = useNavigate();
  const getProducts = async () => {
    if (user && user.id) {
      await axios.get(`http://localhost:3000/cart/items/${user.id}`)
        .then((response) => {
          setproducts(response.data);
        })
    }
  }

  useEffect(() => {
    if (user && user.id) {
      getProducts();
    }
    // else if (!user) {
    //   navigate("/login")
    // }

  }, [user])

  useEffect(() => {
    const sum = products.reduce(
      (acc, data) => acc + (Number(data.price.replace(/,/g, '')) * data.quantity),
      0
    );
    settotalSum(sum);
  }, [products]);

  const handleSelect = (data) => {
    setselectedProduct(data);
    navigate("/singleproduct")
  }

  const handleDecrease = (id, product_id) => {
    axios.post("http://localhost:3000/cart/decrease", ({ id: id, product_id: product_id }))
      .then((response) => {
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

  const handleDelete = (id) => {
    axios.post("http://localhost:3000/cart/delete", ({ id: id }))
      .then((response) => {
        let x = response.data.message
        getProducts();
        setcartCount(cartCount => cartCount - 1)

        setTimeout(() => {
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
        }, 100);
      })
  }

  console.log(totalSum);
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
      <div className='h-screen bg-gray-50'>
        <Navbar />
        <div className='block md:flex lg:flex'>
          <div className='style flex flex-col gap-4 px-4 py-5 h-[87vh] overflow-scroll w-full md:w-3/4 lg:w-3/4'>
            {products.length == 0 && <div className='h-full flex justify-center items-center text-4xl text-red-500'>Empty...</div>}
            {products.length > 0 && <div className='w-full flex justify-center'>
              <h1 className='text-4xl font-light text-gray-700'>My Cart</h1>
            </div>}
            {products && products.map((data, index) => {
              return <div key={index} className='border-t-1 border-b-1 border-gray-400 block md:flex lg:flex p-8 gap-5 bg-white'>
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
                    <img className='absolute right-2 cursor-pointer' onClick={() => { handleDelete(data.cart_id) }} src="/delete.svg" alt="" />
                  </div>
                </div>
              </div>
            })}
          </div>
          <div className='w-full md:w-1/4 flex flex-col items-center py-6 px-3'>
            <h1 className='text-2xl font-semibold'>Order Summary</h1>
            <div className='border-1 border-gray-300 w-full px-5 my-3'></div>
            <div className='w-full flex flex-col gap-2 items-center text-xl'>
              <span className='font-light text-gray-500 text-sm'>Total Items: {products.length}</span>
              <span>Merchants Subtotal : ₹ {totalSum.toLocaleString('en-IN')}</span>
              {totalSum > 50000 ?
                <div className='flex flex-col'>
                  <span>Shipping Charges : ₹ 0</span>
                  <span className='text-sm font-extralight text-gray-400'>Your Order is more than ₹ 50,000</span>
                </div>
                : <span>Shipping Charges : ₹ 200</span>}

                <div className='text-3xl font-semibold mt-5'>Total : ₹ {(totalSum + (totalSum > 50000 ? 0 : 200)).toLocaleString('en-IN')}</div>
                <div className='w-full flex justify-center mt-6'><button className='border-2 border-blue-400 py-2 mx-5 w-full bg-blue-400 text-white cursor-pointer hover:mx-3 hover:text-blue-400 hover:bg-white '>Place Your Order</button></div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Cart