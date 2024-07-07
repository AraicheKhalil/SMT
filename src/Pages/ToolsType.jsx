

import React from 'react';
import { useParams } from 'react-router-dom';
import TitlePage from '@/components/Custom/TitlePage';
import Dashdropzone from '@/components/dashdropzone';

const ToolsTypes = () => {

  const params = useParams()
  const title = `Convert Your ${params.type.split('-')            
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
  .join(' ')}`

  console.log(params.type)
  return (
    <>
      <div className='px-4 py-6 md:p-7'>
        <TitlePage title={title} description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa vitae, aliquid accusantium maiores dolorum eveniet totam a tenetur blanditiis fugiat nihil"}/>
        <div className='font-Rubik p-4 border shadow-lg bg-gray-100 rounded-xl'>
          <Dashdropzone />
        </div>         
      </div>
    </>
  );
};

export default ToolsTypes;

