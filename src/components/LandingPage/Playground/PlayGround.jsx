// import React, { useState, useEffect, useRef } from 'react';
// import { useDropzone } from 'react-dropzone';
// // import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// // import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// pdfjsLib.GlobalWorkerOptions.workerSrc = await import('pdfjs-dist/build/pdf.worker.entry');

// const Playground = () => {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [error, setError] = useState('');
//   const canvasRef = useRef(null);

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0];

//     // File size validation
//     if (file.size > 5000000) { // 5 MB limit
//       setError('File size must be less than 5 MB');
//       return;
//     } else if (file.size > 3000000) { // 3 MB warning
//       setError('Warning: File size is larger than 3 MB');
//     } else {
//       setError('');
//     }

//     // Check if the file is a PDF
//     if (file.type === 'application/pdf') {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         const pdfData = new Uint8Array(reader.result);
//         const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
//         const page = await pdf.getPage(1);
//         const scale = 1.5;
//         const viewport = page.getViewport({ scale });
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');

//         canvas.height = viewport.height;
//         canvas.width = viewport.width;

//         const renderContext = {
//           canvasContext: context,
//           viewport: viewport,
//         };
//         page.render(renderContext);
//       };
//       reader.readAsArrayBuffer(file);
//     }

//     setUploadedFile(file);
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     maxFiles: 1,
//     accept: 'image/*,application/pdf',
//     maxSize: 5000000, // 5 MB limit
//   });

//   return (
//     <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-blue-200">
//       <div className="w-full md:w-1/2 flex justify-center items-center p-4">
//         {uploadedFile ? (
//           uploadedFile.type === 'application/pdf' ? (
//             <canvas ref={canvasRef} className="max-h-full max-w-full"></canvas>
//           ) : (
//             <img
//               src={URL.createObjectURL(uploadedFile)}
//               alt={uploadedFile.name}
//               className="max-h-full max-w-full object-contain"
//             />
//           )
//         ) : (
//           <div
//             {...getRootProps({
//               className:
//                 'border-2 border-dashed border-gray-300 rounded-lg p-6 flex justify-center items-center w-full h-64 cursor-pointer',
//             })}
//           >
//             <input {...getInputProps()} />
//             <p className="text-gray-500">Drag & drop an image or PDF, or click to select one</p>
//           </div>
//         )}
//       </div>

//       <div className="w-full md:w-1/2 p-4">
//         {uploadedFile && (
//           <div className="flex flex-col items-center">
//             <p className="mt-2 text-gray-700">{uploadedFile.name}</p>
//           </div>
//         )}
//         {error && (
//           <div className="mt-4 text-red-600">
//             <p>{error}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Playground;




import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';
import SectionTitle from '@/components/SectionTitle';
import { PlayGroundResponse } from '@/api/DocumentResquest';
import CopyToClipboard from "react-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import ResponseFormat from "@/components/ExtractTabs/ResponseFormat";
import DataTable from '@/components/DataTable';
import { CloudUpload } from "lucide-react";
import { SkeletonResponseLD } from "@/components/Custom/skeleton";
import { formatResponse } from "@/Utils/ResponseFormatter";


pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PlayGround() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [copied, setCopied] = useState(false);
  const [Response,setResponse] = useState("");
  const [loading,setLoading] = useState(false);

  console.log(Response)
  // console.log("response is :",Response?.map(item => formatResponse(item)))



  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    if (selectedFile.type === 'application/pdf') {
      renderPdfAsImage(selectedFile);
    } else if (selectedFile.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const renderPdfAsImage = async (pdfFile) => {
    const fileReader = new FileReader();

    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      const page = await pdf.getPage(1);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;

      const imgUrl = canvas.toDataURL();
      setPreview(imgUrl);
    };

    fileReader.readAsArrayBuffer(pdfFile);
  };

  const handleExtract = async () => {
    try {
      setLoading(true);
      const response = await PlayGroundResponse([file]);
      const parseData = response.map(item => formatResponse([item]));
      setResponse(parseData)
      console.log('API Response:', response?.map(item => formatResponse([item])));
    } catch (error) {
      console.error('Error extracting files:', error);
    }finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1, // Accept only one file
  });


  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJsonDownload = () => {
    const blob = new Blob([JSON.stringify(Response, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'response.json';
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  // Utility functions to convert JSON to table data
const flattenObject = (obj, parent = '', res = {}) => {
  for (let key in obj) {
    let propName = parent ? `${parent}.${key}` : key;
    if (Array.isArray(obj[key])) {
      obj[key].forEach((item, index) => {
        flattenObject(item, `${propName}[${index}]`, res);
      });
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

const jsonToTableData = (json) => {
  if (!json || !Array.isArray(json) || json.length === 0) {
    return { headers: [], rows: [] };
  }

  const flattenedJson = json.map(item => flattenObject(item));
  const headers = Array.from(new Set(flattenedJson.flatMap(item => Object.keys(item))));
  const rows = flattenedJson.map(item => headers.map(header => item[header] || ''));

  return { headers, rows };
};
  
  const handleExport = () => {
    const Response = extractionResults[0]?.file;
    const workbook = jsonToExcel(Array.isArray(Response) ? Response : [Response]);
    downloadExcel(workbook, 'export.xlsx');
  };

  const { headers, rows } = jsonToTableData(Array.isArray(Response) ? Response : [Response]);

  const downloadExcel = (workbook, filename) => {
    XLSX.writeFile(workbook, filename);
  };
  
  return (
    <div className="">
      <div className='container'>
        <SectionTitle
          badge={"Quick PlayGround"}
          titleSection={"Playground"}
          description={"Extract & Structure any document with precision and speed"}
        />

        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-10'>
          {/* Upload Section */}
          <div className='bg-gray-200 basis-1/2 shadow-lg shadow-slate-700 rounded-lg p-4 min-h-[450px] max-h-[450px]'>
            {
              file == null ? (
                <div {...getRootProps({ className: 'dropzone' })} className={`h-full border-dashed border-4 p-8 w-full  flex items-center justify-center  text-center flex-grow ${isDragActive ? 'border-blue-500' : 'border-gray-500 rounded-lg'} h-[415px]  `}>
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p>Drop the file here...</p> :
                      <div className='flex-col text-sm items-center justify-center'>
                        <div className="flex items-center justify-center flex-col">
                          <CloudUpload size={50} className='text-blue-600' />
                        </div>
                        <p className=' text-base mt-6'>
                          <span className='font-semibold'>Drag</span> and <span className='font-semibold'>Drop</span> some files here to extract data from documents seamlessly. After extracting the data, you can edit it as needed and download the updated document. Our AI-powered solution ensures accuracy and efficiency in document processing.
                        </p>
                      </div>
                  }
                </div>
              ) : (
                <div className='w-full max-h-[400px] '>
                {preview && (
                  <div className="flex flex-col ">
                    <div className="flex justify-center w-full">

                      <img src={preview} alt="File preview" className="max-h-[370px]" />
                    </div>
                    <button
                      onClick={handleExtract}
                      className='mt-4 bg-[#28282B] text-[#FFFECA]  p-2 rounded w-full'>
                      {loading ? "Extract ..." : "Extract"}
                    </button>
                  </div>
                )}
              </div> 
              )
            }


            {/* <div className='w-full max-h-[200px] '>
              {preview && (
                <div>
                  <img src={preview} alt="File preview" className="max-h-[300px]" />
                  <button
                    onClick={handleExtract}
                    className='mt-4 bg-blue-500 text-white p-2 rounded'>
                    Extract
                  </button>
                </div>
              )}
            </div> */}
          </div>
          
          {/* Response Section */}
          <div className='bg-gray-200 basis-1/2 shadow-lg shadow-slate-700 rounded-lg p-4 min-h-[450px] max-h-[450px] overflow-auto '>
            {/* Response will be displayed here later */}
            <Tabs defaultValue="JSON" className="w-full ">
               <TabsList className="grid w-full grid-cols-3">
                 <TabsTrigger className="data-[state=active]:bg-[#28282B] data-[state=active]:text-white data-[state=active]:shadow-sm" value="JSON">JSON</TabsTrigger>
                 <TabsTrigger className="data-[state=active]:bg-[#28282B] data-[state=active]:text-white data-[state=active]:shadow-sm" value="Key-Pair">Key-Pair</TabsTrigger>
                 <TabsTrigger className="data-[state=active]:bg-[#28282B] data-[state=active]:text-white data-[state=active]:shadow-sm" value="Excel">Excel</TabsTrigger>
               </TabsList>
               {/* json */}
               <TabsContent value="JSON">
                
                <CopyToClipboard
                  text={JSON.stringify(Response, null, 2)}
                  onCopy={handleCopy}
                >
                  <Button className="text-xs px-3 py-2.5 h-fit bg-[#28282B] ">{copied ? "Copied!" : "Copy JSON"}</Button>
                </CopyToClipboard>
                <Button onClick={handleJsonDownload} className="ml-2 text-xs px-3 py-2.5 h-fit bg-[#28282B]">
                  Download JSON
                </Button>
                <div className=" mt-3">
                  {
                    !loading ? (
                      <pre className=" p-4 rounded overflow-auto shadow-md bg-white">
                      {JSON.stringify(Response, null, 2)}
                    </pre>
                    ) : (
                      <SkeletonResponseLD />
                    )
                  }
                 
                </div>
               </TabsContent>
               <TabsContent value="Key-Pair">
                {!loading ? (
                  <ResponseFormat data={Response} />
                ) : (
                  <SkeletonResponseLD />
                )
                
                }
               </TabsContent>
               <TabsContent value="Excel">
                 <div className=' h-full'>
                 <div>
                  <Button onClick={handleExport} className="mb-2 ml-2 bg-[#28282B] text-xs px-3 py-2.5 h-fit">Download Excel</Button>
                  <DataTable headers={headers} rows={rows} />
                </div>
                 </div>
               </TabsContent>
             </Tabs> 
          </div>
        </div>
      </div>
    </div>
  );
}






// {/* <Tabs defaultValue="JSON" className="w-full ">
//               <TabsList className="grid w-full grid-cols-3">
//                 <TabsTrigger value="JSON">JSON</TabsTrigger>
//                 <TabsTrigger value="Key-Pair">Key-Pair</TabsTrigger>
//                 <TabsTrigger value="Excel">Excel</TabsTrigger>
//               </TabsList>
//               {/* json */}
//               <TabsContent value="JSON">
//                 k
//               </TabsContent>
//               <TabsContent value="Key-Pair">
//                 k
//               </TabsContent>
//               <TabsContent value="Excel">
//                 <div className='bg-red-500 h-full'>
//                   k
//                 </div>
//               </TabsContent>
//             </Tabs> */}