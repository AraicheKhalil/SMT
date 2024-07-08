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





export const ConvertFiles = async (files,converterType) => {
  // let url = `http://dsfsmd-container.eastus.azurecontainer.io:8000/convert/${converterType}/`;

  console.log(files)

  const promises = files.map(file => {
    const formData = new FormData();
    formData.append('file', file);  // Use the correct field name expected by the backend
    
    return axios.post('https://dsfsmd.fly.dev/convert/pdf-to-image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      // responseType: 'blob' ,  // This is important to handle binary data
    })

    // return response.data;
  });

  try {
    const results = await Promise.all(promises);
    return results;  // Return an array of objects containing filenames and blobs
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};























