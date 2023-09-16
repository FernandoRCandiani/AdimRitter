import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import './style.css'

const Dropzone = ({ onFileUploaded }) => {
   const [selectFile, setSelectFile] = useState('')

   const onDrop = useCallback(acceptFiles => {
      //ACEITAR APENAS UM ARQUIVO
      const file = acceptFiles[0]

      const fileUrl = URL.createObjectURL(file)

      setSelectFile(fileUrl)
      onFileUploaded(file)
   }, [onFileUploaded])

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: "image/*"
   })

   return (
      <div {...getRootProps()} className="dropzone ">
         <input {...getInputProps()} accept="image/*" />

         {
            selectFile
               ? <img src={selectFile} alt="Ponto de coleta" />
               : (
                  <p>
                     <FiUpload />
                     Adicionar Imagem
                  </p>
               )
         }
      </div>
   )
}

export default Dropzone