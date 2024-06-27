
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Check, Download, Edit, Import, Pen, PenTool } from 'lucide-react'
import { Textarea } from './ui/textarea'
import CustomView from '@/Pages/CustomView'

const initialData = {
  document_type: "Passport",
  country: "United Kingdom",
  id_number: "9256635416",
  given_names: "ANGELA ZOE",
  "issuingCountry": "United Kingdom of Great Britain and Northern Ireland the night light elos",
  "passportNumber": "925665416",
  "nationality": "British Citizen",
  "documentType": "Passport",
  "surname": "Specimen",
  "firstName": "Angela Zoe",
  "dateOfBirth": "04 Dec 88",
  "placeOfBirth": "Croydon",
  "validFrom": "26 Mar 14",
  "validTo": "26 Nov 24"
};

export default function DocResult() {

  const [formData, setFormData] = useState(initialData);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };

  return (
    <div className="min-w-[450px] min-h-screen  h-full fixed z-50 right-0 ">
      <div className="border-b border-gray-200 w-full ">
      <Dialog >
        <DialogTrigger asChild>
          <Button className="py-3 bg-gray-900 h-fit rounded-sm m-2 font-semibold mx-2 uppercase text-xs flex items-center gap-2 ml-auto ">
            <Download size={16} color='#ffffff' /> 
            <div>Import Document </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[350px] max-w-[900px] min-h-[500px] my-4">
          <DialogHeader>
            <DialogTitle className='mb-4'>Import Files</DialogTitle>
            <div >
              <CustomView />
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

      <Tabs defaultValue="FINAL RESULTS" >
        <TabsList className=" flex justify-start gap-3 bg-white border-b">
          <TabsTrigger className=" text-xs font-medium" value="FINAL RESULTS">FINAL RESULTS</TabsTrigger>
          <TabsTrigger className=" text-xs font-medium" value="JSON">JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="FINAL RESULTS" className="w-full">

          <div className="bg-white  m-0 rounded-lg px-4 max-h-[400px] overflow-auto">
              <div className='flex items-center gap-3'>
                <h2 className="text-lg font-semibold font-Rubik ">Fields</h2>
                <Button variant={"none"} className="h-fit p-1 bg-gray-100">
                  <PenTool size={18} className='' />  
                </Button>
              </div>

              <div className=" ">
                  {Object.entries(formData).map(([key, value]) => (
                      <div key={key} className="flex gap-2 flex-nowrap text-sm font-Rubik my-3 justify-between">
                          <div className='min-w-[150px] '>
                            <div className="text-gray-500">{key.replace(/_/g, ' ')}</div>
                          </div>
                          <div className='full w-full max-w-[200px] '>
                            <div className='line-clamp-2'>{value}</div>
                          </div>
                          <div className=''>
                            <Check size={18} className='border border-green-700 text-green-800 rounded-full p-1' /> 
                          </div>
                      </div>
                  ))}
              </div>
          </div>

        </TabsContent>
        <TabsContent value="JSON" >
          <div className="text-sm px-4 max-w-[450px] mx-auto bg-white shadow-lg rounded-lg max-h-[400px] overflow-auto pb-2">
            <CopyToClipboard text={JSON.stringify(formData, null, 2)} onCopy={handleCopy} >
              <Button className="text-xs bg-gray-400 text-white font-bold rounded-lg h-fit w-fit py-2 px-3 mb-3 ">
                {copied ? 'Copied!' : 'Copy JSON'}
              </Button>
            </CopyToClipboard>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </TabsContent>
      </Tabs>

      <div className='w-full h-full text-xs pt-2 border-t border-gray-200 bg-gray-50 shadow-inner'>
        <Button className="bg-green-700 flex items-center gap-2 ml-auto text-xs mr-4 ">
          <Check size={15} /> Improve file 
        </Button>
      </div>
    </div>
  );
}
