

import React from 'react'
import "./Landing.css"
import SectionTitle from '@/components/SectionTitle'
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="Landing relative pt-8 ">
      <div className='container'>
        <SectionTitle
          badge={"✨ Your Workspace, Perfected"}
          title={<span>From Pixels to Insights <br /> Redefine Document Intelligence!</span>}
          descriptionHome={"Translate documents into seamless data streams, unlocking actionable insights with precision and speed."}
        />
        <div className='w-fit mx-auto'>
          <Link to={"demo-form"} className='cursor-pointer'>
            <button className='-mt-6 px-5 py-3 bg-[#28282B] text-[#FFFECA] '>
              Book a Demo
            </button>
          </Link>
        </div>

        {/* <div className='workspace relative py-14 px-20'>
          <div className="Ellipse-230"></div>
          <div className="Dashboard p-3 rounded-[20px]">
            <img src="./SmarDoc.png" alt="" className='rounded-[20px] p-6 bg-gray-200 ' />
          </div>
        </div> */}

      </div>
    </div>
  );
}
