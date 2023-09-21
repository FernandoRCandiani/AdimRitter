import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './style.css';

const Dropzone = ({ onFileUploaded, image }) => {
  const [selectFile, setSelectFile] = useState('');

  const onDrop = useCallback(acceptFiles => {
    const file = acceptFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectFile(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpg': [".jpg", ".jpeg"],
      'image/png': [".png"],
      'image/svg': [".svg"],
    }
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />

      {selectFile || image
        ? <div style={{ backgroundImage: `url(${selectFile || image})` }} className='dropzone-image' />
        : (
          <p>
            <FiUpload />
            Adicionar Imagem
          </p>
        )}
    </div>
  );
};

export default Dropzone;