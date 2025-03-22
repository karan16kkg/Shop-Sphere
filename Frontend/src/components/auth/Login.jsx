import React from 'react'
import { useState, useRef } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [form, setform] = useState({ name: "", email: "", password: "" });
  const [action, setaction] = useState("Login")
  const imgRef = useRef();
  const passRef = useRef();

  const handleForm = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = () => {
    axios.post("http://localhost:3000/user/login", { email: form.email, password: form.password })
      .then((response) => {
        let x = response.data.message
        toast(x , {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        console.log(response.data);
      })
  }

  const handleSignup = () => {
    axios.post("http://localhost:3000/user/signup",form)
    .then((response)=>{
      let x = response.data.message;
      toast(x , {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.log(response);
    })
  }

  const handleShow = () => {
    if (imgRef.current.src.includes("eyeClose.svg")) {
      imgRef.current.src = "eyeOpen.svg";
      passRef.current.type = "text";
    }

    else {
      imgRef.current.src = "eyeClose.svg";
      passRef.current.type = "password";
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

      <div className='h-screen flex bg-blue-50'>
        <div className='hidden md:flex justify-start items-center w-1/2 rounded-r-[8vh] shadow-black' style={{ boxShadow: '6px 0 10px rgba(0, 0, 0, 0.5)' }}>
          <img className='w-full h-full rounded-r-[8vh]' src="/login.gif" alt="" />
        </div>
        <div className='w-full md:w-1/2 lg:w-1/2 flex justify-center items-center'>
          <div className='w-full md:w-full lg:w-2/3 flex flex-col items-center'>
            <h1 className='text-5xl font-medium mb-6'>{action}</h1>

            {action === "Sign Up" ? <div className='mt-7 w-4/5 text-xl'>
              <label>Name</label>
              <input value={form.name} className='bg-blue-200 w-full h-14 mt-1 px-4 outline-none rounded-xl' placeholder='Enter Name...' type="text" name="name" onChange={handleForm} />
            </div> : <div></div>}

            <div className='mt-7 w-4/5 text-xl'>
              <label>Email</label>
              <input value={form.email} className='bg-blue-200 w-full h-14 mt-1 px-4 outline-none rounded-xl' placeholder='Enter Email...' type="email" name="email" onChange={handleForm} />
            </div>
            <div className='mt-7 w-4/5 text-xl'>
              <label>Password</label>
              <div className='w-full flex items-center relative'>
                <input ref={passRef} value={form.password} className='bg-blue-200 w-full h-14 mt-1 px-4 outline-none rounded-xl' placeholder='Enter Password...' type="password" name="password" onChange={handleForm} />
                <img ref={imgRef} className='right-5 absolute cursor-pointer' src="/eyeClose.svg" alt="" onClick={handleShow} />
              </div>
              <span className='text-sm text-gray-500 cursor-pointer'>Forgot Password?</span>
            </div>

            {action === "Login" ? <div className='mt-8'><button className='px-20 py-3 border-2 border-blue-500 bg-blue-500 text-white rounded-full text-2xl hover:text-blue-500 hover:bg-blue-50 cursor-pointer' onClick={handleLogin}>Login</button></div> :
              <div className='mt-8'><button className='px-20 py-3 border-2 border-blue-500 bg-blue-500 text-white rounded-full text-2xl hover:text-blue-500 hover:bg-blue-50 cursor-pointer' onClick={handleSignup}>Sign Up</button></div>}


            {action === "Login" ? <div className='w-4/5 mt-6'>
              <span className='text-gray-500'>I don't have an account? </span>
              <button className='cursor-pointer text-red-500' onClick={() => { setaction("Sign Up") }}>Sign up</button>
            </div> : <div className='w-4/5 mt-6'>
              <span className='text-gray-500'>I already have an account? </span>
              <button className='cursor-pointer text-red-500' onClick={() => { setaction("Login") }}>Login</button>
            </div>}

          </div>

        </div>
      </div>

    </>
  )
}

export default Login