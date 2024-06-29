

import TitlePage from '@/components/Custom/TitlePage'
import DocResult from '@/components/DocResult'
import PlayGround from '@/components/PlayGround/PlayGround'
import SmartDocSide from '@/components/SmartDocSide'
import React, { useState } from 'react'
import CustomView from './CustomView'
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFiles } from "@/api/DocumentResquest"
import JsonFormat from '@/components/ExtractTabs/JsonFormat'


const data = [
  {
    id: 1,
    status: 'Approved',
    image: 'https://miro.medium.com/v2/resize:fit:1200/0*OcjPDOyNBukmuN2_.jpg', // Replace with actual image URL
  },
  {
    id: 2,
    status: 'Pending',
    image: 'https://ichef.bbci.co.uk/news/480/cpsprodpb/049E/production/_133028110_passport_dates_2x640-nc.png.webp', // Replace with actual image URL
  },
  {
    id: 3,
    status: 'Pending',
    image: 'https://lp-cms-production.imgix.net/news/2015/01/New-Irish-passport.jpg?auto=compress&fit=crop&format=auto&q=50&w=1200&h=800', // Replace with actual image URL
  },
  {
    id: 4,
    status: 'Pending',
    image: 'https://templatelab.com/wp-content/uploads/2023/04/Cleaning-Invoice-Template-TemplateLab.com_.jpg', // Replace with actual image URL
  },
  
];


export default function SmartDoc() {
  const [selectedImage, setSelectedImage] = useState(data[0] || null);
  const [dataResponse,setDataResponse] = useState([])

  console.log(dataResponse)

  // console.log(`from child ${dataResponse}` )

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // start here
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(prevFiles => [...prevFiles, ...newFiles]);

    // Send files to the server
    uploadFiles(acceptedFiles)
      .then(response => {
        // const updateRespone = JsonFormat(response)
        // setDataResponse(updateRespone)
        console.log('Upload successful:', response);
      })
      .catch(error => {
        console.error('Upload failed:', error);
      });
  }, []);

  const removeFile = (file) => () => {
    const newFiles = files.filter(f => f !== file);
    setFiles(newFiles);
    URL.revokeObjectURL(file.preview);
  };

  const renderFiles = () => (
    files.map(file => (
      <div key={file.path} style={styles.fileItem}>
        {file.type.startsWith('image/') && (
          <img src={file.preview} alt={file.name} style={styles.imagePreview} />
        )}
        <p>{file.name}</p>
        <p>{file.size} bytes</p>
        <button onClick={removeFile(file)}>Remove</button>
      </div>
    ))
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.doc,.docx,.pdf,.txt,.jpeg,.jpg,.png,.gif', // Accepting common document types and image types
    multiple: true
  });

  const styles = {
    dropzone: {
      height : "200px",
      border: '2px dashed #cccccc',
      borderRadius: '5px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      marginBottom: '10px'
    },
    fileList: {
      marginTop: '10px'
    },
    fileItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: '10px',
      border: '1px solid #cccccc',
      padding: '10px',
      borderRadius: '5px'
    },
    imagePreview: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      marginBottom: '10px'
    }
  };
  

  return (
    <div className='Smart-Doc flex min-h-screen relative'>
      <SmartDocSide data={data} onImageClick={handleImageClick}/>

      <div className='px-4 py-6 md:p-7 bg-gray-100 w-full mr-[450px] ml-[150px]'>
        {/* <div>
        <div {...getRootProps({ className: 'dropzone' })} style={styles.dropzone}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <div style={styles.fileList}>
          {renderFiles()}
        </div>
    </div> */}
        <PlayGround setdata={setDataResponse}  />
      </div>

      <DocResult Response={dataResponse} />
      
    </div>
  )
}


{/* <div className='px-4 py-6 md:p-7 bg-gray-100 w-full mr-[450px] ml-[150px]'>
      <div className="flex-1 p-4">
        {selectedImage ? (
          <div>
            <img src={selectedImage.image} alt={`Document ${selectedImage.id}`} className="w-full h-auto" />
            <p>Status: {selectedImage.status}</p>
          </div>
        ) : (
          <p>Select an image to view details</p>
        )}
      </div>
        
      </div> */}