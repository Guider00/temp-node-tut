import { gql } from '@apollo/client';

export const API_GET_Invoice = gql`

query{
    Checkins{
        id
        id_contact
        checkin_type
        checkin_date
        rental_deposit
        number_day_rent
        branch
        Checkinoption{
            id
            name
            price
        }
    }
}

`;
export const API_CREATE_Checkin= gql`
    mutation createCheckin($input:CheckinInput!){
        createCheckin(input: $input){
            id
        }
    }
`;
export const API_DELETE_Checkin = gql`
	mutation deleteCheckin($id: ID!) {
		deleteCheckin(id: $id) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_Checkin  = gql`
mutation updateCheckin($id:ID! , $input:CheckinInput){
	updateCheckin(id:$id,input:$input){
		n
		nModified
	}
}
` ;

// export const API_CountInvoices = gql`
// query{
//     countInvoices{
//         String

//     }
// }

// `


