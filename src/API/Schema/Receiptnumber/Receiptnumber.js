import { gql } from '@apollo/client';

export const API_GET_Receiptnumber = gql`
	query {
		Receiptnumbers {
			id
            receipt_number
            invoice_number
            reimbursement_number
            booking_number
            bill_number
			account_number
			bill_date
		}
	}
`;
export const API_ADD_Receiptnumber = gql`
	mutation addReceiptnumber($input: ReceiptnumberInput!) {
		addReceiptnumber(input: $input) {
			id
		}
	}
`;
export const API_DELETE_Receiptnumber = gql`
	mutation deleteReceiptnumber($id: ID!) {
		deleteReceiptnumber(id: $id) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_Receiptnumber = gql`
	mutation updateReceiptnumber($id: ID!, $input: ReceiptnumberInput) {
		updateReceiptnumber(id: $id, input: $input) {
			n
			nModified
		}
	}
`;


