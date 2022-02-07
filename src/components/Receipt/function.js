 export const list_to_show = (list) =>{
        let data= list
        let _price =  Number( (data && data.number_item ?  Number (data.number_item) : 1  ) * (data && data.price ?
         Number( data.type_price === 'ราคารวมvat' ? Number( data.price )*100/107 : Number( data.price ) ) : 0)).toFixed(2)

         let _vat =  Number(data.selectvat === 'คิดvat' ? _price* Number(data.vat)/100 : 0 ).toFixed(2)
        
         let total = Number( Number(_price) + Number(_vat) ).toFixed(2)

        return ({price:_price ,vat:_vat , total: total})
    }

export const handlerCreateRecipt = async () => {
	try {

	
			// let _res = await createReceipt({
			// 	variables: {
			// 		input: {
			// 			status: 'รอการพิมพ์',
			// 			invoiceid: selectedroom.data.checkinInvoice.id
			// 		}
			// 	}
			// });
			// if (_res && _res.data && _res.data.createReceipt.id) {
			// 	// สร้างใบแจ้งหนี้สำเร็จ //

			// 	let _idreceipt = _res.data.createReceipt.id;
			// 	let _room = selectedroom;
			// 	if (_room && _room.id) {
			// 		let _res = await updateRoom({
			// 			variables: {
			// 				id: _room.id,
			// 				input: {
			// 					status: 'มีคนอยู่',
			// 					checkinReceiptid: _idreceipt
			// 				}
			// 			}
			// 		});
			// 		if (_res && _res.data) {
			// 			try {
			// 				refetch_roomMember();
			// 			} catch (e) {
			// 				console.log(e);
			// 			}
			// 		} else {
			// 			console.log('communication Error ');
			// 		}
			// 	}
			// }
		
	} catch (e) {
		console.log(e);
	}
};
export const handlerCancelRecipt = () => {};
