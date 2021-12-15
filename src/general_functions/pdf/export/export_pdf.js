


const { jsPDF }  = require('jspdf')
const { AddTH_font }  =require('../AddFont/AddFont.js')
const { formatDate , toHHMMSS }  = require('../../convert.js')

export const export_booking_pdf = ( booking , owner , customer_details   ) =>{
    if(booking){
        console.log("Export booking ",booking)

     let Noanswer = "-"
    let bookingID = booking.id ? booking.id : Noanswer ;
    let bookingReference = booking.booking_number ?  booking.booking_number : Noanswer ;
    let Client =   booking.customer_name  ?  `${booking.customer_name} ${booking.customer_lastname}`  : Noanswer 
    let Customer_tel =  booking.customer_tel ? booking.customer_tel : Noanswer
    let memberID = Noanswer
    let Country = Noanswer

    /** Hotel infomation  */
    let Hotel = Noanswer
    let Address1 = "262 Moo 2 , "
    let Address2 = " Leela valley village"
    let Hotelcontact = "+667569577"

    let Numberroom = "1"
    let Numberbeds = Noanswer
    let Numberadults = Noanswer
    let Numberchildren = Noanswer
    let Breakfast = Noanswer
    let Roomtype = booking.Room.RoomType.name
    let Pomotion = "-"
    let Arrival = booking.checkin_date ?  formatDate (new Date(Number(booking.checkin_date) )) : Noanswer ;
    let Departure = booking.checkin_date_exp ? formatDate (new Date(Number( booking.checkin_date_exp) ))  : Noanswer ;
  
    let Playment = booking.payment_method?  booking.payment_method : Noanswer;
    let Deposit = booking.deposit ? booking.deposit : Noanswer;
    let Booked =   "..................................................................................."   // account of create
    let contact = "+66 ---------"
    let Note = booking.note ?  booking.note : "---- "
    
   
   
    Client = Client ? Client : Noanswer ;
    memberID = memberID ? memberID : Noanswer ;
    Country = Country ? Country : Noanswer ;
    Hotel = Hotel ? Hotel : Noanswer ;
    Address1 = Address1 ? Address1 : Noanswer ;
    Address2 = Address2 ? Address2 : Noanswer ;
    Hotelcontact = Hotelcontact ? Hotelcontact : Noanswer ;
    
    Numberroom = booking &&  booking.Room && booking.Room.name ?  booking.Room.name : Noanswer ;
    Numberbeds = Numberbeds ? Numberbeds : Noanswer ;
    Numberchildren = Numberchildren ? Numberchildren : Noanswer ;
    Numberadults = Numberadults ? Numberadults : Noanswer ;
    Breakfast = Breakfast ? Breakfast : Noanswer ;
    Roomtype = Roomtype ? Roomtype : Noanswer ;
    Pomotion = Pomotion ? Pomotion : Noanswer ;
    
    

   
    Playment = Playment ? Playment : Noanswer ;

    Booked = Booked ? Booked : Noanswer ;
    contact = contact ? contact : Noanswer ;

  
    
    
    

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

    
    doc.text("ใบยืนยันการจอง" ,pageWidth / 2, 12*2, {align: 'center'})
   

    //กล่องใต้หัวข้อ
    doc.setDrawColor(52, 192, 94)
    doc.rect(15, 35, pageWidth-25, 8 )

    //ลายเซ็น
    doc.setDrawColor(52,192,94)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(15, 180, pageWidth-25,65,3,3,'FD')

    doc.setDrawColor(0)
    doc.rect(130, 227, pageWidth-143,15)

    //เช็คอิน
    doc.setDrawColor(0)
    doc.setFillColor(221, 221, 221)
    doc.rect(30, 186, pageWidth-163,10 , 'FD')
    doc.setDrawColor(0)
    doc.setFillColor(221, 221, 221)
    doc.rect(103, 186, pageWidth-163,10 , 'FD')
    //รายการที่ต้องชำระ รายละเอียดการชำระเงิน
    doc.setDrawColor(0)
    doc.setFillColor(221, 221, 221)
    doc.rect(17, 208, pageWidth-163,8 , 'FD')
    doc.setDrawColor(0)
    doc.setFillColor(221, 221, 221)
    doc.rect(67, 208, pageWidth-143,8 , 'FD')
    // doc.setDrawColor(0)
    // doc.setFillColor(221, 221, 221)
    // doc.rect(137, 208, pageWidth-150,8 , 'FD')

    //จองและชำระ
    doc.setDrawColor(0)
    doc.setFillColor(221, 221, 221)
    doc.rect(17, 227, pageWidth-98,15 , 'FD')

    doc.setLineWidth(0.2)
    doc.line(15, 270, 200, 270)
    


   
    //กล่องสีเท่า
    doc.setDrawColor(0)
    doc.setFillColor(218, 213, 213)
    doc.roundedRect(100,48, pageWidth-110, 100 ,3,3,'FD')



    doc.setDrawColor(255, 255, 255)
    doc.rect(145,50, pageWidth-158, 11)
    doc.setDrawColor(255, 255, 255)
    doc.rect(145,63, pageWidth-158, 11)
    doc.setDrawColor(255, 255, 255)
    doc.rect(145,76, pageWidth-158, 11)
    doc.setDrawColor(255, 255, 255)
    doc.rect(145,89, pageWidth-158, 11)
    doc.setDrawColor(255, 255, 255)
    doc.rect(145,102, pageWidth-158, 11)
    doc.setDrawColor(255, 255, 255)
    doc.rect(145,115, pageWidth-158, 11)
    doc.setDrawColor(255, 255, 255)
    doc.rect(145,128, pageWidth-158, 11)

    


    doc.setFontSize(14)
    doc.text("กรุณาแสดงไฟล์ใบยืนยันการจองห้องพักของโรงแรม หรือ แสดงสำเนาใบการยืนยันการจองห้องพักของโรงแรม" ,40, 40, {align: 'left'})

    doc.text("Booking ID :" ,15, 13*4, {align: 'left'})
    doc.text("ใบยืนยันการจอง :" ,15, 57, {align: 'left'})

    doc.text("Room No." ,102, 13*4 + 3, {align: 'left'})
    doc.text("เลขที่ห้อง :" ,102, 60, {align: 'left'})
    


    doc.text("Booking Reference : " ,15, 13*5, {align: 'left'})
    doc.text("หมายเลขอ้างอิงการจอง :" ,15, 70, {align: 'left'})

    doc.text("Number of Extra Beds :" ,102, 13*5+3, {align: 'left'})
    doc.text("จำนวนเตียงเสริม :" ,102, 73, {align: 'left'})

   
    doc.text("Client :" ,15, 13*6, {align: 'left'})
    doc.text("ลูกค้า :" ,15, 83, {align: 'left'})

    doc.text("Client tel. :" ,15, 13*7, {align: 'left'})
    doc.text("เบอร์ติดต่อลูกค้า :" ,15, 13*7+5, {align: 'left'})

    doc.text("Number of Adults :" ,102, 13*6+3, {align: 'left'})
    doc.text("จำนวนผู้ใหญ่ :" ,102, 86, {align: 'left'})


    doc.text("Member ID :" ,15, 13*8, {align: 'left'})
    doc.text("หมายเลขสมาชิก :" ,15, 13*8+5, {align: 'left'})
    doc.text("Number of Children :" ,102, 13*7+3, {align: 'left'})
    doc.text("จำนวนเด็ก :" ,102, 99, {align: 'left'})

    doc.text("Country of Passport :" ,15, 13*9, {align: 'left'})
    doc.text("หนังสือเดินทางของประเทศ :" ,15, 13*9+5, {align: 'left'})

    doc.text("Breakfast :" ,102, 13*8+3, {align: 'left'})
    doc.text("อาหารเช้า :" ,102, 112, {align: 'left'})

    doc.text("Hotel :" ,15, 13*10, {align: 'left'})
    doc.text("โรงแรม :" ,15, 13*10+5, {align: 'left'})
    
    doc.text("Room Type :" ,102, 13*9+3, {align: 'left'})
    doc.text("ประเภทห้อง :" ,102, 125, {align: 'left'})

    doc.text("Address :" ,15, 13*11, {align: 'left'})
    doc.text("ที่อยู่ :" ,15, 13*11+5, {align: 'left'})

    doc.text("Promotion :" ,102, 13*10+3, {align: 'left'})
    doc.text("โปรโมชั่น :" ,102, 138, {align: 'left'})

    doc.text("สำหรับรายละเอียดเงื่อนไขทั้งหมดของโปรโมชั่น กรุณาดูที่อีเมลยืนยัน" ,104, 13*11 +3, {align: 'left'})

    
    doc.text("Hotel Contact Number :",15,13*12,{align:'left'})
    doc.text("หมายเลขโทรศัพท์ของโรงแรม :" ,15, 161, {align: 'left'})

    doc.text("การจองนี้ไม่สามารถขอเงินคืนและไม่สามารถแก้ไขหรือเปลี่ยนแปลงได้ กรณีที่ท่านไม่เข้าเช็คอินที่โรงแรมตามกำหนด " ,15, 13*13, {align: 'left'})
    doc.text("จะถือเป็นการไม่เข้าพัก และท่านไม่สามารถขอเงินคืนได้(นโยบายของโรงแรม)" ,15, 174, {align: 'left'})

    doc.text("Arrival :" ,17, 190, {align: 'left'})
    doc.text("เช็คอิน :" ,17, 195, {align: 'left'})
    doc.text("Departure :" ,80, 190, {align: 'left'})
    doc.text("เช็คเอาท์ :" ,80, 195, {align: 'left'})

    doc.text("Payment Details :" ,17, 200, {align: 'left'})
    doc.text("รายละเอียดการชำระเงิน :" ,17, 205, {align: 'left'})

    doc.text("ฺBooked And Payable By :" ,17, 220, {align: 'left'})
    doc.text("จองและชำระเงินโดย :" ,17, 225, {align: 'left'})

    doc.text("Signature  ........................................ " ,139, 236, {align: 'left'})


    doc.text("Remarks :" ,15, 250, {align: 'left'})
    doc.text("คำขอพิเศษทั้งหมดขึ้นอยู่กับความพร้อมของโรงแรมเมื่อเช็คอิน" ,15, 255, {align: 'left'})

   
    doc.text("ติดต่อศูนย์บริการลูกค้าของเราได้ทุกวัน 24 ชั่วโมง :" ,131, 255, {align: 'left'})
    doc.text("เจ้าหน้าที่ลูกค้าประชาสัมพันธ์ :" ,133, 260, {align: 'left'})
    doc.text("(อาจมีค่าบริการทางไกล)" ,164, 265, {align: 'left'})

    doc.text("หมายเหตุ" ,15, 278, {align: 'left'})

    doc.text("วิธีชำระเงิน :",20, 212+1,  {align: 'left'})
    doc.text("ยอดเงิน :",70, 212+1 ,  {align: 'left'})

    //ans
    doc.text(bookingID  ,55, 13*4, {align: 'left'})
    doc.text(bookingReference  ,55, 13*5, {align: 'left'})
    doc.text(Client ,55, 13*6, {align: 'left'})
    doc.text(Customer_tel ,55, 13*7, {align: 'left'})
    

    doc.text(memberID ,55, 13*8, {align: 'left'})
    doc.text(Country ,55, 13*9, {align: 'left'})
    doc.text(Hotel ,55, 13*10, {align: 'left'})
    doc.text(Address1 ,55, 13*11, {align: 'left'})
    doc.text(Address2 ,55, 135, {align: 'left'})
    doc.text(Hotelcontact,55,13*12,{align:'left'})

    doc.text(Numberroom,168, 13*4+3, {align: 'center'})
    doc.text(Numberbeds ,168, 13*5+3, {align: 'center'})
    doc.text(Numberadults ,168, 13*6+3, {align: 'center'})
    doc.text(Numberchildren ,168, 13*7+3, {align: 'center'})
    doc.text(Breakfast ,168, 13*8+3, {align: 'center'})
    doc.text(Roomtype ,168, 13*9+3, {align: 'center'})
    doc.text(Pomotion ,168, 13*10+3, {align: 'center'})

    doc.text(Arrival ,50, 192, {align: 'center'})
    doc.text(Departure ,125, 192, {align: 'center'})
    doc.text(Playment,40, 212+1,  {align: 'left'})
    doc.text(Deposit,90, 212+1 ,  {align: 'left'})
    doc.text(Booked ,20, 235+2, {align: 'left'})

    doc.text(contact,174, 260, {align: 'left'})

    doc.text(Note ,15+20, 278, {align: 'left'})
  

    

    let src_pdf = doc.output('datauristring');
    const iframe = `<iframe width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>`
    const x = window.open();
    x.document.title = "preview booking"
    x.document.open();
    x.document.write(iframe);
    x.document.close();
    return true 
    }else{
         return false
    }
  
}

 // ใบแจ้งหนี้  // 
export const export_invoice_pdf =  ( room ,table_price) =>{

    let business_Address_1 = "119 ซอยสีม่วงอนุสรณ์ ถนน สุทธิสาร"
    let business_Address_2 = "แขวง ดินแดง เขต ดินแดง กรุงเทพ 10400"
    let Taxid = "0105536011803"
    let Phone = "026937005"
    let Email = "sales@primusthai.com" 

    let Vat = 7;
    let Name =  room && room.data && room.data.members && room.data.members.length > 0 
                     ? `${room.data.members[0].name}  ${room.data.members[0].lastname} ` : '--------'
    let Address1 = "........................................."   // ที่อยู่ ของผู้รับบิล
    let Address2 = "........................................."    // ที่อยู่ ของผู้รับบิล
    let No = room.id ? room.id : "---"
    let _Date =  formatDate(new Date())
    let HoneNo = room.name ? room.name : "------"
    let Month = "12/2021"

    let Grand = "144.00"
    let Backforward = "0.00"
   
    let Money  = "0.00"
    let credit = "  ...คนออกบิล... "
    let Time = toHHMMSS(new Date())
    let note = "เลขที่บัญชี 2878-xxxxxx-x"

    let table_prices = table_price ? table_price :[{ 
                    name:`----` ,
                    unit:"1",
                    price:`---`,
                    amount:`---`
                 }]
    let _total_price = 0

    table_prices.map(item => _total_price += (item && item.price ) ?  Number(item.price) : 0 )
    let Grandtotal = `${_total_price}`
    const names = table_prices.map(table_prices => table_prices.name);
    const Units = table_prices.map(table_prices => (table_prices.unit !== undefined   ) ?  `${table_prices.unit}`:'1' );
    const Price = table_prices.map(table_prices => `${table_prices.price}`);
    const Amount = table_prices.map(table_prices =>  `${Number(table_prices.price)*Number( (table_prices.unit !== undefined   ) ?  `${table_prices.unit}`:'1')}`  );

    const doc = new jsPDF('l', 'mm', [297, 210]);
   

    AddTH_font(doc ,'yourCustomFont.ttf' )
    doc.addFont('yourCustomFont.ttf', 'yourCustomFont', 'normal');
    doc.setFont('yourCustomFont');

    //bill box
    doc.setDrawColor(52, 192, 54)
    doc.setFillColor(52, 192, 54)
    doc.roundedRect(200, 8, 78, 13, 6, 6, 'FD')

    //main box
    doc.setDrawColor(70, 250, 100)
    doc.setFillColor(70, 250, 100)
    doc.rect(15,25,265,160 , 'FD')

    //address box
    doc.setDrawColor(155, 255, 168)
    doc.setFillColor(155, 255, 168)
    doc.roundedRect(17,27,173,46,6,6, 'FD')

    doc.roundedRect(193,27,38,10,6,6 , 'FD')
    doc.roundedRect(232,27,47,10,6,6 , 'FD')
    doc.roundedRect(193,39,38,10,6,6 , 'FD')
    doc.roundedRect(232,39,47,10,6,6 , 'FD')
    doc.roundedRect(193,51,38,10,6,6 , 'FD')
    doc.roundedRect(232,51,47,10,6,6 , 'FD')
    doc.roundedRect(193,63,38,10,6,6 , 'FD')
    doc.roundedRect(232,63,47,10,6,6 , 'FD')

    //topic box
    doc.setDrawColor(40, 120, 50)
    doc.setFillColor(40, 210, 60)
    doc.rect(17,75,138,15, 'FD' )
    doc.rect(155,75,38,15, 'FD' )
    doc.rect(193,75,38,15, 'FD' )
    doc.rect(231,75,46,15, 'FD' )

    doc.setDrawColor(40, 120, 50)
    doc.setFillColor(155, 255, 168)
    
    //result box
    doc.rect(17,90,138,60, 'FD' )
    doc.rect(155,90,38,60, 'FD' )
    doc.rect(193,90,38,60, 'FD' )
    doc.rect(231,90,46,60, 'FD' )

    //last box
    doc.setFillColor(255,255,255)
    doc.rect(17,152,138,31, 'FD' )
    doc.setFillColor(180,250,190)
    doc.rect(155,152,76,10, 'FD' )
    doc.rect(155,162,76,11, 'FD' )
    doc.rect(155,173,76,10, 'FD' )
    
    doc.rect(231,152,46,10, 'FD' )
    doc.rect(231,162,46,11, 'FD' )
    doc.rect(231,173,46,10, 'FD' )

    
    doc.setFontSize(16)
    doc.text(business_Address_1 ,15, 11, {align: 'left'})
    doc.setFontSize(14)
    doc.text(business_Address_2 ,15, 16, {align: 'left'})

    doc.setFontSize(14)
    doc.text("Tax ID : ",15, 21, {align: 'left'})
    doc.text(Taxid,27, 21, {align: 'left'})
    doc.text("โทร : ",52, 21, {align: 'left'})
    doc.text(Phone,60, 21, {align: 'left'})
    doc.text("Email :",82, 21, {align: 'left'})
    doc.text(Email,93, 21, {align: 'left'})

    doc.setFontSize(18)
    doc.text("ใบแจ้งค่าใช้จ่าย/DEBIT NOTE" ,210, 16, {align: 'left'})

    doc.setFontSize(14)
    doc.text("ชื่อ/Name :" ,20, 40, {align: 'left'})
    doc.setFontSize(16)
    doc.text(Name ,50, 40, {align: 'left'})
   
   
    doc.setFontSize(14)
    doc.text("ที่อยู่/Address :" ,20, 55, {align: 'left'})
    doc.setFontSize(16)
    doc.text(Address1 ,50, 55, {align: 'left'})
    doc.text(Address2 ,50, 60, {align: 'left'})

    doc.setFontSize(14)
    doc.text("เลขที่/No. " ,205, 33, {align: 'left'})
    doc.setFontSize(12)
    doc.text(No ,240, 33, {align: 'left'})
    doc.setFontSize(14)
    doc.text("วันที่/Date " ,205, 45, {align: 'left'})
    doc.setFontSize(16)
    doc.text(_Date ,245, 45, {align: 'left'})
    doc.setFontSize(14)
    doc.text("ประจำเดือน/Month " ,198, 57, {align: 'left'})
    doc.setFontSize(16)
    doc.text(Month ,245, 57, {align: 'left'})
    doc.setFontSize(14)
    doc.text("บ้านเลขที่/Home No. " ,198, 69, {align: 'left'})
    doc.setFontSize(16)
    doc.text(HoneNo ,245, 69, {align: 'left'})

    
    doc.setFontSize(16)
    doc.text("รายการ" ,73, 82, {align: 'left'})
    doc.text("Description" ,70, 86, {align: 'left'})
    
    doc.text("จำนวนหน่วย" ,163, 82, {align: 'left'})
    doc.text("Units" ,167, 86, {align: 'left'})
    
    doc.text("ราคาต่อหน่วย" ,202, 82, {align: 'left'})
    doc.text("Unit /Price" ,203 , 86, {align: 'left'})

    doc.text("จำนวนเงิน" ,246, 82, {align: 'left'})
    doc.text("Amount" ,247 , 86, {align: 'left'})


    doc.text("หมายเหตุ :" ,22, 160, {align: 'left'})
    doc.text(note ,40, 160, {align: 'left'})
    doc.text(`รวมทั้งหมด/Total` ,168, 160, {align: 'left'})
    doc.text(Grandtotal ,250, 160, {align: 'center'})

    doc.text(`Vat  ${Vat} %` ,168 , 170, {align: 'left'})
    doc.text( `${ Number(Grandtotal*(Vat/100)).toFixed(2) }` ,250 , 170, {align: 'center'})

    doc.text("รวมเงินทั้งสิ้น/Grand Total" ,168 , 181, {align: 'left'})
    doc.text( `${ (Grandtotal *(1+ (Vat/100)) ).toFixed(2) }`  ,250 , 181, {align: 'center'})

    doc.setFontSize(20)
    doc.text("เงินฝากสำรองคงเหลือ :" ,220 , 192, {align: 'left'})
    doc.text(Money,270 , 192, {align: 'left'})
    doc.setFontSize(14)
    doc.text("เขียนโดย" ,200 , 198, {align: 'left'})
    doc.text(credit,215 , 198, {align: 'left'})
    doc.text("วันที่" ,240 , 198, {align: 'left'})
    doc.text(_Date ,248 , 198, {align: 'left'})
    doc.text(Time ,268 , 198, {align: 'left'})

    doc.setFontSize(16)
    doc.text(names ,20, 95, {align: 'left'})
    doc.text(Units ,170, 95, {align: 'left'})
    doc.text(Price ,210, 95, {align: 'left'})
    doc.text(Amount ,250, 95, {align: 'left'})

    let src_pdf = doc.output('datauristring');

    const iframe = `<iframe width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>`
    const x = window.open();
    x.document.title = "preview booking"
    x.document.open();
    x.document.write(iframe);
    x.document.close();



}

 // ใบเสร็จ  //
export const export_Receipt_pdf =  ( booking , type  ) =>{
 
    let Noanswer = "-"
    let business_Address_1 = "119 ซอยสีม่วงอนุสรณ์ ถนน สุทธิสาร"
    let business_Address_2 = "แขวง ดินแดง เขต ดินแดง กรุงเทพ 10400"
    let Taxid = "0105536011803"
    let Phone = "026937005"
    let Email = "sales@primusthai.com" 

    let Name = booking.customer_name  ?  `${booking.customer_name} ${booking.customer_lastname}`  : Noanswer 
    let Address1 = "-----------------" /// ที่อยู่ ผู้รับใบเสร็จ 
    let Address2 = "-----------------"
    let No = booking.id ? booking.id : Noanswer
    let _Date =  formatDate(new Date())
    let HoneNo = booking.Room ? booking.Room.name :Noanswer
    let Room = "........."
   

    
  
    let Money  = "0.00"
    let credit = "  ...คนออกบิล... "
    let Time = toHHMMSS(new Date())
    let table_prices = []
    if(type === 'booking')
    {
        table_prices = [{ 
                    name:`เงินจองห้อง ${booking.Room.name}` ,
                    unit:"1",
                    price:booking.deposit,
                    amount:booking.deposit
                 }]
    }
    else if( type  === 'checkin' )
    {

    }
    else if( type === 'checkout' )
    {

    }
    let _total_price = 0
    table_prices.map(item => _total_price += (item && item.price ) ?  Number(item.price) : 0 )
    let Grandtotal = `${_total_price}`
    const names = table_prices.map(table_prices => table_prices.name);
    const Units = table_prices.map(table_prices => table_prices.unit);
    const Price = table_prices.map(table_prices => table_prices.price);
    const Amount = table_prices.map(table_prices => table_prices.amount);

    const doc = new jsPDF('l', 'mm', [297, 210]);
   

    AddTH_font(doc ,'yourCustomFont.ttf' )
    doc.addFont('yourCustomFont.ttf', 'yourCustomFont', 'normal');
    doc.setFont('yourCustomFont');

    //bill box
    doc.setDrawColor(0, 102, 205)
    doc.setFillColor(0, 102, 205)
    doc.roundedRect(195, 8, 78, 17, 2, 2, 'FD')
    doc.setDrawColor(0, 102, 205)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(195, 27, 78, 10, 2, 2, 'FD')
    doc.roundedRect(195, 39, 78, 10, 2, 2, 'FD')
    doc.roundedRect(195, 51, 78, 10, 2, 2, 'FD')
    doc.roundedRect(195, 63, 78, 10, 2, 2, 'FD')
    


    //address box
    doc.setDrawColor(0, 102, 205)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(17,27,176,46,6,6, 'FD')

    

    //topic box
    doc.setDrawColor(60, 50, 170)
    doc.setFillColor(0, 102, 205)
    doc.rect(17,75,138,15, 'FD' )
    doc.rect(155,75,38,15, 'FD' )
    doc.rect(193,75,38,15, 'FD' )
    doc.rect(231,75,46,15, 'FD' )

    
    //result box
    doc.setDrawColor(60, 50, 170)
    doc.setFillColor(255, 255, 255)
    doc.rect(17,90,138,60, 'FD' )
    doc.rect(155,90,38,60, 'FD' )
    doc.rect(193,90,38,60, 'FD' )
    doc.rect(231,90,46,60, 'FD' )

    //last box
    doc.setFillColor(200,230,255)
    doc.rect(17,152,214,31, 'FD' )
    doc.rect(231,152,46,31, 'FD' )

    doc.setDrawColor(60, 50, 170)
    doc.rect(40,156,5,5, 'FD' )
    doc.rect(72,156,5,5, 'FD' )
    doc.rect(40,165,5,5, 'FD' )
    
    doc.setFontSize(14)
    doc.text("เงินสด" ,47, 157, {align: 'left'})
    doc.text("Cash" ,47, 161, {align: 'left'})
    doc.text("อื่นๆ .........................................................................." ,79, 157, {align: 'left'})
    doc.text("Other" ,79, 161, {align: 'left'})
    doc.text("เช็คธนาคาร/สาขา ............................................................................................" ,47, 169, {align: 'left'})
    doc.text("Cheque Bank/Branch" ,47, 173, {align: 'left'})
    doc.text("เลขที่เช็ค ............................................ลงวันที่..................................................." ,47, 177, {align: 'left'})
    
    doc.text("Cash No. ",47, 181, {align: 'left'})
   
    doc.text("Date ",95, 181, {align: 'left'})

    doc.setFontSize(16)
    doc.text( business_Address_1 ,17, 11, {align: 'left'})
    doc.setFontSize(14)
    doc.text( business_Address_2 ,17, 16, {align: 'left'})

    doc.setFontSize(14)
    doc.text("Tax ID : ",17, 21, {align: 'left'})
    doc.text(Taxid,29, 21, {align: 'left'})
    doc.text("โทร : ",54, 21, {align: 'left'})
    doc.text(Phone,62, 21, {align: 'left'})
    doc.text("Email :",84, 21, {align: 'left'})
    doc.text(Email,95, 21, {align: 'left'})

    doc.setFontSize(18)
    doc.text("ต้นฉบับใบเสร็จรับเงิน/ORIGINAL RECEIPT" ,198, 18, {align: 'left'})

    doc.setFontSize(16)
    doc.text("ชื่อ/Name :" ,20, 40, {align: 'left'})
    doc.setFontSize(16)
    doc.text(Name ,50, 40, {align: 'left'})
   
   
    doc.setFontSize(14)
    doc.text("ที่อยู่/Address :" ,20, 55, {align: 'left'})
    doc.setFontSize(16)
    doc.text(Address1 ,50, 55, {align: 'left'})
    doc.text(Address2 ,50, 60, {align: 'left'})

    doc.setFontSize(14)
    doc.text("เลขที่/No. " ,202, 33, {align: 'left'})
    doc.setFontSize(13)
    doc.text(No ,230, 33, {align: 'left'})
    doc.setFontSize(14)
    doc.text("วันที่/Date " ,202, 45, {align: 'left'})
    doc.setFontSize(16)
    doc.text(_Date ,238, 45, {align: 'left'})
    doc.setFontSize(14)
    doc.text("เลขที่ชุดห้อง/Room" ,202, 57, {align: 'left'})
    doc.setFontSize(16)
    doc.text(Room ,238, 57, {align: 'left'})
    doc.setFontSize(14)
    doc.text("บ้านเลขที่/Home No. " ,202, 69, {align: 'left'})
    doc.setFontSize(16)
    doc.text(HoneNo ,238 , 69, {align: 'left'})

    
    doc.setFontSize(16)
    doc.text("รายการ" ,73, 82, {align: 'left'})
    doc.text("Description" ,70, 86, {align: 'left'})
    
    doc.text("จำนวนหน่วย" ,163, 82, {align: 'left'})
    doc.text("Units" ,167, 86, {align: 'left'})
    
    doc.text("ราคาต่อหน่วย" ,202, 82, {align: 'left'})
    doc.text("Unit /Price" ,203 , 86, {align: 'left'})

    doc.text("จำนวนเงิน" ,246, 82, {align: 'left'})
    doc.text("Amount" ,247 , 86, {align: 'left'})

    doc.setFontSize(14)
    doc.text("หมายเหตุ กรณีชำระโดยเช็ค ใบเสร็จรับเงินนี้ จะสมบูรณ์เมื่อได้เรียกเก็บเงินตามเช็คแล้ว" ,17, 188, {align: 'left'})
    doc.setFontSize(16)
    doc.text("ชำระโดย" ,22, 160, {align: 'left'})
    

    doc.text("รวมเงินทั้งสิ้น/Grand Total" ,168 , 181, {align: 'left'})
    doc.text(Grandtotal ,250 , 181, {align: 'left'})

    doc.text(".................................................................................." ,50, 199, {align: 'left'})
    doc.text("ผู้รับเงิน/Collector" ,70 , 205, {align: 'left'})


    doc.text(".................................................................................." ,156 , 199, {align: 'left'})
    doc.text("ผู้มีอำนาจลงนาม/Authorized" ,168 , 205, {align: 'left'})


    doc.setFontSize(16)
    doc.text(names ,20, 95, {align: 'left'})
    doc.text(Units ,170, 95, {align: 'left'})
    doc.text(Price ,210, 95, {align: 'left'})
    doc.text(Amount ,250, 95, {align: 'left'})

    let src_pdf = doc.output('datauristring');

    const iframe = `<iframe width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>`
    const x = window.open();
    x.document.title = "preview booking"
    x.document.open();
    x.document.write(iframe);
    x.document.close();



}