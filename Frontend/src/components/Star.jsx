import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ rating, reviews }) => {
    const ratingStar = Array.from({ length: 5 }, (ele, index) => {
        let number = index + 0.5;

        return (
            <span key={index} className='text-yellow-300'>
                {rating >= index + 1 ? (<FaStar />) : (rating >= number ? (<FaStarHalfAlt />) : <AiOutlineStar />)}
            </span>
        )
    })
    return (
        <div className='flex items-center gap-6 mt-4'>
            <div className='flex items-center'>
                <span className='mr-2'>{rating}</span>
                {ratingStar}
            </div>
            <div className='text-blue-500'>
                <span>{reviews} ratings</span>
            </div>
        </div>
    )
}

export default Star