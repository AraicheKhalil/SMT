import { formatResponse } from '@/Utils/ResponseFormatter';
import React from 'react';
import JsonFormat from '../ExtractTabs/JsonFormat';
import ResponseFormat from '../ExtractTabs/ResponseFormat';
import ExtractedResponse from '../ExtractTabs/extractedResponse';

const RightPanel = ({ images, selectedImageIndex }) => {
  console.log(images);

  return (
    <div className="w-1/2 pl-4 border-l-2 border-gray-300">
      {images ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Extracted Data</h2>
          <JsonFormat data={images} />
          <ResponseFormat data={images} />
          <ExtractedResponse data={images} />
        </div>
      ) : (
        <p>No data available for this document.</p>
      )}
    </div>
  );
};

export default RightPanel;
