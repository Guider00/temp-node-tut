import React  from "react";

import styles from './ModalAlert.module.css';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
export const ModalAlert = ( {message , handleclose , handleaccept  }) =>{

    return (

        <div className={styles.bgmodal}>
            <div className={styles.content} >
                      <div  className={styles.close}>
                        <CloseIcon onClick={handleclose ?  handleclose: ()=>{} }/>
                    </div>
                    <div className={styles.card}>
                          <div className={styles.header}>
                            Delete
                          </div>
                          <div className={styles.textmessage}>
                            { message? message : "" }
                         </div>
                         <div className={styles.line}>
                            <hr/>
                         </div>
                        
                         <div className={styles.card_menu}>
                            <button onClick={handleaccept ? handleaccept : ()=>{}  } > Delete <DeleteIcon/></button>
                            <button onClick={handleclose ?  handleclose: ()=>{} } > Cancel   <CancelIcon/></button>
                         </div>

                    </div>
                  
               
            </div>
        </div>
    )
}
