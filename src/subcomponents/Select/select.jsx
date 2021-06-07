import styles from './select.module.css'
export const Select = ({ label, option, onChange }) => {
    return (
        <div className={styles.div} >
            <div className={styles.divlabel}>
                <label>{label}</label>
            </div>
            <div className={styles.divselect} >
                <select onChange={onChange}>
                    {option ? option.map((ele) => <option key={ele}>{ele}</option> ) : null }
                </select>
            </div>

        </div>
    )
}
export default Select