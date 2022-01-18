


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
    let Customer_address = booking.customer_address ?  booking.customer_tel : Noanswer
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

export const export_Contract = (contract ) =>{

    
    let location = "213ข.6 หมูบ้านรมรื่น ถนนราชพฤกษ์ ข.28 แขวงตลิ่งชัน เขตตลิ่งชัน"
    let date = "12/12/2564"
    let between = "10/11/2564 - 10/12/2564"

    let No = "444/96"
    let district = "ดินแดง"
    let boundary = "ดินแดง"
    let province = "กรุงเทพมหานคร"
    let name = "xxxxxxxxxxx   xxxxxxxxxxxxxxx"

    let No2 = "444/96"
    let district2 = "ดินแดง"
    let boundary2 = "ดินแดง"
    let province2 = "กรุงเทพมหานคร"

    let Number_room = "4444"
    let floor_room = "2"
    let location_room = "213ข.6 หมูบ้านรมรื่น ถนนราชพฤกษ์ ข.28 แขวงตลิ่งชัน เขตตลิ่งชัน"
    let district3 = "ดินแดง"
    let boundary3 = "ดินแดง"
    let province3 = "กรุงเทพมหานคร"
    let price_room = "134564"
    let text_price = "หนึ่งแสนสองหมื่นสามพันสี่ร้อยห้าสับหกบาท"

    let result_date = "5"
    let start_rent = "12/12/2555"
    let end_rent = "12/12/2555"
    let round_rent = "12/12/2555"
    let Electricity_bill = "1234"
    let Water_bill = "1234"
    let Phone_bill = "1234"

    let deposit = "12345"
    let text_price2 = "หนึ่งแสนสองหมื่นสามพันสี่ร้อยห้าสับหกบาท"

    let price_rent = "1234567"
    let text_price3 = "หนึ่งแสนสองหมื่นสามพันสี่ร้อยห้าสับหกบาท"
    



    const doc = new jsPDF('mm','mm',[210,297]);

    
    AddTH_font(doc ,'yourCustomFont.ttf' )
    doc.addFont('yourCustomFont.ttf', 'yourCustomFont', 'normal');
    doc.setFont('yourCustomFont');


    //header
    doc.setFontSize(16)
    doc.text("แบบฟอร์มสัญญา เมื่อกดพิมพ์" ,5, 5, {align: 'left'})
    doc.setFontSize(18)
    doc.setTextColor(255, 0, 0)
    doc.text("สัญญา :" ,15, 17, {align: 'left'})
    doc.setFontSize(18)
    doc.setTextColor(0, 0, 0)
    doc.text("ข้อมูลจะถูกดึงมาจากขั้นตอน ย้ายเข้า และ ข้อมูลห้องพัก" ,30, 17, {align: 'left'})
    
    doc.setFontSize(18)
    doc.setTextColor(0, 0, 0)
    doc.text("สัญญาเข้าห้องพักอาศัย" ,100, 35, {align: 'center'})
    doc.setFontSize(15)

    //body
    doc.text("สัญญานี้ทำขึ้นที่" ,25, 55)
    doc.text(location ,49, 55)
    doc.text("เมื่อวันที่" ,146, 55)
    doc.text(date ,161, 55)
    doc.text("ระหว่าง" ,10, 63)
    doc.text(between ,23, 63)
    doc.text("อยู่บ้านเลขที่" ,65, 63)
    doc.text(No ,85, 63)
    doc.text("ตำบล/แขวง" ,98, 63)
    doc.text(district ,118, 63)
    doc.text("อำเภอ/เขต" ,130, 63)
    doc.text(boundary ,148, 63)
    doc.text("จังหวัด" ,10, 71)
    doc.text(province ,22, 71)
    doc.text("ซึ่งต่อไปในสัญญานี้จะเรียกว่า ผู้ให้เช่า ฝ่ายหนึ่งกับ",50, 71)
    doc.text(name,120, 71)
    doc.text("อยู่บ้านเลขที่",10, 79)
    doc.text(No2,29, 79)
    doc.text("ตำบล/แขวง",42, 79)
    doc.text(district2 ,62, 79)
    doc.text("อำเภอ/เขต" ,74, 79)
    doc.text(boundary2 ,92, 79)
    doc.text("จังหวัด" ,105, 79)
    doc.text(province2 ,117, 79)
    doc.text("ซึ่งต่อไปในสัญญานี้จะเรียกว่า ผู้เช่า",143, 79)
    doc.text("อีกฝ่ายหนึ่ง",10, 87)
    doc.text("ทั้งสองฝั่งตกลงทำสัญญากันโดยมีข้อความดังต่อไปนี้",25, 95)
    doc.text("ข้อ ๑ ผู้ให้เช่าตกลงเช่าและผู้ให้เช่าตกลงให้เช่าห้องพักอาศัยห้องเลขที่",25, 103)
    doc.text(Number_room ,125, 103)
    doc.text("ชั้นที่",10, 111)
    doc.text(floor_room,20, 111)
    doc.text("ของ (ระบุชื่อของอพาร์ทเม้นท์) ซึ่งตั้งอยู่ที่",27, 111)
    doc.text(location_room,86, 111)
    doc.text("ตำบล/แขวง",10, 119)
    doc.text(district3 ,30, 119)
    doc.text("อำเภอ/เขต" ,42, 119)
    doc.text(boundary3 ,60, 119)
    doc.text("จังหวัด" ,73, 119)
    doc.text(province3 ,85, 119)
    doc.text("เพื่อให้เป็นที่พักอาศัย ในอัตราค่าเช่าเดือนละ" ,110, 119)
    doc.text(price_room ,10, 127)
    doc.text("บาท" ,23, 127)
    doc.text("(" ,30, 127)
    doc.text(text_price,32,127)
    doc.text(")" ,95, 127)
    doc.text("ส่วนนี้ไม่รวมค่าไฟฟ้า" ,97, 127)
    doc.text("ค่าน้ำประปา ค่าน้ำโทรศัพท์ ซึ่งผู้เช่าต้องชำระให้แก่ผู้ให้เช่าตามอัพตราที่กำหนดไว้ในสัญญาข้อที่ ๑" ,10, 135)
    doc.text("ข้อ ๒ ผู้เช้าต้องเช่าห้องพักตามสัญญาข้อที่ ๑ กำหนดเวลา",25, 143)
    doc.text(result_date,105,143)
    doc.text("ปี",110, 143)
    doc.text("นับตั้งแต่วันที่",115, 143)
    doc.text(start_rent,135,143)
    doc.text("ถึงวันที่",155, 143)
    doc.text(end_rent,166,143)
    doc.text("ข้อ ๓ การชำระค่าเช่า ผู้เช่าควชำระค่าเช่าให้แก่ผู้เช่าเป็นการล่วงหน้า โดยชำระภายในวันที่",25, 151)
    doc.text(round_rent,150,151)
    doc.text("ของทุกเดือน",170, 151)
    doc.text("ตลอดอายุการเช่า",10, 159)
    doc.text("ข้อ ๔ ผู้ให้เช่าคิดค่าไฟฟ้า ค่าน้ำประปา ค่าโทรศัพท์ในราคาดังนี้",25, 167)
    doc.text(" {๑} ค่าไฟฟ้ายูนิตละ",35, 175)
    doc.text(Electricity_bill,70,175)
    doc.text("บาท" ,100, 175)
    doc.text(" {๒} ค่าน้ำประปาลูกบาศก์เมตรละ",35, 183)
    doc.text(Water_bill,95,183)
    doc.text("บาท" ,120, 183)
    doc.text(" {๓} ค่าโทรศัพท์(โทร ออก)ครั้งละ",35, 191)
    doc.text(Phone_bill,95,191)
    doc.text("บาท" ,120, 191)
    doc.text("ข้อ ๕ ผู้เช่าต้องชำระค่าไฟฟ้า ค่าน้ำ ค่าโทศัพท์ตามจำนวนหน่วยที่ใช้ในแต่ละเดือนและต้องชำระก่อนชำระค่าเช่าเดือนถัดไป",25, 199)
    
    doc.text("ข้อ ๖ เพื่อเป็นการปฏิบัติตามสัญญาเช่า ผู้เช่าต้องมอบเงินประกันให้แก่ผู้เช้าเป็นจำนวน",25, 207)
    doc.text(deposit,150,207)
    doc.text("บาท" ,176, 207)   
    doc.text("(" ,10, 215) 
    doc.text(text_price2 ,12, 215) 
    doc.text(")" ,75, 215)
    doc.text("เงินประกันนี้จะคือให้แก่ผู้เช่าเมื่อผู้เช่ามิได้ ผิดสัญญาและมิได้ค้างชำระเงินต่างๆตามสัญญานี้" ,77, 215)
    doc.text("ข้อ ๗ ผู้เช่าต้องเป็นนชำระเงินค่าเช่าเดือนละ",25, 223)
    doc.text(price_rent,90, 223)
    doc.text("บาท",105, 223)
    doc.text("(" ,112, 223) 
    doc.text(text_price3 ,114, 223) 
    doc.text(")" ,179, 223)
    doc.text("ข้อ ๘ ผู้เช่าต้องเป็นผู้ดูแลรักษาความสะอาดบริเวณส่วนกลางหน้าที่ของเป็นหน้าที่ของผู้เช่าและผู้เช่าต้องไม่นำของใดๆ",25, 231)
    doc.text("ไปวางบริเวณทางเดินดังกล่าว",10, 239)
    doc.text("ข้อ ๙ ผู้เช่าต้องดูแลห้องพักอาศัยและทรพท์สินต่างๆ ในห้องดังกล่างเหมือนเป็นทรพท์สินของตัวเอง และต้องรักษาความสะอาด",25, 247)
    doc.text("ความเรียบร้อยไม่ก่อให้เกิดควมเดือนร้อนรำคาญแก่ผู้ห้องพักอาศัยข้างเคียง",10, 255)
    doc.text("ข้อ ๑๐ ผู้เช่าต้องเป็นผู้รับผิดชอบในบรรดาความสูญหาย เสียหาย หรือบุบสลายอย่างใดๆ อันเกิดแก่ห้องพักอาศัยและทรัพท์สิน",25, 263)
    doc.text("ต่างๆ ในห้องดังกล่าว",10, 271)


    doc.addPage()

    doc.text("ข้อ ๑๑ ผู้เช่าต้องมอบให้ผู้ให้เช่า หรือตัวแทนของผู้ให้เช่าเข้าตรวจห้องพักอาศัยเป็นครั้งราวในระยะเวลาอันสมควร",25, 20)
    doc.text("ข้อ ๑๒ ผู้เช่าต้องไม่ทำการดัดแปลง ต่อเติม หรือรื้อถอนห้องพักอาศัยและทรัพท์สินต่างๆ ในห้องพักดังกล่าวไม่ว่าทั้งหมด",25, 28)
    doc.text("หรือบางส่วนหากฝ่าฝืนให้ผู้เช่าเรียกให้ผู้เช่าทำทรัพท์สินดังกล่าวให้อยู่ในสภาพเดิม และเรียกให้ผู้เช่าใช้ค่าเสียหายอันเกิดความสูยเสีย ",10, 36)
    doc.text("สูญหาย หรือบุบสบายใดๆ อันเนื่องจากการดัดแปลงต่อเติม หรือรื้อถอนดังกล่าว ",10, 44)
    doc.text("ข้อ ๑๓ ให้ผู้เช่าต้องไม่นำบุคคลอื่นนอกจากบุคคลในครอบครัวของผู้เช่าเข้าพักอาศัย",25, 52)
    doc.text("ข้อ ๑๔ ผู้เช่าสัญญาว่าจะปฏิบัติตนตามระเบียบข้อบังคับของอพาร์ทเม้นท์ด้วยสัญญานี้ ซึ่งคู่สัญญาทั้งสองฝ่ายให้ถือระเบียบ",25, 60)
    doc.text("ข้อบังตับดังกล่าวเป็นส่วนหนึ่งของสัญญานี้ด้วย ผู้เช่าระเมิดแล้วผู้ให้เช่าย่อมให้สิทธิตามข้อ ๑๗ และข้อ ๑๘ แห่งสัญญานี้",10, 68)
    doc.text("ข้อ ๑๕ ผู้ให้เช่าไม่ต้องรับผิดชอบในความสูญหายหรือสูญเสียอย่างใดๆในรถยนต์ รวมทั้งทรัพย์สินต่างๆในรถยนต์ของผู้เช่า",25, 76)
    doc.text("จึงได้นำมาบอกไว้ในที่จอดรถที่ทางผู้เช่าได้จัดไว้ให้",10, 84)
    doc.text("ข้อ ๑๖ ผู้เช่าตกลงว่าการผิดสัญญาเช่าเครื่องเรือนซึ่งผู้เช่าได้ทำไว้กับผู้ให้เช่าต่างหากจากสัญญานี้ ถือเป็นการผิดสัญญานี้ด้วย",25, 92)
    doc.text("และโดยนัยเดียวกัน การผิดสัญญานี้ย่อมถือว่าเป็นการผิดต่อสัญญาเช่าเครื่องเรือนด้วยย",10, 100)
    doc.text("ข้อ ๑๗ หาผู้เช่าประพฤติผิดสัญญาข้อหนึ่งข้อใด หรือหลายข้อก็ด้วย ผู้เช่าตกลงให้ผู้ให้เช่าใช้สิทธิดังต่อไปนี้ ข้อใดข้อหนึ่งหรือ ",25, 108)
    doc.text("หลายข้อ รวมกันก็ได้คือ",10, 116)
    doc.text(" {๑} บอกเลิกสัญญาเช่า",35, 124)
    doc.text(" {๒} เรียกค่าเสียหาย",35, 132)
    doc.text(" {๓} บอกกล่าวให้ผู้เช่าปฏิบัติตามข้อกำหนดในสัญญาภายในกำหนดเวลาที่ผู้ให้เช่าเห็นควร",35, 140)
    doc.text(" {๔} ตัดกระแสไฟฟ้า,น้ำประปา และค่าโทรศัพท์ได้ทันทีโดยไม่ต้องบอกล่วงหน้าแก่ผู้เช่า",35, 148)
    doc.text("ข้อ ๑๘ ในกรณีที่สัญญาให้เช่าระงับสิ้นลง ไม่ว่าด้วยเหตุใดๆก็ตามผู้เช่าต้องส่งมอบห้องพักอาศัยคืนให้แก่ผู้ให้เช่าทันที ",25, 156)
    doc.text(" หากผู้เช่าไม่ปฏิบัติ ผู้ให้เช่ามีสิทธิเข้าครอบครองห้องพักอาศัยที่ให้เช่าและขนย้ายบุคคลและศรัพย์สินของผู้เช่าออกจากห้องพักดังกล่าวได้",10, 164)
    doc.text("โดยผ้เช่าเป็นผู้รับผิดชอบในความสูญเสียหรือความเสียหายอย่างใดๆอันเกิดขึ้นแก่ทรัพย์สินของผู้เช่า ทั้งนี้ผู้ให้เช่ามีสิทธิริบเงินประกัน",10, 172)
    doc.text("การเช่าตามที่ระบุไว้ในสัญญาข้อ ๒ ได้ด้วย",10, 180)
    doc.text("ข้อ ๑๙ ในวันทำสัญญานี้ ผู้เช่าได้ตรวจสอบห้องพักอาศัยที่เช่าตลอดจนทรัพย์สินต่างๆ ในห้องพักดังกล่าว",25, 188)
    doc.text("แล้วเห็นว่ามีสภาพปกติทุกประการ และผู้ให้เช่าได้ส่งมอบห้องพักและทรัพย์สินต่างๆ ในห้องพักแก่ผู้เช่าแล้ว",10, 196)
    doc.text("คู่สัญญานี้ได้อ่านและเข้าใจข้อความในสัญญานี้โดยตลอดแล้วเห็นว่าถูกต้องจึงได้ขอลายมือชื่อไว้เป็นสำคัญต่อหน้าพยาน",20, 204)
    doc.text("ลงชื่อ.................................................ผู้เช่า",100, 215 ,{align: 'center'})
    doc.text("(.................................................)",100, 223 ,{align: 'center'})
    doc.text("ลงชื่อ.................................................ผู้ให้เช่า",100, 231 ,{align: 'center'})
    doc.text("(.................................................)",100, 239 ,{align: 'center'})
    doc.text("ลงชื่อ.................................................พยาน",100, 247 ,{align: 'center'})
    doc.text("(................................................)",100, 255 ,{align: 'center'})
    doc.text("ลงชื่อ.................................................พยาน",100, 263 ,{align: 'center'})
    doc.text("(.................................................)",100, 271 ,{align: 'center'})





    





    let src_pdf = doc.output('datauristring');
    const iframe = `<iframe width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>`
    const x = window.open();
    x.document.title = "preview booking"
    x.document.open();
    x.document.write(iframe);
    x.document.close();

}
 // ใบแจ้งหนี้  // 
export const export_Invoice_pdf =  ( room ,table_price) =>{

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
    let No =  ( room && room.data  &&  room.data.id )  ? room.data.id : "---"
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
    
    if(booking  === undefined){
        alert('ไม่มีข้อมูลในการสร้าง ใบเสร็จ')
        return
    }
      let table_prices = []
    if(type === 'booking')
    {
        table_prices = [{ 
                    name:`เงินจองห้อง ${booking.Room.name}` ,
                    unit:"1",
                    price:booking.deposit ? booking.deposit:"0",
                    amount:booking.deposit ? booking.deposit:"0"
                 }]
    }
    else if( type  === 'checkin' )
    {

    }
    else if( type === 'checkout' )
    {

    }
    let Noanswer = "-"
    let business_Address_1 = "119 ซอยสีม่วงอนุสรณ์ ถนน สุทธิสาร"
    let business_Address_2 = "แขวง ดินแดง เขต ดินแดง กรุงเทพ 10400"
    let Taxid = "0105536011803"
    let Phone = "026937005"
    let Email = "sales@primusthai.com" 
    console.log('export_Receipt_pdf',booking)
    let Name = booking.customer_name  ?  `${booking.customer_name} ${booking.customer_lastname}`  : Noanswer 
    let Address1 = booking && booking.customer_address ?  booking.customer_address  : "-----------------" /// ที่อยู่ ผู้รับใบเสร็จ 
    let Address2 = "-----------------"
    let No = booking.id ? booking.id : Noanswer
    let _Date =  formatDate(new Date())
    let HoneNo = booking.Room &&  booking.Room.floor && booking.Room.floor.building && booking.Room.floor.building.name ? booking.Room.floor.building.name :Noanswer
    let Room = booking.Room && booking.Room.name ? booking.Room.name :Noanswer
    let Money  = "0.00"
    let credit = "  ...คนออกบิล... "
    let Time = toHHMMSS(new Date())
  
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


export const export_Reimbursement_pdf =  ( booking , type  ) =>{
    
    if(booking  === undefined){
        alert('ไม่มีข้อมูลในการสร้าง ใบเสร็จ')
        return
    }
      let table_prices = []
    if(type === 'booking')
    {
        table_prices = [{ 
                    name:`เงินจองห้อง ${booking.Room.name}` ,
                    unit:"1",
                    price:booking.deposit ? booking.deposit:"0",
                    amount:booking.deposit ? booking.deposit:"0"
                 }]
    }
    else if( type  === 'checkin' )
    {

    }
    else if( type === 'checkout' )
    {

    }
    let Noanswer = "-"
    let business_Address_1 = "119 ซอยสีม่วงอนุสรณ์ ถนน สุทธิสาร"
    let business_Address_2 = "แขวง ดินแดง เขต ดินแดง กรุงเทพ 10400"
    let Taxid = "0105536011803"
    let Phone = "026937005"
    let Email = "sales@primusthai.com" 
    console.log('export_Receipt_pdf',booking)
    let Name = booking.customer_name  ?  `${booking.customer_name} ${booking.customer_lastname}`  : Noanswer 
    let Address1 = booking && booking.customer_address ?  booking.customer_address  : "-----------------" /// ที่อยู่ ผู้รับใบเสร็จ 
    let Address2 = "-----------------"
    let No = booking.id ? booking.id : Noanswer
    let _Date =  formatDate(new Date())
    let HoneNo = booking.Room &&  booking.Room.floor && booking.Room.floor.building && booking.Room.floor.building.name ? booking.Room.floor.building.name :Noanswer
    let Room = booking.Room && booking.Room.name ? booking.Room.name :Noanswer
    let Money  = "0.00"
    let credit = "  ...คนออกบิล... "
    let Time = toHHMMSS(new Date())
  
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
    doc.setDrawColor(186,85,211)
    doc.setFillColor(186,85,211)
    doc.roundedRect(195, 8, 78, 17, 2, 2, 'FD')
    doc.setDrawColor(186,85,211)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(195, 27, 78, 10, 2, 2, 'FD')
    doc.roundedRect(195, 39, 78, 10, 2, 2, 'FD')
    doc.roundedRect(195, 51, 78, 10, 2, 2, 'FD')
    doc.roundedRect(195, 63, 78, 10, 2, 2, 'FD')
    


    //address box
    doc.setDrawColor(186,85,211)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(17,27,176,46,6,6, 'FD')

    

    //topic box
    doc.setDrawColor(138,43,226)
    doc.setFillColor(186,85,211)
    doc.rect(17,75,138,15, 'FD' )
    doc.rect(155,75,38,15, 'FD' )
    doc.rect(193,75,38,15, 'FD' )
    doc.rect(231,75,46,15, 'FD' )

    
    //result box
    doc.setDrawColor(138,43,226)
    doc.setFillColor(255, 255, 255)
    doc.rect(17,90,138,60, 'FD' )
    doc.rect(155,90,38,60, 'FD' )
    doc.rect(193,90,38,60, 'FD' )
    doc.rect(231,90,46,60, 'FD' )

    //last box
    doc.setFillColor(238,130,238)
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

    doc.setFontSize(15)
    doc.text("ต้นฉบับใบเสร็จคืนเงิน/ORIGINAL REIMBURSEMENT" ,196, 18, {align: 'left'})

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

export const export_taxinvoice_pdf = () =>{
    
}