import styles from "./Dialog.module.css"
import { useState } from "react";

export default function Dialog({message , onDialog , nextPage}){

    return(

        <div className={styles.containerDialog}>           
            <div className={styles.body}>
                <h2>{message}</h2>
            </div>
            
            <div className={styles.footer}>
                <a 
                href={nextPage}
                rel="noreferrer"
                target="_blank"
                ><button className={styles.confirm}
                onClick={
                    ()=>onDialog(true)
                    }
                    >Next page</button>
                    </a>



                <button className={styles.cancel} 
                onClick={
                    ()=>onDialog(false)
                }
                >close</button>
            </div>

        </div>

    )
}


export const DialogFunction = () =>{

    const [defaultDialog, setdefaultDialog] = useState({
        message:"The request was successful. Next page?",
        isLoading: false,
        type:"",
    });
    const handleDialog = (message , isLoading ,type) =>{
        setdefaultDialog({
            message:message,
            isLoading:isLoading,
            type:type,
        })
    }

    const checkData = async (e) =>{
        if(e){
            console.log('Next Page')
            handleDialog(defaultDialog.message,false)

        }else{
            console.log('Stay Page')
            handleDialog(defaultDialog.message,false)
        }
    }

    return {defaultDialog ,setdefaultDialog , handleDialog , checkData}





}