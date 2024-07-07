import React from 'react';
import { Link } from 'react-router-dom';
import { MdPictureAsPdf, MdInsertDriveFile, MdTextFields, MdImage, MdWeb, MdDescription, MdFileDownload } from 'react-icons/md';
import TitlePage from '@/components/Custom/TitlePage';

// Define the conversion options with icons and colors
const conversionOptionsFromPDF = [
  { id: 1, title: 'PDF To Excel', description: 'Convert PDF to Excel or CSV online for free. Extract table data from PDF', link: 'pdf-to-excel', icon: MdInsertDriveFile, color: 'text-green-500' },
  { id: 2, title: 'PDF To JPG', description: 'Get PDF pages converted to JPG, PNG or TIFF images', link: 'pdf-to-jpg', icon: MdImage, color: 'text-blue-500' },
  { id: 3, title: 'PDF To PPT', description: 'Convert PDF to PowerPoint online', link: 'pdf-to-ppt', icon: MdInsertDriveFile, color: 'text-orange-500' },
  { id: 4, title: 'PDF To Text', description: 'Copies all text from the PDF document and extracts it to a separate text file', link: 'pdf-to-text', icon: MdTextFields, color: 'text-purple-500' },
  { id: 5, title: 'PDF To Word', description: 'Convert from PDF to DOC online', link: 'pdf-to-word', icon: MdDescription, color: 'text-blue-700' },
];

const conversionOptionsToPDF = [
  { id: 6, title: 'HTML To PDF', description: 'Convert web pages or HTML files to PDF documents', link: 'html-to-pdf', icon: MdWeb, color: 'text-pink-500' },
  { id: 7, title: 'JPG To PDF', description: 'Convert Images to PDF', link: 'jpg-to-pdf', icon: MdImage, color: 'text-yellow-500' },
  { id: 8, title: 'Word To PDF', description: 'Creates a PDF document from Microsoft Word .docx', link: 'word-to-pdf', icon: MdFileDownload, color: 'text-green-700' },
];

const Tools = () => {
  return (
    <>
      <div className='px-4 py-6 md:p-7'>
        <TitlePage title={'Convert Your Files'} description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa vitae, aliquid accusantium maiores dolorum eveniet totam a tenetur blanditiis fugiat nihil"}/>
        <div className='font-Rubik p-4 border shadow-lg bg-gray-100 rounded-xl'>
          <div>
            <h1 className='font-semibold text-xl mb-3'>Convert From PDF</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {conversionOptionsFromPDF.map(option => (
                <Link 
                  to={option.link} 
                  key={option.id} 
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start"
                >
                  <option.icon className={`text-2xl ${option.color} mr-3`} />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className='mt-12'>
            <h1 className='font-semibold text-xl mb-3'>Convert To PDF</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {conversionOptionsToPDF.map(option => (
                <Link 
                  to={option.link} 
                  key={option.id} 
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start"
                >
                  <option.icon className={`text-2xl ${option.color} mr-3`} />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>         
      </div>
    </>
  );
};

export default Tools;
