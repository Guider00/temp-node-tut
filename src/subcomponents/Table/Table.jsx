import styles from './Table.module.css'

import Delete from '@material-ui/icons/Delete';

import SettingsIcon from '@material-ui/icons/Settings';
import { useState, useEffect } from "react";

import { useMediaQuery } from 'react-responsive'

import { data_display } from '../../subcomponents/Universal_function'


export const Table = ({ Data, onClickDelete, onClickEdit, maxWidth }) => {

    const isDesktop = useMediaQuery({
		query: "(min-width: 1224px)"
	});
	const isTablet = useMediaQuery({
		query: "(max-width: 1224px)"
	});

    const [page_index, setpage_index] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []); // Empty array ensures that effect is only run on mount
    return (
        <>

            {
                Data && Data.topic && Data.body ?
                    <div className={styles.div}>
                        <table className={styles.table}>
                            <tbody>
                                <tr style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                    {Data.showindex ? <th>#</th> : null}

                                    {Data.topic.map((ele, index) =>
                                        (index >= page_index * (width > 800 ? (6) : (4)) && index <= (width > 800 ? (6) : (4)) - 1 + (page_index * (width > 800 ? (6) : (4))))
                                            ? (<th key={`tbl_${index}`} >{ele}</th>) : null)
                                    }

                                    {
                                        (Data.topic.length > (width > 800 ? (6) : (4))) ?
                                            <th>
                                                <div>
                                                    {
                                                        (Data.topic.length > (width > 800 ? (6) : (4))) ?

                                                            <button disabled={(page_index === 0)} onClick={() => {
                                                                if (page_index > 0) {
                                                                    let _page_index = page_index - 1
                                                                    setpage_index(_page_index)
                                                                }
                                                            }}> {`<<`} </button> : null
                                                    }
                                                    {
                                                        (Data.topic.length > (width > 800 ? (6) : (4))) ?
                                                            <button disabled={((Data.topic.length) / ((page_index + 1) * (width > 800 ? (6) : (4))) < 1)} onClick={() => {

                                                                let _page_index = page_index + 1
                                                                setpage_index(_page_index)
                                                            }}> {`>>`} </button> : null
                                                    }

                                                </div>
                                            </th> : (
                                                Data.disablemenu ? null : <th></th>
                                            )

                                    }


                                </tr>


                                {Data.body.map((ele_body, row_index) =>

                                    <tr key={`${ele_body['id']}_${row_index}`} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
                                        {Data.showindex ?
                                            <td key={`Data.showindex ${row_index}`}> <div>{row_index + 1}</div></td> : null
                                        }
                                        {

                                            Data.inputs.map((input, index) =>
                                                (index >= page_index * (width > 800 ? (6) : (4)) && index <= ((page_index + 1) * (width > 800 ? (6) : (4))) - 1) ?


                                                    <>
                                                        <td key={`tbl2_${input.property}_${index}`}>
                                                            <div>
                                                                {
                                                                    input.idtolabel ?
                                                                        <input disabled={true} value={input.idtolabel(data_display(ele_body, input.property))} type="text" /> :
                                                                        <input disabled={true} value={data_display(ele_body, input.property)} type="text" />
                                                                }

                                                            </div>

                                                        </td>
                                                    </>
                                                    : null


                                            )

                                        }
                                        {
                                            Data.disablemenu ?
                                                (Data.topic.length > (width > 800 ? (6) : (4))) ? <td></td> : null
                                                :  // << disable menu 
                                                <td key={`menutable_${row_index}`}>
                                                    <div>
                                                        <button onClick={() => {
                                                            onClickDelete ?
                                                                onClickDelete(ele_body['id']) : console.log('delete', ele_body['id'])
                                                        }}   ><Delete />
                                                        </button>

                                                        <button onClick={() => {

                                                            onClickEdit ?
                                                                onClickEdit(ele_body['id'], ele_body['data']) : console.log('edit', ele_body['id'])
                                                        }}     ><SettingsIcon /></button>
                                                    </div>
                                                </td>
                                        }
                                    </tr>

                                )}


                            </tbody>



                        </table>
                    </div>
                    : null
            }
        </>
    )
}
export default Table
