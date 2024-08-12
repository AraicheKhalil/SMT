
// // import React, { useState, useEffect, useRef } from 'react';
// // import { useDropzone } from 'react-dropzone';
// // import { v4 as uuidv4 } from 'uuid';
// // import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// // import 'pdfjs-dist/build/pdf.worker.entry';

// // pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// // const SmartDoc = () => {
// //   const [files, setFiles] = useState([]);
// //   const [activeFile, setActiveFile] = useState(null);
// //   const canvasRef = useRef(null);

// //   const onDrop = (acceptedFiles) => {
// //     const newFiles = acceptedFiles.map(file => {
// //       const fileWithId = {
// //         id: uuidv4(),
// //         file: file,
// //         previewUrl: ''
// //       };

// //       if (file.type === 'application/pdf') {
// //         const previewCanvas = document.createElement('canvas');
// //         const previewContext = previewCanvas.getContext('2d');
        
// //         const fileReader = new FileReader();
// //         fileReader.onload = function () {
// //           const typedArray = new Uint8Array(this.result);
// //           pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
// //             pdf.getPage(1).then((page) => {
// //               const viewport = page.getViewport({ scale: 0.5 });
// //               previewCanvas.height = viewport.height;
// //               previewCanvas.width = viewport.width;
              
// //               const renderContext = {
// //                 canvasContext: previewContext,
// //                 viewport: viewport,
// //               };
// //               page.render(renderContext).promise.then(() => {
// //                 fileWithId.previewUrl = previewCanvas.toDataURL();
// //                 setFiles(prevFiles => [...prevFiles, fileWithId]);
// //               });
// //             });
// //           });
// //         };
// //         fileReader.readAsArrayBuffer(file);
// //       } else {
// //         fileWithId.previewUrl = URL.createObjectURL(file);
// //         setFiles(prevFiles => [...prevFiles, fileWithId]);
// //       }

// //       return fileWithId;
// //     });

// //     if (files.length === 0) {
// //       setActiveFile(newFiles[0]);
// //     } else {
// //       setActiveFile(files[0]);
// //     }
// //   };

// //   useEffect(() => {
// //     if (activeFile && activeFile.file.type === 'application/pdf') {
// //       const fileReader = new FileReader();
// //       fileReader.onload = function () {
// //         const typedArray = new Uint8Array(this.result);
// //         pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
// //           pdf.getPage(1).then((page) => {
// //             const viewport = page.getViewport({ scale: 1.5 });
// //             const canvas = canvasRef.current;
// //             const context = canvas.getContext('2d');
// //             canvas.height = viewport.height;
// //             canvas.width = viewport.width;

// //             const renderContext = {
// //               canvasContext: context,
// //               viewport: viewport,
// //             };
// //             page.render(renderContext);
// //           });
// //         });
// //       };
// //       fileReader.readAsArrayBuffer(activeFile.file);
// //     }
// //   }, [activeFile]);

// //   const deleteFile = (id) => {
// //     setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
// //     if (activeFile && activeFile.id === id) {
// //       setActiveFile(null);
// //     }
// //   };

// //   const { getRootProps, getInputProps } = useDropzone({ onDrop });

// //   return (
// //     <div className="smart-doc" style={{ display: 'flex', height: '100vh' }}>
// //       <div className="smart-doc-side" style={{ width: '200px', backgroundColor: '#f0f0f0', overflowY: 'auto', padding: '10px' }}>
// //         {files.map((fileWrapper) => (
// //           <div key={fileWrapper.id} onClick={() => setActiveFile(fileWrapper)}>
// //             <img src={fileWrapper.previewUrl} alt="Preview" style={{ width: '100%' }} />
// //             <button onClick={(e) => { e.stopPropagation(); deleteFile(fileWrapper.id); }}>Delete</button>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="main-smart-doc" style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //         {!activeFile ? (
// //           <div {...getRootProps({ className: 'dropzone' })} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #cccccc', backgroundColor: '#fafafa' }}>
// //             <input {...getInputProps()} />
// //             <p>Drag 'n' drop some files here, or click to select files</p>
// //           </div>
// //         ) : (
// //           <div className="file-preview max-w-[500px] overflow-hidden" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //             {activeFile.file?.type.startsWith('image/') ? (
// //               <img src={activeFile.previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
// //             ) : (
// //               <canvas ref={canvasRef}></canvas>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //       <div className="doc-result" style={{ width: '200px', backgroundColor: '#f0f0f0', overflowY: 'auto', padding: '10px' }}>
// //         <h2>Active File</h2>
// //         {activeFile ? (
// //           <div>
// //             <p>{activeFile.file.name}</p>
// //             <button onClick={() => deleteFile(activeFile.id)}>Delete File</button>
// //           </div>
// //         ) : (
// //           <p>No file selected</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default SmartDoc;







// // import React, { useState, useEffect, useRef } from 'react';
// // import { useDropzone } from 'react-dropzone';
// // import { v4 as uuidv4 } from 'uuid';
// // import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// // import 'pdfjs-dist/build/pdf.worker.entry';

// // pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// // const SmartDoc = () => {
// //   const [files, setFiles] = useState([]);
// //   const [activeFile, setActiveFile] = useState(null);
// //   const [zoom, setZoom] = useState(1);
// //   const [rotation, setRotation] = useState(0);
// //   const canvasRef = useRef(null);

// //   const onDrop = (acceptedFiles) => {
// //     const newFiles = acceptedFiles.map(file => {
// //       const fileWithId = {
// //         id: uuidv4(),
// //         file: file,
// //         previewUrl: ''
// //       };

// //       if (file.type === 'application/pdf') {
// //         const previewCanvas = document.createElement('canvas');
// //         const previewContext = previewCanvas.getContext('2d');
        
// //         const fileReader = new FileReader();
// //         fileReader.onload = function () {
// //           const typedArray = new Uint8Array(this.result);
// //           pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
// //             pdf.getPage(1).then((page) => {
// //               const viewport = page.getViewport({ scale: 0.5 });
// //               previewCanvas.height = viewport.height;
// //               previewCanvas.width = viewport.width;
              
// //               const renderContext = {
// //                 canvasContext: previewContext,
// //                 viewport: viewport,
// //               };
// //               page.render(renderContext).promise.then(() => {
// //                 fileWithId.previewUrl = previewCanvas.toDataURL();
// //                 setFiles(prevFiles => [...prevFiles, fileWithId]);
// //               });
// //             });
// //           });
// //         };
// //         fileReader.readAsArrayBuffer(file);
// //       } else {
// //         fileWithId.previewUrl = URL.createObjectURL(file);
// //         setFiles(prevFiles => [...prevFiles, fileWithId]);
// //       }

// //       return fileWithId;
// //     });

// //     if (files.length === 0) {
// //       setActiveFile(newFiles[0]);
// //     } else {
// //       setActiveFile(files[0]);
// //     }
// //   };

// //   useEffect(() => {
// //     if (activeFile && activeFile.file.type === 'application/pdf') {
// //       const fileReader = new FileReader();
// //       fileReader.onload = function () {
// //         const typedArray = new Uint8Array(this.result);
// //         pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
// //           pdf.getPage(1).then((page) => {
// //             const viewport = page.getViewport({ scale: zoom });
// //             const canvas = canvasRef.current;
// //             const context = canvas.getContext('2d');
// //             canvas.height = viewport.height;
// //             canvas.width = viewport.width;

// //             const renderContext = {
// //               canvasContext: context,
// //               viewport: viewport,
// //             };
// //             page.render(renderContext);
// //           });
// //         });
// //       };
// //       fileReader.readAsArrayBuffer(activeFile.file);
// //     }
// //   }, [activeFile, zoom, rotation]);

// //   const deleteFile = (id) => {
// //     setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
// //     if (activeFile && activeFile.id === id) {
// //       setActiveFile(null);
// //     }
// //   };

// //   const handleZoomChange = (e) => {
// //     setZoom(parseFloat(e.target.value));
// //   };

// //   const rotateDocument = () => {
// //     setRotation(prevRotation => prevRotation + 90);
// //   };

// //   const { getRootProps, getInputProps } = useDropzone({ onDrop });

// //   return (
// //     <div className="smart-doc" style={{ display: 'flex', height: '100vh' }}>
// //       <div className="smart-doc-side" style={{ width: '200px', backgroundColor: '#f0f0f0', overflowY: 'auto', padding: '10px' }}>
// //         {files.map((fileWrapper) => (
// //           <div key={fileWrapper.id} onClick={() => setActiveFile(fileWrapper)}>
// //             <img src={fileWrapper.previewUrl} alt="Preview" style={{ width: '100%' }} />
// //             <button onClick={(e) => { e.stopPropagation(); deleteFile(fileWrapper.id); }}>Delete</button>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="main-smart-doc" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
// //         {!activeFile ? (
// //           <div {...getRootProps({ className: 'dropzone' })} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #cccccc', backgroundColor: '#fafafa' }}>
// //             <input {...getInputProps()} />
// //             <p>Drag 'n' drop some files here, or click to select files</p>
// //           </div>
// //         ) : (
// //           <>
// //             <div className="toolbar" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#333', color: '#fff', padding: '10px' }}>
// //               <button onClick={() => setZoom(zoom + 0.1)} style={{ margin: '0 5px' }}>Zoom In</button>
// //               <button onClick={() => setZoom(zoom - 0.1)} style={{ margin: '0 5px' }}>Zoom Out</button>
// //               <input type="range" min="0.5" max="3" step="0.1" value={zoom} onChange={handleZoomChange} style={{ margin: '0 5px' }} />
// //               <button onClick={rotateDocument} style={{ margin: '0 5px' }}>Rotate</button>
// //             </div>
// //             <div className="file-preview max-w-[500px] overflow-hidden" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${rotation}deg)` }}>
// //               {activeFile.file?.type.startsWith('image/') ? (
// //                 <img src={activeFile.previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
// //               ) : (
// //                 <canvas ref={canvasRef}></canvas>
// //               )}
// //             </div>
// //           </>
// //         )}
// //       </div>
// //       <div className="doc-result" style={{ width: '200px', backgroundColor: '#f0f0f0', overflowY: 'auto', padding: '10px' }}>
// //         <h2>Active File</h2>
// //         {activeFile ? (
// //           <div>
// //             <p>{activeFile.file.name}</p>
// //             <button onClick={() => deleteFile(activeFile.id)}>Delete File</button>
// //           </div>
// //         ) : (
// //           <p>No file selected</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default SmartDoc;


// // import React, { useState, useEffect, useRef } from 'react';
// // import { useDropzone } from 'react-dropzone';
// // import { v4 as uuidv4 } from 'uuid';
// // import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// // import 'pdfjs-dist/build/pdf.worker.entry';

// // pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// // const SmartDoc = () => {
// //   const [files, setFiles] = useState([]);
// //   const [activeFile, setActiveFile] = useState(null);
// //   const [zoom, setZoom] = useState(1);
// //   const [rotation, setRotation] = useState(0);
// //   const canvasRef = useRef(null);

// //   const onDrop = (acceptedFiles) => {
// //     const newFiles = acceptedFiles.map(file => {
// //       const fileWithId = {
// //         id: uuidv4(),
// //         file: file,
// //         previewUrl: ''
// //       };

// //       if (file.type === 'application/pdf') {
// //         const previewCanvas = document.createElement('canvas');
// //         const previewContext = previewCanvas.getContext('2d');
        
// //         const fileReader = new FileReader();
// //         fileReader.onload = function () {
// //           const typedArray = new Uint8Array(this.result);
// //           pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
// //             pdf.getPage(1).then((page) => {
// //               const viewport = page.getViewport({ scale: 0.5 });
// //               previewCanvas.height = viewport.height;
// //               previewCanvas.width = viewport.width;
              
// //               const renderContext = {
// //                 canvasContext: previewContext,
// //                 viewport: viewport,
// //               };
// //               page.render(renderContext).promise.then(() => {
// //                 fileWithId.previewUrl = previewCanvas.toDataURL();
// //                 setFiles(prevFiles => [...prevFiles, fileWithId]);
// //               });
// //             });
// //           });
// //         };
// //         fileReader.readAsArrayBuffer(file);
// //       } else {
// //         fileWithId.previewUrl = URL.createObjectURL(file);
// //         setFiles(prevFiles => [...prevFiles, fileWithId]);
// //       }

// //       return fileWithId;
// //     });

// //     if (files.length === 0) {
// //       setActiveFile(newFiles[0]);
// //     } else {
// //       setActiveFile(files[0]);
// //     }
// //   };

// //   useEffect(() => {
// //     if (activeFile && activeFile.file.type === 'application/pdf') {
// //       const fileReader = new FileReader();
// //       fileReader.onload = function () {
// //         const typedArray = new Uint8Array(this.result);
// //         pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
// //           pdf.getPage(1).then((page) => {
// //             const viewport = page.getViewport({ scale: zoom });
// //             const canvas = canvasRef.current;
// //             const context = canvas.getContext('2d');
// //             canvas.height = viewport.height;
// //             canvas.width = viewport.width;

// //             const renderContext = {
// //               canvasContext: context,
// //               viewport: viewport,
// //             };
// //             page.render(renderContext);
// //           });
// //         });
// //       };
// //       fileReader.readAsArrayBuffer(activeFile.file);
// //     }
// //   }, [activeFile, zoom, rotation]);

// //   const deleteFile = (id) => {
// //     setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
// //     if (activeFile && activeFile.id === id) {
// //       setActiveFile(null);
// //     }
// //   };

// //   const handleZoomChange = (e) => {
// //     setZoom(parseFloat(e.target.value));
// //   };

// //   const rotateDocument = () => {
// //     setRotation(prevRotation => prevRotation + 90);
// //   };

// //   const { getRootProps, getInputProps } = useDropzone({ onDrop });

// //   return (
// //     <div className="smart-doc" style={{ display: 'flex', height: '100vh' }}>
// //       <div className="smart-doc-side" style={{ width: '200px', backgroundColor: '#f0f0f0', overflowY: 'auto', padding: '10px' }}>
// //         {files.map((fileWrapper) => (
// //           <div key={fileWrapper.id} onClick={() => setActiveFile(fileWrapper)}>
// //             <img src={fileWrapper.previewUrl} alt="Preview" style={{ width: '100%' }} />
// //             <button onClick={(e) => { e.stopPropagation(); deleteFile(fileWrapper.id); }}>Delete</button>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="main-smart-doc" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
// //         {!activeFile ? (
// //           <div {...getRootProps({ className: 'dropzone' })} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #cccccc', backgroundColor: '#fafafa' }}>
// //             <input {...getInputProps()} />
// //             <p>Drag 'n' drop some files here, or click to select files</p>
// //           </div>
// //         ) : (
// //           <>
// //             <div className="toolbar" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#333', color: '#fff', padding: '10px' }}>
// //               <button onClick={() => setZoom(zoom + 0.1)} style={{ margin: '0 5px' }}>Zoom In</button>
// //               <button onClick={() => setZoom(zoom - 0.1)} style={{ margin: '0 5px' }}>Zoom Out</button>
// //               <input type="range" min="0.5" max="3" step="0.1" value={zoom} onChange={handleZoomChange} style={{ margin: '0 5px' }} />
// //               <button onClick={rotateDocument} style={{ margin: '0 5px' }}>Rotate</button>
// //             </div>
// //             <div className="file-preview-container" style={{ overflow: 'hidden', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //               <div className="file-preview" style={{ transform: `scale(${zoom}) rotate(${rotation}deg)`, transformOrigin: 'center' }}>
// //                 {activeFile.file?.type.startsWith('image/') ? (
// //                   <img src={activeFile.previewUrl} alt="Preview" style={{ width: '100%', height: '100%' }} />
// //                 ) : (
// //                   <canvas ref={canvasRef}></canvas>
// //                 )}
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //       <div className="doc-result" style={{ width: '200px', backgroundColor: '#f0f0f0', overflowY: 'auto', padding: '10px' }}>
// //         <h2>Active File</h2>
// //         {activeFile ? (
// //           <div>
// //             <p>{activeFile.file.name}</p>
// //             <button onClick={() => deleteFile(activeFile.id)}>Delete File</button>
// //           </div>
// //         ) : (
// //           <p>No file selected</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default SmartDoc;



// import React, { useState, useEffect, useRef } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { v4 as uuidv4 } from 'uuid';
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// import 'pdfjs-dist/build/pdf.worker.entry';
// import { uploadFilesTest } from '@/api/DocumentResquest';

// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// const SmartDoc = () => {
//   const [files, setFiles] = useState([]);
//   const [activeFile, setActiveFile] = useState(null);
//   const [zoom, setZoom] = useState(1);
//   const [rotation, setRotation] = useState(0);
//   const [response, setResponse] = useState(null);
//   const canvasRef = useRef(null);

//   const onDrop = (acceptedFiles) => {
//     const newFiles = acceptedFiles.map(file => {
//       const fileWithId = {
//         id: uuidv4(),
//         file: file,
//         previewUrl: ''
//       };

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
//                 fileWithId.previewUrl = previewCanvas.toDataURL();
//                 setFiles(prevFiles => [...prevFiles, fileWithId]);
//               });
//             });
//           });
//         };
//         fileReader.readAsArrayBuffer(file);
//       } else {
//         fileWithId.previewUrl = URL.createObjectURL(file);
//         setFiles(prevFiles => [...prevFiles, fileWithId]);
//       }

//       return fileWithId;
//     });

//     if (files.length === 0) {
//       setActiveFile(newFiles[0]);
//     } else {
//       setActiveFile(files[0]);
//     }
//   };

//   useEffect(() => {
//     if (activeFile && activeFile.file.type === 'application/pdf') {
//       const fileReader = new FileReader();
//       fileReader.onload = function () {
//         const typedArray = new Uint8Array(this.result);
//         pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
//           pdf.getPage(1).then((page) => {
//             const viewport = page.getViewport({ scale: zoom });
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
//   }, [activeFile, zoom, rotation]);

//   const deleteFile = (id) => {
//     setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
//     if (activeFile && activeFile.id === id) {
//       setActiveFile(null);
//     }
//   };

//   const handleZoomChange = (e) => {
//     setZoom(parseFloat(e.target.value));
//   };

//   const rotateDocument = () => {
//     setRotation(prevRotation => prevRotation + 90);
//   };

//   const extractDocument = async () => {
//     if (activeFile) {
//       try {
//         const responseData = await uploadFilesTest([activeFile.file]);
//         setResponse(responseData);
//       } catch (error) {
//         console.error('Error extracting document:', error);
//       }
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (
//     <div className="smart-doc" style={{ display: 'flex', height: '100vh' }}>
//       <div className="smart-doc-side" style={{ width: '200px', backgroundColor: '#f0f0f0', overflowY: 'auto', padding: '10px' }}>
//         {files.map((fileWrapper) => (
//           <div key={fileWrapper.id} onClick={() => setActiveFile(fileWrapper)}>
//             <img src={fileWrapper.previewUrl} alt="Preview" style={{ width: '100%' }} />
//             <button onClick={(e) => { e.stopPropagation(); deleteFile(fileWrapper.id); }}>Delete</button>
//           </div>
//         ))}
//       </div>
//       <div className="main-smart-doc" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//         {!activeFile ? (
//           <div {...getRootProps({ className: 'dropzone' })} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #cccccc', backgroundColor: '#fafafa' }}>
//             <input {...getInputProps()} />
//             <p>Drag 'n' drop some files here, or click to select files</p>
//           </div>
//         ) : (
//           <>
//             <div className="toolbar" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#333', color: '#fff', padding: '10px' }}>
//               <button onClick={extractDocument} style={{ margin: '0 5px' }}>Extract</button>
//               <div>
//                 <button onClick={() => setZoom(zoom + 0.1)} style={{ margin: '0 5px' }}>Zoom In</button>
//                 <button onClick={() => setZoom(zoom - 0.1)} style={{ margin: '0 5px' }}>Zoom Out</button>
//                 <input type="range" min="0.5" max="3" step="0.1" value={zoom} onChange={handleZoomChange} style={{ margin: '0 5px' }} />
//                 <button onClick={rotateDocument} style={{ margin: '0 5px' }}>Rotate</button>
//               </div>
//             </div>
//             <div className="file-preview-container" style={{ overflow: 'hidden', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               <div className="file-preview" style={{ transform: `scale(${zoom}) rotate(${rotation}deg)`, transformOrigin: 'center' }}>
//                 {activeFile.file?.type.startsWith('image/') ? (
//                   <img src={activeFile.previewUrl} alt="Preview" style={{ width: '100%', height: '100%' }} />
//                 ) : (
//                   <canvas ref={canvasRef}></canvas>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//       <div className="doc-result" style={{ width: '200px', backgroundColor: '#f0f0f0', overflowY: 'auto', padding: '10px' }}>
//         <h2>Active File</h2>
//         {activeFile ? (
//           <div>
//             <p>{activeFile.file.name}</p>
//             <button onClick={() => deleteFile(activeFile.id)}>Delete File</button>
//           </div>
//         ) : (
//           <p>No file selected</p>
//         )}
//         {response && (
//           <div>
//             <h3>Extraction Result</h3>
//             <pre>{JSON.stringify(response, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SmartDoc;




// import SmartDoc from '@/test/SmtDoc'
// import React from 'react'

// function SignOut() {
//   return (
//     <div >
//       <SmartDoc />
//     </div>
//   )
// }

// export default SignOut
























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