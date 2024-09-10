// import React, { useState, useEffect, useRef } from 'react';
// import { useDropzone } from 'react-dropzone';
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// import 'pdfjs-dist/build/pdf.worker.entry';
// import { v4 as uuidv4 } from 'uuid';
// import { uploadFilesTest } from '@/api/DocumentResquest'; // Import your extraction function
// import { formatResponse } from '@/Utils/ResponseFormatter';
// import DocResult from '@/test/DocResult';
// import SmartDocSide from '@/test/SmartDocSide';
// import MainSmartDoc from '@/test/MainSmartDoc';
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable"




// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;




// const SmartDoc = () => {
//   const [files, setFiles] = useState([]);
//   const [activeFile, setActiveFile] = useState(null);
//   const [loading,setLoading] = useState(false);
//   const [documentType , setDocumentType]  = useState("process-document")
//   const [extractionResults, setExtractionResults] = useState([]);
//   const canvasRef = useRef(null);



//   const onDrop = (acceptedFiles) => {
//     const newFiles = acceptedFiles.map(file => {
//       const fileId = uuidv4(); // Generate a unique ID for the file
//       if (file.type === 'application/pdf') {
//         const previewCanvas = document.createElement('canvas');
//         const previewContext = previewCanvas.getContext('2d');

//         const fileReader = new FileReader();
//         fileReader.onload = function () {
//           const typedArray = new Uint8Array(this.result);
//           pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
//             pdf.getPage(1).then((page) => {
//               const viewport = page.getViewport({ scale: 0.5 });
//               previewCanvas.height = viewport.height;
//               previewCanvas.width = viewport.width;

//               const renderContext = {
//                 canvasContext: previewContext,
//                 viewport: viewport,
//               };
//               page.render(renderContext).promise.then(() => {
//                 const previewUrl = previewCanvas.toDataURL();
//                 setFiles(prevFiles => [...prevFiles, { id: fileId, file, previewUrl }]);
//               });
//             });
//           });
//         };
//         fileReader.readAsArrayBuffer(file);
//       } else {
//         const previewUrl = URL.createObjectURL(file);
//         return { id: fileId, file, previewUrl };
//       }
//       return null;
//     }).filter(fileWrapper => fileWrapper !== null); // Filter out any null entries

//     // Set the files and the first file as active
//     setFiles(prevFiles => [...prevFiles, ...newFiles]);
//   };

//   useEffect(() => {
//     if (files.length > 0) {
//       // Set the first file as the active file
//       setActiveFile(files[0]);
//     }
//   }, [files]);

//   useEffect(() => {
//     if (activeFile && activeFile.file && activeFile.file.type === 'application/pdf') {
//       const fileReader = new FileReader();
//       fileReader.onload = function () {
//         const typedArray = new Uint8Array(this.result);
//         pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
//           pdf.getPage(1).then((page) => {
//             const viewport = page.getViewport({ scale: 1.5 });
//             const canvas = canvasRef.current;
//             const context = canvas.getContext('2d');
//             canvas.height = viewport.height;
//             canvas.width = viewport.width;

//             const renderContext = {
//               canvasContext: context,
//               viewport: viewport,
//             };
//             page.render(renderContext);
//           });
//         });
//       };
//       fileReader.readAsArrayBuffer(activeFile.file);
//     }
//   }, [activeFile]);

//   const extractDocument = async () => {
//       try {
//         setLoading(true)
//         const response = await uploadFilesTest(files,documentType); // [ "data1" , "data2" , "da..],
//         // setExtractionResults(response)


//         const parseData = response.map(item => ({
//           ...item,
//           file: formatResponse([item.file])
//         }));
//         setExtractionResults(response)
//         console.log(parseData.file)
        
//       } catch (error) {
//         console.error('Error extracting document:', error);
//       } finally {
//         setLoading(false)
//       }
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

  

//   return (
//     <div>
//       <ResizablePanelGroup
//       direction="horizontal"
//       >
//       <ResizablePanel defaultSize={70} >
//         <div className="flex w-full transition ">
//           <SmartDocSide files={files} setActiveFile={setActiveFile} />
//           <MainSmartDoc onDrop={onDrop} activeFile={activeFile} setActiveFile={setActiveFile} extractDocument={extractDocument} documentType={documentType} setDocumentType={setDocumentType} setFiles={setFiles} />
//         </div>
//       </ResizablePanel>
//       <ResizableHandle withHandle className={"w-0.5"}  />
//       <ResizablePanel defaultSize={30} className='min-w-[450px]' >
//         <DocResult activeFile={activeFile} extractionResults={extractionResults} loading={loading}  />
//       </ResizablePanel>
//     </ResizablePanelGroup>
//     </div>

//   );
// };

// export default SmartDoc;

// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';

// const FileUploader = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   console.log(loading)

//   const onDrop = (acceptedFiles) => {
//     setFiles(acceptedFiles);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
  
//     // Instead of appending each file individually, append the whole array at once
//     for (let i = 0; i < files.length; i++) {
//       formData.append('files', files[i]); // Append files to the same 'files' key
//     }
  
//     try {
//       setLoading(true)
//       const response = await axios.post('https://www.dsfsmartdoc.com/convert/merge-pdfs/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Merged PDFs response:', response.data);
//     } catch (error) {
//       console.error('Error merging PDFs:', error.response?.data || error.message);
//     }
//   };
  
  

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     multiple: true, // Enable multiple file uploads
//   });

//   return (
//     <div>
//       <div {...getRootProps({ className: 'dropzone' })}>
//         <input {...getInputProps()} />
//         <p>Drag & drop files here, or click to select files</p>
//       </div>
//       <ul>
//         {files.map((file, index) => (
//           <li key={index}>{file.name}</li>
//         ))}
//       </ul>
//       <button onClick={handleUpload}>Upload and Merge Files</button>
//     </div>
//   );
// };

// export default FileUploader;


// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';

// const MergePDFs = () => {
//   const [files, setFiles] = useState([]);
//   const [mergedPdfUrl, setMergedPdfUrl] = useState(null); // Store the merged PDF URL

//   // Setup for React Dropzone
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: { 'application/pdf': ['.pdf'] },
//     onDrop: (acceptedFiles) => {
//       setFiles(acceptedFiles); // Set selected files
//     },
//   });

//   // Function to upload files and merge them
//   const handleUpload = async () => {
//     const formData = new FormData();

//     // Append all files to 'files' key in the FormData
//     files.forEach((file) => {
//       formData.append('files', file); // Same key 'files' for all PDFs
//     });

//     try {
//       // Make the request to merge PDFs
//       const response = await axios.post('https://www.dsfsmartdoc.com/convert/merge-pdfs/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         responseType: 'blob', // Get the merged file as a blob
//       });

//       // Create a URL from the response blob
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       setMergedPdfUrl(url); // Save the URL to state
//     } catch (error) {
//       console.error('Error merging PDFs:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div
//         {...getRootProps()}
//         className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer bg-gray-50"
//       >
//         <input {...getInputProps()} />
//         <p className="text-gray-500">Drag & drop some PDF files here, or click to select files</p>
//       </div>

//       <div className="mt-4">
//         <button
//           onClick={handleUpload}
//           className="bg-blue-500 text-white py-2 px-4 rounded"
//           disabled={files.length === 0}
//         >
//           Upload & Merge PDFs
//         </button>
//       </div>

//       {mergedPdfUrl && (
//         <div className="mt-4">
//           <a
//             href={mergedPdfUrl}
//             download="merged.pdf"
//             className="bg-green-500 text-white py-2 px-4 rounded inline-block"
//           >
//             Download Merged PDF
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MergePDFs;


// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';

// const MergePDFs = () => {
//   const [files, setFiles] = useState([]);
//   const [mergedPdfUrl, setMergedPdfUrl] = useState(null); // Store the merged PDF URL
//   const [loading, setLoading] = useState(false); // Loading state for API response

//   // Setup for React Dropzone
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: { 'application/pdf': ['.pdf'] },
//     onDrop: (acceptedFiles) => {
//       setFiles(acceptedFiles); // Set selected files
//       setMergedPdfUrl(null); // Reset merged PDF URL when new files are selected
//     },
//   });

//   // Function to upload files and merge them
//   const handleUpload = async () => {
//     const formData = new FormData();

//     // Append all files to 'files' key in the FormData
//     files.forEach((file) => {
//       formData.append('files', file); // Same key 'files' for all PDFs
//     });

//     setLoading(true); // Start loading

//     try {
//       // Make the request to merge PDFs
//       const response = await axios.post('https://www.dsfsmartdoc.com/convert/merge-pdfs/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         responseType: 'blob', // Get the merged file as a blob
//       });

//       // Create a URL from the response blob
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       setMergedPdfUrl(url); // Save the URL to state
//     } catch (error) {
//       console.error('Error merging PDFs:', error.response?.data || error.message);
//     }

//     setLoading(false); // Stop loading when response is received
//   };

//   return (
//     <div className="container mx-auto p-6">
//       {/* Dropzone area */}
//       <div
//         {...getRootProps()}
//         className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer bg-gray-50"
//       >
//         <input {...getInputProps()} />
//         <p className="text-gray-500">Drag & drop some PDF files here, or click to select files</p>
//       </div>

//       {/* Display file names below the dropzone */}
//       {files.length > 0 && (
//         <div className="mt-4">
//           <h4 className="text-gray-700 font-semibold">Selected Files:</h4>
//           <ul className="list-disc list-inside text-gray-600">
//             {files.map((file, index) => (
//               <li key={index}>{file.name}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Upload & Merge Button */}
//       <div className="mt-4">
//         <button
//           onClick={handleUpload}
//           className={`bg-blue-500 text-white py-2 px-4 rounded ${files.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//           disabled={files.length === 0 || loading} // Disable if no files or loading
//         >
//           {loading ? 'Merging...' : 'Upload & Merge PDFs'}
//         </button>
//       </div>

//       {/* Download Button after successful merge */}
//       {mergedPdfUrl && (
//         <div className="mt-4">
//           <a
//             href={mergedPdfUrl}
//             download="merged.pdf"
//             className="bg-green-500 text-white py-2 px-4 rounded inline-block"
//           >
//             Download Merged PDF
//           </a>
//         </div>
//       )}

//       {/* Loading indicator */}
//       {loading && (
//         <div className="mt-4 text-gray-600">
//           <p>Merging files, please wait...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MergePDFs;


import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const MergeFiles = () => {
  const [files, setFiles] = useState([]);
  const [fileType, setFileType] = useState('merge-pdfs'); // Default is merge PDFs
  const [mergedFileUrl, setMergedFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Setup for React Dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      setMergedFileUrl(null); // Reset the merged file URL when new files are selected
    },
  });

  // Function to handle API call for file merge
  const handleUpload = async () => {
    const formData = new FormData();

    // Append all selected files to FormData
    files.map((file) => {
      formData.append('files', file);
    });

    setLoading(true); // Start loading

    try {
      // Send a request to the API based on the selected file type
      const response = await axios.post(`https://www.dsfsmartdoc.com/convert/${fileType}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Get the response as a blob (binary data)
      });

      console.log(response)

      // Create a URL for the response blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setMergedFileUrl(url); // Save the URL to state
    } catch (error) {
      console.error('Error merging files:', error.response?.data || error.message);
    }

    setLoading(false); // Stop loading when response is received
  };

  // Handle file type change (PDF or PPT)
  const handleFileTypeChange = (event) => {
    setFileType(event.target.value); // Update file type based on user selection
    setFiles([]); // Reset the file selection on type change
    setMergedFileUrl(null); // Reset merged file URL
  };

  return (
    <div className="container mx-auto p-6">
      {/* File Type Select */}
      <div className="mb-4">
        <label htmlFor="fileType" className="block text-gray-700 font-semibold mb-2">
          Select Merge Type:
        </label>
        <select
          id="fileType"
          value={fileType}
          onChange={handleFileTypeChange}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="merge-pdfs">Merge PDFs</option>
          <option value="merge-ppts">Merge PPTs</option>
        </select>
      </div>

      {/* Dropzone area */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer bg-gray-50"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">Drag & drop some {fileType === 'merge-pdfs' ? 'PDF' : 'PPT'} files here, or click to select files</p>
      </div>

      {/* Display file names below the dropzone */}
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-gray-700 font-semibold">Selected Files:</h4>
          <ul className="list-disc list-inside text-gray-600">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload & Merge Button */}
      <div className="mt-4">
        <button
          onClick={handleUpload}
          className={`bg-blue-500 text-white py-2 px-4 rounded ${files.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={files.length === 0 || loading} // Disable if no files or loading
        >
          {loading ? 'Merging...' : `Upload & Merge ${fileType === 'merge-pdfs' ? 'PDFs' : 'PPTs'}`}
        </button>
      </div>

      {/* Download Button after successful merge */}
      {mergedFileUrl && (
        <div className="mt-4">
          <a
            href={mergedFileUrl}
            download={fileType === 'merge-pdfs' ? 'merged.pdf' : 'merged.pptx'}
            className="bg-green-500 text-white py-2 px-4 rounded inline-block"
          >
            Download Merged {fileType === 'merge-pdfs' ? 'PDF' : 'PPT'}
          </a>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="mt-4 text-gray-600">
          <p>Merging files, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default MergeFiles;




