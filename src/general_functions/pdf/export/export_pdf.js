
const { jsPDF } = require('jspdf')
const { AddTH_font } = require('../AddFont/AddFont.js')
const { formatDate, toHHMMSS, } = require('../../convert.js')

const { calculate_price , calculate_Amount  } = require('./functions')




export const export_booking_pdf = (booking, owner, customer_details) => {
    const document_name = 'ใบจอง'
    if (booking) {
        console.log("Export booking ", booking)

        let Noanswer = "-"
        let bookingID = booking.id ? booking.id : Noanswer;
        let bookingReference = booking.booking_number ? booking.booking_number : Noanswer;
        let Client = booking.customer_name ? `${booking.customer_name} ${booking.customer_lastname}` : Noanswer
        let Customer_tel = booking.customer_tel ? booking.customer_tel : Noanswer
        // let Customer_address = booking.customer_address ? booking.customer_address : Noanswer
        let memberID = Noanswer
        let Country = Noanswer

        /** Hotel infomation  */
        let Hotel = Noanswer
        let Address1 = "262 Moo 2 , "
        let Address2 = " Leela valley village"
        let Hotelcontact = "+667569577"

        // let Numberroom = "1"
        // let Numberbeds = Noanswer
        // let Numberadults = Noanswer
        // let Numberchildren = Noanswer
        // let Breakfast = Noanswer
        // let Roomtype = booking.Room.RoomType.name
        // let Pomotion = "-"
        let Arrival = booking.checkin_date ? formatDate(new Date(Number(booking.checkin_date))) : Noanswer;
        let Departure = booking.checkin_date_exp ? formatDate(new Date(Number(booking.checkin_date_exp))) : Noanswer;

        let Playment = booking.payment_method ? booking.payment_method : Noanswer;
        let Deposit = booking.deposit ? booking.deposit : Noanswer;
        let Booked = "..................................................................................."   // account of create
        let contact = "+66 ---------"
        let Note = booking.note ? booking.note : "---- "



        Client = Client ? Client : Noanswer;
        memberID = memberID ? memberID : Noanswer;
        Country = Country ? Country : Noanswer;
        Hotel = Hotel ? Hotel : Noanswer;
        Address1 = Address1 ? Address1 : Noanswer;
        Address2 = Address2 ? Address2 : Noanswer;
        Hotelcontact = Hotelcontact ? Hotelcontact : Noanswer;

        // Numberroom = booking && booking.Room && booking.Room.name ? booking.Room.name : Noanswer;
        // Numberbeds = Numberbeds ? Numberbeds : Noanswer;
        // Numberchildren = Numberchildren ? Numberchildren : Noanswer;
        // Numberadults = Numberadults ? Numberadults : Noanswer;
        // Breakfast = Breakfast ? Breakfast : Noanswer;
        // Roomtype = Roomtype ? Roomtype : Noanswer;
        // Pomotion = Pomotion ? Pomotion : Noanswer;




        Playment = Playment ? Playment : Noanswer;

        Booked = Booked ? Booked : Noanswer;
        contact = contact ? contact : Noanswer;






        const doc = new jsPDF('p', 'mm', [250, 210]);
        // let pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        let pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
        try {
            const img = new Image()
            img.src = 'image/logo.png'
            doc.addImage(img, 'png', 15, 10, 24, 24)
        } catch (e) {
            alert('Loading image error ')
        }

        AddTH_font(doc, 'yourCustomFont.ttf')
        doc.addFont('yourCustomFont.ttf', 'yourCustomFont', 'normal');
        doc.setFont('yourCustomFont');

        doc.setFontSize(24)
        doc.text("ใบยืนยันการจอง", pageWidth / 2, 24, { align: 'center' })


        //กล่องใต้หัวข้อ
        doc.setDrawColor(52, 192, 94)
        doc.rect(15, 35, pageWidth - 25, 8)

        //ลายเซ็น
        doc.setDrawColor(52, 192, 94)
        doc.setFillColor(255, 255, 255)
        doc.roundedRect(15, 143, pageWidth - 25, 65, 3, 3, 'FD')

        doc.setDrawColor(0)
        doc.rect(130, 189, pageWidth - 143, 15)

        //เช็คอิน
        doc.setDrawColor(0)
        doc.setFillColor(221, 221, 221)
        doc.rect(30, 148, pageWidth - 163, 10, 'FD')
        doc.setDrawColor(0)
        doc.setFillColor(221, 221, 221)
        doc.rect(103, 148, pageWidth - 163, 10, 'FD')
        //รายการที่ต้องชำระ รายละเอียดการชำระเงิน
        doc.setDrawColor(0)
        doc.setFillColor(221, 221, 221)
        doc.rect(17, 170, pageWidth - 163, 8, 'FD')
        doc.setDrawColor(0)
        doc.setFillColor(221, 221, 221)
        doc.rect(67, 170, pageWidth - 143, 8, 'FD')
        // doc.setDrawColor(0)
        // doc.setFillColor(221, 221, 221)
        // doc.rect(137, 208, pageWidth-150,8 , 'FD')

        //จองและชำระ
        doc.setDrawColor(0)
        doc.setFillColor(221, 221, 221)
        doc.rect(17, 189, pageWidth - 98, 15, 'FD')

        doc.setLineWidth(0.2)
        doc.line(15, 232, 200, 232)




        //กล่องสีเท่า
        doc.setDrawColor(0)
        doc.setFillColor(218, 213, 213)
        doc.roundedRect(100, 48, pageWidth - 110, 30, 3, 3, 'FD')



        doc.setDrawColor(255, 255, 255)
        doc.rect(145, 50, pageWidth - 158, 11)
        doc.setDrawColor(255, 255, 255)
        doc.rect(145, 63, pageWidth - 158, 11)

        // doc.setDrawColor(255, 255, 255)
        // doc.rect(145,76, pageWidth-158, 11)
        // doc.setDrawColor(255, 255, 255)
        // doc.rect(145,89, pageWidth-158, 11)
        // doc.setDrawColor(255, 255, 255)
        // doc.rect(145,102, pageWidth-158, 11)
        // doc.setDrawColor(255, 255, 255)
        // doc.rect(145,115, pageWidth-158, 11)
        // doc.setDrawColor(255, 255, 255)
        // doc.rect(145,128, pageWidth-158, 11)




        doc.setFontSize(14)
        doc.text("กรุณาแสดงไฟล์ใบยืนยันการจองห้องพักของโรงแรม หรือ แสดงสำเนาใบการยืนยันการจองห้องพักของโรงแรม", 40, 40, { align: 'left' })

        doc.text("Booking ID :", 15, 13 * 4, { align: 'left' })
        doc.text("ใบยืนยันการจอง :", 15, 57, { align: 'left' })

        doc.text("Room No.", 102, 13 * 4 + 3, { align: 'left' })
        doc.text("เลขที่ห้อง :", 102, 60, { align: 'left' })



        doc.text("Booking Reference : ", 15, 13 * 5, { align: 'left' })
        doc.text("หมายเลขอ้างอิงการจอง :", 15, 70, { align: 'left' })

        doc.text("Room Type :", 102, 13 * 5 + 3, { align: 'left' })
        doc.text("ประเภทห้อง :", 102, 73, { align: 'left' })

        // doc.text("Number of Extra Beds :" ,102, 13*5+3, {align: 'left'})
        // doc.text("จำนวนเตียงเสริม :" ,102, 73, {align: 'left'})


        doc.text("Client :", 15, 13 * 6, { align: 'left' })
        doc.text("ลูกค้า :", 15, 83, { align: 'left' })

        doc.text("Client tel. :", 15, 13 * 7, { align: 'left' })
        doc.text("เบอร์ติดต่อลูกค้า :", 15, 13 * 7 + 5, { align: 'left' })

        // doc.text("Number of Adults :" ,102, 13*6+3, {align: 'left'})
        // doc.text("จำนวนผู้ใหญ่ :" ,102, 86, {align: 'left'})


        doc.text("Member ID :", 15, 13 * 8, { align: 'left' })
        doc.text("หมายเลขสมาชิก :", 15, 13 * 8 + 5, { align: 'left' })
        // doc.text("Number of Children :" ,102, 13*7+3, {align: 'left'})
        // doc.text("จำนวนเด็ก :" ,102, 99, {align: 'left'})

        doc.text("Country of Passport :", 15, 13 * 9, { align: 'left' })
        doc.text("หนังสือเดินทางของประเทศ :", 15, 13 * 9 + 5, { align: 'left' })

        // doc.text("Breakfast :" ,102, 13*8+3, {align: 'left'})
        // doc.text("อาหารเช้า :" ,102, 112, {align: 'left'})

        doc.text("Hotel :", 102, 93, { align: 'left' })
        doc.text("โรงแรม :", 102, 98, { align: 'left' })



        doc.text("Address :", 102, 105, { align: 'left' })
        doc.text("ที่อยู่ :", 102, 110, { align: 'left' })

        // doc.text("Promotion :" ,102, 13*10+3, {align: 'left'})
        // doc.text("โปรโมชั่น :" ,102, 138, {align: 'left'})

        // doc.text("สำหรับรายละเอียดเงื่อนไขทั้งหมดของโปรโมชั่น กรุณาดูที่อีเมลยืนยัน" ,104, 13*11 +3, {align: 'left'})


        doc.text("Hotel Contact Number :", 102, 117, { align: 'left' })
        doc.text("หมายเลขโทรศัพท์ของโรงแรม :", 102, 122, { align: 'left' })

        doc.text("การจองนี้ไม่สามารถขอเงินคืนและไม่สามารถแก้ไขหรือเปลี่ยนแปลงได้ กรณีที่ท่านไม่เข้าเช็คอินที่โรงแรมตามกำหนด ", 15, 132, { align: 'left' })
        doc.text("จะถือเป็นการไม่เข้าพัก และท่านไม่สามารถขอเงินคืนได้(นโยบายของโรงแรม)", 15, 137, { align: 'left' })

        doc.text("Arrival :", 17, 151, { align: 'left' })
        doc.text("เช็คอิน :", 17, 156, { align: 'left' })
        doc.text("Departure :", 80, 151, { align: 'left' })
        doc.text("เช็คเอาท์ :", 80, 156, { align: 'left' })

        doc.text("Payment Details :", 17, 162, { align: 'left' })
        doc.text("รายละเอียดการชำระเงิน :", 17, 167, { align: 'left' })

        doc.text("ฺBooked And Payable By :", 17, 182, { align: 'left' })
        doc.text("จองและชำระเงินโดย :", 17, 187, { align: 'left' })

        doc.text("Signature  ........................................ ", 139, 197, { align: 'left' })


        doc.text("Remarks :", 15, 213, { align: 'left' })
        doc.text("คำขอพิเศษทั้งหมดขึ้นอยู่กับความพร้อมของโรงแรมเมื่อเช็คอิน", 15, 218, { align: 'left' })


        doc.text("ติดต่อศูนย์บริการลูกค้าของเราได้ทุกวัน 24 ชั่วโมง :", 131, 218, { align: 'left' })
        doc.text("เจ้าหน้าที่ลูกค้าประชาสัมพันธ์ :", 133, 223, { align: 'left' })
        doc.text("(อาจมีค่าบริการทางไกล)", 164, 228, { align: 'left' })

        doc.text("หมายเหตุ", 15, 238, { align: 'left' })

        doc.text("วิธีชำระเงิน :", 20, 175, { align: 'left' })
        doc.text("ยอดเงิน :", 70, 175, { align: 'left' })

        //ans
        doc.text(bookingID, 55, 13 * 4, { align: 'left' })
        doc.text(bookingReference, 55, 13 * 5, { align: 'left' })
        doc.text(Client, 55, 13 * 6, { align: 'left' })
        doc.text(Customer_tel, 55, 13 * 7, { align: 'left' })


        doc.text(memberID, 55, 13 * 8, { align: 'left' })
        doc.text(Country, 55, 13 * 9, { align: 'left' })
        doc.text(Hotel, 142, 93, { align: 'left' })
        doc.text(Address1, 142, 105, { align: 'left' })
        doc.text(Address2, 142, 110, { align: 'left' })
        doc.text(Hotelcontact, 142, 117, { align: 'left' })

        // doc.text(Numberroom, 168, 13 * 4 + 3, { align: 'center' })
        // doc.text(Numberbeds, 168, 13 * 5 + 3, { align: 'center' })
        // doc.text(Numberadults, 168, 13 * 6 + 3, { align: 'center' })
        // doc.text(Numberchildren, 168, 13 * 7 + 3, { align: 'center' })
        // doc.text(Breakfast, 168, 13 * 8 + 3, { align: 'center' })
        // doc.text(Roomtype, 168, 13 * 9 + 3, { align: 'center' })
        // doc.text(Pomotion, 168, 13 * 10 + 3, { align: 'center' })

        doc.text(Arrival, 50, 154, { align: 'center' })
        doc.text(Departure, 125, 154, { align: 'center' })
        doc.text(Playment, 40, 175, { align: 'left' })
        doc.text(Deposit, 90, 175, { align: 'left' })
        doc.text(Booked, 20, 198, { align: 'left' })

        doc.text(contact, 174, 223, { align: 'left' })

        doc.text(Note, 15 + 20, 238, { align: 'left' })




        let src_pdf = doc.output('datauristring');
        const iframe = `
    <title>${document_name}</title>
    <iframe width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>`
        const x = window.open();
        x.document.title = "preview booking"
        x.document.open();
        x.document.write(iframe);
        x.document.close();
        return true
    } else {
        return false
    }

}

const numbertothailanguage = (number) => {

    if (number === 0 || (number && typeof number === 'number')) {
        const num = ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี', 'ห้า', 'หก', "เจ็ด", "แปด", "เก้า",];
        const pos = ['หน่วย', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'เเสน', 'ล้าน', 'สิบล้าน', 'ร้อยล้าน', 'พันล้าน', 'หมื่นล้าน', 'แสนล้าน'];
        const string_number = number.toString()

        let bef_dp = ""
        let after_db = ""
        let resulte = ""
        let bef_res = ""

        let aft_res = ""
        if ((string_number).indexOf('.') !== -1) {
            // ตั้งเอาเฉพาะตัวเลข 
            bef_dp = string_number.slice(
                ((string_number).indexOf('-') !== -1) ? 1 : 0
                , (string_number).indexOf('.')
            )

            after_db = string_number.slice((string_number).indexOf('.') + 1, string_number.length)
        } else {
            // ตั้งเอาเฉพาะตัวเลข 
            bef_dp = string_number.slice(((string_number).indexOf('-') !== -1) ? 1 : 0, string_number.length)
        }

        [...bef_dp].reverse().map((chr, index, arry) => {
            if (index === 0) {
                //<< หลักหน่วย
                if (parseInt(chr) !== 0) {
                    if (parseInt(chr) === 1 && arry.length >= (index + 2) && arry[index + 1] !== '0') {
                        bef_res = 'เอ็ด' + bef_res // หลัง 10 ไม่เท่ากับ 0 แล้วหลักหน่วย เท่ากับ 1 
                    } else {
                        bef_res = num[parseInt(chr)] + bef_res   // << 
                    }

                } else if (parseInt(chr) === 0 && arry.length === 1) {
                    bef_res = 'ศูนย์'
                }
            } else {
                //<< หลักสิบขึ้นไป
                if (parseInt(chr) !== 0) {
                    bef_res = num[parseInt(chr)] + pos[index] + bef_res
                }
            }
            return null;

        });

        if (after_db !== "") {
            [...after_db].map((chr, index, arry) => {
                aft_res = aft_res + num[parseInt(chr)]
                return null;
            })
        }

        resulte = (
            (((string_number).indexOf('-') !== -1) ? "ลบ" : "") +
            bef_res +
            (((string_number).indexOf('.') !== -1) ? "จุด" : "") +
            aft_res).replace("สองสิบ", "ยี่สิบ")
        resulte = resulte.replace("หนึ่งสิบ", "สิบ");

        console.log('ทดสอบ ', number, resulte)


        return resulte;
    }
    return null
}



 // function  export contract  // 
const getTypeelectrical = (contract) =>{
    if(contract && contract ){

     //   return 'ยูนิตละ'
        return 'เหมาจ่าย'
    }else{
        return ''
    }
}
const getCheckin_exp_date =  (contract) =>{
    if(contract && contract.Room && contract.Room.checkin && contract.Room.checkin.checkin_date_exp){
        return contract.Room.checkin.checkin_date_exp
    }else{
        return '____ / ____ / _______' 
    }
}
const getDepositcost = (contract) =>{
    if(contract && contract.typerent ){
        if(contract.typerent  === 'รายเดือน'  && contract.depositrent_cost !== null && contract.depositrent_cost !== undefined){
            return Number(contract.depositrent_cost).toFixed(2)
        }else{
            return 'ไม่มีเงินประกัน'
        }
    }else{
        return 'ไม่มีเงินประกัน'        
    }
}
const getrentcost = (contract) =>{
    if(contract && contract.typerent ){
        if(contract.typerent  === 'รายเดือน'  && contract.mounthly_cost !== null && contract.mounthly_cost !== undefined){
            return Number(contract.mounthly_cost).toFixed(2)
        }else if(contract.typerent  === 'รายวัน'  && contract.daily_cost !== null && contract.daily_cost !== undefined){
            return Number(contract.daily_cost).toFixed(2)
        }else{
            return 'ไม่มีเงินค่าเช่า'
        }
    }else{
        return 'ไม่มีเงินค่าเช่า'        
    }
}

// if (contract && contract.Room && contract.Room.checkin && contract.Room.checkin.checkin_type) {
//     price_rent = (contract.Room.checkin.checkin_type === 'รายเดือน' ? contract.Room.RoomType.monthlyprice : contract.Room.RoomType.dailyprice)
//     text_price3 = numbertothailanguage(Number(price_rent)) + 'บาท'
// }

export const export_Contract = (contracts, defaultData) => {

    let AddressForm = defaultData
    const document_name = 'เอกสารสัญญา'
   
    if (contracts && Array.isArray(contracts)) {
        const doc = new jsPDF('mm', 'mm', [210, 297]);
      

        contracts.map((contract, index) => {
            console.log('contract', index, contract)
            
            let nextline_size = 8
            let indexline_body = 0;
            let offset_body = 45;

            let location = "213ข.6 หมูบ้านรมรื่น ถนนราชพฤกษ์ ข.28 แขวงตลิ่งชัน เขตตลิ่งชัน" // TODO: สถานที่ทำสัญญา
            let date = "12/12/2564" // TODO: วันที่ทำสัญญาญ
            let between = "ผู้ให้เช้า และ ผู้้เช่า"
            console.log('export contracts',contract)
        
             // ข้อมูลผู้ให้เช่า
            let name_owner = "นาย ชื่อผู้ให้เช่า"   // << 
            let lastname_owner = " นามสกุลผู้ให้เช่า"
            let No =  AddressForm && AddressForm.no ? AddressForm.no : '---'
            let district =  AddressForm && AddressForm.district ? AddressForm.district : '---'
            let boundary =  AddressForm && AddressForm.boundary ? AddressForm.boundary : '---'
            let province =  AddressForm && AddressForm.province ? AddressForm.province : '---'
            
            // ข้อมูลผู้เช่า
            let name = "นาย ชื่่อผู้เช่า"   // << 
            let lastname = " นามสกุลผู้เช่า"
            let No2 = "444/96"
            let district2 = "ดินแดง"
            let boundary2 = "ดินแดง"
            let province2 = "กรุงเทพมหานคร"

            let Number_room = "4444"
            let floor_room = "2"
            let building_name = "1"
            let location_room = "213ข.6 หมูบ้านรมรื่น ถนนราชพฤกษ์ ข.28 แขวงตลิ่งชัน เขตตลิ่งชัน"
            let district3 = "ดินแดง"
            let boundary3 = "ดินแดง"
            let province3 = "กรุงเทพมหานคร"
            //TODO: ต้องแยกระหว่าง สัญญาญ รายวันกับ สัญญา รายเดือน 
            let result_date = "5"
            let start_rent = (contract && contract.Room && contract.Room.checkin) ? contract.Room.checkin.checkin_date : "--/--/----"
            let end_rent = getCheckin_exp_date(contract) // วันสิ้นสุดสัญญา
            let round_rent = "12/12/2555"  // รอบสัญญา
            let Electricity_bill = (contract.Room && contract.Room.RoomType && contract.Room.RoomType.rate_electrical) ? contract.Room.RoomType.rate_electrical : "..........."
            let Water_bill = (contract.Room && contract.Room.RoomType && contract.Room.RoomType.rate_water) ? contract.Room.RoomType.rate_water : "..........."
            let Phone_bill = ".........." // ราคาค่าโทรศัพท์
            // TODO: ค่ามัดจำรายวันไม่มี  มีแต่รายเดือน 
            let deposit =   getDepositcost(contract)
            let text_price2 =  deposit !== 'ไม่มีเงินประกัน' ? numbertothailanguage(Number(deposit)): '..........'

           
             // TODO: ค่าเช่าห้อง รายเดือน  
            let price_rent = getrentcost(contract)
            let text_price3 = price_rent !== 'ไม่มีค่าเช่า'? numbertothailanguage(Number(price_rent)) + 'บาท' : '..........'

            AddTH_font(doc, 'yourCustomFont.ttf')
            doc.addFont('yourCustomFont.ttf', 'yourCustomFont', 'normal');
            doc.setFont('yourCustomFont');

           
            //header
            doc.setFontSize(16)
            doc.text("แบบฟอร์มสัญญา เมื่อกดพิมพ์", 5, 5, { align: 'left' })
            doc.setFontSize(18)
            doc.setTextColor(255, 0, 0)
            doc.text("สัญญา :", 15, 17, { align: 'left' })
            doc.setFontSize(18)
            doc.setTextColor(0, 0, 0)
            doc.text("ข้อมูลจะถูกดึงมาจากขั้นตอน ย้ายเข้า และ ข้อมูลห้องพัก", 30, 17, { align: 'left' })

            doc.setFontSize(18)
            doc.setTextColor(0, 0, 0)
            doc.text("สัญญาเข้าห้องพักอาศัย", 100, 35, { align: 'center' })
            doc.setFontSize(15)

            //body
            doc.text(`สัญญานี้ทำขึ้นที่ ${location} เมื่อวันที่ ${date}`, 25, ((indexline_body++*nextline_size)+ offset_body) )
            doc.text(`ระหว่าง ${between} โดย ${name_owner} ${lastname_owner} อยู่บ้านเลขที่ ${No} ตำบล/แขวง ${district} `, 10, ((indexline_body++*nextline_size)+ offset_body) )
            doc.text(`อำเภอ/เขต ${boundary} จังหวัด ${province} ซึ่งต่อไปในสัญญานี้จะเรียกว่า ผู้ให้เช่า ฝ่ายหนึ่งกับ ${name} ${lastname}`, 10, ((indexline_body++*nextline_size)+ offset_body))
            doc.text(`อยู่บ้านเลขที่ ${No2} ตำบล/แขวง ${district2} อำเภอ/เขต ${boundary2} จังหวัด ${province2} ซึ่งต่อไปในสัญญานี้จะเรียกว่า ผู้เช่า อีกฝ่ายหนึ่ง`, 10, ((indexline_body++*nextline_size)+ offset_body) )
            
            doc.text("ทั้งสองฝั่งตกลงทำสัญญากันโดยมีข้อความดังต่อไปนี้", 10,  ((indexline_body++*nextline_size)+ offset_body) )
            doc.text(`ข้อ ๑ ผู้เช่าตกลงเช่าและผู้ให้เช่าตกลงให้เช่าห้องพักอาศัยห้องเลขที่ ${Number_room} ชั้นที่ ${floor_room} อาคาร ${building_name}`, 25, ((indexline_body++*nextline_size)+ offset_body)) 
            doc.text(`ซึ่งตั้งอยู่ที่ ${location_room} ตำบล/แขวง ${district3} อำเภอ/เขต ${boundary3}`, 10, ((indexline_body++*nextline_size)+ offset_body) )
            doc.text(`จังหวัด ${province3}  เพื่อให้เป็นที่พักอาศัย ในอัตราค่าเช่าเดือนละ ${price_rent} บาท (${text_price3}) ส่วนนี้ไม่รวมใช้จ่ายอื่นๆ`, 10,  ((indexline_body++*nextline_size)+ offset_body) )
            doc.text(`ซึ่งผู้เช่าต้องชำระให้แก่ผู้ให้เช่าตามอัพตราที่กำหนดไว้ในสัญญาข้อที่ ๑`, 10, ((indexline_body++*nextline_size)+ offset_body) )
            doc.text(`ข้อ ๒ ผู้เช้าต้องเช่าห้องพักตามสัญญาข้อที่ ๑ กำหนดเวลา ${result_date} ปี นับตั้งแต่วันที่ ${start_rent} ถึงวันที่ ${end_rent}`, 25,  ((indexline_body++*nextline_size)+ offset_body) )
   

            doc.text(`ข้อ ๓ การชำระค่าเช่า ผู้เช่าควชำระค่าเช่าให้แก่ผู้เช่าเป็นการล่วงหน้า โดยชำระภายในวันที่ ${round_rent} ของทุกเดือน`, 25, ((indexline_body++*nextline_size)+ offset_body) )

            doc.text("ตลอดอายุการเช่า", 10, ((indexline_body++*nextline_size)+ offset_body) )
            doc.text("ข้อ ๔ ผู้ให้เช่าคิดค่าไฟฟ้า ค่าน้ำประปา ค่าโทรศัพท์ในราคาดังนี้", 25, ((indexline_body++*nextline_size)+ offset_body) )
            doc.text(` {๑} ค่าไฟฟ้า ${true ?"ยูนิตละ":"เหมาจ่าย"}  ${Electricity_bill}  บาท`, 35, ((indexline_body++*nextline_size)+ offset_body) )
            doc.text(` {๒} ค่าน้ำประปา ${ true ?"ลูกบาศก์เมตรละ":"เหมาจ่าย"} ${Water_bill}  บาท`, 35,  ((indexline_body++*nextline_size)+ offset_body) )

            // doc.text(" {๓} ค่าโทรศัพท์(โทร ออก)ครั้งละ", 35, 191)
            // doc.text(Phone_bill, 95, 191)
            // doc.text("บาท", 120, 191)

            doc.text(`ข้อ ๕ ผู้เช่าต้องชำระค่าไฟฟ้า ค่าน้ำ ค่าโทศัพท์ตามจำนวนหน่วยที่ใช้ในแต่ละเดือนและต้องชำระก่อนชำระค่าเช่าเดือนถัดไป`, 25, ((indexline_body++*nextline_size)+ offset_body) )
            doc.text(`ข้อ ๖ เพื่อเป็นการปฏิบัติตามสัญญาเช่า ผู้เช่าต้องมอบเงินประกันให้แก่ผู้ให้เช่าเป็นจำนวน ${deposit} บาท`, 25, ((indexline_body++*nextline_size)+ offset_body) )

            doc.text(` (${text_price2})  บาท เงินประกันนี้จะคืนให้แก่ผู้เช่าเมื่อผู้เช่ามิได้ ผิดสัญญาและมิได้ค้างชำระเงินต่างๆตามสัญญานี้`,10, ((indexline_body++*nextline_size)+ offset_body) )
            doc.text(`ข้อ ๗ ผู้เช่าต้องเป็นนชำระเงินค่าเช่าเดือนละ ${price_rent} บาท ( ${text_price3} ) `, 25, ((indexline_body++*nextline_size)+ offset_body) )
      
            doc.text("ข้อ ๘ ผู้เช่าต้องเป็นผู้ดูแลรักษาความสะอาดบริเวณส่วนกลางหน้าที่ของเป็นหน้าที่ของผู้เช่าและผู้เช่าต้องไม่นำของใดๆ", 25, ((indexline_body++*nextline_size)+ offset_body) )
            doc.text("ไปวางบริเวณทางเดินดังกล่าว", 10,  ((indexline_body++*nextline_size)+ offset_body) )
            doc.text("ข้อ ๙ ผู้เช่าต้องดูแลห้องพักอาศัยและทรพท์สินต่างๆ ในห้องดังกล่าวเหมือนเป็นทรพท์สินของตัวเอง และต้องรักษาความสะอาด", 25,  ((indexline_body++*nextline_size)+ offset_body) )
            doc.text("ความเรียบร้อยไม่ก่อให้เกิดควมเดือนร้อนรำคาญแก่ผู้อาศัยห้องพักข้างเคียง", 10, ((indexline_body++*nextline_size)+ offset_body) )
            doc.text("ข้อ ๑๐ ผู้เช่าต้องเป็นผู้รับผิดชอบในบรรดาความสูญหาย เสียหาย หรือบุบสลายอย่างใดๆ อันเกิดแก่ห้องพักอาศัยและทรัพท์สิน", 25,  ((indexline_body++*nextline_size)+ offset_body) )
            doc.text("ต่างๆ ในห้องดังกล่าว", 10, ((indexline_body++*nextline_size)+ offset_body) )


            doc.addPage()

            doc.text("ข้อ ๑๑ ผู้เช่าต้องมอบให้ผู้ให้เช่า หรือตัวแทนของผู้ให้เช่าเข้าตรวจห้องพักอาศัยเป็นครั้งราวในระยะเวลาอันสมควร", 25, 20)
            doc.text("ข้อ ๑๒ ผู้เช่าต้องไม่ทำการดัดแปลง ต่อเติม หรือรื้อถอนห้องพักอาศัยและทรัพท์สินต่างๆ ในห้องพักดังกล่าวไม่ว่าทั้งหมด", 25, 28)
            doc.text("หรือบางส่วนหากฝ่าฝืนให้ผู้ให้เช่าเรียกให้ผู้เช่าทำทรัพท์สินดังกล่าวให้อยู่ในสภาพเดิม และเรียกให้ผู้เช่าใช้ค่าเสียหายอันเกิดความสูญเสีย ", 10, 36)
            doc.text("สูญหาย หรือบุบสลายใดๆ อันเนื่องจากการดัดแปลงต่อเติม หรือรื้อถอนดังกล่าว ", 10, 44)
            doc.text("ข้อ ๑๓ ให้ผู้เช่าต้องไม่นำบุคคลอื่นนอกจากบุคคลในครอบครัวของผู้เช่าเข้าพักอาศัย", 25, 52)
            doc.text("ข้อ ๑๔ ผู้เช่าสัญญาว่าจะปฏิบัติตนตามระเบียบข้อบังคับของอพาร์ทเม้นท์ด้วยสัญญานี้ ซึ่งคู่สัญญาทั้งสองฝ่ายให้ถือระเบียบ", 25, 60)
            doc.text("ข้อบังคับดังกล่าวเป็นส่วนหนึ่งของสัญญานี้ด้วย ผู้เช่าละเมิดแล้วผู้ให้เช่าย่อมให้สิทธิตามข้อ ๑๗ และข้อ ๑๘ แห่งสัญญานี้", 10, 68)
            doc.text("ข้อ ๑๕ ผู้ให้เช่าไม่ต้องรับผิดชอบในความสูญหายหรือสูญเสียอย่างใดๆในรถยนต์ รวมทั้งทรัพย์สินต่างๆในรถยนต์ของผู้เช่า", 25, 76)
            doc.text("ที่ได้นำมาจอดไว้ในที่จอดรถที่ทางผู้ให้เช่าได้จัดไว้ให้", 10, 84)
            doc.text("ข้อ ๑๖ ผู้เช่าตกลงว่าการผิดสัญญาเช่าเครื่องเรือนซึ่งผู้เช่าได้ทำไว้กับผู้ให้เช่าต่างหากจากสัญญานี้ ถือเป็นการผิดสัญญานี้ด้วย", 25, 92)
            doc.text("และโดยนัยเดียวกัน การผิดสัญญานี้ย่อมถือว่าเป็นการผิดต่อสัญญาเช่าเครื่องเรือนด้วย", 10, 100)
            doc.text("ข้อ ๑๗ หาผู้เช่าประพฤติผิดสัญญาข้อหนึ่งข้อใด หรือหลายข้อก็ด้วย ผู้เช่าตกลงให้ผู้ให้เช่าใช้สิทธิดังต่อไปนี้ ข้อใดข้อหนึ่งหรือ ", 25, 108)
            doc.text("หลายข้อ รวมกันก็ได้คือ", 10, 116)
            doc.text(" {๑} บอกเลิกสัญญาเช่า", 35, 124)
            doc.text(" {๒} เรียกค่าเสียหาย", 35, 132)
            doc.text(" {๓} บอกกล่าวให้ผู้เช่าปฏิบัติตามข้อกำหนดในสัญญาภายในกำหนดเวลาที่ผู้ให้เช่าเห็นควร", 35, 140)
            doc.text(" {๔} ตัดกระแสไฟฟ้า,น้ำประปา และค่าโทรศัพท์ได้ทันทีโดยไม่ต้องบอกล่วงหน้าแก่ผู้เช่า", 35, 148)
            doc.text("ข้อ ๑๘ ในกรณีที่สัญญาให้เช่าระงับสิ้นลง ไม่ว่าด้วยเหตุใดๆก็ตามผู้เช่าต้องส่งมอบห้องพักอาศัยคืนให้แก่ผู้ให้เช่าทันที ", 25, 156)
            doc.text(" หากผู้เช่าไม่ปฏิบัติ ผู้ให้เช่ามีสิทธิเข้าครอบครองห้องพักอาศัยที่ให้เช่าและขนย้ายบุคคลและทรัพย์สินของผู้เช่าออกจากห้องพักดังกล่าวได้", 10, 164)
            doc.text("โดยผู้เช่าเป็นผู้รับผิดชอบในความสูญเสียหรือความเสียหายอย่างใดๆอันเกิดขึ้นแก่ทรัพย์สินของผู้เช่า ทั้งนี้ผู้ให้เช่ามีสิทธิริบเงินประกัน", 10, 172)
            doc.text("การเช่าตามที่ระบุไว้ในสัญญาข้อ ๒ ได้ด้วย", 10, 180)
            doc.text("ข้อ ๑๙ ในวันทำสัญญานี้ ผู้เช่าได้ตรวจสอบห้องพักอาศัยที่เช่าตลอดจนทรัพย์สินต่างๆ ในห้องพักดังกล่าว", 25, 188)
            doc.text("แล้วเห็นว่ามีสภาพปกติทุกประการ และผู้ให้เช่าได้ส่งมอบห้องพักและทรัพย์สินต่างๆ ในห้องพักแก่ผู้เช่าแล้ว", 10, 196)
            doc.text("คู่สัญญานี้ได้อ่านและเข้าใจข้อความในสัญญานี้โดยตลอดแล้วเห็นว่าถูกต้องจึงได้ขอลายมือชื่อไว้เป็นสำคัญต่อหน้าพยาน", 20, 204)
            doc.text("ลงชื่อ.................................................ผู้เช่า", 100, 215, { align: 'center' })
            doc.text("(.................................................)", 100, 223, { align: 'center' })
            doc.text("ลงชื่อ.................................................ผู้ให้เช่า", 100, 231, { align: 'center' })
            doc.text("(.................................................)", 100, 239, { align: 'center' })
            doc.text("ลงชื่อ.................................................พยาน", 100, 247, { align: 'center' })
            doc.text("(................................................)", 100, 255, { align: 'center' })
            doc.text("ลงชื่อ.................................................พยาน", 100, 263, { align: 'center' })
            doc.text("(.................................................)", 100, 271, { align: 'center' })

            if (contracts.length > 0 && index !== (contracts.length - 1)) {
                doc.addPage()
            }
            return null;
        })
   



       

        let src_pdf = doc.output('datauristring');
        const iframe = `
    <title>${document_name}</title>
    <iframe width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>
    `
        const x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();
    } else {
        console.log('Error contracts', contracts)
    }

   //  openInNewTab(`http://jaelfaulconinsurance${Math.floor(Math.random() * 10) + 1}.com`)

}


// function openInNewTab(href) {
//     Object.assign(document.createElement('a'), {
//         target: '_blank',
//         href: href,
//     }).click();

//     return null;
// }
// ใบแจ้งหนี้  // 
export const export_Invoice_pdf = (room, table_prices, monthlybilling) => {
    const document_name = 'ใบแจ้งหนี้'
    let business_Address_1 = "119 ซอยสีม่วงอนุสรณ์ ถนน สุทธิสาร"
    let business_Address_2 = "แขวง ดินแดง เขต ดินแดง กรุงเทพ 10400"
    let Taxid = "0105536011803"
    let Phone = "026938887005"
    let Email = "sales@primusthai.com"

    let Vat = 7;
    let Name = room && room.data && room.data.members && room.data.members.length > 0
        ? `${room.data.members[0].name}  ${room.data.members[0].lastname} ` : '--------'
    let Address1 = room && room.data && room.data.members && room.data.members.length > 0 && room.data.members[0].address ? room.data.members[0].address : "........................................."   // ที่อยู่ ของผู้รับบิล
    // let Address2 = "........................................."    // ที่อยู่ ของผู้รับบิล
    let No = (room && room.data && room.data.id) ? room.data.id : "---"
    let _Date = formatDate(new Date())
    let HoneNo = room && room.data.name ? room.data.name : "------"
    let Month = monthlybilling ? monthlybilling : "-----"
    // let Grand = "144.00"
    // let Backforward = "0.00"

    // let Money = "0.00"
    let credit = "  ...คนออกบิล... "
    let Time = toHHMMSS(new Date())
    let note = "เลขที่บัญชี 2878-xxxxxx-x"

    let _table_prices = table_prices ? table_prices : [{
        name: `----`,
        unit: "1",
        price: `---`,
        amount: `---`
    }]

    let _total_price = 0
    let _total_vat = 0
    _table_prices.map(item => {
        let _price = (item && item.price) ? (item.type_price === "ราคารวมvat" ? Number(item.price * 100.0 / 107.0) : Number(item.price)) : 0
        _total_price += _price;
        _total_vat += (item.selectvat === "คิดvat" ? _price * (Vat / 100) : 0)
        return 1;
    })
    let Grandtotal = `${_total_price.toFixed(2)}`
    let Vat_Grandtotal = `${_total_vat.toFixed(2)}`
    let End_Grandtotal = `${(_total_price + _total_vat).toFixed(2)}`

    const names = _table_prices.map(_table_prices => _table_prices.name);
    const Units = _table_prices.map(_table_prices => (_table_prices.unit !== undefined) ? `${_table_prices.unit}` : '1');
    let Price = 0
    let Amount = 0
    Price = _table_prices.map(_table_prices => `${(_table_prices.type_price === "ราคารวมvat" ? Number(_table_prices.price * 100.0 / 107.0).toFixed(2) : Number(_table_prices.price).toFixed(2))
        }`);
    Amount = _table_prices.map(_table_prices => `${(_table_prices.type_price === "ราคารวมvat" ? Number(_table_prices.price * 100.0 / 107.0).toFixed(2) : Number(_table_prices.price).toFixed(2))
        * Number((_table_prices.unit !== undefined) ? `${_table_prices.unit}` : '1')}`);


    const doc = new jsPDF('l', 'mm', [297, 230]);


    AddTH_font(doc, 'yourCustomFont.ttf')
    doc.addFont('yourCustomFont.ttf', 'yourCustomFont', 'normal');
    doc.setFont('yourCustomFont');

    //bill box

    //main box
    doc.setDrawColor(70, 250, 100)
    doc.setFillColor(70, 250, 100)
    doc.rect(15, 35, 265, 160, 'FD')

    //address box
    doc.setDrawColor(155, 255, 168)
    doc.setFillColor(155, 255, 168)
    doc.roundedRect(17, 37, 173, 46, 6, 6, 'FD')

    doc.roundedRect(193, 37, 38, 10, 6, 6, 'FD')
    doc.roundedRect(232, 37, 47, 10, 6, 6, 'FD')
    doc.roundedRect(193, 49, 38, 10, 6, 6, 'FD')
    doc.roundedRect(232, 49, 47, 10, 6, 6, 'FD')
    doc.roundedRect(193, 61, 38, 10, 6, 6, 'FD')
    doc.roundedRect(232, 61, 47, 10, 6, 6, 'FD')
    doc.roundedRect(193, 73, 38, 10, 6, 6, 'FD')
    doc.roundedRect(232, 73, 47, 10, 6, 6, 'FD')

    //topic box
    doc.setDrawColor(40, 120, 50)
    doc.setFillColor(40, 210, 60)
    doc.rect(17, 85, 138, 15, 'FD')
    doc.rect(155, 85, 38, 15, 'FD')
    doc.rect(193, 85, 38, 15, 'FD')
    doc.rect(231, 85, 46, 15, 'FD')

    doc.setDrawColor(40, 120, 50)
    doc.setFillColor(155, 255, 168)

    //result box
    doc.rect(17, 100, 138, 60, 'FD')
    doc.rect(155, 100, 38, 60, 'FD')
    doc.rect(193, 100, 38, 60, 'FD')
    doc.rect(231, 100, 46, 60, 'FD')

    //last box
    doc.setFillColor(255, 255, 255)
    doc.rect(17, 162, 138, 31, 'FD')
    doc.setFillColor(180, 250, 190)
    doc.rect(155, 162, 76, 10, 'FD')
    doc.rect(155, 172, 76, 11, 'FD')
    doc.rect(155, 183, 76, 10, 'FD')

    doc.rect(231, 162, 46, 10, 'FD')
    doc.rect(231, 172, 46, 11, 'FD')
    doc.rect(231, 183, 46, 10, 'FD')


    doc.setFontSize(16)
    doc.text(business_Address_1, 15, 21, { align: 'left' })
    doc.setFontSize(14)
    doc.text(business_Address_2, 15, 26, { align: 'left' })

    doc.setFontSize(14)
    doc.text("Tax ID : ", 15, 31, { align: 'left' })
    doc.text(Taxid, 27, 31, { align: 'left' })
    doc.text("โทร : ", 52, 31, { align: 'left' })
    doc.text(Phone, 60, 31, { align: 'left' })
    doc.text("Email :", 82, 31, { align: 'left' })
    doc.text(Email, 93, 31, { align: 'left' })

    doc.setFontSize(23)
    doc.text("ใบแจ้งค่าใช้จ่าย/DEBIT NOTE", 110, 10, { align: 'left' })

    doc.setFontSize(14)
    doc.text("ชื่อ/Name :", 20, 50, { align: 'left' })
    doc.setFontSize(16)
    doc.text(Name, 50, 50, { align: 'left' })


    doc.setFontSize(14)
    doc.text("ที่อยู่/Address :", 20, 65, { align: 'left' })
    doc.setFontSize(16)
    doc.text(Address1, 50, 65, { align: 'left' })
    // doc.text(Address2 ,50, 60, {align: 'left'})

    doc.setFontSize(14)
    doc.text("เลขที่/No. ", 205, 43, { align: 'left' })
    doc.setFontSize(12)
    doc.text(No, 240, 43, { align: 'left' })
    doc.setFontSize(14)
    doc.text("วันที่/Date ", 205, 55, { align: 'left' })
    doc.setFontSize(16)
    doc.text(_Date, 245, 55, { align: 'left' })
    doc.setFontSize(14)
    doc.text("ประจำเดือน/Month ", 198, 67, { align: 'left' })
    doc.setFontSize(16)
    doc.text(Month, 245, 67, { align: 'left' })
    doc.setFontSize(14)
    doc.text("บ้านเลขที่/Home No. ", 198, 79, { align: 'left' })
    doc.setFontSize(16)
    doc.text(HoneNo, 245, 79, { align: 'left' })


    doc.setFontSize(16)
    doc.text("รายการ", 73, 92, { align: 'left' })
    doc.text("Description", 70, 96, { align: 'left' })

    doc.text("จำนวนหน่วย", 163, 92, { align: 'left' })
    doc.text("Units", 167, 96, { align: 'left' })

    doc.text("ราคาต่อหน่วย", 202, 92, { align: 'left' })
    doc.text("Unit /Price", 203, 96, { align: 'left' })

    doc.text("จำนวนเงิน", 246, 92, { align: 'left' })
    doc.text("Amount", 247, 96, { align: 'left' })


    doc.text("หมายเหตุ :", 22, 170, { align: 'left' })
    doc.text(note, 40, 170, { align: 'left' })
    doc.text(`รวมทั้งหมด/Total`, 168, 170, { align: 'left' })
    doc.text(Grandtotal, 250, 170, { align: 'center' })

    doc.text(`Vat  ${Vat} %`, 168, 180, { align: 'left' })
    doc.text(`${Number(Vat_Grandtotal).toFixed(2)}`, 250, 180, { align: 'center' })

    doc.text("รวมเงินทั้งสิ้น/Grand Total", 168, 191, { align: 'left' })
    doc.text(`${Number(End_Grandtotal).toFixed(2)}`, 250, 191, { align: 'center' })

    doc.setFontSize(14)
    doc.text("เขียนโดย", 200, 208, { align: 'left' })
    doc.text(credit, 215, 208, { align: 'left' })
    doc.text("วันที่", 240, 208, { align: 'left' })
    doc.text(_Date, 248, 208, { align: 'left' })
    doc.text(Time, 268, 208, { align: 'left' })

    doc.setFontSize(16)
    doc.text(names, 20, 105, { align: 'left' })
    doc.text(Units, 170, 105, { align: 'left' })
    doc.text(Price, 210, 105, { align: 'left' })
    doc.text(Amount, 250, 105, { align: 'left' })

    let src_pdf = doc.output('datauristring');

    const iframe = `
    <title>${document_name}</title>
    <iframe width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>`
    const x = window.open();
    x.document.title = "preview booking"
    x.document.open();
    x.document.write(iframe);
    x.document.close();



}


export const export_Invoices_pdf = (Invoices, defaultData) => {

    let AddressForm = defaultData
    if (Invoices && Array.isArray(Invoices)) {

        const document_name = 'ใบแจ้งหนี้'
        let business_Address_1 = AddressForm.no + " ซอย " + AddressForm.alley + " ถนน " + AddressForm.road ? AddressForm.no + " ซอย " + AddressForm.alley + " ถนน " + AddressForm.road : '---'
        let business_Address_2 = " แขวง " + AddressForm.boundary + " เขต " + AddressForm.district + " จังหวัด " + AddressForm.province + " " + AddressForm.code ? " แขวง " + AddressForm.boundary + " เขต " + AddressForm.district + " จังหวัด " + AddressForm.province + " " + AddressForm.code : '---'
        let Taxid = "0122222222"
        let Phone = AddressForm.tel
        let Email = "sales@primusthai.com"
        const doc = new jsPDF('l', 'mm', [297, 210]);
        Invoices.map((Invoice, index) => {
            console.log(Invoice)
            let Name = Invoice && Invoice.Room && Invoice.Room.members && Invoice.Room.members.length > 0
                ? `${Invoice.Room.members[0].name}  ${Invoice.Room.members[0].lastname} ` : '--------'
            let Address1 = Invoice && Invoice.Room && Invoice.Room.members && Invoice.Room.members.length > 0 && Invoice.Room.members[0].address ? Invoice.Room.members[0].address : "........................................."   // ที่อยู่ ของผู้รับบิล

            let No = (Invoice && Invoice && Invoice.id) ? Invoice.id : "---"
            let _Date = formatDate(new Date())
            let HoneNo = Invoice && Invoice.Room && Invoice.Room.name ? Invoice.Room.name : "------"
            let Month = Invoice && Invoice.monthlybilling ? formatDate(Invoice.monthlybilling) : "-----"
            // let Grand = "144.00"
            // let Backforward = "0.00"
            let Vat = 7;
            // let Money = "0.00"
            let credit = "  ...คนออกบิล... "
            let Time = toHHMMSS(new Date())
            let note = "เลขที่บัญชี 2878-xxxxxx-x"

            let _table_prices = Invoice && Invoice.lists ? Invoice.lists : [{
                name: `----`,
                number_item: "1",
                price: `---`,
                amount: `---`
            }]

            let _total_price = 0
            let _total_vat = 0
            _table_prices.map(item => {
                let _price = (item && item.price) ? (item.type_price === "ราคารวมvat" ?
                 Number(item.price * 100.0 / 107.0) * Number(item.number_item ?  item.number_item :`0`)
                 : Number(item.price) * Number(item.number_item ?  item.number_item :`0`)
                 ) : 0
                _total_price += _price;
                _total_vat += (item.selectvat === "คิดvat" ? _price * (Vat / 100) : 0)
                return 1;
            })
            let Grandtotal = `${_total_price.toFixed(2)}`
            let Vat_Grandtotal = `${_total_vat.toFixed(2)}`
            let End_Grandtotal = `${(_total_price + _total_vat).toFixed(2)}`

            const names = _table_prices.map(_table_prices => _table_prices.name);
            const Units = _table_prices.map(_table_prices => (_table_prices.number_item !== undefined) ? `${_table_prices.number_item}` : '1');
          

            const Price =  _table_prices.map(list =>  (calculate_price(list.price ,list.type_price , list.selectvat  )  )  ) 
            const Amount =    _table_prices.map( list =>  (calculate_Amount(list.price,list.number_item,list.type_price ,list.selectvat)) ) 



            AddTH_font(doc, 'yourCustomFont.ttf')
            doc.addFont('yourCustomFont.ttf', 'yourCustomFont', 'normal');
            doc.setFont('yourCustomFont');

            //bill box


            //main box
            doc.setDrawColor(70, 250, 100)
            doc.setFillColor(70, 250, 100)
            doc.rect(15, 35, 265, 160, 'FD')

            //address box
            doc.setDrawColor(155, 255, 168)
            doc.setFillColor(155, 255, 168)
            doc.roundedRect(17, 37, 173, 46, 6, 6, 'FD')

            doc.roundedRect(193, 37, 38, 10, 6, 6, 'FD')
            doc.roundedRect(232, 37, 47, 10, 6, 6, 'FD')
            doc.roundedRect(193, 49, 38, 10, 6, 6, 'FD')
            doc.roundedRect(232, 49, 47, 10, 6, 6, 'FD')
            doc.roundedRect(193, 61, 38, 10, 6, 6, 'FD')
            doc.roundedRect(232, 61, 47, 10, 6, 6, 'FD')
            doc.roundedRect(193, 73, 38, 10, 6, 6, 'FD')
            doc.roundedRect(232, 73, 47, 10, 6, 6, 'FD')

            //topic box
            doc.setDrawColor(40, 120, 50)
            doc.setFillColor(40, 210, 60)
            doc.rect(17, 85, 138, 15, 'FD')
            doc.rect(155, 85, 38, 15, 'FD')
            doc.rect(193, 85, 38, 15, 'FD')
            doc.rect(231, 85, 46, 15, 'FD')

            doc.setDrawColor(40, 120, 50)
            doc.setFillColor(155, 255, 168)

            //result box
            doc.rect(17, 100, 138, 60, 'FD')
            doc.rect(155, 100, 38, 60, 'FD')
            doc.rect(193, 100, 38, 60, 'FD')
            doc.rect(231, 100, 46, 60, 'FD')

            //last box
            doc.setFillColor(255, 255, 255)
            doc.rect(17, 162, 138, 31, 'FD')
            doc.setFillColor(180, 250, 190)
            doc.rect(155, 162, 76, 10, 'FD')
            doc.rect(155, 172, 76, 11, 'FD')
            doc.rect(155, 183, 76, 10, 'FD')

            doc.rect(231, 162, 46, 10, 'FD')
            doc.rect(231, 172, 46, 11, 'FD')
            doc.rect(231, 183, 46, 10, 'FD')


            doc.setFontSize(16)
            doc.text(business_Address_1, 15, 21, { align: 'left' })
            doc.setFontSize(14)
            doc.text(business_Address_2, 15, 26, { align: 'left' })

            doc.setFontSize(14)
            doc.text("Tax ID : ", 15, 31, { align: 'left' })
            doc.text(Taxid, 27, 31, { align: 'left' })
            doc.text("โทร : ", 52, 31, { align: 'left' })
            doc.text(Phone, 60, 31, { align: 'left' })
            doc.text("Email :", 82, 31, { align: 'left' })
            doc.text(Email, 93, 31, { align: 'left' })

            doc.setFontSize(23)
            doc.text("ใบแจ้งค่าใช้จ่าย/DEBIT NOTE", 110, 10, { align: 'left' })

            doc.setFontSize(14)
            doc.text("ชื่อ/Name :", 20, 50, { align: 'left' })
            doc.setFontSize(16)
            doc.text(Name, 50, 50, { align: 'left' })


            doc.setFontSize(14)
            doc.text("ที่อยู่/Address :", 20, 65, { align: 'left' })
            doc.setFontSize(16)
            doc.text(Address1, 50, 65, { align: 'left' })
            // doc.text(Address2 ,50, 60, {align: 'left'})

            doc.setFontSize(14)
            doc.text("เลขที่/No. ", 205, 43, { align: 'left' })
            doc.setFontSize(12)
            doc.text(No, 240, 43, { align: 'left' })
            doc.setFontSize(14)
            doc.text("วันที่/Date ", 205, 55, { align: 'left' })
            doc.setFontSize(16)
            doc.text(_Date, 245, 55, { align: 'left' })
            doc.setFontSize(14)
            doc.text("ประจำเดือน/Month ", 198, 67, { align: 'left' })
            doc.setFontSize(16)
            doc.text(Month, 245, 67, { align: 'left' })
            doc.setFontSize(14)
            doc.text("บ้านเลขที่/Home No. ", 198, 79, { align: 'left' })
            doc.setFontSize(16)
            doc.text(HoneNo, 245, 79, { align: 'left' })


            doc.setFontSize(16)
            doc.text("รายการ", 73, 92, { align: 'left' })
            doc.text("Description", 70, 96, { align: 'left' })

            doc.text("จำนวนหน่วย", 163, 92, { align: 'left' })
            doc.text("Units", 167, 96, { align: 'left' })

            doc.text("ราคาต่อหน่วย", 202, 92, { align: 'left' })
            doc.text("Unit /Price", 203, 96, { align: 'left' })

            doc.text("จำนวนเงิน", 246, 92, { align: 'left' })
            doc.text("Amount", 247, 96, { align: 'left' })


            doc.text("หมายเหตุ :", 22, 170, { align: 'left' })
            doc.text(note, 40, 170, { align: 'left' })
            
            doc.text("รวมเงินทั้งสิ้น/Grand Total", 168, 170, { align: 'left' })
            doc.text(`${Number(End_Grandtotal).toFixed(2)}`, 250, 170, { align: 'center' })



            doc.text(`Vat  ${Vat} %`, 168, 180, { align: 'left' })
            doc.text(`${Number(Vat_Grandtotal).toFixed(2)}`, 250, 180, { align: 'center' })

            doc.text(`ราคาก่อน Vat`, 168, 190, { align: 'left' })
            doc.text(Grandtotal, 250, 190, { align: 'center' })


        

            doc.setFontSize(14)
            doc.text("เขียนโดย", 200, 208, { align: 'left' })
            doc.text(credit, 215, 208, { align: 'left' })
            doc.text("วันที่", 240, 208, { align: 'left' })
            doc.text(_Date, 248, 208, { align: 'left' })
            doc.text(Time, 268, 208, { align: 'left' })

            doc.setFontSize(16)
            doc.text(names, 20, 105, { align: 'left' })
            doc.text(Units, 170, 105, { align: 'left' })
            doc.text(Price, 210, 105, { align: 'left' })
            doc.text(Amount, 250, 105, { align: 'left' })
            if (Invoices.length > 0 && index !== (Invoices.length - 1)) {
                doc.addPage()
            }

            return null;
        })
        let src_pdf = doc.output('datauristring');
        const iframe = `
        <title>${document_name}</title>
        <iframe width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>`
        const x = window.open();
        x.document.title = "preview booking"
        x.document.open();
        x.document.write(iframe);
        x.document.close();

    }

}
// ใบเสร็จ  //

/**
 * @param  {} booking
 * @param  {} type
 */
export const export_Receipt_pdf = (booking: Booking, type, table_prices) => {
    // const document_name = 'ใบเสร็จ'
    let Vat = 7;
    if (booking === undefined) {
        alert('ไม่มีข้อมูลในการสร้าง ใบเสร็จ')
        return
    }

    let _table_prices = table_prices ? table_prices : []
    if (type === 'booking') {
        _table_prices = [{
            name: `เงินจองห้อง ${booking.Room.name}`,
            unit: "1",
            price: booking.deposit ? booking.deposit : "0",
            amount: booking.deposit ? booking.deposit : "0"
        }]
    }
    else if (type === 'checkin') {

    }
    else if (type === 'checkout') {

    }
    let Noanswer = "-"
    let business_Address_1 = "119 ซอยสีม่วงอนุสรณ์ ถนน สุทธิสาร"
    let business_Address_2 = "แขวง ดินแดง เขต ดินแดง กรุงเทพ 10400"
    let Taxid = "0105536011803"
    let Phone = "026937005"
    let Email = "sales@primusthai.com"
    console.log('export_Receipt_pdf', booking)
    let Name = booking.customer_name ? `${booking.customer_name} ${booking.customer_lastname}` : Noanswer
    let Address1 = booking && booking.customer_address ? booking.customer_address : "-----------------" /// ที่อยู่ ผู้รับใบเสร็จ 
    // let Address2 = "-----------------"
    let No = booking.id ? booking.id : Noanswer
    let _Date = formatDate(new Date())
    let HoneNo = booking.Room && booking.Room.floor && booking.Room.floor.building && booking.Room.floor.building.name ? booking.Room.floor.building.name : Noanswer
    let Room = booking.Room && booking.Room.name ? booking.Room.name : Noanswer
    // let Money = "0.00"
    // let credit = "  ...คนออกบิล... "
    // let Time = toHHMMSS(new Date())

    let _total_price = 0
    let _total_vat = 0
    _table_prices.map(item => {
        let _price = (item && item.price) ? (item.type_price === "ราคารวมvat" ? Number(item.price * 100.0 / 107.0) : Number(item.price)) : 0
        _total_price += _price;
        _total_vat += (item.selectvat === "คิดvat" ? _price * (Vat / 100) : 0)
        return 1;
    })
    // let Grandtotal = `${_total_price.toFixed(2)}`
    let Vat_Grandtotal = `${_total_vat.toFixed(2)}`
    let End_Grandtotal = `${(_total_price + _total_vat).toFixed(2)}`

    const names = _table_prices.map(_table_prices => _table_prices.name);
    const Units = _table_prices.map(_table_prices => (_table_prices.unit !== undefined) ? `${_table_prices.unit}` : '1');
    const Price =  _table_prices.map(list =>  (calculate_price(list.price ,list.type_price , list.selectvat  )  )  ) 
    const Amount =    _table_prices.map( list =>  (calculate_Amount(list.price,list.number_item,list.type_price ,list.selectvat)) ) 

    const doc = new jsPDF('l', 'mm', [297, 230]);


    AddTH_font(doc, 'yourCustomFont.ttf')
    doc.addFont('yourCustomFont.ttf', 'yourCustomFont', 'normal');
    doc.setFont('yourCustomFont');

    //bill box

    doc.setDrawColor(0, 102, 205)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(195, 37, 78, 10, 2, 2, 'FD')
    doc.roundedRect(195, 49, 78, 10, 2, 2, 'FD')
    doc.roundedRect(195, 61, 78, 10, 2, 2, 'FD')
    doc.roundedRect(195, 73, 78, 10, 2, 2, 'FD')



    //address box
    doc.setDrawColor(0, 102, 205)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(17, 37, 176, 46, 6, 6, 'FD')



    //topic box
    doc.setDrawColor(60, 50, 170)
    doc.setFillColor(0, 102, 205)
    doc.rect(17, 85, 138, 15, 'FD')
    doc.rect(155, 85, 38, 15, 'FD')
    doc.rect(193, 85, 38, 15, 'FD')
    doc.rect(231, 85, 46, 15, 'FD')


    //result box
    doc.setDrawColor(60, 50, 170)
    doc.setFillColor(255, 255, 255)
    doc.rect(17, 100, 138, 60, 'FD')
    doc.rect(155, 100, 38, 60, 'FD')
    doc.rect(193, 100, 38, 60, 'FD')
    doc.rect(231, 100, 46, 60, 'FD')

    //last box
    doc.setFillColor(200, 230, 255)
    doc.rect(17, 162, 214, 31, 'FD')
    doc.rect(231, 162, 46, 31, 'FD')

    doc.setDrawColor(60, 50, 170)
    doc.rect(40, 166, 5, 5, 'FD')
    doc.rect(72, 166, 5, 5, 'FD')
    doc.rect(40, 166, 5, 5, 'FD')

    doc.setFontSize(14)
    doc.text("เงินสด", 47, 167, { align: 'left' })
    doc.text("Cash", 47, 171, { align: 'left' })
    doc.text("อื่นๆ ..........................................................................", 79, 167, { align: 'left' })
    doc.text("Other", 79, 171, { align: 'left' })
    doc.text("เช็คธนาคาร/สาขา ............................................................................................", 47, 179, { align: 'left' })
    doc.text("Cheque Bank/Branch", 47, 183, { align: 'left' })
    doc.text("เลขที่เช็ค ............................................ลงวันที่...................................................", 47, 187, { align: 'left' })

    doc.text("Cash No. ", 47, 191, { align: 'left' })

    doc.text("Date ", 95, 191, { align: 'left' })

    doc.setFontSize(16)
    doc.text(business_Address_1, 17, 21, { align: 'left' })
    doc.setFontSize(14)
    doc.text(business_Address_2, 17, 26, { align: 'left' })

    doc.setFontSize(14)
    doc.text("Tax ID : ", 17, 31, { align: 'left' })
    doc.text(Taxid, 29, 31, { align: 'left' })
    doc.text("โทร : ", 54, 31, { align: 'left' })
    doc.text(Phone, 62, 31, { align: 'left' })
    doc.text("Email :", 84, 31, { align: 'left' })
    doc.text(Email, 95, 31, { align: 'left' })

    doc.setFontSize(23)
    doc.text("ต้นฉบับใบเสร็จรับเงิน/ORIGINAL RECEIPT", 90, 10, { align: 'left' })

    doc.setFontSize(16)
    doc.text("ชื่อ/Name :", 20, 50, { align: 'left' })
    doc.setFontSize(16)
    doc.text(Name, 50, 50, { align: 'left' })


    doc.setFontSize(14)
    doc.text("ที่อยู่/Address :", 20, 65, { align: 'left' })
    doc.setFontSize(16)
    doc.text(Address1, 50, 65, { align: 'left' })
    // doc.text(Address2 ,50, 60, {align: 'left'})

    doc.setFontSize(14)
    doc.text("เลขที่/No. ", 202, 43, { align: 'left' })
    doc.setFontSize(13)
    doc.text(No, 230, 43, { align: 'left' })
    doc.setFontSize(14)
    doc.text("วันที่/Date ", 202, 55, { align: 'left' })
    doc.setFontSize(16)
    doc.text(_Date, 238, 55, { align: 'left' })
    doc.setFontSize(14)
    doc.text("เลขที่ชุดห้อง/Room", 202, 67, { align: 'left' })
    doc.setFontSize(16)
    doc.text(Room, 238, 67, { align: 'left' })
    doc.setFontSize(14)
    doc.text("บ้านเลขที่/Home No. ", 202, 79, { align: 'left' })
    doc.setFontSize(16)
    doc.text(HoneNo, 238, 79, { align: 'left' })


    doc.setFontSize(16)
    doc.text("รายการ", 73, 92, { align: 'left' })
    doc.text("Description", 70, 96, { align: 'left' })

    doc.text("จำนวนหน่วย", 163, 92, { align: 'left' })
    doc.text("Units", 167, 96, { align: 'left' })

    doc.text("ราคาต่อหน่วย", 202, 92, { align: 'left' })
    doc.text("Unit /Price", 203, 96, { align: 'left' })

    doc.text("จำนวนเงิน", 246, 92, { align: 'left' })
    doc.text("Amount", 247, 96, { align: 'left' })

    doc.setFontSize(14)
    doc.text("หมายเหตุ กรณีชำระโดยเช็ค ใบเสร็จรับเงินนี้ จะสมบูรณ์เมื่อได้เรียกเก็บเงินตามเช็คแล้ว", 17, 198, { align: 'left' })
    doc.setFontSize(16)
    doc.text("ชำระโดย", 22, 170, { align: 'left' })

    doc.text(`Vat ${Vat}%`, 168, 171, { align: 'left' })
    doc.text(`${Number(Vat_Grandtotal).toFixed(2)}`, 250, 171, { align: 'left' })


    doc.text("รวมเงินทั้งสิ้น/Grand Total", 168, 181, { align: 'left' })
    doc.text(`${Number(End_Grandtotal).toFixed(2)}`, 250, 181, { align: 'left' })


    doc.text("..................................................................................", 50, 209, { align: 'left' })
    doc.text("ผู้รับเงิน/Collector", 70, 215, { align: 'left' })


    doc.text("..................................................................................", 156, 209, { align: 'left' })
    doc.text("ผู้มีอำนาจลงนาม/Authorized", 168, 215, { align: 'left' })


    doc.setFontSize(16)
    doc.text(names, 20, 105, { align: 'left' })
    doc.text(Units, 170, 105, { align: 'left' })
    doc.text(Price, 210, 105, { align: 'left' })
    doc.text(Amount, 250, 105, { align: 'left' })

    let src_pdf = doc.output('datauristring');

    const iframe = `<iframe width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>`
    const x = window.open();
    x.document.title = "preview booking"
    x.document.open();
    x.document.write(iframe);
    x.document.close();



}

export const export_Receipts_pdf = (Receipts) => {
    if (Receipts && Array.isArray(Receipts) && Receipts.length) {
        const document_name = 'ใบเสร็จ'
        let Vat = 7;
        let Noanswer = "-"
        let business_Address_1 = "119 ซอยสีม่วงอนุสรณ์ ถนน สุทธิสาร"
        let business_Address_2 = "แขวง ดินแดง เขต ดินแดง กรุงเทพ 10400"
        let Taxid = "0105536011803"
        let Phone = "026937005"
        let Email = "sales@primusthai.com"
        const doc = new jsPDF('l', 'mm', [297, 230]);
        Receipts.map((receipt, index) => {

            let Name = (receipt && receipt.Invoice && receipt.Invoice.Room && receipt.Invoice.Room.members && receipt.Invoice.Room.members.length
                && receipt.Invoice.Room.members[0] && receipt.Invoice.Room.members[0].name) ? `${receipt.Invoice.Room.members[0].name} ${receipt.Invoice.Room.members[0].lastname}` : Noanswer
            let Address1 = (receipt && receipt.Invoice && receipt.Invoice.Room && receipt.Invoice.Room.members && receipt.Invoice.Room.members.length
                && receipt.Invoice.Room.members[0] && receipt.Invoice.Room.members[0].address) ? receipt.Invoice.Room.members[0].address : "-----------------" /// ที่อยู่ ผู้รับใบเสร็จ 

            let No = receipt && receipt.id ? receipt.id : Noanswer
            let _Date = receipt && receipt.monthlybilling ? formatDate(receipt.monthlybilling) : '----'
            let HoneNo = receipt && receipt.Invoice && receipt.Invoice.Room && receipt.Invoice.Room.floor && receipt.Invoice.Room.floor.building
                && receipt.Invoice.Room.floor.building.name ? receipt.Invoice.Room.floor.building.name : Noanswer

            let Room = receipt && receipt.Invoice && receipt.Invoice.Room && receipt.Invoice.Room.name ? receipt.Invoice.Room.name : Noanswer


            let _table_prices = receipt && receipt.lists ? receipt.lists : [{
                name: `----`,
                number_item: "1",
                price: `---`,
                amount: `---`
            }]

            let _total_price = 0
            let _total_vat = 0
            _table_prices.map(item => {
                let _price = (item && item.price) ? (item.type_price === "ราคารวมvat" ? Number(item.price * 100.0 / 107.0) : Number(item.price)) : 0
                _total_price += _price;
                _total_vat += (item.selectvat === "คิดvat" ? _price * (Vat / 100) : 0)
                return 1;
            })

            // let Grandtotal = `${_total_price.toFixed(2)}`
            let Vat_Grandtotal = `${_total_vat.toFixed(2)}`
            let End_Grandtotal = `${(_total_price + _total_vat).toFixed(2)}`

            const names = _table_prices.map(_table_prices => _table_prices.name);
            const Units = _table_prices.map(_table_prices => (_table_prices.unit !== undefined) ? `${_table_prices.unit}` : '1');
            //const Price = _table_prices.map(_table_prices => `${ (Number(_table_prices.price).toFixed(2) ) }`);
         //   const Price = _table_prices.map(_table_prices => `${ Number(_table_prices.price).toFixed(2)}`);

            // const Price = _table_prices.map(_table_prices => `${(_table_prices.type_price === "ราคารวมvat" ? 
            // Number(_table_prices.price).toFixed(2) :
            // Number(_table_prices.price).toFixed(2))
            //     }`);
            const Price =  _table_prices.map(list =>  (calculate_price(list.price ,list.type_price , list.selectvat  )  )  ) 
            const Amount =    _table_prices.map( list =>  (calculate_Amount(list.price,list.number_item,list.type_price ,list.selectvat)) ) 

          




            AddTH_font(doc, 'yourCustomFont.ttf')
            doc.addFont('yourCustomFont.ttf', 'yourCustomFont', 'normal');
            doc.setFont('yourCustomFont');

            //bill box

            doc.setDrawColor(0, 102, 205)
            doc.setFillColor(255, 255, 255)
            doc.roundedRect(195, 37, 78, 10, 2, 2, 'FD')
            doc.roundedRect(195, 49, 78, 10, 2, 2, 'FD')
            doc.roundedRect(195, 61, 78, 10, 2, 2, 'FD')
            doc.roundedRect(195, 73, 78, 10, 2, 2, 'FD')



            //address box
            doc.setDrawColor(0, 102, 205)
            doc.setFillColor(255, 255, 255)
            doc.roundedRect(17, 37, 176, 46, 6, 6, 'FD')



            //topic box
            doc.setDrawColor(60, 50, 170)
            doc.setFillColor(0, 102, 205)
            doc.rect(17, 85, 138, 15, 'FD')
            doc.rect(155, 85, 38, 15, 'FD')
            doc.rect(193, 85, 38, 15, 'FD')
            doc.rect(231, 85, 46, 15, 'FD')


            //result box
            doc.setDrawColor(60, 50, 170)
            doc.setFillColor(255, 255, 255)
            doc.rect(17, 100, 138, 60, 'FD')
            doc.rect(155, 100, 38, 60, 'FD')
            doc.rect(193, 100, 38, 60, 'FD')
            doc.rect(231, 100, 46, 60, 'FD')

            //last box
            doc.setFillColor(200, 230, 255)
            doc.rect(17, 162, 214, 31, 'FD')
            doc.rect(231, 162, 46, 31, 'FD')

            doc.setDrawColor(60, 50, 170)
            doc.rect(40, 166, 5, 5, 'FD')
            doc.rect(72, 166, 5, 5, 'FD')
            doc.rect(40, 166, 5, 5, 'FD')

            doc.setFontSize(14)
            doc.text("เงินสด", 47, 167, { align: 'left' })
            doc.text("Cash", 47, 171, { align: 'left' })
            doc.text("อื่นๆ ..........................................................................", 79, 167, { align: 'left' })
            doc.text("Other", 79, 171, { align: 'left' })
            doc.text("เช็คธนาคาร/สาขา ............................................................................................", 47, 179, { align: 'left' })
            doc.text("Cheque Bank/Branch", 47, 183, { align: 'left' })
            doc.text("เลขที่เช็ค ............................................ลงวันที่...................................................", 47, 187, { align: 'left' })

            doc.text("Cash No. ", 47, 191, { align: 'left' })

            doc.text("Date ", 95, 191, { align: 'left' })

            doc.setFontSize(16)
            doc.text(business_Address_1, 17, 21, { align: 'left' })
            doc.setFontSize(14)
            doc.text(business_Address_2, 17, 26, { align: 'left' })

            doc.setFontSize(14)
            doc.text("Tax ID : ", 17, 31, { align: 'left' })
            doc.text(Taxid, 29, 31, { align: 'left' })
            doc.text("โทร : ", 54, 31, { align: 'left' })
            doc.text(Phone, 62, 31, { align: 'left' })
            doc.text("Email :", 84, 31, { align: 'left' })
            doc.text(Email, 95, 31, { align: 'left' })

            doc.setFontSize(23)
            doc.text("ต้นฉบับใบเสร็จรับเงิน/ORIGINAL RECEIPT", 90, 10, { align: 'left' })

            doc.setFontSize(16)
            doc.text("ชื่อ/Name :", 20, 50, { align: 'left' })
            doc.setFontSize(16)
            doc.text(Name, 50, 50, { align: 'left' })


            doc.setFontSize(14)
            doc.text("ที่อยู่/Address :", 20, 65, { align: 'left' })
            doc.setFontSize(16)
            doc.text(Address1, 50, 65, { align: 'left' })
            // doc.text(Address2 ,50, 60, {align: 'left'})

            doc.setFontSize(14)
            doc.text("เลขที่/No. ", 202, 43, { align: 'left' })
            doc.setFontSize(13)
            doc.text(No, 230, 43, { align: 'left' })
            doc.setFontSize(14)
            doc.text("วันที่/Date ", 202, 55, { align: 'left' })
            doc.setFontSize(16)
            doc.text(_Date, 238, 55, { align: 'left' })
            doc.setFontSize(14)
            doc.text("เลขที่ชุดห้อง/Room", 202, 67, { align: 'left' })
            doc.setFontSize(16)
            doc.text(Room, 238, 67, { align: 'left' })
            doc.setFontSize(14)
            doc.text("บ้านเลขที่/Home No. ", 202, 79, { align: 'left' })
            doc.setFontSize(16)
            doc.text(HoneNo, 238, 79, { align: 'left' })


            doc.setFontSize(16)
            doc.text("รายการ", 73, 92, { align: 'left' })
            doc.text("Description", 70, 96, { align: 'left' })

            doc.text("จำนวนหน่วย", 163, 92, { align: 'left' })
            doc.text("Units", 167, 96, { align: 'left' })

            doc.text("ราคาต่อหน่วย", 202, 92, { align: 'left' })
            doc.text("Unit /Price", 203, 96, { align: 'left' })

            doc.text("จำนวนเงิน", 246, 92, { align: 'left' })
            doc.text("Amount", 247, 96, { align: 'left' })

            doc.setFontSize(14)
            doc.text("หมายเหตุ กรณีชำระโดยเช็ค ใบเสร็จรับเงินนี้ จะสมบูรณ์เมื่อได้เรียกเก็บเงินตามเช็คแล้ว", 17, 198, { align: 'left' })
            doc.setFontSize(16)
            doc.text("ชำระโดย", 22, 170, { align: 'left' })


            
            doc.text("รวมเงินทั้งสิ้น/Grand Total", 168, 171, { align: 'left' })
            doc.text(`${Number(End_Grandtotal).toFixed(2)}`, 250, 171, { align: 'left' })


            doc.text(`ราคาก่อน Vat ${Vat}%`, 168, 181, { align: 'left' })
            doc.text(`${Number(End_Grandtotal - Vat_Grandtotal).toFixed(2)}`, 250, 181, { align: 'left' })

            doc.text(`Vat ${Vat}%`, 168, 191, { align: 'left' })
            doc.text(`${Number(Vat_Grandtotal).toFixed(2)}`, 250, 191, { align: 'left' })



            doc.text("..................................................................................", 50, 209, { align: 'left' })
            doc.text("ผู้รับเงิน/Collector", 70, 215, { align: 'left' })


            doc.text("..................................................................................", 156, 209, { align: 'left' })
            doc.text("ผู้มีอำนาจลงนาม/Authorized", 168, 215, { align: 'left' })


            doc.setFontSize(16)
            doc.text(names, 20, 105, { align: 'left' })
            doc.text(Units, 170, 105, { align: 'left' })
            doc.text(Price, 210, 105, { align: 'left' })
            doc.text(Amount, 250, 105, { align: 'left' })

            if (Receipts.length > 0 && index !== (Receipts.length - 1)) {
                doc.addPage()
            }

            return null;

        }

        )
        let src_pdf = doc.output('datauristring');
        const iframe = `<title>${document_name}</title><iframe width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>`
        const x = window.open();
        x.document.title = "preview booking"
        x.document.open();
        x.document.write(iframe);
        x.document.close();
    }
}

// ใบคืนเงินประกัน
export const export_Reimbursement_pdf = (booking, type, table_price, defaultData) => {

    let AddressForm = defaultData

    const document_name = 'ใบคืนเงินประกัน'
    let Vat = 7;
    if (booking === undefined) {
        alert('ไม่มีข้อมูลในการสร้าง ใบเสร็จ')
        return
    }
    let _table_prices = []
    if (type === 'booking') {
        _table_prices = [{
            name: `เงินจองห้อง ${booking.Room.name}`,
            unit: "1",
            price: booking.deposit ? booking.deposit : "0",
            amount: booking.deposit ? booking.deposit : "0"
        }]
    }
    else if (type === 'checkin') {

    }
    else if (type === 'checkout') {

    }
    let Noanswer = "-"
    let business_Address_1 = AddressForm.no + " ซอย " + AddressForm.alley + " ถนน " + AddressForm.road ? AddressForm.no + " ซอย " + AddressForm.alley + " ถนน " + AddressForm.road : '---'
    let business_Address_2 = " แขวง " + AddressForm.boundary + " เขต " + AddressForm.district + " จังหวัด " + AddressForm.province + " " + AddressForm.code ? " แขวง " + AddressForm.boundary + " เขต " + AddressForm.district + " จังหวัด " + AddressForm.province + " " + AddressForm.code : '---'
    let Taxid = "0105536011803"
    let Phone = AddressForm.tel ? AddressForm.tel : '---'
    let Email = "sales@primusthai.com"
    console.log('export_Receipt_pdf', booking)
    let Name = booking.customer_name ? `${booking.customer_name} ${booking.customer_lastname}` : Noanswer
    let Address1 = booking && booking.customer_address ? booking.customer_address : "-----------------" /// ที่อยู่ ผู้รับใบเสร็จ 
    // let Address2 = "-----------------"
    let No = booking.id ? booking.id : Noanswer
    let _Date = formatDate(new Date())
    let HoneNo = booking.Room && booking.Room.floor && booking.Room.floor.building && booking.Room.floor.building.name ? booking.Room.floor.building.name : Noanswer
    let Room = booking.Room && booking.Room.name ? booking.Room.name : Noanswer
    // let Money = "0.00"
    // let credit = "  ...คนออกบิล... "
    // let Time = toHHMMSS(new Date())

    let _total_price = 0

    _table_prices.map(item => _total_price += (item && item.price) ?

        (item.type_price === "ราคารวมvat" ? Number(item.price * 100.0 / 107.0) : Number(item.price))
        : 0)
    let Grandtotal = `${_total_price.toFixed(2)}`

    const names = _table_prices.map(_table_prices => _table_prices.name);
    const Units = _table_prices.map(_table_prices => _table_prices.unit);

    // const Price = _table_prices.map(_table_prices => `${(_table_prices.type_price === "ราคารวมvat" ? Number(_table_prices.price * 100.0 / 107.0).toFixed(2) : Number(_table_prices.price).toFixed(2))
    //     }`);


    const Price =  _table_prices.map(list =>  (calculate_price(list.price ,list.type_price , list.selectvat  )  )  ) 
    const Amount =    _table_prices.map( list =>  (calculate_Amount(list.price,list.number_item,list.type_price ,list.selectvat)) ) 


    const doc = new jsPDF('l', 'mm', [297, 230]);


    AddTH_font(doc, 'yourCustomFont.ttf')
    doc.addFont('yourCustomFont.ttf', 'yourCustomFont', 'normal');
    doc.setFont('yourCustomFont');

    //bill box

    doc.setDrawColor(186, 85, 211)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(195, 37, 78, 10, 2, 2, 'FD')
    doc.roundedRect(195, 49, 78, 10, 2, 2, 'FD')
    doc.roundedRect(195, 61, 78, 10, 2, 2, 'FD')
    doc.roundedRect(195, 73, 78, 10, 2, 2, 'FD')



    //address box
    doc.setDrawColor(186, 85, 211)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(17, 37, 176, 46, 6, 6, 'FD')



    //topic box
    doc.setDrawColor(138, 43, 226)
    doc.setFillColor(186, 85, 211)
    doc.rect(17, 85, 138, 15, 'FD')
    doc.rect(155, 85, 38, 15, 'FD')
    doc.rect(193, 85, 38, 15, 'FD')
    doc.rect(231, 85, 46, 15, 'FD')


    //result box
    doc.setDrawColor(138, 43, 226)
    doc.setFillColor(255, 255, 255)
    doc.rect(17, 100, 138, 60, 'FD')
    doc.rect(155, 100, 38, 60, 'FD')
    doc.rect(193, 100, 38, 60, 'FD')
    doc.rect(231, 100, 46, 60, 'FD')

    //last box
    doc.setFillColor(238, 130, 238)
    doc.rect(17, 162, 214, 31, 'FD')
    doc.rect(231, 162, 46, 31, 'FD')

    doc.setDrawColor(60, 50, 170)
    doc.rect(40, 166, 5, 5, 'FD')
    doc.rect(72, 166, 5, 5, 'FD')
    doc.rect(40, 175, 5, 5, 'FD')

    doc.setFontSize(14)
    doc.text("เงินสด", 47, 167, { align: 'left' })
    doc.text("Cash", 47, 171, { align: 'left' })
    doc.text("อื่นๆ ..........................................................................", 79, 167, { align: 'left' })
    doc.text("Other", 79, 171, { align: 'left' })
    doc.text("เช็คธนาคาร/สาขา ............................................................................................", 47, 179, { align: 'left' })
    doc.text("Cheque Bank/Branch", 47, 183, { align: 'left' })
    doc.text("เลขที่เช็ค ............................................ลงวันที่...................................................", 47, 187, { align: 'left' })

    doc.text("Cash No. ", 47, 191, { align: 'left' })

    doc.text("Date ", 95, 191, { align: 'left' })

    doc.setFontSize(16)
    doc.text(business_Address_1, 17, 21, { align: 'left' })
    doc.setFontSize(14)
    doc.text(business_Address_2, 17, 26, { align: 'left' })

    doc.setFontSize(14)
    doc.text("Tax ID : ", 17, 31, { align: 'left' })
    doc.text(Taxid, 29, 31, { align: 'left' })
    doc.text("โทร : ", 54, 31, { align: 'left' })
    doc.text(Phone, 62, 31, { align: 'left' })
    doc.text("Email :", 84, 31, { align: 'left' })
    doc.text(Email, 95, 31, { align: 'left' })

    doc.setFontSize(23)
    doc.text("ต้นฉบับใบเสร็จคืนเงิน/ORIGINAL REIMBURSEMENT", 90, 10, { align: 'left' })

    doc.setFontSize(16)
    doc.text("ชื่อ/Name :", 20, 50, { align: 'left' })
    doc.setFontSize(16)
    doc.text(Name, 50, 50, { align: 'left' })


    doc.setFontSize(14)
    doc.text("ที่อยู่/Address :", 20, 65, { align: 'left' })
    doc.setFontSize(16)
    doc.text(Address1, 50, 65, { align: 'left' })
    // doc.text(Address2 ,50, 60, {align: 'left'})

    doc.setFontSize(14)
    doc.text("เลขที่/No. ", 202, 43, { align: 'left' })
    doc.setFontSize(13)
    doc.text(No, 230, 43, { align: 'left' })
    doc.setFontSize(14)
    doc.text("วันที่/Date ", 202, 55, { align: 'left' })
    doc.setFontSize(16)
    doc.text(_Date, 238, 55, { align: 'left' })
    doc.setFontSize(14)
    doc.text("เลขที่ชุดห้อง/Room", 202, 67, { align: 'left' })
    doc.setFontSize(16)
    doc.text(Room, 238, 67, { align: 'left' })
    doc.setFontSize(14)
    doc.text("บ้านเลขที่/Home No. ", 202, 79, { align: 'left' })
    doc.setFontSize(16)
    doc.text(HoneNo, 238, 79, { align: 'left' })


    doc.setFontSize(16)
    doc.text("รายการ", 73, 92, { align: 'left' })
    doc.text("Description", 70, 96, { align: 'left' })

    doc.text("จำนวนหน่วย", 163, 92, { align: 'left' })
    doc.text("Units", 167, 96, { align: 'left' })

    doc.text("ราคาต่อหน่วย", 202, 92, { align: 'left' })
    doc.text("Unit /Price", 203, 96, { align: 'left' })

    doc.text("จำนวนเงิน", 246, 92, { align: 'left' })
    doc.text("Amount", 247, 96, { align: 'left' })

    doc.setFontSize(14)
    doc.text("หมายเหตุ กรณีชำระโดยเช็ค ใบเสร็จรับเงินนี้ จะสมบูรณ์เมื่อได้เรียกเก็บเงินตามเช็คแล้ว", 17, 198, { align: 'left' })
    doc.setFontSize(16)
    doc.text("ชำระโดย", 22, 170, { align: 'left' })


    doc.text("Vat", 168, 181, { align: 'left' })
    doc.text(`${Number(Grandtotal * (Vat / 100)).toFixed(2)}`, 250, 181, { align: 'left' })


    doc.text("รวมเงินทั้งสิ้น/Grand Total", 168, 191, { align: 'left' })
    doc.text(Grandtotal, 250, 191, { align: 'left' })

    doc.text("..................................................................................", 50, 209, { align: 'left' })
    doc.text("ผู้รับเงิน/Collector", 70, 215, { align: 'left' })


    doc.text("..................................................................................", 156, 209, { align: 'left' })
    doc.text("ผู้มีอำนาจลงนาม/Authorized", 168, 215, { align: 'left' })


    doc.setFontSize(16)
    doc.text(names, 20, 105, { align: 'left' })
    doc.text(Units, 170, 105, { align: 'left' })
    doc.text(Price, 210, 105, { align: 'left' })
    doc.text(Amount, 250, 105, { align: 'left' })

    let src_pdf = doc.output('datauristring');

    const iframe = `
    <title>${document_name}</title>
    <iframe width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>
    `
    const x = window.open();
    x.document.title = "preview booking"
    x.document.open();
    x.document.write(iframe);
    x.document.close();



}

export const export_Reimbursements_pdf = (Reimbursement) => {

}


// ใบกำกับภาษี
export const export_taxinvoice_pdf = (room, table_price, defaultData) => {

    let AddressForm = defaultData

    const document_name = 'ใบกำกับภาษี'
    let business_Address_1 = AddressForm.no + " ซอย " + AddressForm.alley + " ถนน " + AddressForm.road ? AddressForm.no + " ซอย " + AddressForm.alley + " ถนน " + AddressForm.road : '---'
    let business_Address_2 = " แขวง " + AddressForm.boundary + " เขต " + AddressForm.district + " จังหวัด " + AddressForm.province + " " + AddressForm.code ? " แขวง " + AddressForm.boundary + " เขต " + AddressForm.district + " จังหวัด " + AddressForm.province + " " + AddressForm.code : '---'
    let Taxid = "01055360118036666"
    let Phone = AddressForm.tel ? AddressForm.tel : "---"
    let Email = "sales@primusthai.com"
    let Cash = "-------"
    let Cheque = "-------"
    let ChequeNo = "-------"
    let ChequeDate = "-------"
    let Transfer = "-------"
    let TransferDate = "-------"

    let Vat = 7;
    let Name = room && room.data && room.data.members && room.data.members.length > 0
        ? `${room.data.members[0].name}  ${room.data.members[0].lastname} ` : '--------'
    let Address1 = "........................................."   // ที่อยู่ ของผู้รับบิล
    // let Address2 = "........................................."    // ที่อยู่ ของผู้รับบิล
    let No = (room && room.data && room.data.id) ? room.data.id : "---"
    let _Date = formatDate(new Date())
    let HoneNo = room.name ? room.name : "------"
    let Month = "12/2021"
    // let Grand = "144.00"
    // let Backforward = "0.00"

    let Money = "0.00"
    let credit = "  ...คนออกบิล... "
    let Time = toHHMMSS(new Date())
    // let note = "เลขที่บัญชี 2878-xxxxxx-x"


    let table_prices = table_price ? table_price : [{
        name: `----`,
        unit: "1",
        price: `---`,
        amount: `---`
    }]
    let _total_price = 0

    table_prices.map(item => _total_price += (item && item.price) ? Number(item.price) : 0)
    let Grandtotal = `${_total_price}`
    const names = table_prices.map(table_prices => table_prices.name);
    const Units = table_prices.map(table_prices => (table_prices.unit !== undefined) ? `${table_prices.unit}` : '1');
   // const Price = table_prices.map(table_prices => `${table_prices.price}`);
    const Price = table_prices.map(_table_prices => `${ Number(_table_prices.price).toFixed(2)}`);

    const Amount = table_prices.map(table_prices => `${Number(table_prices.price) * Number((table_prices.unit !== undefined) ? `${table_prices.unit}` : '1')}`);

    const doc = new jsPDF('l', 'mm', [297, 220]);


    AddTH_font(doc, 'yourCustomFont.ttf')
    doc.addFont('yourCustomFont.ttf', 'yourCustomFont', 'normal');
    doc.setFont('yourCustomFont');




    //main box
    doc.setDrawColor(156, 260, 235)
    doc.setFillColor(156, 260, 235)
    doc.rect(15, 35, 265, 160, 'FD')

    //address box
    doc.setDrawColor(204, 263, 245)
    doc.setFillColor(204, 263, 245)
    doc.roundedRect(17, 37, 173, 46, 6, 6, 'FD')

    doc.roundedRect(193, 37, 38, 10, 6, 6, 'FD')
    doc.roundedRect(232, 37, 47, 10, 6, 6, 'FD')
    doc.roundedRect(193, 49, 38, 10, 6, 6, 'FD')
    doc.roundedRect(232, 49, 47, 10, 6, 6, 'FD')
    doc.roundedRect(193, 61, 38, 10, 6, 6, 'FD')
    doc.roundedRect(232, 61, 47, 10, 6, 6, 'FD')
    doc.roundedRect(193, 73, 38, 10, 6, 6, 'FD')
    doc.roundedRect(232, 73, 47, 10, 6, 6, 'FD')

    //topic box
    doc.setDrawColor(40, 120, 50)
    doc.setFillColor(110, 250, 230)
    doc.rect(17, 85, 138, 15, 'FD')
    doc.rect(155, 85, 38, 15, 'FD')
    doc.rect(193, 85, 38, 15, 'FD')
    doc.rect(231, 85, 46, 15, 'FD')

    doc.setDrawColor(40, 120, 50)
    doc.setFillColor(204, 253, 245)

    //result box
    doc.rect(17, 100, 138, 60, 'FD')
    doc.rect(155, 100, 38, 60, 'FD')
    doc.rect(193, 100, 38, 60, 'FD')
    doc.rect(231, 100, 46, 60, 'FD')

    //last box
    doc.setFillColor(255, 255, 255)
    doc.rect(17, 162, 138, 31, 'FD')
    doc.setFillColor(240, 253, 245)
    doc.rect(155, 162, 76, 10, 'FD')
    doc.rect(155, 172, 76, 11, 'FD')
    doc.rect(155, 183, 76, 10, 'FD')

    doc.rect(231, 162, 46, 10, 'FD')
    doc.rect(231, 172, 46, 11, 'FD')
    doc.rect(231, 183, 46, 10, 'FD')


    doc.setFontSize(16)
    doc.text(business_Address_1, 15, 21, { align: 'left' })
    doc.setFontSize(14)
    doc.text(business_Address_2, 15, 26, { align: 'left' })

    doc.setFontSize(14)
    doc.text("Tax ID : ", 15, 31, { align: 'left' })
    doc.text(Taxid, 27, 31, { align: 'left' })
    doc.text("โทร : ", 60, 31, { align: 'left' })
    doc.text(Phone, 68, 31, { align: 'left' })
    doc.text("Email :", 90, 31, { align: 'left' })
    doc.text(Email, 101, 31, { align: 'left' })

    doc.setFontSize(23)
    doc.text("ใบกำกับภาษี / TAX INVOICE", 110, 10, { align: 'left' })

    doc.setFontSize(14)
    doc.text("ชื่อ/Name :", 20, 50, { align: 'left' })
    doc.setFontSize(16)
    doc.text(Name, 50, 50, { align: 'left' })


    doc.setFontSize(14)
    doc.text("ที่อยู่/Address :", 20, 65, { align: 'left' })
    doc.setFontSize(16)
    doc.text(Address1, 50, 65, { align: 'left' })
    // doc.text(Address2 ,50, 60, {align: 'left'})

    doc.setFontSize(14)
    doc.text("เลขที่/No. ", 205, 43, { align: 'left' })
    doc.setFontSize(12)
    doc.text(No, 240, 43, { align: 'left' })
    doc.setFontSize(14)
    doc.text("วันที่/Date ", 205, 55, { align: 'left' })
    doc.setFontSize(16)
    doc.text(_Date, 245, 55, { align: 'left' })
    doc.setFontSize(14)
    doc.text("ประจำเดือน/Month ", 198, 67, { align: 'left' })
    doc.setFontSize(16)
    doc.text(Month, 245, 67, { align: 'left' })
    doc.setFontSize(14)
    doc.text("บ้านเลขที่/Home No. ", 198, 79, { align: 'left' })
    doc.setFontSize(16)
    doc.text(HoneNo, 245, 79, { align: 'left' })


    doc.setFontSize(16)
    doc.text("รายการ", 73, 92, { align: 'left' })
    doc.text("Description", 70, 96, { align: 'left' })

    doc.text("จำนวนหน่วย", 163, 92, { align: 'left' })
    doc.text("Units", 167, 96, { align: 'left' })

    doc.text("ราคาต่อหน่วย", 202, 92, { align: 'left' })
    doc.text("Unit /Price", 203, 96, { align: 'left' })

    doc.text("จำนวนเงิน", 246, 92, { align: 'left' })
    doc.text("Amount", 247, 96, { align: 'left' })

    doc.text("การชำระเงิน/Condition of Payments ", 55, 168, { align: 'left' })
    doc.setFontSize(15)
    doc.text("เงินสด :", 20, 175, { align: 'left' })
    doc.text(Cash, 42, 175, { align: 'left' })
    doc.text("บาท", 60, 175, { align: 'left' })

    doc.text("เช็คธนาคาร :", 20, 182, { align: 'left' })
    doc.text(Cheque, 42, 182, { align: 'left' })
    doc.text("บาท", 60, 182, { align: 'left' })
    doc.text("วันที่", 68, 182, { align: 'left' })
    doc.text(ChequeDate, 80, 182, { align: 'left' })
    doc.text("เลขที่", 98, 182, { align: 'left' })
    doc.text(ChequeNo, 108, 182, { align: 'left' })


    doc.text("เงินโอน :", 20, 189, { align: 'left' })
    doc.text(Transfer, 42, 189, { align: 'left' })
    doc.text("บาท", 60, 189, { align: 'left' })
    doc.text("วันที่", 68, 189, { align: 'left' })
    doc.text(TransferDate, 80, 189, { align: 'left' })






    doc.setFontSize(16)

    doc.text(`รวมทั้งหมด/Total`, 168, 170, { align: 'left' })
    doc.text(Grandtotal, 250, 170, { align: 'center' })

    doc.text(`Vat  ${Vat} %`, 168, 180, { align: 'left' })
    doc.text(`${Number(Grandtotal * (Vat / 100)).toFixed(2)}`, 250, 180, { align: 'center' })

    doc.text("รวมเงินทั้งสิ้น/Grand Total", 168, 191, { align: 'left' })
    doc.text(`${(Grandtotal * (1 + (Vat / 100))).toFixed(2)}`, 250, 191, { align: 'center' })

    doc.setFontSize(20)
    doc.text("เงินฝากสำรองคงเหลือ :", 220, 202, { align: 'left' })
    doc.text(Money, 270, 202, { align: 'left' })
    doc.setFontSize(14)
    doc.text("เขียนโดย", 200, 208, { align: 'left' })
    doc.text(credit, 215, 208, { align: 'left' })
    doc.text("วันที่", 240, 208, { align: 'left' })
    doc.text(_Date, 248, 208, { align: 'left' })
    doc.text(Time, 268, 208, { align: 'left' })

    doc.setFontSize(16)
    doc.text(names, 20, 105, { align: 'left' })
    doc.text(Units, 170, 105, { align: 'left' })
    doc.text(Price, 210, 105, { align: 'left' })
    doc.text(Amount, 250, 105, { align: 'left' })

    let src_pdf = doc.output('datauristring');

    const iframe = `
     <title>${document_name}</title>
    <iframe width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>
    `
    const x = window.open();
    x.document.title = "preview booking"
    x.document.open();
    x.document.write(iframe);
    x.document.close();



}

export const export_taxinvoices_pdf = (Receipts) => {

    if (Receipts && Array.isArray(Receipts) && Receipts.length) {
        const document_name = 'ใบกำกับภาษี'
        let Vat = 7;
        let Noanswer = "-"
        let business_Address_1 = "119 ซอยสีม่วงอนุสรณ์ ถนน สุทธิสาร"
        let business_Address_2 = "แขวง ดินแดง เขต ดินแดง กรุงเทพ 10400"
        let Taxid = "0105536011803"
        let Phone = "026937005"
        let Email = "sales@primusthai.com"

        let Cash = "-------"
        let Cheque = "-------"
        let ChequeNo = "-------"
        let ChequeDate = "-------"
        let Transfer = "-------"
        let TransferDate = "-------"

        const doc = new jsPDF('l', 'mm', [297, 230]);

        Receipts.map((receipt, index) => {

            let Name = (receipt && receipt.Invoice && receipt.Invoice.Room && receipt.Invoice.Room.members && receipt.Invoice.Room.members.length
                && receipt.Invoice.Room.members[0] && receipt.Invoice.Room.members[0].name) ? `${receipt.Invoice.Room.members[0].name} ${receipt.Invoice.Room.members[0].lastname}` : Noanswer
            let Address1 = (receipt && receipt.Invoice && receipt.Invoice.Room && receipt.Invoice.Room.members && receipt.Invoice.Room.members.length
                && receipt.Invoice.Room.members[0] && receipt.Invoice.Room.members[0].address) ? receipt.Invoice.Room.members[0].address : "-----------------" /// ที่อยู่ ผู้รับใบเสร็จ 

            let No = receipt && receipt.id ? receipt.id : Noanswer
            let _Date = receipt && receipt.duedate ? formatDate(receipt.duedate) : '----'
            let Month = receipt.monthlybilling ? formatDate(receipt.monthlybilling) : "-----"
            let HoneNo = receipt && receipt.Invoice && receipt.Invoice.Room && receipt.Invoice.Room.floor && receipt.Invoice.Room.floor.building
                && receipt.Invoice.Room.floor.building.name ? receipt.Invoice.Room.floor.building.name : Noanswer

            // let Room = receipt && receipt.Invoice && receipt.Invoice.Room && receipt.Invoice.Room.name ? receipt.Invoice.Room.name : Noanswer


            let _table_prices = receipt && receipt.lists ? receipt.lists : [{
                name: `----`,
                number_item: "1",
                price: `---`,
                amount: `---`
            }]

            let _total_price = 0
            // let _total_vat = 0
            _table_prices.map(item => {
                let _price = (item && item.price) ? (item.type_price === "ราคารวมvat" ? Number(item.price * 100.0 / 107.0) : Number(item.price)) : 0
                _total_price += _price;
                // _total_vat += (item.selectvat === "คิดvat" ? _price * (Vat / 100) : 0)
                return 1;
            })

            let Grandtotal = `${_total_price.toFixed(2)}`
            // let Vat_Grandtotal = `${_total_vat.toFixed(2)}`
            // let End_Grandtotal = `${(_total_price + _total_vat).toFixed(2)}`

            const names = _table_prices.map(_table_prices => _table_prices.name);
            const Units = _table_prices.map(_table_prices => (_table_prices.unit !== undefined) ? `${_table_prices.unit}` : '1');
            const Price = _table_prices.map(_table_prices => `${ Number(_table_prices.price).toFixed(2)}`);
            const Amount = _table_prices.map(_table_prices => `${(_table_prices.type_price === "ราคารวมvat" ? Number(_table_prices.price * 100.0 / 107.0).toFixed(2) : Number(_table_prices.price).toFixed(2))
                * Number((_table_prices.unit !== undefined) ? `${_table_prices.unit}` : '1')}`);




            AddTH_font(doc, 'yourCustomFont.ttf')
            doc.addFont('yourCustomFont.ttf', 'yourCustomFont', 'normal');
            doc.setFont('yourCustomFont');

            //main box
            doc.setDrawColor(156, 260, 235)
            doc.setFillColor(156, 260, 235)
            doc.rect(15, 35, 265, 160, 'FD')

            //address box
            doc.setDrawColor(204, 263, 245)
            doc.setFillColor(204, 263, 245)
            doc.roundedRect(17, 37, 173, 46, 6, 6, 'FD')

            doc.roundedRect(193, 37, 38, 10, 6, 6, 'FD')
            doc.roundedRect(232, 37, 47, 10, 6, 6, 'FD')
            doc.roundedRect(193, 49, 38, 10, 6, 6, 'FD')
            doc.roundedRect(232, 49, 47, 10, 6, 6, 'FD')
            doc.roundedRect(193, 61, 38, 10, 6, 6, 'FD')
            doc.roundedRect(232, 61, 47, 10, 6, 6, 'FD')
            doc.roundedRect(193, 73, 38, 10, 6, 6, 'FD')
            doc.roundedRect(232, 73, 47, 10, 6, 6, 'FD')

            //topic box
            doc.setDrawColor(40, 120, 50)
            doc.setFillColor(110, 250, 230)
            doc.rect(17, 85, 138, 15, 'FD')
            doc.rect(155, 85, 38, 15, 'FD')
            doc.rect(193, 85, 38, 15, 'FD')
            doc.rect(231, 85, 46, 15, 'FD')

            doc.setDrawColor(40, 120, 50)
            doc.setFillColor(204, 253, 245)

            //result box
            doc.rect(17, 100, 138, 60, 'FD')
            doc.rect(155, 100, 38, 60, 'FD')
            doc.rect(193, 100, 38, 60, 'FD')
            doc.rect(231, 100, 46, 60, 'FD')

            //last box
            doc.setFillColor(255, 255, 255)
            doc.rect(17, 162, 138, 31, 'FD')
            doc.setFillColor(240, 253, 245)
            doc.rect(155, 162, 76, 10, 'FD')
            doc.rect(155, 172, 76, 11, 'FD')
            doc.rect(155, 183, 76, 10, 'FD')

            doc.rect(231, 162, 46, 10, 'FD')
            doc.rect(231, 172, 46, 11, 'FD')
            doc.rect(231, 183, 46, 10, 'FD')


            doc.setFontSize(16)
            doc.text(business_Address_1, 15, 21, { align: 'left' })
            doc.setFontSize(14)
            doc.text(business_Address_2, 15, 26, { align: 'left' })

            doc.setFontSize(14)
            doc.text("Tax ID : ", 15, 31, { align: 'left' })
            doc.text(Taxid, 27, 31, { align: 'left' })
            doc.text("โทร : ", 60, 31, { align: 'left' })
            doc.text(Phone, 68, 31, { align: 'left' })
            doc.text("Email :", 90, 31, { align: 'left' })
            doc.text(Email, 101, 31, { align: 'left' })

            doc.setFontSize(23)
            doc.text("ใบกำกับภาษี / TAX INVOICE", 110, 10, { align: 'left' })

            doc.setFontSize(14)
            doc.text("ชื่อ/Name :", 20, 50, { align: 'left' })
            doc.setFontSize(16)
            doc.text(Name, 50, 50, { align: 'left' })


            doc.setFontSize(14)
            doc.text("ที่อยู่/Address :", 20, 65, { align: 'left' })
            doc.setFontSize(16)
            doc.text(Address1, 50, 65, { align: 'left' })
            // doc.text(Address2 ,50, 60, {align: 'left'})

            doc.setFontSize(14)
            doc.text("เลขที่/No. ", 205, 43, { align: 'left' })
            doc.setFontSize(12)
            doc.text(No, 240, 43, { align: 'left' })
            doc.setFontSize(14)
            doc.text("วันที่/Date ", 205, 55, { align: 'left' })
            doc.setFontSize(16)
            doc.text(_Date, 245, 55, { align: 'left' })
            doc.setFontSize(14)
            doc.text("ประจำเดือน/Month ", 198, 67, { align: 'left' })
            doc.setFontSize(16)
            doc.text(Month, 245, 67, { align: 'left' })
            doc.setFontSize(14)
            doc.text("บ้านเลขที่/Home No. ", 198, 79, { align: 'left' })
            doc.setFontSize(16)
            doc.text(HoneNo, 245, 79, { align: 'left' })


            doc.setFontSize(16)
            doc.text("รายการ", 73, 92, { align: 'left' })
            doc.text("Description", 70, 96, { align: 'left' })

            doc.text("จำนวนหน่วย", 163, 92, { align: 'left' })
            doc.text("Units", 167, 96, { align: 'left' })

            doc.text("ราคาต่อหน่วย", 202, 92, { align: 'left' })
            doc.text("Unit /Price", 203, 96, { align: 'left' })

            doc.text("จำนวนเงิน", 246, 92, { align: 'left' })
            doc.text("Amount", 247, 96, { align: 'left' })

            doc.text("การชำระเงิน/Condition of Payments ", 55, 168, { align: 'left' })
            doc.setFontSize(15)
            doc.text("เงินสด :", 20, 175, { align: 'left' })
            doc.text(Cash, 42, 175, { align: 'left' })
            doc.text("บาท", 60, 175, { align: 'left' })

            doc.text("เช็คธนาคาร :", 20, 182, { align: 'left' })
            doc.text(Cheque, 42, 182, { align: 'left' })
            doc.text("บาท", 60, 182, { align: 'left' })
            doc.text("วันที่", 68, 182, { align: 'left' })
            doc.text(ChequeDate, 80, 182, { align: 'left' })
            doc.text("เลขที่", 98, 182, { align: 'left' })
            doc.text(ChequeNo, 108, 182, { align: 'left' })


            doc.text("เงินโอน :", 20, 189, { align: 'left' })
            doc.text(Transfer, 42, 189, { align: 'left' })
            doc.text("บาท", 60, 189, { align: 'left' })
            doc.text("วันที่", 68, 189, { align: 'left' })
            doc.text(TransferDate, 80, 189, { align: 'left' })






            doc.setFontSize(16)

            doc.text(`รวมทั้งหมด/Total`, 168, 170, { align: 'left' })
            doc.text(Grandtotal, 250, 170, { align: 'center' })

            doc.text(`Vat  ${Vat} %`, 168, 180, { align: 'left' })
            doc.text(`${Number(Grandtotal * (Vat / 100)).toFixed(2)}`, 250, 180, { align: 'center' })

            doc.text("รวมเงินทั้งสิ้น/Grand Total", 168, 191, { align: 'left' })
            doc.text(`${(Grandtotal * (1 + (Vat / 100))).toFixed(2)}`, 250, 191, { align: 'center' })


            doc.setFontSize(16)
            doc.text(names, 20, 105, { align: 'left' })
            doc.text(Units, 170, 105, { align: 'left' })
            doc.text(Price, 210, 105, { align: 'left' })
            doc.text(Amount, 250, 105, { align: 'left' })

            if (Receipts.length > 0 && index !== (Receipts.length - 1)) {
                doc.addPage()
            }


            return null;

        })

        let src_pdf = doc.output('datauristring');
        const iframe = `
        <title> ${document_name} </title>
        <iframe  width='100%' type="application/pdf"   height='100%' src="${src_pdf}"></iframe>`
        const x = window.open();
        x.document.title = "preview booking"



        x.document.open();
        x.document.write(iframe);
        x.document.close();
    }
}