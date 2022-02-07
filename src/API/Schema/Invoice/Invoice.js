import { gql } from '@apollo/client';

export const API_GET_Invoice = gql`
	query {
		Invoices {
			id
			docnumber
			monthlybilling
            duedateinvoice
			printstatus
			status
			Room {
				id
				name
				RoomType{
					unit_electrical
					unit_water
					rate_water
					rate_electrical
				}
				meterroom{
					id
					name
					inmemory_kwh
					inmemory_kwh_date
					inmemory_finished_kwh
					inmemory_finished_kwh_date
					realtime_kwh
					
					inmemory_water
					inmemory_water_date
					inmemory_finished_water
					inmemory_finished_kwh_date
					realtime_water
				}
                members{
                    id
					name
					lastname
					email
					personalid
					taxnumber
					address
					carid
					note
                }
			}
			lists {
				id
				name
				number_item
				price
                selectvat
				type_price
                vat
			}
		}
	}
`;
export const API_ADD_Invoice = gql`
	mutation addInvoice($input: InvoicInput!) {
		addInvoice(input: $input) {
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
	mutation updateInvoice($id: ID!, $input: InvoicInput) {
		updateInvoice(id: $id, input: $input) {
			n
			nModified
		}
	}
`;

export const API_CountInvoices = gql`
	query {
		countInvoices {
			String
		}
	}
`;
