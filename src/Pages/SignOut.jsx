import React, { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';
import { v4 as uuidv4 } from 'uuid';
import { uploadFilesTest } from '@/api/DocumentResquest'; // Import your extraction function
import { formatResponse } from '@/Utils/ResponseFormatter';
import DocResult from '@/test/DocResult';
import SmartDocSide from '@/test/SmartDocSide';
import MainSmartDoc from '@/test/MainSmartDoc';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"




pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;




const SmartDoc = () => {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [loading,setLoading] = useState(false);
  const [documentType , setDocumentType]  = useState("process-document")
  const [extractionResults, setExtractionResults] = useState([]);
  const canvasRef = useRef(null);



  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => {
      const fileId = uuidv4(); // Generate a unique ID for the file
      if (file.type === 'application/pdf') {
        const previewCanvas = document.createElement('canvas');
        const previewContext = previewCanvas.getContext('2d');

        const fileReader = new FileReader();
        fileReader.onload = function () {
          const typedArray = new Uint8Array(this.result);
          pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
            pdf.getPage(1).then((page) => {
              const viewport = page.getViewport({ scale: 0.5 });
              previewCanvas.height = viewport.height;
              previewCanvas.width = viewport.width;

              const renderContext = {
                canvasContext: previewContext,
                viewport: viewport,
              };
              page.render(renderContext).promise.then(() => {
                const previewUrl = previewCanvas.toDataURL();
                setFiles(prevFiles => [...prevFiles, { id: fileId, file, previewUrl }]);
              });
            });
          });
        };
        fileReader.readAsArrayBuffer(file);
      } else {
        const previewUrl = URL.createObjectURL(file);
        return { id: fileId, file, previewUrl };
      }
      return null;
    }).filter(fileWrapper => fileWrapper !== null); // Filter out any null entries

    // Set the files and the first file as active
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  useEffect(() => {
    if (files.length > 0) {
      // Set the first file as the active file
      setActiveFile(files[0]);
    }
  }, [files]);

  useEffect(() => {
    if (activeFile && activeFile.file && activeFile.file.type === 'application/pdf') {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        const typedArray = new Uint8Array(this.result);
        pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
          pdf.getPage(1).then((page) => {
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            page.render(renderContext);
          });
        });
      };
      fileReader.readAsArrayBuffer(activeFile.file);
    }
  }, [activeFile]);

  const extractDocument = async () => {
      try {
        setLoading(true)
        const response = await uploadFilesTest(files,documentType); // [ "data1" , "data2" , "da..],
        // setExtractionResults(response)


        // const parseData = response.map(item => ({
        //   ...item,
        //   file: formatResponse([item.file])
        // }));
        setExtractionResults(response)
        console.log(parseData.file)
        
      } catch (error) {
        console.error('Error extracting document:', error);
      } finally {
        setLoading(false)
      }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  

  return (
    <div>
      <ResizablePanelGroup
      direction="horizontal"
      >
      <ResizablePanel defaultSize={70} >
        <div className="flex w-full transition ">
          <SmartDocSide files={files} setActiveFile={setActiveFile} />
          <MainSmartDoc onDrop={onDrop} activeFile={activeFile} setActiveFile={setActiveFile} extractDocument={extractDocument} documentType={documentType} setDocumentType={setDocumentType} setFiles={setFiles} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className={"w-0.5"}  />
      <ResizablePanel defaultSize={30} className='min-w-[450px]' >
        <DocResult activeFile={activeFile} extractionResults={extractionResults} loading={loading}  />
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>

  );
};

export default SmartDoc;
