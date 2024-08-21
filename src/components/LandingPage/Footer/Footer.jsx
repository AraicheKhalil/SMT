

import React from 'react'
import "./Footer.css"


export default function Footer() {
  return (
    <div className="mt-20">
        <div className="container px-10 lg:px-32 py-20">
            <div className='flex items-center gap-2 w-fit '>
                <img className='w-10 lg:w-12' src="./Logo.png" alt="" />
                <span className='font-semibold text-xl lg:text-2xl font-Poppins min-w-[130px] '>Smart Doc</span>
            </div>
            

            <div className="gap-8 flex flex-wrap justify-between   md:flex-nowrap mt-16">
                <ul className="w-full md:w-fit flex flex-col gap-2 ">
                    <h3 className="font-bold  text-[18px] mb-2">CONTACT US</h3>
                    <li className='hover:text-gray-600 cursor-pointer'> 200 Columbia Street San Diego, CA 92101
                    </li>
                    <li className='hover:text-gray-600 cursor-pointer'> yassine.andaloussi@dsfanalytics.com
                    </li>
                    <li className='hover:text-gray-600 cursor-pointer'> +1 (224) 433-3904
                    </li>
                </ul>
                <ul className="w-full md:w-fit flex flex-col gap-2">
                    <h3 className="font-bold  text-[18px] mb-2"> QUICK LINKS</h3>
                    <li className='hover:text-gray-600 cursor-pointer'>Terms & Conditions</li>
                    <li className='hover:text-gray-600 cursor-pointer'>About Smart DOC</li>
                    <li className='hover:text-gray-600 cursor-pointer'>Frequently asked questions</li>
                    <li className='hover:text-gray-600 cursor-pointer'>Frequently asked questions</li>

                </ul>
                <ul className="w-full md:w-fit flex flex-col gap-2">
                    <h3 className="font-bold  text-[18px] mb-2">FQA</h3>
                    <li className='hover:text-gray-600 cursor-pointer'>Account</li>
                    <li className='hover:text-gray-600 cursor-pointer'>Manage Deliveries</li>
                    <li className='hover:text-gray-600 cursor-pointer'>Orders</li>
                    <li className='hover:text-gray-600 cursor-pointer'>Payments</li>

                </ul>
                <ul className="w-full md:w-fit flex flex-col gap-2">
                    <h3 className="font-bold  text-[18px] mb-2">Support</h3>
                    <li className='hover:text-gray-600 cursor-pointer'>Contact Us</li>
                    <li className='hover:text-gray-600 cursor-pointer'>Online Chat</li>
                    <li className='hover:text-gray-600 cursor-pointer'>Whatssap</li>
                    <li className='hover:text-gray-600 cursor-pointer'>Email</li>
                </ul>
            </div>
        </div>
        <div className="text-sm sm:text-base h-[60px] justify-center items-center flex border-t border-gray-700 ">
         COPYRIGHT © 2023 Smart Doc, All rights Reserved
        </div>
    </div>
  )
}
