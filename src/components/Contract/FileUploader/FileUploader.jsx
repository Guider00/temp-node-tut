import {useState,useRef} from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';


export const FileUploader = props => {
  const hiddenFileInput = useRef(null);
  const [filename,setfilename] = useState("ชื่อไฟล์")
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    if(fileUploaded && fileUploaded.name){
       setfilename(fileUploaded.name.toString());
    }
    props.handleFile(fileUploaded);
  };
  return (
    <div >
      <label  onClick={handleClick} >{filename} </label>
      <button onClick={handleClick} style={{marginLeft:"1.5rem"}}>
       <FileUploadIcon/>  อัพโหลด เอกสาร 
      </button>
      <input type="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
      /> 
    </div>
  );
};
