// import React from 'react';
// import {   
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// const data = [
//   { name: 'Medical Invoices', count: 212, color: 'bg-yellow-300' },
//   { name: 'Passport US Card', count: 132, color: 'bg-blue-300' },
//   { name: 'Bank of America Statement', count: 50, color: 'bg-red-300' },
//   { name: 'Legal Document', count: 12, color: 'bg-green-300' },
//   { name: 'Other', count: 177, color: 'bg-gray-500' },
// ];

// const maxCount = Math.max(...data.map(item => item.count));

// const DocumentTypes = () => {
//   return (
//     <div className='pt-2 px-4 '>
//       <div className='flex justify-between items-center pb-6'>
//         <h3 className='text-xl font-bold font-Rubik '>Collaborator Progress</h3>
//         <Select>
//           <SelectTrigger className="w-fit">
//             <SelectValue placeholder="Last 7 days" />
//           </SelectTrigger>
//           <SelectContent className="pr-4">
//             <SelectGroup>
//               <SelectLabel>Time</SelectLabel>
//               <SelectItem value="apple">Last 30 Day</SelectItem>
//               <SelectItem value="banana">Last 60 Day</SelectItem>
//               <SelectItem value="blueberry">Last 120 Day</SelectItem>
//               <SelectItem value="grapes">Last Year</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>

//       </div>
//       <div>
//         {data.map((item) => (
//           <div key={item.name} className="mb-2 w-full">
//             <div className="relative w-full bg-gray-200 rounded flex px-4 py-2">
//               <div className='w-full flex justify-between z-20'>
//                 <div>{item.name}</div>
//                 <div>{item.count}</div>
//                 <div style={{ width: `${(item.count / maxCount) * 100}%` }} className={`absolute h-full ${item.color} left-0 top-0 -z-10`}></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DocumentTypes;


"use client"

import React, { useState, useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Base data structure
const baseData = {
  SmartDoc: [
    { name: 'Passport Processor', count: 5, color: 'bg-yellow-300' },
    { name: 'IDs Processor', count: 14, color: 'bg-blue-300' },
    { name: 'Legal Processor', count: 77, color: 'bg-red-300' },
    { name: 'Document Processor', count: 78, color: 'bg-green-300' },
    { name: 'Receipts Processor', count: 154, color: 'bg-gray-500' },
  ],
  GenAI: [
    { name: 'Text Generator', count: 120, color: 'bg-purple-300' },
    { name: 'Image Analyzer', count: 85, color: 'bg-pink-300' },
    { name: 'Code Assistant', count: 62, color: 'bg-indigo-300' },
    { name: 'Data Summarizer', count: 43, color: 'bg-teal-300' },
    { name: 'Language Translator', count: 31, color: 'bg-orange-300' },
  ]
}

// Mock data generation function
const generateMockData = (days, type) => {
  return baseData[type].map(item => ({
    ...item,
    count: Math.floor(item.count * (days / 7) * (Math.random() * 0.5 + 0.75))
  }))
}

const EnhancedBarChart = () => {
  const [timeRange, setTimeRange] = useState('7')
  const [documentType, setDocumentType] = useState('all')

  const data = useMemo(() => {
    const smartDocData = generateMockData(Number(timeRange), 'SmartDoc')
    const genAiData = generateMockData(Number(timeRange), 'GenAI')
    const allData = [...smartDocData, ...genAiData]

    return {
      SmartDoc: smartDocData,
      GenAI: genAiData,
      all: allData
    }
  }, [timeRange])

  const filteredData = data[documentType]

  const sortedData = filteredData
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const maxCount = Math.max(...sortedData.map(item => item.count))

  return (
    <Card className="w-full  mx-auto">
      <CardHeader>
        <CardTitle>Document Types Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between items-center pb-6'>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Range</SelectLabel>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="90">Last 3 months</SelectItem>
                <SelectItem value="180">Last 6 months</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Document Type</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="SmartDoc">SmartDoc</SelectItem>
                <SelectItem value="GenAI">GenAI</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          {sortedData.map((item) => (
            <div key={`${item.name}-${documentType}`} className="mb-2 w-full">
              <div className="relative w-full bg-gray-200 rounded flex px-4 py-2">
                <div className='w-full flex justify-between z-20'>
                  <div>{item.name}</div>
                  <div>{item.count}</div>
                </div>
                <div 
                  style={{ width: `${(item.count / maxCount) * 100}%` }} 
                  className={`absolute h-full ${item.color} left-0 top-0 -z-10 rounded`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default EnhancedBarChart