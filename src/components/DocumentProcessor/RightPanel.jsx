// import { formatResponse } from '@/Utils/ResponseFormatter';
// import React, { useState } from 'react';
// import JsonFormat from '../ExtractTabs/JsonFormat';
// import ResponseFormat from '../ExtractTabs/ResponseFormat';
// import ExtractedResponse from '../ExtractTabs/extractedResponse';

// const RightPanel = ({ images, selectedImageIndex }) => {

//   console.log(images)

//   return (
//     <div className="w-1/2 pl-4 border-l-2 border-gray-300">
//       {images[selectedImageIndex] ? (
//         <div>
//           <h2 className="text-xl font-bold mb-4">Extracted Data</h2>
//           <JsonFormat data={formatResponse(images)}/>
//           <ResponseFormat data={formatResponse(images)}/>
//           <ExtractedResponse data={formatResponse(images)}/>
//         </div>
//       ) : (
//         <p>No data available for this document.</p>
//       )}
//     </div>
//   );
// };

// export default RightPanel;


import { formatResponse } from '@/Utils/ResponseFormatter';
import React, { useState } from 'react';
import JsonFormat from '../ExtractTabs/JsonFormat';
import ResponseFormat from '../ExtractTabs/ResponseFormat';
import ExtractedResponse from '../ExtractTabs/extractedResponse';

const RightPanel = ({ images, selectedImageIndex }) => {

  console.log(images)
  console.log(images);

  const [Images,selectImages] = useState(selectedImageIndex)

  console.log(Images)

  return (
    <div className="w-1/2 pl-4 border-l-2 border-gray-300">
      {images ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Extracted Data</h2>
          <JsonFormat data={images[Images]} />
          <ResponseFormat data={images[Images]} />
          <ExtractedResponse data={images[Images]} />
        </div>
      ) : (
        <p>No data available for this document.</p>
      )}
    </div>
  );
};

export default RightPanel;



