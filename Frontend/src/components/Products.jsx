import React from 'react'
import { ProductState } from '../context/ProductProvider'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const Products = () => {
  const [filteredProducts, setfilteredProducts] = useState([])
  const [show, setshow] = useState(false)
  const [selectFilter, setselectFilter] = useState("All Products")
  const {selectedProduct,setselectedProduct} = ProductState();

  const getProducts = () => {
    axios.get("http://localhost:3000/products")
      .then((response) => {
        setfilteredProducts(response.data);
      })
  }

  const handleFilter = async()=>{
    if(selectFilter === "All Products"){
      getProducts();
    }

    if(selectFilter === "Mobile"){
      await axios.get("http://localhost:3000/products/mobile")
      .then((response)=>{
        setfilteredProducts(response.data);
      })
    }

    if(selectFilter === "Laptop"){
      await axios.get("http://localhost:3000/products/laptop")
      .then((response)=>{
        setfilteredProducts(response.data);
      })
    }

    if(selectFilter === "Watch"){
      await axios.get("http://localhost:3000/products/watch")
      .then((response)=>{
        setfilteredProducts(response.data);
      })
    }

    if(selectFilter === "Accessories"){
      await axios.get("http://localhost:3000/products/accessories")
      .then((response)=>{
        setfilteredProducts(response.data);
      })
    }
  }

  const navigate = useNavigate();

  const handleProduct = (data)=>{
    setselectedProduct(data)
    navigate("/singleproduct");
  }

  useEffect(() => {
    handleFilter();
  }, [selectFilter])

  return (
    <div className='h-screen flex bg-gray-50'>

      {!show && (
        <button className="absolute top-4 left-4 md:hidden text-4xl" onClick={() => setshow(true)}>☰</button>
      )}

      <div className={`h-full w-full md:w-1/4 lg:w-1/4 bg-gray-50 flex-col items-center fixed md:static transition-all duration-300 ease-in-out 
                      ${show ? "flex" : "hidden"} md:flex`}>

        <div className='flex relative w-full justify-center'>
          <h1 className='text-3xl font-extralight mt-4'>Browse by</h1>
          <button className="mt-4 text-red-500 md:hidden text-3xl absolute top-1 right-6" onClick={() => setshow(false)}>X</button>

        </div>
        <div className='border border-gray-300 w-5/6 mt-3'></div>
        <div className='flex flex-col mt-4 gap-3 text-xl font-light w-full items-center'>
          <span className={`cursor-pointer hover:text-2xl ${selectFilter == "All Products"?"font-bold text-xl":"font-normal"}`} onClick={()=>{setselectFilter("All Products")}}>All Products</span>
          <span className={`cursor-pointer hover:text-2xl ${selectFilter == "Mobile"?"font-bold text-xl":"font-normal"}`} onClick={()=>{setselectFilter("Mobile")}}>Mobile</span>
          <span className={`cursor-pointer hover:text-2xl ${selectFilter == "Laptop"?"font-bold text-xl":"font-normal"}`} onClick={()=>{setselectFilter("Laptop")}}>Laptop</span>
          <span className={`cursor-pointer hover:text-2xl ${selectFilter == "Watch"?"font-bold text-xl":"font-normal"}`} onClick={()=>{setselectFilter("Watch")}}>Watch</span>
          <span className={`cursor-pointer hover:text-2xl ${selectFilter == "Accessories"?"font-bold text-xl":"font-normal"}`} onClick={()=>{setselectFilter("Accessories")}}>Accessories</span>
        </div>

      </div>

      <div className='h-full w-full md:w-3/4 lg:w-3/4 flex flex-col items-center px-8'>
        <h1 className='text-5xl mt-4 mb-2'>Products</h1>
        <div className='w-full pb-3'>
          <span className='text-2xl'>{filteredProducts.length} Products</span>
        </div>
        <div className='style gap-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full h-4/5 overflow-scroll shrink-0'>
          {filteredProducts && filteredProducts.map((data, index) => {
            return <div key={index} className='bg-white border-1 border-gray-200 rounded-2xl py-4 flex flex-col justify-center cursor-pointer h-fit max-h-full hover:py-2' onClick={()=>{handleProduct(data)}}>
              <img className='w-full md:h-4/5 lg:h-4/5' src={data.images[0]} alt="" />
              <div className='flex flex-col items-center w-full px-2'>
                <span className='text-xl md:text-2xl lg:text-2xl'>{data.name}</span>
                <span className='font-extralight'>{data.company}</span>
                <span className='text-xl font-bold'>₹ {data.price}</span>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Products