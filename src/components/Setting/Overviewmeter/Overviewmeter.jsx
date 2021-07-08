
import React from "react";
import {
  useSubscription,
  gql,
} from "@apollo/client";

import styles from "./Overviewmeter.module.css"

import Icon from '@material-ui/core/Icon/'

  const GET_MESSAGES = gql`
  subscription {
    mqtthistory_packets{
        topic
        payload
      }
  }
`;


export const Overviewmeter = () => {

    const { data } = useSubscription(GET_MESSAGES);
    const { mqtthistory_packets } = data? data:{ mqtthistory_packets : null}

  

    return (
        <>

        <div className={styles.menu_top} >
            <div>
                <select>
                    <option>  ค่าน้ำ </option>
                    <option> ค่าไฟ </option>
                </select>
            </div>
            <select>
                <option> อาคาร</option>
            </select>
            <div>
                 <button> กำหนดค่าเริ่มต้นใหม่ </button>
            </div>
            <div>
                 <button>  กำหนดค่าสิ้นสุด  </button>
            </div>
            <div>
                <button> อ่านค่า ทั้งหมด</button>
            </div>
        </div>
        <div className={styles.table_body}>
            <div>
            <table >
                <tr>
                    <th>ชื่อห้อง</th>
                    <th>ชื่อมิตเตอร์</th>
                    <th>รุ่น</th>
                    <th>วันเริ่มต้น</th>
                    <th>หน่วยเริ่มต้น</th>
                    <th>update ค่าเริ่มต้น</th>
                    <th>วันสิ้นสุด</th>
                    <th>หน่วยสิ้นสุด</th>
                    <th>ผลต่าง</th>
                    <th>ค่า CT</th>
                    <th>จำนวนหน่วย</th>
                    <th>update ค่าสิ้นสุด</th>
                    <th>วันที่</th>
                    <th>หน่วยล่าสุด</th>
                    <th>update หน่วยล่าสุด</th>
                    <th></th>
                </tr>
                <tr>
                    <td>
                        <div>
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <div>
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <div>
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <div>
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <div>
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <div>
                            <button> {`<`} </button>
                        </div>
                    </td>
                    <td>
                        <div>
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <div>
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <div>
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <div>
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <div>
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                    <div>
                            <button> {`<`} </button>
                        </div>
                    </td>
                    <td>
                        <div>
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <div>
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <div>
                            <button> อ่านค่า </button>
                        </div>
                    </td>
                    <td>
                        <div>
                            <button> Save</button>
                        </div>
                    </td>
                </tr>
            </table>
            </div>
        </div>
        <div className={styles.menu_end}>
            <div className={styles.zone_right}>
                <div>
                    <button>
                        ตั้งค่าเริ่มต้นจากข้อมูลใบแจ้งหนี้
                    </button>
                </div>
                <div>
                    <button>
                        <Icon>save</Icon>
                    </button>
                </div>
                <div>
                    <button>
                        คำนวณค่าไฟ
                        <Icon>receipt</Icon>
                    </button>
                </div>
              
               
            </div>
        </div>

            <p> OverView Meter </p>
            
        {
         mqtthistory_packets ? mqtthistory_packets.map( ({topic,payload},index)=>(
                <div key={index}>
                     <p>topic = {topic}</p>
                     <p>payload = {payload}</p>
                </div>
            )):null
        }
        </>
    )
}