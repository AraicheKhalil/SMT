

// new api

import { formatResponse } from '@/Utils/ResponseFormatter';
import axios from 'axios';

export const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  try {
    const response = await axios.post('https://dsfsmd.fly.dev/process-document/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};

const endpoints = {
  'pdf-to-image': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/pdf-to-image/',
  'image-to-pdf': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/image-to-pdf/',
  'excel-to-pdf': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/excel-to-pdf/',
  'pdf-to-excel': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/pdf-to-excel/',
  'html-to-pdf': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/html-to-pdf/',
};

export const ConvertFiles = async (files, conversionType) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append(conversionType === 'image-to-pdf' ? 'files' : 'file', file);  // Handle multiple files for image-to-pdf
  });

  try {
    const response = await axios.post(endpoints[conversionType], formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob',  // This is important to handle binary data
    });

    // Check if 'content-disposition' exists and contains the filename
    let filename = 'downloaded_file';
    if (response.headers['content-disposition']) {
      const disposition = response.headers['content-disposition'];
      const filenameMatch = disposition.match(/filename="?(.+)"?/);
      if (filenameMatch && filenameMatch.length > 1) {
        filename = filenameMatch[1];
      }
    }

    return {
      filename: filename,
      blob: response.data
    };
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};



















// new zone

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import { ConvertFiles } from '@/api/DocumentResquest';
import { Button } from './ui/button';

const Dashdropzone = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [convertedFile, setConvertedFile] = useState(null);  // New state for the converted file
    const [conversionType, setConversionType] = useState('pdf-to-image');  // Default conversion type

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
        setConvertedFile(null);  // Reset converted file before uploading
        try {
            const result = await ConvertFiles(files, conversionType);
            setConvertedFile(result);  // Store the converted file blob
        } catch (error) {
            setError('Failed to upload files. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleDownload = () => {
        if (convertedFile) {
            const url = URL.createObjectURL(convertedFile.blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = convertedFile.filename;  // Set the correct filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);  // Clean up the URL object
        }
    };

    return (
        <>
            <div
                {...getRootProps()}
                className={`w-full p-8 border-4 border-dashed rounded-lg text-center bg-white transition-colors ${isDragActive ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
                    } hover:bg-blue-50`}
            >
                <input {...getInputProps()} />
                <p className="text-xl font-semibold">Document Conversion</p>
                <div className="my-4">
                    <svg
                        className="w-16 h-16 mx-auto text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12H9m0 0H6m3 0h6m3-6v12m-6 4H6a2 2 0 01-2-2V6a2 2 0 012-2h4l4 4h6a2 2 0 012 2v10a2 2 0 01-2 2h-6z"
                        />
                    </svg>
                </div>
                <p className="text-lg">Drag and drop files to convert them</p>
                <div className='flex gap-3 justify-center'>
                    <select
                        value={conversionType}
                        onChange={(e) => setConversionType(e.target.value)}
                        className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-md "
                    >
                        <option value="pdf-to-image">PDF to Image</option>
                        <option value="image-to-pdf">Image to PDF</option>
                        <option value="excel-to-pdf">Excel to PDF</option>
                        <option value="pdf-to-excel">PDF to Excel</option>
                        <option value="html-to-pdf">HTML to PDF</option>
                    </select>
                    <Button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Select files</Button>
                    {/* <div>
                        {   
                            files.length > 0 ? 
                            <button
                                type='submit'
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md z-30"
                                onClick={handleUpload}
                                disabled={uploading}
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button> :
                            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Select files</button>
                        }
                    </div> */}

                </div>
            </div>

            {files.length > 0 && (
                <div className="w-full rounded-lg mt-4">
                    <ul>
                        {files.map((file, index) => (
                            <li key={index} className="flex items-center mb-4 rounded-lg p-4 mt-4 bg-white gap-4 shadow-xl">
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
                            </li>
                        ))}
                    </ul>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                        onClick={handleUpload}
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            )}

            {convertedFile && (
                <div className="w-full rounded-lg mt-4 p-4 bg-white shadow-xl">
                    <button
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
                        onClick={handleDownload}
                    >
                        Download Converted File
                    </button>
                </div>
            )}
        </>
    );
};

export default Dashdropzone;