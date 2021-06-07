import styles from './EndButton.module.css'
export const  EndButton =( {buttons ,payload})=>{
    return(
        <>
          {buttons?
            <div className={styles.div}>
          
                    
               { buttons.map((button,index) =>
                <button key={`btn_${index}`} onClick=
                   {( (button && button.onClick)?button.onClick : ( () =>{console.log('click')} ) )}
                 >{button.label?button.label:"button"}</button>
                )
               }
             
            </div>
               :null}
        </>
    )
}
export default EndButton