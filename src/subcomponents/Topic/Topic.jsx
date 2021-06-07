import styles  from './Topic.module.css'
export const Topic  = ({label,size,backgroundColor,fontWeight}) =>{
    return(
        <div className={styles.div} style={{backgroundColor:backgroundColor }}>
             <label style={{fontSize:size , fontWeight:fontWeight?fontWeight:'normal'}}>{label}</label>
        </div>
       
    )
}

export default Topic