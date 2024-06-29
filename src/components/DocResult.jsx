
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
import ResponseFormat from './ExtractTabs/ResponseFormat';
import { formatResponse } from '@/Utils/ResponseFormatter';
import JsonFormat from './ExtractTabs/JsonFormat';

// const initialData = {
//   document_type: "Passport",
//   country: "United Kingdom",
//   id_number: "9256635416",
//   given_names: "ANGELA ZOE",
//   "issuingCountry": "United Kingdom of Great Britain and Northern Ireland the night light elos",
//   "passportNumber": "925665416",
//   "nationality": "British Citizen",
//   "documentType": "Passport",
//   "surname": "Specimen",
//   "firstName": "Angela Zoe",
//   "dateOfBirth": "04 Dec 88",
//   "placeOfBirth": "Croydon",
//   "validFrom": "26 Mar 14",
//   "validTo": "26 Nov 24"
// };

// const initialData = {
//     "restaurant": "Taberna do Mercado",
//     "address": {
//       "street": "107B Commercial Street",
//       "area": "Old Spitalfields Market",
//       "postal_code": "E16BG"
//     },
//     "date": "06/09/2016",
//     "time": "14:07",
//     "table_number": 1,
//     "items": [
//       {
//         "quantity": 2,
//         "name": "Super Bock",
//         "price": 5
//       },
//       {
//         "quantity": 1,
//         "name": "Sparkling Water",
//         "price": 3
//       },
//       {
//         "quantity": 1,
//         "name": "Cappucino",
//         "price": 2.6
//       },
//       {
//         "quantity": 1,
//         "name": "Espresso",
//         "price": 2
//       },
//       {
//         "quantity": 2,
//         "name": "Rissol",
//         "price": 5.6
//       },
//       {
//         "quantity": 1,
//         "name": "Serra Da Estrela",
//         "price": 8.9
//       },
//       {
//         "quantity": 1,
//         "name": "Chourico Vinho Tinto",
//         "price": 7.9
//       },
//       {
//         "quantity": 1,
//         "name": "Octopus Peppers",
//         "price": 9
//       },
//       {
//         "quantity": 1,
//         "name": "Dorset Char",
//         "price": 6
//       },
//       {
//         "quantity": 1,
//         "name": "Bifana",
//         "price": 8
//       }
//     ],
//     "subtotal": 58,
//     "service_charge": 7.25,
//     "total": 65.25,
//     "vat_number": "203196242",
//     "server": "Tom"
// }

function formatJsonToObject(json, parentKey = '') {
  let formattedObject = {};

  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const value = json[key];
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof value === 'object' && !Array.isArray(value)) {
        // If the value is an object (but not an array), recurse into it
        Object.assign(formattedObject, formatJsonToObject(value, newKey));
      } else if (Array.isArray(value)) {
        // If the value is an array, flatten its objects
        value.forEach(item => {
          if (typeof item === 'object') {
            Object.assign(formattedObject, formatJsonToObject(item, newKey));
          } else {
            formattedObject[newKey] = item;
          }
        });
      } else {
        // If the value is a primitive, add it to the result
        formattedObject[newKey] = value;
      }
    }
  }

  return formattedObject;
}

export default function DocResult({Response}) {

  let formattedJson = formatJsonToObject(Response);
  console.log(formattedJson);

  // let NewResponse = formatResponse(Response)

  // console.log(`New Data : ${NewResponse}`)


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

              {formattedJson == {} ?
              <div className=" ">
                  {Object.entries(formattedJson).map(([key, value]) => (
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
              : <div className='text-xs text-gray-600 mt-1'>no data available right now </div>}

          </div>

        </TabsContent>
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
      </Tabs>

      <div className='w-full flex text-xs items-center h-[60px]  border-t border-gray-200 bg-gray-50 shadow-inner absolute bottom-0 right-0'>
        <Button className="bg-green-700 flex items-center gap-2 ml-auto text-xs mr-4 ">
          <Check size={15} /> Improve file 
        </Button>
      </div>
    </div>
  );
}




