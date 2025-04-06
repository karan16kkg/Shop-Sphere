import React from 'react'
import './App.css'
import {Route,Routes} from "react-router-dom"
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import Products from './components/Products'
import Contact from './components/Contact'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'
import Footer from './components/Footer'
import About from './components/About'
import ErrorPage from './components/ErrorPage'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/navbar' element = {<Navbar/>}></Route>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/products' element = {<Products/>}></Route>
        <Route path='/contact' element = {<Contact/>}></Route>
        <Route path='/singleproduct' element = {<SingleProduct/>}></Route>
        <Route path='/cart' element = {<Cart/>}></Route>
        <Route path='/footer' element={<Footer/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='*' element={<ErrorPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
