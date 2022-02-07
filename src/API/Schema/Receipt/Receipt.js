import { gql } from '@apollo/client';

export const API_GET_Receipt = gql`

query{
    Receipts {
                id
                monthlybilling
                duedate
                printstatus
                status
                note
                lists
                {
                    id
                    name
                    price
                    number_item
                    vat
                    selectvat
                    type_price
                }
                Invoice{
                    id
                    monthlybilling
                    status
                    lists
                    {
                        id
                        name
                        price
                        number_item
                        vat
                        selectvat
                        type_price
                    }
                    Room{
                        id
                        name
                        floor{
                                name
                                building{
                                    name
                                }
                            }
                        members{
                            name
                            lastname
                            address
                        }
                    }
                }
      }
}

`;
export const API_CREATE_Receipt = gql`
    mutation createReceipt($input:ReceiptInput!){
        createReceipt(input: $input){
            id
        }
    }
`;
export const API_DELETE_Receipt = gql`
	mutation deleteReceipt($id: ID!) {
		deleteReceipt(id: $id) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_Receipt = gql`
mutation updateReceipt($id:ID! , $input:ReceiptInput){
	updateReceipt(id:$id,input:$input){
		n
		nModified
	}
}
` ;


export const API_UPDATE_Receiptlist = gql`
mutation updateReceiptlist($id:ID! , $input:Receipt_listInput){
	updateReceiptlist(id:$id,input:$input){
		n
		nModified
	}
}
` ;
