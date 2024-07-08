// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { Slider } from '@/components/ui/slider';
// import { Feather, FileText, Minus, Plus, RotateCcw, RotateCw } from 'lucide-react';


// const MainSmartDoc = ({ onDrop, selectedImageIndex, previews, handleUpload  }) => {
//   const [zoom, setZoom] = useState(1);
//   const [rotation, setRotation] = useState(0);


//   const handleZoomChange = (value) => {
//     setZoom(value); // Adjust zoom range as needed
//   };

//   const rotateRight = () => {
//     setRotation(rotation + 90);
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div className={`px-4 py-6 md:p-7 bg-gray-100 w-full h-screen mr-[450px] ml-[150px] }`}>
//       {selectedImageIndex !== null ? (
//         <div className="flex w-full flex-col justify-center items-center ">
//           <div className="bg-gray-200 w-[500px] h-[400px]  mb-4 overflow-hidden">
//             <img src={previews[selectedImageIndex]} alt={`Selected Document ${selectedImageIndex + 1}`} className="w-full h-full object-contain rounded-lg"
//           style={{ transform: `rotate(${rotation}deg) scale(${zoom})` }} />
//           </div>
//           <div className='flex gap-3'>
//           <div className=" gap-3 flex items-center bg-primary rounded-md py-2 px-4">
//             <button
//               className=""
//               onClick={() => setZoom(zoom - 1)}
//             >
//               <Minus size={16} className='text-white border rounded-full p-0.5' />
//             </button>
//             <Slider
//               onValueChange={handleZoomChange}
//               defaultValue={[zoom]}
//               max={10}
//               min={1}
//               step={1}
//               className={`bg-gray-400 w-[150px] rounded-lg `}
//             />
//             <button
//               className=""
//               onClick={() => setZoom(zoom + 1)}
//             >
//               <Plus size={16} className='text-white border rounded-full p-0.5'/>
//             </button>
//             <div className='text-white'>
//               {`${zoom}`}
//             </div>
//             <button
//               className="text-white"
//               onClick={rotateRight}
//             >
//               <RotateCw size={16} />
//             </button>
//           </div>
//           <button onClick={handleUpload} className="btn flex items-center gap-2 btn-primary text-sm font-Rubik font-semibold bg-primary text-white px-4   rounded-md">Extract Docs <Feather color={"white"} size={18} className='pb-0.5' /> </button>
//           </div>
//         </div>
//       ) : (
//         <div
//           {...getRootProps()}
//           className={`border-dashed border-4 p-8 w-[500px] mx-auto mt-8 text-center flex-grow ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
//         >
//           <input {...getInputProps()} />
//           {isDragActive ? (
//             <p>Drop the files here...</p>
//           ) : (
//             <p>Drag 'n' drop some files here, or click to select files</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainSmartDoc;





import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Slider } from '@/components/ui/slider';
import Cropper from 'react-easy-crop';
import { CloudUpload, Feather, Minus, Plus, RotateCw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const MainSmartDoc = ({ onDrop, selectedImageIndex, previews, handleUpload, open, setDocumentType }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  

  const handleZoomChange = (value) => {
    setZoom(value[0]); // Adjust zoom range as needed
  };

  const rotateRight = () => {
    setRotation(rotation + 90);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={`px-4 py-6 md:p-7  w-full h-screen mr-[450px] ${open && "ml-[220px]"} `}>
      {selectedImageIndex !== null ? (
        <div className="flex w-full h-full flex-col justify-center items-center">
          <Select
            onValueChange={(value) => {
                setDocumentType(value)
            }}
          >
            <SelectTrigger className="w-[260px] mb-8 bg-primary text-white">
              <SelectValue placeholder="Select Processing type" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                <SelectItem value="process-document">General Processor </SelectItem>
                <SelectItem value="process-receipts">Receipts Processor </SelectItem>
                <SelectItem value="process-invoices">Invoice Processor</SelectItem>
                <SelectItem value="process-bank-statements">Bank Statements Processor </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="w-[600px] h-[450px] 2xl:w-[800px] 2xl:h-[700px]  mb-4 relative ">
            <Cropper
              image={previews[selectedImageIndex]}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              // aspect={50 / 50}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              showGrid={false}
              style={{ containerStyle: { borderRadius: '8px' , background : 'none', padding : '0' } }}
            />
          </div>
          <div className='flex gap-3 mt-10'>
            <div className="gap-3 flex items-center bg-primary rounded-md py-2 px-4">
              <button
                onClick={() => setZoom(Math.max(zoom - 1, 1))}
              >
                <Minus size={16} className='text-white border rounded-full p-0.5' />
              </button>
              <Slider
                onValueChange={handleZoomChange}
                defaultValue={[zoom]}
                max={10}
                min={1}
                step={1}
                className="bg-gray-400 w-[150px] rounded-lg"
              />
              <button
                onClick={() => setZoom(Math.min(zoom + 1, 10))}
              >
                <Plus size={16} className='text-white border rounded-full p-0.5' />
              </button>
              <div className='text-white w-6 text-sm'>
                {`${(zoom - 1) * 10}%`}
              </div>
              <button
                className="text-white"
                onClick={rotateRight}
              >
                <RotateCw size={16} />
              </button>
            </div>
            <button onClick={handleUpload} className="btn flex items-center gap-2 btn-primary text-sm font-Rubik font-semibold bg-primary text-white px-4 rounded-md  hover:bg-blue-700">
              Extract Docs <Feather color={"white"} size={18} className='pb-0.5' />
            </button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-dashed border-4 p-8 w-[500px] h-70 flex items-center justify-center mx-auto mt-8 text-center flex-grow ${isDragActive ? 'border-blue-500' : 'border-gray-300 rounded-lg'} 2xl:max-w-[800px] 2xl:w-[800px] 2xl:h-[400px]`}
        >
          <input {...getInputProps()} className=''/>
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <div className='flex-col text-sm items-center justify-center'>
              <div class="flex items-center justify-center  flex-col ">
                  <CloudUpload size={50} className='text-blue-500' />
                  {/* <p class="max-w-[300px] text-gray-600">Drag and drop some files here, or click to select files</p> */}
              </div>
              <p className='text-gray-600 mt-6 '>
              <span className='font-semibold'>Drag</span> and <span className='font-semibold'>Drop</span> some files here to extract data from documents seamlessly. After extracting the data, you can edit it as needed and download the updated document. Our AI-powered solution ensures accuracy and efficiency in document processing.
              </p>
            </div>

          )}
        </div>
      )}
    </div>
  );
};

export default MainSmartDoc;
