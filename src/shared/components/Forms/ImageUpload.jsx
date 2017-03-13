import React from 'react'
import Dropzone from 'react-dropzone'

const ImageUpload = props => {
  const files = props.input.value

  return (
    <div>
      <Dropzone
        name={props.name}
        onDrop={( filesToUpload, e ) => props.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
        {files &&
          <img className="thumb128" src={files}/>
        }
      </Dropzone>
      {props.meta.touched && props.meta.error &&
        <span className="error">{props.meta.error}</span>
      }
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  )
}

export default ImageUpload