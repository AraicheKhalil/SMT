

import React from 'react'
import "./Landing.css"
import SectionTitle from '@/components/SectionTitle'
import { Link } from 'react-router-dom';
// import GoogleLogin from '@/test';

export default function Landing() {
  return (
    <div className=" text-black py-16 pt-36 font-Poppins">
      {/* <GoogleLogin /> */}
      <div className="container  mx-auto flex flex-col md:flex-row items-center justify-between px-16">
        <div className="md:w-1/2 text-center md:text-left">
          <span className="  text-sm font-semibold text-black  rounded-full mb-4 gradient-border px-4 md:mx-0 mx-auto ">
            Your workspace, perfected
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            From Pixels to Insights: Redefining Document Intelligence
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Automate data extraction and convert documents into structured data for fast, actionable insights.
          </p>
          <button className="bg-black text-[#fffbfb] font-semibold  rounded-full  hover:bg-gray-900">
            <Link to={"/demo-form"} className='inline-flex items-center py-3 px-6'>
              Book a Demo
              <svg
                className="w-4 h-4 ml-2 mb-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 9.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L14 12.414V17a1 1 0 11-2 0v-4.586l-2.293 2.293a1 1 0 01-1.414-1.414l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img src="./Hero Section.png" alt="Document Intelligence" className="w-full h-auto " />
        </div>
      </div>
    </div>
  );
}
