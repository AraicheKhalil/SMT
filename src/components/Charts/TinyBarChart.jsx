// import React, { PureComponent } from 'react';
// import { BarChart, Bar, ResponsiveContainer } from 'recharts';
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select"

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//     color : "#fcdede"
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//     color : "#ffcc22"
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//     color : "#fcdede"
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//     color : "#cc22ee"
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//     color : "#fcdede"
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//     color : "#cceeaa"
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//     color : "#11eded"
//   },
// ];

// const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57'];

// export default class TinyBarChart extends PureComponent {

//   render() {
//     return (
//     <>
//         <div className='flex justify-between items-center bg-blue-400'>
//             <h3 className='text-xl font-medium '>Document Types </h3>
//             <Select>
//             <SelectTrigger className="w-[140px]">
//                 <SelectValue placeholder="Select a fruit" />
//             </SelectTrigger>
//             <SelectContent>
//                 <SelectGroup>
//                 <SelectLabel>Fruits</SelectLabel>
//                 <SelectItem value="Last 70 Day">Last 6 month</SelectItem>
//                 <SelectItem value="banana">Banana</SelectItem>
//                 <SelectItem value="blueberry">Blueberry</SelectItem>
//                 <SelectItem value="grapes">Grapes</SelectItem>
//                 <SelectItem value="pineapple">Pineapple</SelectItem>
//                 </SelectGroup>
//             </SelectContent>
//             </Select>
//         </div>
//         <ResponsiveContainer width={350}  height={400} className={"bg-red-300 rotate-90 ml-7"} >
//             <BarChart width={300} height={800} data={data}  >
//             <Bar dataKey="uv" fill="#8884d8" background={{ fill: '#eee' }} width={300}/>
//             </BarChart>
//         </ResponsiveContainer>
    
//     </>
//     );
//   }
// }

import React from 'react';
import {   
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const data = [
  { name: 'Medical Invoices', count: 212, color: 'bg-yellow-300' },
  { name: 'Passport US Card', count: 132, color: 'bg-blue-300' },
  { name: 'Bank of America Statement', count: 50, color: 'bg-red-300' },
  { name: 'Legal Document', count: 12, color: 'bg-green-300' },
  { name: 'Other', count: 177, color: 'bg-gray-500' },
];

const maxCount = Math.max(...data.map(item => item.count));

const DocumentTypes = () => {
  return (
    <div className='pt-2 px-4 '>
      <div className='flex justify-between items-center pb-6'>
        <h3 className='text-xl font-bold font-Rubik '>Collaborator Progress</h3>
        <Select>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Last 7 days" />
          </SelectTrigger>
          <SelectContent className="pr-4">
            <SelectGroup>
              <SelectLabel>Time</SelectLabel>
              <SelectItem value="apple">Last 30 Day</SelectItem>
              <SelectItem value="banana">Last 60 Day</SelectItem>
              <SelectItem value="blueberry">Last 120 Day</SelectItem>
              <SelectItem value="grapes">Last Year</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>
      <div>
        {data.map((item) => (
          <div key={item.name} className="mb-2 w-full">
            <div className="relative w-full bg-gray-200 rounded flex px-4 py-2">
              <div className='w-full flex justify-between z-20'>
                <div>{item.name}</div>
                <div>{item.count}</div>
                <div style={{ width: `${(item.count / maxCount) * 100}%` }} className={`absolute h-full ${item.color} left-0 top-0 -z-10`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentTypes;
