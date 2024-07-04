import React from 'react';
import { useDropzone } from 'react-dropzone';


const MainSmartDoc = ({ onDrop, selectedImageIndex, previews, handleUpload  }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={`px-4 py-6 md:p-7 bg-gray-100 w-full mr-[450px] ml-[150px] }`}>
      {selectedImageIndex !== null ? (
        <div className="flex w-full flex-col justify-center items-center ">
          <div className="w-[500px] h-[400px] pr-4 mb-4 overflow-hidden">
            <img src={previews[selectedImageIndex]} alt={`Selected Document ${selectedImageIndex + 1}`} className="w-full h-full object-contain rounded-lg" />
          </div>
          <button onClick={handleUpload} className="btn btn-primary mt-4 font-Rubik font-semibold bg-gray-800 text-white px-4 py-3 rounded-lg">Extract Documents </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-dashed border-4 p-8 w-[500px] mx-auto mt-8 text-center flex-grow ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MainSmartDoc;
