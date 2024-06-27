// api.js
import axios from 'axios';

export const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  try {
    const response = await axios.post('http://dsfsmd-container.eastus.azurecontainer.io:8000/process-document/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data[0])
    return response.data;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};

