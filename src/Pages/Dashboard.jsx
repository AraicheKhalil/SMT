
import TinyBarChart from '@/components/Charts/TinyBarChart'
import TinyLineChart from '@/components/Charts/TinyLineChart'
import Dashdropzone from '@/components/dashdropzone'
import { ArrowRight, History, ShoppingBag, TrendingDown, TrendingUp, User } from 'lucide-react'
import React from 'react'

const UserDataST = [
  {
    icon : <ShoppingBag className=''/>,
    title : "Total Document",
    merge : `${"17 731"} Progresses`,
    count : 9328,
    incressment : `+${"15.7"}`,
    added : `+${"10.4"}`,
  },
  {
    icon : <User />,
    title : "ChatDoc Queries",
    merge : `Avg. time:${"0:30"}m`,
    count : 1230,
    incressment : `+${"12.7"}`,
    added : `+${"23.9"}`,
  },
  {
    icon : <History />,
    title : "Remaining Queries",
    merge : `${2} Remaining`,
    count : 63,
    incressment : `-${"10.4"}`,
    added : `+${"1"}`,
  }
]

const data = [
  { name: 'Medical Invoice', count: 112, color: 'bg-yellow-200' },
  { name: 'US Passport Card', count: 32, color: 'bg-blue-200' },
  { name: 'Bank of America Statement', count: 12, color: 'bg-red-200' },
  { name: 'Legal Document', count: 4, color: 'bg-green-200' },
  { name: 'Other', count: 198, color: 'bg-gray-200' },
];

const maxCount = Math.max(...data.map(item => item.count));


export default  function Dashboard() {
  return (
    <>
      <div className='dashboard px-4 py-6 md:p-7'>
        <h1 className='m-0 font-bold text-3xl font-Rubik'>Welcome Back, {"John"} 👋</h1>

        <div className='flex gap-5 pt-6 flex-wrap md:flex-nowrap'>
          {UserDataST.map((box,index) => (
            <div key={index} className=' rounded-xl bg-gray-950 p-5 text-gray-300 flex flex-col w-full justify-between '>

              <div className='flex justify-between'>
                <div className='flex flex-nowrap gap-4'>
                  <div className='icon bg-gray-700 h-fit p-2 text-gray-300 rounded-xl mt-1 '>
                    {box.icon}
                  </div>
                  <div className='flex flex-col  '>
                    <p className='font-Rubik m-0 font-bold text-xl'>{box.title}</p>
                    <p className='text-xs text-gray-500'>{box.merge}</p>
                    <p className='mt-2.5 font-bold text-xl'>{box.count}</p>
                  </div>
                </div>
                <div className='pt-1.5'>
                  <ArrowRight />
                </div>
              </div>

              <div className='flex gap-12 pt-6 items-center  font-medium'>
                <div className={`flex gap-2 items-center ${Number(box.incressment) > 0 ? "text-green-500" : "text-red-500"} `}>
                  {Number(box.incressment) > 0 ? <TrendingUp /> : <TrendingDown />} {box.incressment}%
                </div>
                <div className='tex text-sm'>
                  {box.added}k <span className='text-gray-500 '>this Week </span>
                </div>
              </div>

            </div>
          ))}
        </div>


        <div className='flex pt-5 gap-5 flex-wrap md:flex-nowrap '>

          <div className='md:basis-[40%] basis-[100%] bg-gray-100 rounded-xl border shadow-lg'>
            <TinyBarChart />
          </div>

        
          <div className=' basis-[100%] md:basis-[60%] p-2 border shadow-lg bg-gray-100 rounded-xl'>
            <TinyLineChart />
          </div>

        </div>
        <div className='font-Rubik  basis-[100%] md:basis-[60%]  p-4  border shadow-lg bg-gray-100 rounded-xl'>
          <Dashdropzone />
        </div>
      </div>
    </>
  )
}
