// import React, { useState } from 'react';
// import 'tailwindcss/tailwind.css';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { ArrowBigLeft, ArrowLeft } from 'lucide-react';
// import { TransformComponent } from 'react-zoom-pan-pinch';

// export default function SmartDocSide({ data }) {
//   const [ActiveImg, setActiveImg] = useState(false)
  
//   return (
//     <>
//       { data &&
//         <div className="absolute border-r-2 border-gray-400 bg-gray-200 min-w-40 max-w-[150px] py-4 overflow-y-scroll h-full rounded-r-2xl">
//         <Button  className="ml-2 bg-gray-900 " >
//           <ArrowLeft size={16} className='mr-2' /> Back 
//         </Button>
//         <div className="flex py-4 flex-col gap-5 relative mb-10 px-1">
//           {data && 
//               <img
//                 id="magnifier-target"
//                 src={URL.createObjectURL(data)}
//                 alt={`Selected file preview`}
//                 className={` object-cover  w-full rounded-xl h-[100px] border-[3px] border-blue-600`}
//               />
            
//             }
//         </div>
//       </div>
//       }
//     </>
//   );
// }



import React from 'react';
import { Button } from './ui/button';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { IoReload } from 'react-icons/io5';

const SmartDocSide = ({ previews, selectedImageIndex, setSelectedImageIndex }) => {
  return (
    <div className="absolute border-r-2 border-gray-400 bg-gray-200 min-w-40 max-w-[150px] py-4  min-h-screen ">
      <Button veriant={"outline"}  onClick={() => setSelectedImageIndex(null)} className="btn btn-primary mb-2 ml-2 bg-gray-900">  Reset <IoReload size={20} className='ml-2' /></Button >
      <div className="overflow-scroll h-full">
        {previews.map((preview, index) => (
          <div
            key={index}
            // className={` cursor-pointer ${selectedImageIndex === index ? 'bg-blue-500 rounded' : ''}`}
            className='c cursor-pointer mx-1.5 my-2 '
            onClick={() => setSelectedImageIndex(index)}
          >
            <img src={preview} alt={`Document ${index + 1}`} className={` object-cover  w-full rounded-xl h-[100px] border-[3px] ${selectedImageIndex === index ? 'border border-blue-500' : ""}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartDocSide;

