import React, { useState } from "react";
import { formatDocument, formatForCopy } from "../../Utils/ResponseFormatter";
import { IoCopy } from "react-icons/io5";
import { LuCopyCheck } from "react-icons/lu";
import { Check } from "lucide-react";
import EditableDocs from "../EditableDocs";

const ResponseFormat = ({ data }) => {
  let formattedData = formatDocument(data);
  let copyData = formatForCopy(data);

  console.log()

  const [copySuccess, setCopySuccess] = useState(false);
  const [styledFormat,setStyledFormat] = useState(null)


  async function copyToClipboard(e) {
    await navigator.clipboard.writeText(copyData);
    e.target.focus();
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  }

  // console.log(`this is ${formattedData}`)

  function parseDocumentData(dataString) {
    const result = {};
    const lines = dataString.split('\n').map(line => line.trim()).filter(line => line);
  
    let currentKey = '';
    let currentIndex = 0;
    const keyCount = {};
  
    lines.forEach(line => {
      if (line.includes(':')) {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
  
        if (key === 'description' || key === 'quantity' || key === 'price') {
          const indexedKey = `${key}_${currentIndex}`;
          result[indexedKey] = value || '';
        } else {
          currentKey = key.trim();
  
          if (!keyCount[currentKey]) {
            keyCount[currentKey] = 0;
          }
          keyCount[currentKey]++;
          
          if (keyCount[currentKey] > 1) {
            currentKey = `${currentKey}_${keyCount[currentKey]}`;
          }
  
          result[currentKey] = value || '';
          if (currentKey === 'items') {
            currentIndex++;
          }
        }
      } else {
        result[currentKey] += ` ${line.trim()}`;
      }
    });

  
    return result;
  

}

// console.log(parseDocumentData(formattedData))

  return formattedData ? (
    <div className="w-full overflow-x-hidden text-clip h-[350px] overflow-y-auto">
      <div className="flex justify-end items-center">
        <button
          onClick={copyToClipboard}
          className={`${
            copySuccess
              ? "bg-[--black] text-green-400"
              : "bg-[--black] text-[--golden] hover:bg-[--golden] hover:text-[--black]"
          } satoshi-700 py-1 px-4  rounded-md transition-all ease-in-out duration-500  flex justify-center items-center gap-2`}
        >
          {copySuccess ? (
            <>
              <LuCopyCheck />
              Copied
            </>
          ) : (
            <>
              <IoCopy />
              Copy
            </>
          )}
        </button>
      </div>
      {/* text-clip whitespace-pre-wrap */}
      <div className="">
        {/* {formattedData} */}
        {Object.entries(parseDocumentData(formattedData)).map(([key, value]) => (
          <div key={key} className="flex gap-2 flex-nowrap text-sm font-Rubik my-3 justify-between mr-1 ">
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
  ) : (
    <h1>No formated data</h1>
  );
};

export default ResponseFormat;
