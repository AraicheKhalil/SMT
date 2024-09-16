import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TitlePage from '@/components/Custom/TitlePage';
import { GenIAResponse,  } from '@/api/DocumentResquest';
import { useDropzone } from 'react-dropzone';
import { ArrowUpLeftFromSquare, CloudSnow, Cog, Files, Sparkles, X } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { format } from 'date-fns';
import { FaFileLines } from 'react-icons/fa6';



const ToolsTypes = () => {

    const [convertedFiles, setConvertedFiles] = useState([]); 
    const [jsonData, setJsonData] = useState('');
    const [mergedPdfs, setMergedPdfs] = useState(null); // Store the merged PDF URL
    const [mergedPdfUrl, setMergedPdfUrl] = useState(null); // Store the merged PDF URL
    
    const [file, setFile] = useState(null);
    const [text, setText] = useState(""); 
    const [summaryLength, setSummaryLength] = useState(""); 
    const [uploading, setUploading] = useState(false);
    const [response, setResponse] = useState(false);
    const [error, setError] = useState(null);
    const [target_lang, setTarget_lang] = useState('');
    const [source_lang,setSource_lang] = useState("");
    const [tone,setTone] = useState("");
    const [queries , setQueries] = useState({
        politeness : false,
        clarity : false,
        brevity : false,
        professionalism : false
    });
    const textAreaRef = useRef(null);
    const params = useParams(); 
    let type = params.type;

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
      };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleInputChange = (e) => {
    setText(e.target.value);
    
    // Resize the textarea to fit content
    textAreaRef.current.style.height = "auto";  // Reset the height
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;  // Set the height to match the content
  };

//   const handleFileUpload = (file) => {
//     summarizeDocument({ file, summaryLength: 'short' })
//       .then((data) => {
//         console.log('Summarized document:', data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

 

  console.log(file)
  
  const handleTextInput = async () => {
    try {
        setUploading(true);
        const response = await GenIAResponse({ text, target_lang : target_lang,
          source_lang : source_lang , tone : tone, summaryLength: summaryLength },type);
        const data = await response;
        setResponse(data);
        setUploading(false);
    } catch (error) {
        setUploading(false);
        console.log("no text found")
    }
  };

  const handleFileInput = async () => {
    try {
        setUploading(true);
        const response = await GenIAResponse({ file, target_lang : target_lang,
          source_lang : source_lang, tone : tone, summaryLength: summaryLength  },type);
        const data = await response;
        setResponse(data);
        setUploading(false);
    } catch (error) {
        setUploading(false);
        console.log("no text found")
    }
  };

  const formatSummaryResponse = (response) => {
  
    // Remove Markdown headers like '## Summary (Short)'
    const cleanedText = response
    .replace(/^#+[^\n]*\n+/, '')             // Remove headers that start with any number of '#'
      .replace(/^##[^\n]*\n+/, '\n')             // Remove Markdown headers like '## Node.js Introduction (Short Summary)'
    .replace(/\\n\\n/g, '\n')                   //  Replace '/n' with ' . '
    .replace(/\*/, '')  
      .trim();                                 // Trim leading and trailing spaces/newlines
  
    return cleanedText;
  };
  
  const ValideSummearize = ["dsf-summarize-document"];
  const IsValideSummearize = ValideSummearize.includes(type);

  const validtranslate = ["translate-document-gemini"];
  const isValidtranslate = validtranslate.includes(type);

  const ValideProofread = ["dsf-proofread"];
  const isValideProofread = ValideProofread.includes(type);

  console.log([file]?.length)


  return (
    <>
      <div className='px-4 py-6 md:p-7'>

        <div className='flex w-full gap-6'>
        <Tabs defaultValue="Text" className="w-1/2 ">
            <TabsList className="grid w-full grid-cols-2 shadow-md">
                <TabsTrigger value="Text">Text</TabsTrigger>
                <TabsTrigger value="File">File</TabsTrigger>
            </TabsList>
            {/* options target */}
            
            <TabsContent value="Text" className="relative">
                {
                    text && (
                        <button onClick={() => setText("")} className={`right-2 ${isValidtranslate ? "top-28" : "top-[70px]"} text-gray-500 absolute hover:bg-gray-200 rounded-full p-1`}>
                            <X />
                        </button>
                    )
                }
                <div className='flex gap-2'>
                    {
                        IsValideSummearize && (
                            <Input placeholder="Summary Length : Short, long, ...." value={summaryLength} onChange={(e) => setSummaryLength(e.target.value)} required className="mb-2 shadow"/>
                        )

                    }
                    {
                        isValidtranslate && (
                            <div className='w-full'>
                                <Input placeholder="Original Langue : English ...." value={source_lang} onChange={(e) => setSource_lang(e.target.value)} required className="mb-2 shadow"/>
                                <Input placeholder="Target Langue : Spanish, turkish, ...." value={target_lang} onChange={(e) => setTarget_lang(e.target.value)} required className="mb-2  shadow"/>
                            </div>
                        )
                    }
                    {
                      isValideProofread && (
                        <div className='w-full'>
                          <Input placeholder="tone : neutral ...." value={tone} onChange={(e) => setTone(e.target.value)} required className="mb-2 shadow "/>
                        </div>
                      )
                    }
                    <Button className="bg-green-500 hover:bg-green-700 shadow" onClick={handleTextInput} >{uploading ? "Summarizing..." : "Get Summarize"}</Button>
                </div>
                <textarea
                    ref={textAreaRef}
                    value={text}
                    onChange={handleInputChange}
                    className="min-h-[350px] w-full p-5 shadow placeholder:text-muted-foreground pr-14 border border-gray-300 rounded-md resize-none overflow-hidden focus:outline-none leading-7 "
                    placeholder="Start typing..."
                />
            </TabsContent>
            <TabsContent value="File">
                <div className='flex gap-2'>
                    {
                        IsValideSummearize && (
                            <Input placeholder="Summary Length : Short, long, ...." value={summaryLength} onChange={(e) => setSummaryLength(e.target.value)} required className="mb-2 shadow"/>
                        )

                    }
                    {
                        isValidtranslate && (
                            <div className='w-full'>
                                <Input placeholder="Original Langue : English ...." value={source_lang} onChange={(e) => setSource_lang(e.target.value)} required className="mb-2 shadow"/>
                                <Input placeholder="Target Langue : Spanish, turkish, ...." value={target_lang} onChange={(e) => setTarget_lang(e.target.value)} required className="mb-2 shadow "/>
                            </div>
                        )
                    }
                    {
                      isValideProofread && (
                        <div className='w-full'>
                          <Input placeholder="tone : neutral ...." value={tone} onChange={(e) => setTone(e.target.value)} required className="mb-2 shadow"/>
                        </div>
                      )
                    }
                    <Button className="bg-green-500 hover:bg-green-700 " onClick={handleFileInput} >{uploading ? "Summarizing..." : "Get Summarize"}</Button>
                </div>
                 <div 
                    {...getRootProps()}
                    className={`bg-[#F5F5F5] border border-gray-300 min-h-[350px]  rounded-lg ${!file && "p-6 text-center flex items-center justify-center"} `}
                  >
                    <input {...getInputProps() } className='' />
                    {isDragActive ? (
                      <p>Drop the file here...</p>
                    ) : (
                      <div className=''>
                        {
                          file  ?
                            <div className='bg-gray-200 p-4 rounded-md  mt-2 mx-2 flex items-center gap-5  '>
                              <div className=' rounded-lg flex justify-center items-center p-2'>
                                  <FaFileLines className='text-gray-500 text-3xl' />
                              </div>
                              <div className="flex-1 text-[#8194aa] text-xs">
                                      <p className='font-medium text-gray-600'>{file.name}</p>
                                      <div className='flex flex-col'>
                                          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                                          <p>Modified Time: {format(file.lastModified, 'Pp')}</p>
                                      </div>
                                      <button
                                          onClick={() => setFile(null)}
                                          className="text-red-500  mt-1 hover:underline"
                                      >
                                          Delete
                                      </button>
                                  </div>
                            </div>
                           : (
                            <div className='w-1/2 mx-auto'>
                              <img src="https://ssl.gstatic.com/translate/drag_and_drop.png" alt='image' />
                              <h3 className='mt-4 font-medium text-xl text-zinc-700'>Drag and drop</h3>
                            </div>
                          )
                          
                        }
                      </div>
                    )}
                  </div>
            </TabsContent>
        </Tabs>
            <div className='border border-gray-200 w-1/2 rounded-lg p-6 bg-[#F5F5F5] leading-7 shadow-md'>
            <h1 className='font-semibold font-Rubik text-xl mb-5'>Summarizing Text</h1>
                {response ? formatSummaryResponse(JSON.stringify(response)) : "" }
            </div>
        </div>

      </div>
    </>
  );
};

export default ToolsTypes;























