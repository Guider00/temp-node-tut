import { gql } from '@apollo/client';

export const API_GET_CreateInvoice = gql`

query{
    CreateInvoices{
        id
        bill_exp
        date_exp
        rent_price
        building
        floor
        room_type
        name_room
        type_rent
    }
}

`;
export const API_ADD_CreateInvoice = gql`
    mutation addCreateInvoice($input:CreateInvoiceInput!){
        addCreateInvoice(input: $input){
            id
        }
    }
`;
export const API_DELETE_CreateInvoice = gql`
	mutation deleteCreateInvoice($id: ID!) {
		deleteCreateInvoice(id: $id) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_CreateInvoice = gql`
mutation updateCreateInvoice($id:ID! , $input:CreateInvoiceInput){
	updateBooking(id:$id,input:$input){
		n
		nModified
	}
}
` ;



