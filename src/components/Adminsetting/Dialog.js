import styles from "./Usermanagment.module.css"
import React from "react"

export default function Dialog({message,onDialog}) {
    return (
        <div className={styles.containerDialog}>
            
                <div className={styles.titleClose}>
                    <button className={styles.close} 
                    onClick={
                        ()=>onDialog(false)
                    }
                    >X</button>
                </div>
           
            <div className={styles.body}>
                <h2>{message}</h2>
            </div>
            
            <div className={styles.footer}>
                <button className={styles.confirm}
                onClick={
                    ()=>onDialog(true)
                    }
                    >confirm</button>



                <button className={styles.cancel} 
                onClick={
                    ()=>onDialog(false)
                }
                >cancel</button>
            </div>

            
        </div>
    )
}