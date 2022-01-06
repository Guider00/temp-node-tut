import { gql } from '@apollo/client';

export const API_GET_Invoice = gql`

query{
    Invoices{
        id
        duedateinvoice
        monthlybilling
        printstatus
        status
        status
        room{
            id
        }
    }
}

`;
export const API_ADD_Invoice = gql`
    mutation addInvoice($input:InvoicInput!){
        addInvoice(input: $input){
            id
        }
    }
`;
export const API_DELETE_Invoice = gql`
	mutation deleteInvoice($id: ID!) {
		deleteInvoice(id: $id) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_Invoice = gql`
mutation updateInvoice($id:ID! , $input:InvoicInput){
	updateInvoice(id:$id,input:$input){
		n
		nModified
	}
}
` ;

export const API_CountInvoices = gql`
query{
    countInvoices{
        String

    }
}

`


