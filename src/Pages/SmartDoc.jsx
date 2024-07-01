import DocResult from '@/components/DocResult'
import PlayGround from '@/components/PlayGround/PlayGround'
import SmartDocSide from '@/components/SmartDocSide'
import React, { useState } from 'react'


export default function SmartDoc() {
  const [dataResponse,setDataResponse] = useState([])
  const [FileToSmartDoc,setFiletoSmartDoc] = useState(null)
  // const [selectedImage,setSelectedImage] = useState()

  console.log(FileToSmartDoc)

  return (
    <div className='Smart-Doc flex min-h-screen relative'>
      <SmartDocSide data={FileToSmartDoc} />

      <div className={`px-4 py-6 md:p-7 bg-gray-100 w-full mr-[450px] ${FileToSmartDoc ? 'ml-[150px]' : "ml-0"}`}>
        <PlayGround setdata={setDataResponse} setFiletoSmartDoc={setFiletoSmartDoc}  />
      </div>

      <DocResult Response={dataResponse} setFiletoSmartDoc={setFiletoSmartDoc} />
      
    </div>
  )
}

