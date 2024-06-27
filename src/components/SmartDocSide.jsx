import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowBigLeft, ArrowLeft } from 'lucide-react';

export default function SmartDocSide({ data, onImageClick }) {
  const [ActiveImg, setActiveImg] = useState(false)
  
  
  return (
    <div className="absolute bg-white min-w-40 max-w-[150px] py-4 overflow-y-scroll h-full">
      <Button  className="ml-2 bg-gray-900" >
        <ArrowLeft size={16} className='mr-2' /> Back 
      </Button>
      <div className="flex py-4 flex-col gap-5 relative mb-10">
        {data.map((item, index) => (
          <div key={index} className="relative mx-2  " onClick={() => {
            onImageClick(item)
            setActiveImg(true)
          }}>
            <img 
              src={item.image} 
              alt={`Document ${index + 1}`} 
              className={` object-cover  w-full rounded-xl h-[100px] border-[3px] border-blue-600`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

