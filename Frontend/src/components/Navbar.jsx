import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { ProductState } from '../context/ProductProvider';

const Navbar = () => {
    const { user,setuser, cartCount, setcartCount,setselectedProduct } = ProductState()
    const navigate = useNavigate();
    const [search, setsearch] = useState("")
    const [searchData, setsearchData] = useState([])
    const [profile, setprofile] = useState(false)

    const handleLogin = () => {
        navigate("/login")
    }

    const handleCart = () => {
        if(user){
            navigate("/cart")
        }
        else{
            navigate("/login")
        }
    }

    const handleSearch = (e) => {
        setsearch(e.target.value)
    }

    const handleProfile = () => {
        setprofile(profile => !profile)
    }

    const handleSelect = (data)=>{
        setselectedProduct(data);
        navigate("/singleproduct")
    }
    const handleSearchData = () => {
        axios.get(`http://localhost:3000/search/${search}`)
            .then((response) => {
                console.log(response);
                setsearchData(response.data);
            })
    }

    const handleLogout = ()=>{
        localStorage.removeItem("userInfo");
        setuser(undefined);
        window.location.reload();
    }


    useEffect(() => {
        if (user && user.id) {
            axios.get(`http://localhost:3000/cart/itemCount/${user.id}`)
                .then((response) => {
                    setcartCount(response.data[0].cnt)
                })
        }
        if (search.trim() !== "") {
            handleSearchData();
        }
        else {
            setsearchData([]);
        }
    }, [user, search]);

    return (
        <div className='bg-gray-50'>
            <div className='py-4 px-3 md:px-8 lg:px-8 flex justify-between items-center w-full'>
                <h1 className='text-xl md:text-4xl lg:text-4xl font-semibold w-fit cursor-pointer' onClick={()=>{navigate("/")}}>Shop Sphere</h1>
                <div className='w-full md:w-2/5 lg:w-2/5 relative flex items-center'>
                    <input value={search} className='w-full h-12 bg-gray-200 rounded-full outline-none text-xl px-5 placeholder:text-xl' placeholder='Search Product....' type="search" name="" id="" onChange={handleSearch} />
                    <img className='absolute right-4' src="search.svg" alt="" onClick={handleSearchData} />
                </div>
                <div className='flex gap-8 items-center'>

                    {user ? <div className='md:flex lg:flex gap-2 items-center w-fit hidden cursor-pointer' onClick={handleProfile}>
                        <img className='w-14 rounded-full bg-transparent' src={user.pic} alt="" />
                        <p className='hidden md:block lg:block text-xl'>{user.name}</p>
                    </div>
                        : <div className='md:flex lg:flex hidden gap-4 cursor-pointer' onClick={handleLogin}>
                            <img src="user.svg" alt="" />
                            <p className='text-xl'>Log In</p>
                        </div>}


                    <div className='relative flex w-fit'>
                        <img className='cursor-pointer' onClick={handleCart} src="cart.svg" alt="" />
                        <span className='absolute -right-4 -top-2 bg-blue-200 rounded-full px-2'>{cartCount}</span>
                    </div>
                </div>
            </div>
            <div className='w-full absolute z-10 flex justify-center'>
                {searchData.length > 0 && <div className='style w-full md:w-1/2 lg:w-1/2 flex flex-col bg-gray-50 h-fit max-h-[60vh] overflow-scroll'>
                    {searchData.length > 0 && searchData.map((data, index) => {
                        return <div key={index} className='flex mx-5 my-2 bg-white py-3 gap-5 cursor-pointer hover:mx-3' onClick={()=>{handleSelect(data)}}>
                            <img className='w-12' src={data.images[0]} alt="" />
                            <div className='flex items-center font-extralight'>
                                {data.name}
                            </div>
                        </div>
                    })}
                </div>}
            </div>
            <div className='w-full absolute z-10 flex justify-end '>
                {profile && user && <div className='w-1/4 bg-gray-50 py-5'>
                    <div className='w-full flex flex-col items-center text-xl'>
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                    </div>
                    <div className='w-full flex justify-center mt-6'>
                        <button className='border-2 border-blue-500 bg-blue-500 px-6 py-2 rounded-full cursor-pointer hover:bg-white' onClick={handleLogout}>Log Out</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Navbar