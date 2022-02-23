import { useEffect,  useState } from "react"

import { useSubscription } from '@apollo/client';
import {  Sub_MQTTHISTORY , Sub_MQTTClients } from '../../../API/Schema/setting/MQTToverview/MQTToverview'
export const MQTToverview = () =>{
    const [showhistory,setshowhistory] = useState(false) 
    const [historys,sethistorys] = useState([])

    const handlerstartmqttserver =() =>{

    }
    const handlerstopmqttserver =()=>{

    }
    const hnalderreconnectmqttserver =()=>{

    }
    const sub_mqtthistory = useSubscription(Sub_MQTTHISTORY );
    const sub_mqttclient  = useSubscription(Sub_MQTTClients)
    

    
    return (
        <> 
          <h1> MQTToverview </h1>
          <div>
             <h2> MQTT Sever Status </h2>
             <div>
                <button>start</button>
                <button>stop</button>
                <button>reconnect </button>
             </div>
          </div>
          <div>
             <h2> Clients</h2>
             <div>
                {  
                  ( sub_mqttclient.data  && sub_mqttclient.data.sub_mqttclient ) ?
                    sub_mqttclient.data.sub_mqttclient.map( (client,index)=>(
                            {client}
                    ))
                    :null
                }
             </div>
          </div>
          <div>
             <h2>last message</h2>
            <div>
              {  
              sub_mqtthistory.data && sub_mqtthistory.data.mqtthistory_packets && sub_mqtthistory.data.mqtthistory_packets.length > 0 ?
              <div>
                <h5> topic  {sub_mqtthistory.data.mqtthistory_packets[0].topic} </h5>
                 <div>
                     <h5>payload</h5>
                     {sub_mqtthistory.data.mqtthistory_packets[0].payload}
                 </div>
              </div>
              :null
              }
            </div>

          </div>
          <div>
             <h2> 
                View History  
                <button style={{ backgroundColor:(showhistory)?"green":"red" }}onClick={()=>{setshowhistory(!showhistory)}}> arrowdown </button>
             </h2>
             {(showhistory && sub_mqtthistory.data && sub_mqtthistory.data.mqtthistory_packets)?
               
                <ul>
                    {
                    sub_mqtthistory.data.mqtthistory_packets.map( (history,index)=>(
                        <li   style={{border: "1px solid black",listStylePosition:'inside',padding:"1rem"}} key={index+1} name={`li-history${index}`}>
                                {index+1}  topic  {history.topic}
                             
                              <div >
                                 <h5>payload</h5>
                                 {history.payload}
                              </div>
                        </li>
                    ) )
                    }
                </ul>
                :null
             }
             
          </div>
        </>
    )
}