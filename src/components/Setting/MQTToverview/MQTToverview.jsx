import { useEffect, useState } from "react"
import styles from './MQTToverview.module.css'
import { useSubscription } from '@apollo/client';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Sub_MQTTHISTORY, Sub_MQTTClients } from '../../../API/Schema/setting/MQTToverview/MQTToverview'
export const MQTToverview = () => {
   const [showhistory, setshowhistory] = useState(false)
   const [showclient, setshowclient] = useState(false)
   const [historys, sethistorys] = useState([])






   //ฟังก์ชั่นโชว์ข้อมูล
   const [clickedHistory, setClickedHistory] = useState(false);

   const toggle = (index) => {
      if (clickedHistory === index) {
         return setClickedHistory(null)
      }

      setClickedHistory(index)

   }



   const handlerstartmqttserver = () => {

   }
   const handlerstopmqttserver = () => {

   }
   const hnalderreconnectmqttserver = () => {

   }
   const sub_mqtthistory = useSubscription(Sub_MQTTHISTORY);
   const sub_mqttclient = useSubscription(Sub_MQTTClients)

   console.log(sub_mqttclient)


   return (
      <>
         <div className={styles.container}>
            <h1 className={styles.Content} > MQTToverview </h1>
            <div className={styles.card}>
               <div className={styles.header}>
                  <div className={styles.Status} >
                     <h2> MQTT Sever Status </h2>
                     <div>
                        <div>
                           <button style={{ backgroundColor: '#79FC70' }}><ThumbUpAltIcon /></button>
                           <div>Good</div>
                        </div>
                        <div>
                           <button style={{ backgroundColor: '#FC7070' }} ><CancelIcon /></button>
                           <div>Stop</div>
                        </div>
                        <div>
                           <button style={{ backgroundColor: '#FFCC7F' }} ><HourglassBottomIcon /></button>
                           <div>Reconnect</div>
                        </div>


                     </div>

                  </div>
                  <div className={styles.lastMessage}>
                     <div className={styles.head} >
                        <h2>last message</h2>
                     </div>
                     <div className={styles.messageData}>
                        {
                           sub_mqtthistory.data && sub_mqtthistory.data.mqtthistory_packets && sub_mqtthistory.data.mqtthistory_packets.length > 0 ?
                              <div>
                                 <h5> topic  {sub_mqtthistory.data.mqtthistory_packets[0].topic} </h5>
                                 <div>
                                    <h5>payload</h5>
                                    {sub_mqtthistory.data.mqtthistory_packets[0].payload}
                                 </div>
                              </div>
                              : null
                        }
                     </div>

                  </div>

               </div>
               <div className={styles.body}>
                  <div className={styles.clients}>
                     <div className={styles.head}>
                        <h2>Clients</h2>
                        <button style={{ backgroundColor: (showclient) ? "green" : "red" }} onClick={() => { setshowclient(!showclient) }}>
                           <label>information</label>
                           <ExpandMoreIcon className={(showclient) ? styles.upIcon : styles.downIcon} />
                        </button>
                     </div>

                     <div className={styles.clientData}>
                        {
                           (showclient && sub_mqttclient && sub_mqttclient.data && sub_mqttclient.data.submqttabaseclients) ?
                              <ul>
                                 {
                                    sub_mqttclient.data.submqttabaseclients.map((client, index) => (
                                       <li style={{ border: "1px solid black", listStylePosition: 'inside', padding: "1rem" }} key={index + 1} name={`li-history${index}`}>
                                          {client.id}


                                       </li>
                                    ))
                                 }
                              </ul>
                              : null
                        }

                     </div>

                  </div>
                  <div className={styles.viewHistory}>
                     <div className={styles.head}>
                        <h2>View History</h2>
                        <button style={{ backgroundColor: (showhistory) ? "green" : "red" }} onClick={() => { setshowhistory(!showhistory) }}>
                           <label>information</label>
                           <ExpandMoreIcon className={(showhistory) ? styles.upIcon : styles.downIcon} />
                        </button>
                     </div>
                     <div
                        className={styles.historyTopic}>
                        {(showhistory && sub_mqtthistory.data && sub_mqtthistory.data.mqtthistory_packets) ?

                           <ul>
                              {
                                 sub_mqtthistory.data.mqtthistory_packets.map((history, index) => (
                                    <li
                                       style={{ border: "1px solid black", listStylePosition: 'inside', padding: "1rem" }}
                                       key={index + 1}
                                       name={`li-history${index}`}
                                       onClick={() => toggle(index)}
                                    >
                                       {index + 1}    

                                       <div className={styles.historyInfo}>
                                          {clickedHistory === index ?
                                             <div>
                                                <div> <label style = {{fontWeight:'bold'}}>topic :</label> {history.topic} </div>
                                                <div> <label style = {{fontWeight:'bold'}}>payload :</label> {history.payload} </div>
                                             </div>
                                             : null}

                                       </div>
                                    </li>
                                 ))
                              }
                           </ul>
                           : null
                        }

                     </div>

                  </div>

               </div>
               <div className={styles.body}>

               </div>

            </div>

         </div>




      </>
   )
}


