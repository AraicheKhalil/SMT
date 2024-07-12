// // http://dsfsmd-container.eastus.azurecontainer.io:8000/process-document/'
// // https://dsfsmd.fly.dev/process-document/


import axios from 'axios';

export const uploadFiles = async (files,documentType) => {
  // console.log(documentType)
  let type = await documentType;
  console.log(`https://dsfsmd.fly.dev/${type}/`)
  let url = `https://dsfsmd.fly.dev/${type}/`
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  try {
    const response = await axios.post(url, formData, {
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





// export const ConvertFiles = async (files,converterType) => {
//   // let url = `http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/${converterType}/`;

//   console.log(files)

//   const promises = files.map(file => {
//     const formData = new FormData();
//     formData.append('file', file);  // Use the correct field name expected by the backend
    
//     return axios.post('https://dsfsmd.fly.dev/convert/pdf-to-image/', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       },
//       // responseType: 'blob' ,  // This is important to handle binary data
//     })

//     // return response.data;
//   });

//   try {
//     const results = await Promise.all(promises);
//     return results;  // Return an array of objects containing filenames and blobs
//   } catch (error) {
//     console.error('Error uploading files:', error);
//     throw error;
//   }
// };


const endpoints = {
  'pdf-to-image': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/pdf-to-image/',
  'image-to-pdf': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/image-to-pdf/',
  'excel-to-pdf': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/excel-to-pdf/',
  'pdf-to-excel': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/pdf-to-excel/',
  'html-to-pdf': 'http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/html-to-pdf/',
};

export const ConvertFiles = async (files, conversionType) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append(conversionType === 'image-to-pdf' ? 'files' : 'file', file);  // Handle multiple files for image-to-pdf
  });

  try {
    const response = await axios.post(endpoints[conversionType], formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob',  // This is important to handle binary data
    });

    // Check if 'content-disposition' exists and contains the filename
    let filename = 'downloaded_file';
    if (response.headers['content-disposition']) {
      const disposition = response.headers['content-disposition'];
      const filenameMatch = disposition.match(/filename="?(.+)"?/);
      if (filenameMatch && filenameMatch.length > 1) {
        filename = filenameMatch[1];
      }
    }

    return {
      filename: filename,
      blob: response.data
    };
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};





export const ToolsResponse = async (files, type) => {
  const url = `https://dsfsmd.fly.dev/convert/${type}/`;
  const promises = files.map(async file => {
    const formData = new FormData();
    formData.append('file', file);  // Use the correct field name expected by the backend
    
    let filename = 'downloaded_file';
    let response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob' ,  // This is important to handle binary data
    })


    return {
      filename: filename,
      blob: response.data
    };
  });

  try {
    const results = await Promise.all(promises);
    return results;  // Return an array of objects containing filenames and blobs
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};






















