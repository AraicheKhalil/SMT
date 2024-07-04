// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { format } from 'date-fns';
// import { ConvertFiles } from '@/api/DocumentResquest';



// const Dashdropzone = () => {
//     const [files, setFiles] = useState([]);
//     const [uploading, setUploading] = useState(false);
//     const [error, setError] = useState(null);
  
//     const onDrop = (acceptedFiles) => {
//       setFiles((prevFiles) => [
//         ...prevFiles,
//         ...acceptedFiles.map((file) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         ),
//       ]);
//     };
  
//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//       onDrop,
//       multiple: true,
//     });
  
//     const handleDelete = (file) => {
//       setFiles(files.filter((f) => f !== file));
//     };
  
//     const handleUpload = async () => {
//       setUploading(true);
//       setError(null);
//       try {
//         const result = await ConvertFiles(files);
//         console.log(result);
//       } catch (error) {
//         setError('Failed to upload files. Please try again.');
//       } finally {
//         setUploading(false);
//       }
//     };
  
//     return (
//       <>
//         <div
//           {...getRootProps()}
//           className={`w-full p-8 border-4 border-dashed rounded-lg text-center bg-white transition-colors ${
//             isDragActive ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
//           } hover:bg-blue-50`}
//         >
//           <input {...getInputProps()} />
//           <p className="text-xl font-semibold">Convert PDF to Word</p>
//           <div className="my-4">
//             <svg
//               className="w-16 h-16 mx-auto text-gray-400"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 12H9m0 0H6m3 0h6m3-6v12m-6 4H6a2 2 0 01-2-2V6a2 2 0 012-2h4l4 4h6a2 2 0 012 2v10a2 2 0 01-2 2h-6z"
//               />
//             </svg>
//           </div>
//           <p className="text-lg">Drag and drop a PDF file to use our PDF to Smart Doc Word converter.</p>
//           <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Select a file</button>
//         </div>
  
//         {files.length > 0 && (
//           <div className="w-full  rounded-lg  mt-4">
//             <ul>
//               {files.map((file, index) => (
//                 <li key={index} className="flex items-center mb-4 rounded-lg p-4 mt-4 bg-white gap-4 shadow-xl">
//                   <div className='w-[130px] h-[85px] bg-[#eaecf1] rounded-lg flex justify-center items-center'>
//                     <img src={file.preview} alt="preview" className="w-full h-full rounded-lg" />
//                   </div>
//                   <div className="flex-1 text-[#8194aa] text-sm">
//                     <p className='font-medium text-gray-600'>{file.name}</p>
//                     <div className='flex gap-3'>
//                       <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
//                       <p>Modified Time: {format(file.lastModified, 'Pp')}</p>
//                     </div>
//                     <button
//                       onClick={() => handleDelete(file)}
//                       className="text-red-500 text-sm mt-1 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <button 
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
//               onClick={handleUpload}
//               disabled={uploading}
//             >
//               {uploading ? 'Uploading...' : 'Upload'}
//             </button>
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//           </div>
//         )}
//       </>
//     );
//   };
  
// export default Dashdropzone;




// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { format } from 'date-fns';
// import { ConvertFiles } from '@/api/DocumentResquest';

// const Dashdropzone = () => {
//     const [files, setFiles] = useState([]);
//     const [uploading, setUploading] = useState(false);
//     const [error, setError] = useState(null);
  
//     const onDrop = (acceptedFiles) => {
//       setFiles((prevFiles) => [
//         ...prevFiles,
//         ...acceptedFiles.map((file) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         ),
//       ]);
//     };
  
//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//       onDrop,
//       multiple: true,
//     });
  
//     const handleDelete = (file) => {
//       setFiles(files.filter((f) => f !== file));
//     };
  
//     const handleUpload = async () => {
//       setUploading(true);
//       setError(null);
//       try {
//         const result = await ConvertFiles(files);
//         console.log(result);
//       } catch (error) {
//         setError('Failed to upload files. Please try again.');
//       } finally {
//         setUploading(false);
//       }
//     };
  
//     return (
//       <>
//         <div
//           {...getRootProps()}
//           className={`w-full p-8 border-4 border-dashed rounded-lg text-center bg-white transition-colors ${
//             isDragActive ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
//           } hover:bg-blue-50`}
//         >
//           <input {...getInputProps()} />
//           <p className="text-xl font-semibold">Convert PDF to Word</p>
//           <div className="my-4">
//             <svg
//               className="w-16 h-16 mx-auto text-gray-400"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 12H9m0 0H6m3 0h6m3-6v12m-6 4H6a2 2 0 01-2-2V6a2 2 0 012-2h4l4 4h6a2 2 0 012 2v10a2 2 0 01-2 2h-6z"
//               />
//             </svg>
//           </div>
//           <p className="text-lg">Drag and drop a PDF file to use our PDF to Smart Doc Word converter.</p>
//           <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Select a file</button>
//         </div>
  
//         {files.length > 0 && (
//           <div className="w-full  rounded-lg  mt-4">
//             <ul>
//               {files.map((file, index) => (
//                 <li key={index} className="flex items-center mb-4 rounded-lg p-4 mt-4 bg-white gap-4 shadow-xl">
//                   <div className='w-[130px] h-[85px] bg-[#eaecf1] rounded-lg flex justify-center items-center'>
//                     <img src={file.preview} alt="preview" className="w-full h-full rounded-lg" />
//                   </div>
//                   <div className="flex-1 text-[#8194aa] text-sm">
//                     <p className='font-medium text-gray-600'>{file.name}</p>
//                     <div className='flex gap-3'>
//                       <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
//                       <p>Modified Time: {format(file.lastModified, 'Pp')}</p>
//                     </div>
//                     <button
//                       onClick={() => handleDelete(file)}
//                       className="text-red-500 text-sm mt-1 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <button 
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
//               onClick={handleUpload}
//               disabled={uploading}
//             >
//               {uploading ? 'Uploading...' : 'Upload'}
//             </button>
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//           </div>
//         )}
//       </>
//     );
//   };
  
//   export default Dashdropzone;







// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { format } from 'date-fns';
// import { ConvertFiles } from '@/api/DocumentResquest';

// const Dashdropzone = () => {
//     const [files, setFiles] = useState([]);
//     const [uploading, setUploading] = useState(false);
//     const [error, setError] = useState(null);
//     const [convertedFile, setConvertedFile] = useState(null);  // New state for the converted file
  
//     const onDrop = (acceptedFiles) => {
//       setFiles((prevFiles) => [
//         ...prevFiles,
//         ...acceptedFiles.map((file) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         ),
//       ]);
//     };
  
//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//       onDrop,
//       multiple: true,
//     });
  
//     const handleDelete = (file) => {
//       setFiles(files.filter((f) => f !== file));
//     };
  
//     const handleUpload = async () => {
//       setUploading(true);
//       setError(null);
//       setConvertedFile(null);  // Reset converted file before uploading
//       try {
//         const result = await ConvertFiles(files);
//         setConvertedFile(result);  // Store the converted file blob
//       } catch (error) {
//         setError('Failed to upload files. Please try again.');
//       } finally {
//         setUploading(false);
//       }
//     };
  
//     const handleDownload = () => {
//       if (convertedFile) {
//         const url = URL.createObjectURL(convertedFile);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'converted_image.jpg';  // Set the default file name
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);  // Clean up the URL object
//       }
//     };
  
//     return (
//       <>
//         <div
//           {...getRootProps()}
//           className={`w-full p-8 border-4 border-dashed rounded-lg text-center bg-white transition-colors ${
//             isDragActive ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
//           } hover:bg-blue-50`}
//         >
//           <input {...getInputProps()} />
//           <p className="text-xl font-semibold">Convert PDF to Image</p>
//           <div className="my-4">
//             <svg
//               className="w-16 h-16 mx-auto text-gray-400"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 12H9m0 0H6m3 0h6m3-6v12m-6 4H6a2 2 0 01-2-2V6a2 2 0 012-2h4l4 4h6a2 2 0 012 2v10a2 2 0 01-2 2h-6z"
//               />
//             </svg>
//           </div>
//           <p className="text-lg">Drag and drop a PDF file to use our PDF to Image converter.</p>
//           <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Select a file</button>
//         </div>
  
//         {files.length > 0 && (
//           <div className="w-full rounded-lg mt-4">
//             <ul>
//               {files.map((file, index) => (
//                 <li key={index} className="flex items-center mb-4 rounded-lg p-4 mt-4 bg-white gap-4 shadow-xl">
//                   <div className='w-[130px] h-[85px] bg-[#eaecf1] rounded-lg flex justify-center items-center'>
//                     <img src={file.preview} alt="preview" className="w-full h-full rounded-lg" />
//                   </div>
//                   <div className="flex-1 text-[#8194aa] text-sm">
//                     <p className='font-medium text-gray-600'>{file.name}</p>
//                     <div className='flex gap-3'>
//                       <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
//                       <p>Modified Time: {format(file.lastModified, 'Pp')}</p>
//                     </div>
//                     <button
//                       onClick={() => handleDelete(file)}
//                       className="text-red-500 text-sm mt-1 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <button 
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
//               onClick={handleUpload}
//               disabled={uploading}
//             >
//               {uploading ? 'Uploading...' : 'Upload'}
//             </button>
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//           </div>
//         )}
        
//         {convertedFile && (
//           <div className="w-full rounded-lg mt-4 p-4 bg-white shadow-xl">
//             <button 
//               className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
//               onClick={handleDownload}
//             >
//               Download Converted File
//             </button>
//           </div>
//         )}
//       </>
//     );
// };

// export default Dashdropzone;




import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ConvertFiles } from '@/api/DocumentResquest';

const Dashdropzone = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [convertedFiles, setConvertedFiles] = useState([]);  // New state for the converted files

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
        setConvertedFiles([]);  // Reset converted files before uploading
        try {
            const results = await ConvertFiles(files);
            setConvertedFiles(results);  // Store the converted files
        } catch (error) {
            setError('Failed to upload files. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleDownload = (file) => {
        const url = URL.createObjectURL(file.blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.filename;  // Set the default file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);  // Clean up the URL object
    };

    const handleDownloadAll = async () => {
        const zip = new JSZip();
        convertedFiles.forEach((file) => {
            zip.file(file.filename, file.blob);
        });

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'converted_images.zip');
    };

    return (
        <>
            <div
                {...getRootProps()}
                className={`w-full p-8 border-4 border-dashed rounded-lg text-center bg-white transition-colors ${
                    isDragActive ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
                } hover:bg-blue-50`}
            >
                <input {...getInputProps()} />
                <p className="text-xl font-semibold">Convert PDF to Image</p>
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
                <p className="text-lg">Drag and drop PDF files to use our PDF to Image converter.</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Select files</button>
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
            
            {convertedFiles.length > 0 && (
                <div className="w-full rounded-lg mt-4 p-4 bg-white shadow-xl">
                    <p className="text-xl font-semibold">Converted Files</p>
                    <ul>
                        {convertedFiles.map((file, index) => (
                            <li key={index} className="flex items-center mb-4">
                                <p className="flex-1 text-sm text-[#8194aa]">{`Converted File ${index + 1}`}</p>
                                <button 
                                    className="px-4 py-2 bg-green-600 text-white rounded-md"
                                    onClick={() => handleDownload(file)}
                                >
                                    Download
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button 
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
                        onClick={handleDownloadAll}
                    >
                        Download All as Zip
                    </button>
                </div>
            )}
        </>
    );
};

export default Dashdropzone;