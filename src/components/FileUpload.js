import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadSvg from '../assets/upload.svg';

const FileUpload = () => {

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Filter only CSV files
      const csvFiles = acceptedFiles.filter(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
      setUploadedFiles(csvFiles);
    },
    accept: '.csv', // Limit accepted file types to CSV
  });

  return (
    <div  className='justify-center'>
      <div {...getRootProps()} id="dropzone" className='w-[733px] h-[430px] px-[474.75px] py-[165.78px] bg-stone-200 rounded-[10.05px] border-2 border-sky-950 flex-col justify-center items-center gap-[15.07px] inline-flex'>
        <input {...getInputProps()} />
        <div className='w-[85.40px] h-[85.40px] relative'>
          <img src={UploadSvg} alt='' />
        </div>
        <div className='w-[302px] h-12 text-sky-950 text-[40.19px] font-normal'>Arrastra y suelta</div>
        <div className='w-[329.06px] h-[60.29px] p-[25.12px] flex-col justify-center items-center gap-[25.12px] flex'>
          <div className='w-[37.68px] h-[47.73px] text-center text-sky-950 text-[40.19px] font-normal'>o</div>
        </div>
        <button
        id='select'
        type='button'
        className='group relative w-[30vw] h-[60px] rounded-[20px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 mt-10'
        >
            <div className='text-sky-950'>Seleccionar el Archivo</div>
        </button>
      </div>
      <div className='flex justify-center mt-10'>
          <button
            id='subir'
            type='button'
            className='group relative w-[10vw] rounded-[20px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400'
          >
            <div className='text-center text-sky-950 '>Subir</div>
          </button>
      </div>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
