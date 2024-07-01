
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Check, Download, PenTool } from 'lucide-react'
import ResponseFormat from './ExtractTabs/ResponseFormat';
import ExtractedResponse from './ExtractTabs/extractedResponse';
import UploadFilesToDialog from '@/Pages/uploadFilesToDialog';
import EditableDocs from './EditableDocs';

const documentData = {
  "document_type": "Passport",
  "country": "United Kingdom",
  "id_number": "9256635416",
  "surname": "SPECIMEN",
  "given_names": "ANGELA ZOE",
  "nationality": "British Citizen",
  "date_of_birth": "04 DEC 88",
  "place_of_birth": "CROYDON",
  "date_of_issue": "26 MAR 14",
  "date_of_expiry": "26 NOV 24"
};

export default function DocResult({Response , setFiletoSmartDoc}) {

  console.log(Response)
  

  const [FileToResult,setFileToResult] = useState(null)
  const [copied, setCopied] = useState(false);

  // console.log(Response)

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[450px] w-[450px] min-w-[450px]  bg-white min-h-screen  h-full fixed z-50 right-0 ">
      <div className="border-b border-gray-200  ">
      <Dialog >
        <DialogTrigger asChild>
          <Button className="py-3 bg-gray-900 h-fit rounded-sm m-2 font-semibold mx-2 uppercase text-xs flex items-center gap-2 ml-auto ">
            <Download size={16} color='#ffffff' /> 
            <div>Import Document </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[350px] max-w-[900px] max-h-[500px] my-4 overflow-auto">
          <DialogHeader>
            <DialogTitle className='mb-4'>Import Files</DialogTitle>
            <div >
              <UploadFilesToDialog setFileToResult={setFileToResult} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </div>
      <div className="flex justify-between gap-4 px-4 py-2">
        <h3 className="text-sm font-semibold max-w-[250px]">
          {"WhatsApp Image 2024-06-10 at 10.11.07.jpeg"}
        </h3>
        <div
          className={`text-yellow-500 bg-yellow-200 rounded-lg border-2 border-yellow-500 px-2 py-0.5 h-fit text-xs font-medium`}
        >
          {"Pending"}
        </div>
      </div>

      <Tabs defaultValue="JSON" className=' '>
        <TabsList className=" flex justify-start gap-3 bg-white border-b">
          <TabsTrigger className=" text-xs font-medium" value="JSON">JSON</TabsTrigger>
          <TabsTrigger className=" text-xs font-medium" value="RAW DATA">RAW DATA</TabsTrigger>
          <TabsTrigger className=" text-xs font-medium" value="FINAL RESPONSE">FINAL RESPONSE</TabsTrigger>
        </TabsList>

        <TabsContent value="JSON" >
          <div className="text-sm px-4 max-w-[450px] mx-auto bg-white shadow-lg rounded-lg max-h-[400px] overflow-auto pb-2">
            <CopyToClipboard text={JSON.stringify(Response, null, 2)} onCopy={handleCopy} >
              <Button className="text-xs bg-gray-400 text-white font-bold rounded-lg h-fit w-fit py-2 px-3 mb-3 ">
                {copied ? 'Copied!' : 'Copy JSON'}
              </Button>
            </CopyToClipboard>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(Response, null, 2)}
            </pre>
          </div>
        </TabsContent>
        
        <TabsContent value="FINAL RESPONSE" >
          <div className="text-sm pl-4 pr-1 max-w-[450px] mx-auto bg-white shadow-lg rounded-lg max-h-[400px] overflow-auto pb-2">
            <div className='flex items-center justify-between gap-3 text-gray-900'>
                <h2 className="text-lg font-semibold font-Rubik ">Fields</h2>
                {/* <Dialog >
                  <DialogTrigger asChild>
                    <Button variant={"none"} className="h-fit p-1.5 bg-gray-100 mr-5 flex items-center gap-2">
                      <PenTool size={18} className='' />  
                      <div className='text-sm '>try Edit</div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[400px] overflow-auto">
                    <EditableDocs documentData={documentData} />
                  </DialogContent>
                </Dialog> */}
              </div> 
              <ResponseFormat data={Response} />
          </div>
        </TabsContent>
        <TabsContent value="RAW DATA" >
          <div className="text-sm px-4 max-w-[450px] mx-auto bg-white shadow-lg rounded-lg max-h-[400px] overflow-auto pb-2">
            <pre className='bg-gray-100 p-4 rounded overflow-auto'>
              <ExtractedResponse data={Response} />
            </pre>
          </div>
        </TabsContent>
      </Tabs>

      <div className='w-full flex text-xs items-center h-[60px]  border-t border-gray-200 bg-gray-50 shadow-inner absolute bottom-0 right-0'>
        <Button className="bg-green-700 flex items-center gap-2 ml-auto text-xs mr-4 ">
          <Check size={15} /> Improve file 
        </Button>
      </div>
    </div>
  );
}




