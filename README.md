# Project

This project build for create webapplication local by
forcus at service apartments for rents

# before RUN

you much to install package from online before run application by command

npm install

# npm start

Start web application React  Open [http://localhost:3000](http://localhost:3000)

# npm run server

Start backend service by GRAPHQL
Open [http://localhost:4000/graphql]()

# library

- express
- graphql
- mqtt
- mongodb

# Event error after run

1) if error at node_modules\jsonschema\lib\validator.js:110
   Fix by  command  this line
   // if((typeof schema !== 'boolean' && typeof schema !== 'object') || schema === null){
   //   throw new SchemaError('Expected `schema` to be an object or boolean');
   // }

Hope you enjoy with project

# TODO List

* backend

  * [X] add optionroom type
  * [X] delete option roomtype
  * [X] เพิ่มเบอร์โทรลูกค้าในการค้นหา หน้า checkin
  * [X] link ข้อมูลการ จองกับการ checkin
  * [X] แจ้งเตือนรายการจองของวันปัจจุบัน
  * [X] สร้างหน้าใบเสร็จ
  * [X] สร้างหน้าใบแจ้งหนี้
  * [X] แก้ไข หน้าใบแจ้งหนี้และใบเสร็จ
  * [X] ผูกหน้า checkin กับหน้าสร้างใบแจ้งหนี้
  * [X] ผูกหน้าใบแจ้งหน้ากับ หน้าใบเสร็จ

  ---


  * Job in meeting  15 / 12 /2021

    * [X] เพิ่มแจ้งเตือนไปอยู่รายการบนผูกหน้าใบแจ้งหน้ากับ หน้าใบเสร็
    * [X] เพิ่ม iconเตือนห้องที่ถึงกำหนดจองผูกหน้าใบแจ้งหน้ากับ หน้าใบเสร็จ
    * [X] แจ้งเตือน alarm ห้องที่ถึงกำหนดจอง
    * [ ] เพิ่มช่องกรอกที่อยู่ผู้จอง * ยังไม่ได้ผูกหลังบ้าน
    * [X] ข้อมูลใบเสร็จ เลขที่บ้านเป็นเลขที่-> อาคารแทน
    * [ ] ตรวจสอบเงื่อนไขการจองรายเดือนและรายวันไม่ให้จองซ้ำกัน
    * [X] เพิ่มสถานะยืนยังการจอง
    * [ ] กดจากห้องที่จองข้อมูลมาแสดงที่ การทำสัญญาด้วย
    * [X] ลำดับปุ่ม ให้กดได้ (Enable) ตามลำดับ บันทึก->ชำระเงิน->ออกใบเสร็จหลังจากพิมใบเสร็จแล้ว จึงย้ายไปเป็นเข้าพัก
    * [ ] ประเภทของรายการค่าใช้จ่าย check box ได้ว่าชำระรายเดือนหรือชำระครั้งเดียว
    * [X] รายการค่าใช้จ่ายยกเลิกและแก้ไขรายการได้
    * [X] มี UI สร้างใบเสร็จแล้ว แต่ยังไม่มี Function สร้าง
    * [ ] Form ใบเสร็จ และใบกำกับภาษีใช้เลขที่เดียวกันหรือไม่ ?
    * [X] สร้างใบแจ้งหนี้รายเดือน
    * [ ] Filter ห้องที่ต้องการทำใบแจ้งหนี้
    * [ ] มี UI แล้วแต่ Function ยังไม่เสร็จ

    * ใบแจ้งหนี้

    * [ ] มี UI แล้วแต่ Function ยังไม่เสร็จ

    * ออกใบเสร็จ

    * [ ] มี UI แล้วแต่ Function ยังไม่เสร็จ
    * [X] การเช็คเอาท์
    * [ ] มีรายการค่าเช่าล่วงหน้า และค่าประกันมาอยู่ในรายการคำนวน ค่าใช้จ่ายตอนเช็คเอาท์ โดยแสดงรายการเป็น ลบ (-) และเพิ่มเติมรายการเองได้
    * [ ] ถ้าคำนวนแล้วมีเงินคืนจะแสดงที่ช่องเงินคืน
    * [X] เปลี่ยนชื่อปุ่ม "แจ้งย้ายออก" ใน Module เช็คเอาท์ เป็น "ย้ายออก"
    * [X] แจ้งย้ายออก
    * [ ] ทำหน้า UI
    * [ ] ทำ backend Functions
      Job in meeting  15 / 12 /2021
  * หน้าการ จอง Booking
  * * [ ] เพิ่มวันที่ต้องการย้ายออก  ในส่วน หน้าเช็ค อิน
    * [ ] เพิ่มส่วนของการ filter ห้องด้วยเวลาเข้าและ ออก
    * [ ] ลำดับการเรียงของ checkin คือ แจ้งเตือนอยู่บนสุด และหลังจากนั้นเรียงตามวัน
  * หน้า checkin ย้ายเข้า

    * [ ] เพิ่มวันที่ต้องการย้ายออก  ในส่วน หน้าเช็ค อิน
    * [ ] เพิ่มส่วนของการ filter ห้องด้วยเวลาเข้าและ ออก
  * หน้าสัญญา Contract เพิ่มช่องการแนบไฟล์

  * [ ] หน้าสัญญา เพิ่ม ช่องการแนบไฟล์
  * [ ] เพิ่มช่องเลือกเฉพาะปิดการจอง
  * [ ] เรียงข้อมูล ในตรางแสดงผล จากใหม่ไปหาเก่า
  * [ ] เพิ่ม fileter  ด้วยชทื่อ

  * หน้า ใบแจ้งหนี้ Invoice

    * [ ] ราคาค่าเช่าจะเป็นราคา ที่คิด vat แล้ว
    * [ ] ราคา คิดที่ 2 dp
    * [ ] เลขที่ใบกำกับภาษีแยก กันกับ ใบเสร็จ
    * [ ] ใบกำกับภาษีใช้ Form เดียวกับ  ใบเสร็จ
    * [ ] แก้ไขชื่อ ตรางออกใบแจ้งหนี้  หน้าใบแจ้งหนี้
  * หน้า Company address

    * [ ] ตั้งค่าเลขที่ใบเสร็จ ใบกำกับภาษี  อยู่หน้า  company address
  * หน้า ใบเสร็จ Recipte

    * [ ] filter ชื่อผู้เช่า ในหน้า ใบเสร็จ
  * หน้าแจ้งย้ายออก CheckOutinform

    * [ ] หน้าแจ้งย้ายออก ให้สามารถใส่เวลาได้และ menu มีแค่ปุ่ม save
  * หน้าย้ายออก CheckOUt

    * [ ] ใบคืนเงินประกันใช้ Form เดียวกันกับ ใบเสร็จแต่เปลี่ยนหัวข้อ
    * [ ] เพิ่ม ปุ่มเลือก mode ชำระเงินและคืนสัญญา

    เมื่อทำรายการจากหน้า dashbord หน้าที่เข้าไปใช้งาน จะload filter เฉพาะห้อง
* สอบถามระหว่างประชุม การออกใบเสร็จใน การจองห้อง ต้องมี การออกใบแจ้งนี้ก่อนหรือเปล่าสอบถามระหว่างประชุม การออกใบเสร็จใน การจองห้อง ต้องมี การออกใบแจ้งนี้ก่อนหรือเปล่า
* การออกใบเสร็จทุกใบจะต้องมีใบแจ้งหนี้ไหม
* ตัวอย่างใบกำกับภาษี
* address ใบเสร็จ ต้องเป็น address ของ ผู้เข้าพักหรือเป็นห้องผู้อยู่อาศัย
