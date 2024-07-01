// import { uploadFiles } from '@/api/DocumentResquest';
// import React, { useState } from 'react';
// import LeftPanel from './LeftPanel';
// import CenterPanel from './CenterPanel';
// import RightPanel from './RightPanel';

// const DocumentProcessor = () => {
//   const [images, setImages] = useState([]);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//   const [previews, setPreviews] = useState([]); // For storing preview images

//   const onDrop = async (acceptedFiles) => {
//     const previews = acceptedFiles.map(file => URL.createObjectURL(file));
//     setPreviews(previews);
//     setImages([]); // Clear previous images
//     setSelectedImageIndex(0); // Display the first image by default

//     try {
//       const uploadedData = await uploadFiles(acceptedFiles);
//       setImages(uploadedData);
//     } catch (error) {
//       console.error('Error processing files:', error);
//     }
//   };

//   return (
//     <div className="flex">
//       <LeftPanel
//         previews={previews}
//         selectedImageIndex={selectedImageIndex}
//         setSelectedImageIndex={setSelectedImageIndex}
//       />
//       <CenterPanel
//         onDrop={onDrop}
//         selectedImageIndex={selectedImageIndex}
//         previews={previews}
//       />
//       {selectedImageIndex !== null && (
//         <RightPanel
//           images={images}
//           selectedImageIndex={selectedImageIndex}
//         />
//       )}
//     </div>
//   );
// };

// export default DocumentProcessor;



/// backend 

// import { uploadFiles } from '@/api/DocumentResquest';
// import React, { useState } from 'react';
// import LeftPanel from './LeftPanel';
// import CenterPanel from './CenterPanel';
// import RightPanel from './RightPanel';

// const DocumentProcessor = () => {
//   const [images, setImages] = useState([]);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//   const [previews, setPreviews] = useState([]); // For storing preview images
//   const [selectedFiles, setSelectedFiles] = useState([]); // For storing selected files

//   console.log(selectedFiles)

//   const onDrop = (acceptedFiles) => {
//     const previews = acceptedFiles.map(file => URL.createObjectURL(file));
//     setPreviews(previews);
//     setSelectedFiles(acceptedFiles); // Store the selected files
//     setSelectedImageIndex(0); // Display the first image by default
//   };

//   const handleUpload = async () => {
//     if (selectedImageIndex === null) return;

//     if (selectedFiles.length == 1){
//       console.log('its one file')
//       try {
//         const uploadedData = await uploadFiles(selectedFiles);
//         const updatedImages = [...images];
//         updatedImages = uploadedData;
//         setImages(updatedImages);
//       } catch (error) {
//         console.error('Error processing files:', error);
//       }
//     }else{
//       console.log("its multi files")
//       try {
//         const uploadedData = await uploadFiles(selectedFiles);
//         const updatedImages = [...images];
//         console.log(updatedImages)
//         updatedImages = uploadedData;
//         setImages(updatedImages);
//       } catch (error) {
//         console.error('Error processing files:', error);
//       }
//     };
//     }

//     // const fileToUpload = selectedFiles[selectedImageIndex];


//   return (
//     <div className="flex">
//       <LeftPanel
//         previews={previews}
//         selectedImageIndex={selectedImageIndex}
//         setSelectedImageIndex={setSelectedImageIndex}
//       />
//       <CenterPanel
//         onDrop={onDrop}
//         selectedImageIndex={selectedImageIndex}
//         previews={previews}
//         handleUpload={handleUpload} // Pass the handleUpload function to the CenterPanel
//       />
//       {selectedImageIndex !== null && (
//         <RightPanel
//           images={images}
//           selectedImageIndex={selectedImageIndex}
//         />
//       )}
//     </div>
//   );
// };

// export default DocumentProcessor;











import { uploadFiles } from '@/api/DocumentResquest';
import React, { useState } from 'react';
import LeftPanel from './LeftPanel';
import CenterPanel from './CenterPanel';
import RightPanel from './RightPanel';
import { formatResponse } from '@/Utils/ResponseFormatter';

const DocumentProcessor = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [previews, setPreviews] = useState([]); // For storing preview images
  const [selectedFiles, setSelectedFiles] = useState([]); // For storing selected files

  console.log(selectedFiles);

  const onDrop = (acceptedFiles) => {
    const previews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(previews);
    setSelectedFiles(acceptedFiles); // Store the selected files
    setSelectedImageIndex(0); // Display the first image by default
  };

  const handleUpload = async () => {
    if (selectedImageIndex === null) return;

    const isMultiple = selectedFiles.length > 1;
    const filesToUpload = isMultiple ? selectedFiles : [selectedFiles[selectedImageIndex]];

    try {
      const uploadedData = await uploadFiles(filesToUpload);

      if (isMultiple) {
        for (let i = 0; i < uploadedData.length ; i++) {
          setImages(formatResponse(uploadedData));
        }
        console.log(uploadedData)
      } else {
        const updatedImages = [...images];
        updatedImages[selectedImageIndex] = uploadedData[0];
        setImages(formatResponse(updatedImages));
      }
    } catch (error) {
      console.error('Error processing files:', error);
    }
  };

  return (
    <div className="flex">
      <LeftPanel
        previews={previews}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
      />
      <CenterPanel
        onDrop={onDrop}
        selectedImageIndex={selectedImageIndex}
        previews={previews}
        handleUpload={handleUpload} // Pass the handleUpload function to the CenterPanel
      />
      {selectedImageIndex !== null && (
        <RightPanel
          images={images}
          selectedImageIndex={selectedImageIndex}
        />
      )}
    </div>
  );
};

export default DocumentProcessor;


