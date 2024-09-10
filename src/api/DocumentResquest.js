import axios from 'axios';

export const uploadFilesTest = async (files,documentType) => {
  const url = `https://www.dsfsmartdoc.com/${documentType}/`;
  console.log(url)
  const formData = new FormData();

  files.forEach(file => {
    
    formData.append('files', file.file);
  });

  try {
    
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const responseData = response.data; // Assume this is an array like ["data1", "data2", ...]

    const updatedFiles = files.map((file, index) => ({
      id: file.id,
      file: responseData[index] || '', // Update the file property with response data
      previewUrl: file.previewUrl, 
    }));

    console.log(updatedFiles);


    return updatedFiles;

  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};



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

export const MergeFiles = async (files,type) => {
  const formData = new FormData();

  files.map((file) => {
    formData.append('files', file);
  });

  try {
    // Send a request to the API based on the selected file type
    const response = await axios.post(`https://www.dsfsmartdoc.com/convert/${type}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob', // Get the response as a blob (binary data)
    });

    console.log(response)

    // // Create a URL for the response blob
    // const url = window.URL.createObjectURL(new Blob([response.data]));
    // setMergedFileUrl(url); // Save the URL to state

    return response.data;
  } catch (error) {
    console.error('Error merging files:', error.response?.data || error.message);
  }

  setLoading(false); // Stop loading when response is received
};


export const ToolsResponse = async (files, type, queries) => {
  let url;
  if (queries.pages){
    url = `https://www.dsfsmartdoc.com/convert/${type}/?pages=${queries.pages}`;
  } else if(queries.rangeStart && queries.rangeEnd){
    url = `https://www.dsfsmartdoc.com/convert/${type}/?range_start=${queries.rangeStart}&range_end=${queries.rangeEnd}`;
  } else {
    url = `https://www.dsfsmartdoc.com/${type !== "enhance-file" ? "convert/" : ""}${type}/`;
  }
  const promises = files.map(async file => {
    const formData = new FormData();
    formData.append(type === "image-to-pdf" ? 'files' : 'file', file);  // Use the correct field name expected by the backend
    
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



export const PlayGroundResponse = async (files) => {
  const url = `https://www.dsfsmartdoc.com/process-document/`;
  console.log(url)
  const formData = new FormData();

  files.forEach(file => {
    formData.append('files', file);
  });

  try {
    
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });


    return response.data;

  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};