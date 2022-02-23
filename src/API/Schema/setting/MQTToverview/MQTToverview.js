
import {  gql } from '@apollo/client';


export const Sub_MQTTHISTORY = gql`
  subscription {
    mqtthistory_packets{
        topic
        payload
    }
  }
`;
export const Sub_MQTTClients = gql`
    subscription{
      submqttabaseclients
    }
`;

export const  SubMQTTServerstatus  = gql`
    subscription{
        SubMQTTServerstatus {
            name
        }
    }
`
