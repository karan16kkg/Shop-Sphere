import React from 'react'

const About = () => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl md:text-5xl lg:text-5xl font-medium text-gray-700 my-6'>
                About Shop Sphere
            </h1>

            <div className='w-5/6 border-b-2 border-gray-300 my-5'></div>
            <div className='mt-6 w-5/6 block lg:flex gap-10 items-center'>
                <img className='w-full md:w-full lg:w-1/2 h-[80vh]' src="/about.png" alt="" />
                <p className='mt-8 lg:mt-0 text-xl font-extralight'>
                    ShopSphere is a leading e-commerce platform specializing in electronics, offering a seamless shopping experience for tech enthusiasts and everyday consumers. Our platform features a wide range of high-quality gadgets, including smartphones, laptops, gaming consoles, smart home devices, and accessories from top brands like Apple, Samsung, Sony, Dell, and more. With a user-friendly interface, secure payment gateways, and real-time inventory updates, ShopSphere ensures a smooth and hassle-free shopping journey.At ShopSphere, we prioritize customer satisfaction by providing AI-powered recommendations, 24/7 customer support, and an easy return policy. Our secure transactions, lightning-fast delivery options, and exclusive deals make it convenient for shoppers to find the best technology at unbeatable prices. Whether you're looking for the latest gadgets or budget-friendly electronics, ShopSphere is your go-to destination.Our mission is to redefine the way people shop for electronics by combining innovation, reliability, and affordability. We strive to be the most trusted platform for tech products, ensuring that every purchase is backed by quality and convenience. Explore ShopSphere today and experience the future of electronics shopping! 🚀
                </p>
            </div>
        </div>
    )
}

export default About