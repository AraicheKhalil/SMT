



import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TitlePage from '@/components/Custom/TitlePage';
import { ToolsResponse } from '@/api/DocumentResquest';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import JSZip from 'jszip';
import { ArrowUpLeftFromSquare } from 'lucide-react';




const ToolsTypes = () => {

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [convertedFiles, setConvertedFiles] = useState([]); 
  const params = useParams() // pdf-to-image  or  excel to pdf ....
  // the use params its parametre that we nned to pass to api function to complete the url in post request 

  console.log(params.type)

  const title = `Convert Your ${params.type.split('-')            
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
  .join(' ')}`;

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        ),
    ]);
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleDelete = (file) => {
    setFiles(files.filter((f) => f !== file));
  };

const handleUpload = async () => {
  setUploading(true);
  setError(null);
  setConvertedFiles(null);  // Reset converted file before uploading
  try {
      console.log(files)
      const result = await ToolsResponse(files,params.type); // work 
      console.log(result) // work
      setConvertedFiles(result);  // Store the converted file blob
      console.log(convertedFiles) // work 
  } catch (error) {
      setError('Failed to upload files. Please try again.');
  } finally {
      setUploading(false);
  }
};

  // const handleDownload = async (file) => {
  //   const url = URL.createObjectURL(file.blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = file.filename;  // Set the default file name
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);  // Clean up the URL object
  // };

  const handleDownload = () => {
    if (convertedFiles) {
      console.log(convertedFiles[0])
      console.log(convertedFiles[0].blob)
      console.log(convertedFiles[0].filename)

        const url = URL.createObjectURL(convertedFiles[0].blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = convertedFiles[0].filename;  // Set the correct filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);  // Clean up the URL object
    }
};


  return (
    <>
      <div className='px-4 py-6 md:p-7'>
        <Link to={'/dashboard/tools'} className='flex gap-3 items-center bg-gray-100 w-fit px-3 py-2 rounded-md font-medium mb-4 border shadow-lg '>
          <ArrowUpLeftFromSquare size={20} />
          <p>Back To Tools</p>
        </Link>
        <TitlePage title={title} description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa vitae, aliquid accusantium maiores dolorum eveniet totam a tenetur blanditiis fugiat nihil"}/>
        <div className='font-Rubik p-4 border shadow-lg bg-gray-100 rounded-xl'>
        
        <div
            {...getRootProps()}
            className={`w-full p-8 border-4 border-dashed rounded-lg text-center bg-white transition-colors ${
                isDragActive ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
            } hover:bg-blue-50`}
         >
          <input {...getInputProps()} />
          <p className="text-lg">Drag and drop PDF files to use our PDF to Image converter.</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Select files</button>
         </div>

         {files.length > 0 &&  (
          <div className="w-full rounded-lg mt-4">
            <ul>
                {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between mb-4 rounded-lg p-4 mt-4 bg-white gap-4 shadow-xl">
                        <div className='flex items-center  bg-white gap-4 '>
                            <div className='w-[130px] h-[85px] bg-[#eaecf1] rounded-lg flex justify-center items-center'>
                                <img src={file.preview} alt="preview" className="w-full h-full rounded-lg" />
                            </div>
                            <div className="flex-1 text-[#8194aa] text-sm">
                                <p className='font-medium text-gray-600'>{file.name}</p>
                                <div className='flex gap-3'>
                                    <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                                    <p>Modified Time: {format(file.lastModified, 'Pp')}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(file)}
                                    className="text-red-500 text-sm mt-1 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                        <Button 
                            className="px-4 py-2 bg-green-600 text-white rounded-md"
                            onClick={() => handleDownload(convertedFiles[0])}
                        >
                            Downloads 
                        </Button>
                    </li>
                ))}
            </ul>
            <div className=''>
              <Button 
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={handleUpload}
                  disabled={uploading}
              >
                  {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
         )}
        </div>         
      </div>
    </>
  );
};

export default ToolsTypes;










