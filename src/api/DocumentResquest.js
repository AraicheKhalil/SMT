// http://dsfsmd-container.eastus.azurecontainer.io:8000/process-document/'

// https://dsfsmd.fly.dev/process-document/


import { formatResponse } from '@/Utils/ResponseFormatter';
import axios from 'axios';

export const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  try {
    const response = await axios.post('https://dsfsmd.fly.dev/process-document/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};



// export const ConvertFiles = async (files) => {
//   const formData = new FormData();
//   files.forEach(file => {
//     console.log(file)
//     formData.append('pdfFile', file);
//   });

//   console.log(formData)

//   try {
//     const response = await axios.post('http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/pdf-to-image/', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       mode: 'no-cors',
//     });
    
//     console.log(response)
//     return response;
//   } catch (error) {
//     console.error('Error uploading files:', error);
//     throw error;
//   }
// };


export const ConvertFiles = async (files) => {
  const promises = files.map(file => {
    const formData = new FormData();
    formData.append('file', file);  // Use the correct field name expected by the backend
    
    return axios.post('http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/pdf-to-image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob',  // This is important to handle binary data
    }).then(response => ({
      filename: file.name.replace('.pdf', '.jpg'),
      blob: response.data
    }));
  });

  try {
    const results = await Promise.all(promises);
    return results;  // Return an array of objects containing filenames and blobs
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};






















