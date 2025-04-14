import React, { Children } from 'react'
import { useContext,createContext } from 'react'
import { useState,useEffect } from 'react';
import axios from "axios"

const productContext = createContext();

const ProductProvider = ({children}) => {
  const [selectedProduct, setselectedProduct] = useState()
  const [user, setuser] = useState()
  const [cartCount, setcartCount] = useState(0)

  const fetchUserData = async()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    if (userInfo){
      let token = userInfo.token;

      axios.post("http://localhost:3000/user/jwtverify",{token : token})
      .then((response)=>{
        let x = response.data;

        if(x.message == "Token is valid"){
          setuser(userInfo);
        }
        else{
          localStorage.removeItem("userInfo")
        }
      })
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])
  

  return (
    <productContext.Provider value={{selectedProduct,setselectedProduct,user,setuser,cartCount,setcartCount}}>{children}</productContext.Provider>
  )
}

export const ProductState = ()=>{
    return useContext(productContext)
}

export default ProductProvider