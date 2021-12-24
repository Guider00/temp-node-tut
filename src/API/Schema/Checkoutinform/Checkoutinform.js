import { gql } from '@apollo/client';

export const API_GET_Checkoutinform = gql`
    query{
        Checkoutinforms{
            id
            room
            building
            floor
            roomtype
            status
            name
            surname
            checkout
        }
    }


`;

export const API_CREATE_Checkoutinform = gql`
    mutation createCheckoutinform($input:CheckoutinformInput!){
        createCheckoutinform(input: $input){
            id
        }
    }
`;
export const API_DELETE_Checkoutinform = gql`
	mutation deleteCheckoutinform($id: ID) {
		deleteCheckoutinform(id: $id) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_Checkoutinform = gql`
    mutation updateCheckoutinform($id:ID! , $input:CheckoutinformInput){
	    updateCheckoutinform(id:$id,input:$input){
		n
		nModified
	}
}
` ;