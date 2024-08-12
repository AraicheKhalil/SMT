// import React, {  useState } from "react";
// import { formatDocument, formatForCopy } from "../../Utils/ResponseFormatter";
// import { IoCopy } from "react-icons/io5";
// import { LuCopyCheck } from "react-icons/lu";
// import { Check } from "lucide-react";
// import EditableDocs from "../EditableDocs";

// const ResponseFormat = ({ data }) => {
//   let [formattedData,setFormatedData] = useState(formatDocument(data));

//   const [editableData, setEditableData] = useState(parseDocumentData(formattedData));
//   const [editMode, setEditMode] = useState(null);
//   const [newValue, setNewValue] = useState('');

//   function parseDocumentData(dataString) {
//     const result = {};
//     const lines = dataString.split('\n').map(line => line.trim()).filter(line => line);
  
//     let currentKey = '';
//     let currentIndex = 0;
//     const keyCount = {};
  
//     lines.forEach(line => {
//       if (line.includes(':')) {
//         const [key, ...valueParts] = line.split(':');
//         const value = valueParts.join(':').trim();
  
//         if (key === 'description' || key === 'quantity' || key === 'price') {
//           const indexedKey = `${key}_${currentIndex}`;
//           result[indexedKey] = value || '';
//         } else {
//           currentKey = key.trim();
  
//           if (!keyCount[currentKey]) {
//             keyCount[currentKey] = 0;
//           }
//           keyCount[currentKey]++;
          
//           if (keyCount[currentKey] > 1) {
//             currentKey = `${currentKey}_${keyCount[currentKey]}`;
//           }
  
//           result[currentKey] = value || '';
//           if (currentKey === 'items') {
//             currentIndex++;
//           }
//         }
//       } else {
//         result[currentKey] += ` ${line.trim()}`;
//       }
//     });

  
//     return result;
  

// }

//   const handleValueClick = (key) => {
//     setEditMode(key);
//     setNewValue(editableData[key]);
//   };

//   const handleInputChange = (e) => {
//     setNewValue(e.target.value);
//   };

//   const handleBlur = (key) => {
//     setEditableData({ ...editableData, [key]: newValue });
//     setEditMode(null);
//   };

//   console.log(editableData)


//   return (
//   <>
//     {editableData ? 
//     <div className="">
//         {Object.entries(editableData).map(([key, value]) => (
//         <div key={key} className="flex gap-2 flex-nowrap text-sm font-Rubik my-3 justify-between mr-1">
//           <div className='min-w-[150px]'>
//             <div className="text-gray-500">{key.replace(/_/g, ' ')}</div>
//           </div>
//           <div className='full w-full max-w-[200px]'>
//             {editMode === key ? (
//               <input
//                 type="text"
//                 value={newValue}
//                 onChange={handleInputChange}
//                 onBlur={() => handleBlur(key)}
//                 autoFocus
//                 className="w-full border rounded px-1"
//               />
//             ) : (
//               <div className='line-clamp-2' onClick={() => handleValueClick(key)}>{value}</div>
//             )}
//           </div>
//           <div className=''>
//             <Check size={18} className='border border-green-700 text-green-800 rounded-full p-1' />
//           </div>
//         </div>
//       ))}

      
//       </div>
//    : (
//     <h1>No formated data</h1>
//   )}
  
//   </>
//   )
// };

// export default ResponseFormat;

import React, { useState } from "react";
import { formatDocument } from "../../Utils/ResponseFormatter";
import { Check } from "lucide-react";
import { Button } from "../ui/button";

const ResponseFormat = ({ data }) => {
  const [formattedData, setFormatedData] = useState(formatDocument(data));
  const [editableData, setEditableData] = useState(parseDocumentData(formattedData));
  const [editMode, setEditMode] = useState(null);
  const [newValue, setNewValue] = useState('');

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

  const handleValueClick = (key) => {
    setEditMode(key);
    setNewValue(editableData[key]);
  };

  const handleInputChange = (e) => {
    setNewValue(e.target.value);
  };

  const handleBlur = (key) => {
    setEditableData({ ...editableData, [key]: newValue });
    setEditMode(null);
  };

  const handleDownloadJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(editableData, null, 2))}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'editableData.json';
    link.click();
  };

  return (
    <>
      {editableData ? (
        <div className="">
          <Button
            onClick={handleDownloadJSON}
            className="text-xs px-3 py-2.5 h-fit "
          >
            Download JSON
          </Button>
          {Object.entries(editableData).map(([key, value]) => (
            <div key={key} className="flex gap-2 flex-nowrap text-sm font-Rubik my-3 justify-between mr-1">
              <div className='min-w-[150px]'>
                <div className="text-gray-500">{key.replace(/_/g, ' ')}</div>
              </div>
              <div className='full w-full max-w-[200px]'>
                {editMode === key ? (
                  <input
                    type="text"
                    value={newValue}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur(key)}
                    autoFocus
                    className="w-full border rounded px-1"
                  />
                ) : (
                  <div className='line-clamp-2' onClick={() => handleValueClick(key)}>{value}</div>
                )}
              </div>
              <div className='flex items-center'>
                <Check size={18} className='border border-green-700 text-green-800 rounded-full p-1' />
              </div>
            </div>
          ))}
          
        </div>
      ) : (
        <h1>No formatted data</h1>
      )}
    </>
  );
};

export default ResponseFormat;

