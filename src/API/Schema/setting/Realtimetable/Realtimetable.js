import {  gql } from '@apollo/client';


export const Subdevicemeterrealtime = gql`
  subscription {
	subdevicemeterrealtime{
        id
        port
        device
        tag
        value
    }
  }
`;

