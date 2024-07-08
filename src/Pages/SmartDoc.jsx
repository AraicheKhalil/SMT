// import DocResult from '@/components/DocResult'
// import PlayGround from '@/components/PlayGround/PlayGround'
// import SmartDocSide from '@/components/SmartDocSide'
// import React, { useState } from 'react'


// export default function SmartDoc() {
//   const [dataResponse,setDataResponse] = useState([])
//   const [FileToSmartDoc,setFiletoSmartDoc] = useState(null)
//   // const [selectedImage,setSelectedImage] = useState()

//   console.log(FileToSmartDoc)

//   return (
//     <div className='Smart-Doc flex min-h-screen relative'>
//       <SmartDocSide data={FileToSmartDoc} />

//       <div className={`px-4 py-6 md:p-7 bg-gray-100 w-full mr-[450px] ${FileToSmartDoc ? 'ml-[150px]' : "ml-0"}`}>
//         <PlayGround setdata={setDataResponse} setFiletoSmartDoc={setFiletoSmartDoc}  />
//       </div>

//       <DocResult Response={dataResponse} setFiletoSmartDoc={setFiletoSmartDoc} />
      
//     </div>
//   )
// }



import { uploadFiles } from '@/api/DocumentResquest';
import React, { useState, useCallback } from 'react';
// import LeftPanel from './LeftPanel';
// import CenterPanel from './CenterPanel';
// import RightPanel from './RightPanel';
import { formatResponse } from '@/Utils/ResponseFormatter';
import DocResult from '@/components/DocResult';
import MainSmartDoc from '@/components/MainSmartDoc';
import SmartDocSide from '@/components/SmartDocSide';

const SmartDoc = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [previews, setPreviews] = useState([]); // For storing preview images
  const [selectedFiles, setSelectedFiles] = useState([]); // For storing selected files
  const [documentType,setDocumentType] = useState("process-document")
  const [loading,setLoading] = useState(false)
  const [open,setOpen] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    const previews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(previews);
    setSelectedFiles(acceptedFiles); // Store the selected files
    setSelectedImageIndex(0); // Display the first image by default
  }, []);

  const handleUpload = async () => {
    if (selectedImageIndex === null) return;

    const isMultiple = selectedFiles.length > 1;
    const filesToUpload = isMultiple ? selectedFiles : [selectedFiles[selectedImageIndex]];
    try {
      setLoading(true); // Set loading to true before the API call
      const uploadedData = await uploadFiles(filesToUpload,documentType);
      const parsedData = uploadedData.map(data => formatResponse([data]));

      setImages(parsedData);
      
    } catch (error) {
      console.error('Error processing files:', error);
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  console.log(documentType)

  return (
    <div className="flex min-h-screen relative bg-gray-100 transition">
      <SmartDocSide
        previews={previews}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
        open={open}
        setOpen={setOpen}
      />
      <MainSmartDoc
        onDrop={onDrop}
        selectedImageIndex={selectedImageIndex}
        previews={previews}
        setDocumentType={setDocumentType}
        handleUpload={handleUpload} // Pass the handleUpload function to the CenterPanel
        loading={loading} // Pass the loading state to the CenterPanel
        open={open}
      />
      {/* {selectedImageIndex !== null && ( */}
        <DocResult
          images={images}
          selectedImageIndex={selectedImageIndex}
          loading={loading}
        />
      {/* // )} */}
    </div>
  );
};

export default SmartDoc;

