
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
