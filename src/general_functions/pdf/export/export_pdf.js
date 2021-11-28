


const { jsPDF }  = require('jspdf')
const { AddTH_font }  =require('../AddFont/AddFont.js')

export const export_booking_pdf = ( owner , customer_details ,room_booking  ) =>{
     const doc = new jsPDF();
    let pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    let pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    try{
        const img = new Image()
        img.src = 'image/logo.png'
        doc.addImage(img, 'png', 15, 10, 24, 24)
    }catch(e){
        alert('Loading image error ')
    }

    AddTH_font(doc ,'yourCustomFont.ttf' )
    doc.addFont('yourCustomFont.ttf', 'yourCustomFont', 'normal');
    doc.setFont('yourCustomFont');
    doc.text("ใบยืนยันการจอง" ,pageWidth / 2, 12*2, {align: 'left'})
    doc.text("booking ID" ,15, 12*4, {align: 'left'})
    doc.text("Member ID",15, 12*5, {align: 'left'})
    doc.text("Hotel location",15, 12*6, {align: 'left'})
    doc.text("Address",15, 12*7, {align: 'left'})
    doc.text("Tel.",15, 12*8, {align: 'left'})

    // doc.text("Number Room")
    // doc.text(" Room Type")

    // doc.text("Check in ")
    // doc.text("Payment Details")
    // doc.text("Booked and Payable By")

    // doc.text("Remarks :")
    

    let src_pdf = doc.output('datauristring');


   


    const iframe = `<iframe width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>`
    const x = window.open();
    x.document.title = "preview booking"
    x.document.open();
    x.document.write(iframe);
    x.document.close();
}
export const export_receipt =  ( ) =>{

}

