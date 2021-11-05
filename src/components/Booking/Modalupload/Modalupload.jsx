
import React  from "react";
import {  useState } from "react"

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import styles from './Modalupload.module.css';

export const Modalupload = ( { booking, handleclose , file , handleSave } ) =>{
  const hiddenFileInput = React.useRef(null);
  const [error,seterror] = useState(null)
  const [image,setimage] = useState(null); 

  const handleClick = event => {
    hiddenFileInput.current.click();
  };
   const handleChange = event => {
        const fileUploaded = event.target.files[0];
        console.log('fileUploaded',fileUploaded)
        if(fileUploaded && fileUploaded.type  &&  ( fileUploaded.type === 'image/png' || fileUploaded.type === 'image/jpeg') ){
                seterror(null)
                setimage(fileUploaded)
        }else{
            seterror('file not match')
        }
  };
    const handleClearimage = event => {
        setimage(null)
    }
    return (
        <div className={styles.bgmodal}>
            <div className={styles.content} >
                      <div  className={styles.close}>
                        <CloseIcon onClick={handleclose}/>
                    </div>
                <div className={styles.header}> 
          
                    <label> Upload ภาพใบเสร็จ </label>
                </div>
               
                <div className={styles.body}>

                    <div className={styles.inputimage} >
                              { image?  <div className={styles.closebtn} onClick={handleClearimage} >
                                        
                                            <CloseIcon/>
                                       
                                        </div> :null }
                            <div  className={styles.defaultimage} onClick={ handleClick  }  >
                            {
                                image? 
                                <>
                                    <img src={ image ? window.URL.createObjectURL(image) :"#"} width="380" height="380" alt="img" /> 
                                </>
                                :<div  className={styles.defaultimage} >
                                    <div className={styles.errormessage}>
                                        {error}
                                    </div>
                                    <label>  upload รูปภาพ ใบเสร็จ</label>
                                </div>
                            }
                            </div>
                    </div>

                    <div>
                    <input   
                    hidden
                    ref={hiddenFileInput} 
                    onChange={handleChange}
                       type='file' />
                    </div>
                    <div className={styles.imagename}>
                          <label>{image ?  image.name :""}</label>
                         
                    </div>
                   <div className={styles.menu}>
                        <button onClick ={ ()=>{handleSave(  booking, image ) } }> <label> บันทึก </label> <SaveIcon/> </button>
                    </div>
                </div>
               
            </div>
        </div>
    )
}