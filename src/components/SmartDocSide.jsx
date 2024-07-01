import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowBigLeft, ArrowLeft } from 'lucide-react';
import { TransformComponent } from 'react-zoom-pan-pinch';

export default function SmartDocSide({ data }) {
  const [ActiveImg, setActiveImg] = useState(false)
  
  return (
    <>
      { data &&
        <div className="absolute border-r-2 border-gray-400 bg-gray-200 min-w-40 max-w-[150px] py-4 overflow-y-scroll h-full rounded-r-2xl">
        <Button  className="ml-2 bg-gray-900 " >
          <ArrowLeft size={16} className='mr-2' /> Back 
        </Button>
        <div className="flex py-4 flex-col gap-5 relative mb-10 px-1">
          {data && 
              <img
                id="magnifier-target"
                src={URL.createObjectURL(data)}
                alt={`Selected file preview`}
                className={` object-cover  w-full rounded-xl h-[100px] border-[3px] border-blue-600`}
              />
            
            }
          {/* {data?.map((item, index) => (
            <div  className="relative mx-2  " onClick={() => {
              onImageClick(item)
              setActiveImg(true)
            }}>
              <img 
                src={item.path} 
                alt={`Document ${index + 1}`} 
                className={` object-cover  w-full rounded-xl h-[100px] border-[3px] border-blue-600`}
              />
            </div>
          ))}  */}
        </div>
      </div>
      }
    </>
  );
}

