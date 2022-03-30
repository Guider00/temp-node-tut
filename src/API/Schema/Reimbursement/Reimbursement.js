import { gql } from '@apollo/client';

export const API_GET_Reimbursement = gql`
	
            query{
                Reimbursements{
                id
                cashback_date
                status
                cashback
                Invoice {
                        id
                        duedateinvoice
                        printstatus
                        status
                        Room {
                                id
                                 name
                                members{
                                        id
                                        name
                                        lastname
                                }
                                floor{
                                id
                                name
                                building{
                                        id
                                        name
                                        }
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
                
                Contract{
            
                        id
                        # Contractnumber
                        # RoomType
                        # RoomName
                        # RentType
                        # tenantname
                        # tenantlastname
                        # checkin_date
                        # status
                        # checkout_date
                
                        # Room{
                        # id
                        # name
                        # members{
                        #         name
                        #         lastname
                        # }
                        # floor{
                        #         building{
                        #                 name
                        #         }
                        # }       
                        # }
            
                
                }
                
            }
            
            }
            
`;
export const API_CREATE_Reimbursement  = gql`
        mutation createReimbursement($input:ReimbursementInput){
                createReimbursement(input:$input){
                        id
                        errors
                }
        }
`
export const API_ADD_Reimbursement = gql`
	mutation createReimbursement($input: ReimbursementInput) {
		createReimbursement(input: $input) {
			id
                        errors
		}
	}
`;
export const API_DELETE_Reimbursement = gql`
	mutation deleteReimbursement($id: ID!) {
		deleteReimbursement(id: $id) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_Reimbursement = gql`
	mutation updateReimbursement($id: ID!, $input: ReimbursementInput) {
		updateReimbursement(id: $id, input: $input) {
			n
			nModified
		}
	}
`;

