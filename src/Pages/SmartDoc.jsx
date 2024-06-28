

import TitlePage from '@/components/Custom/TitlePage'
import DocResult from '@/components/DocResult'
import SmartDocSide from '@/components/SmartDocSide'
import React, { useState } from 'react'

const data = [
  {
    id: 1,
    status: 'Approved',
    image: 'https://miro.medium.com/v2/resize:fit:1200/0*OcjPDOyNBukmuN2_.jpg', // Replace with actual image URL
  },
  {
    id: 2,
    status: 'Pending',
    image: 'https://ichef.bbci.co.uk/news/480/cpsprodpb/049E/production/_133028110_passport_dates_2x640-nc.png.webp', // Replace with actual image URL
  },
  {
    id: 3,
    status: 'Pending',
    image: 'https://lp-cms-production.imgix.net/news/2015/01/New-Irish-passport.jpg?auto=compress&fit=crop&format=auto&q=50&w=1200&h=800', // Replace with actual image URL
  },
  {
    id: 4,
    status: 'Pending',
    image: 'https://templatelab.com/wp-content/uploads/2023/04/Cleaning-Invoice-Template-TemplateLab.com_.jpg', // Replace with actual image URL
  },
];


export default function SmartDoc() {
  const [selectedImage, setSelectedImage] = useState(data[0] || null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className='Smart-Doc flex min-h-screen relative'>
      <SmartDocSide data={data} onImageClick={handleImageClick}/>
      <div className='px-4 py-6 md:p-7 bg-gray-100 w-full mr-[450px] ml-[150px]'>
      <div className="flex-1 p-4">
        {selectedImage ? (
          <div>
            <img src={selectedImage.image} alt={`Document ${selectedImage.id}`} className="w-full h-auto" />
            <p>Status: {selectedImage.status}</p>
          </div>
        ) : (
          <p>Select an image to view details</p>
        )}
      </div>
        
      </div>
      <DocResult  />
      
    </div>
  )
}
