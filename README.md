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
  * [ ] ข้อมูลใบเสร็จ เลขที่บ้านเป็นเลขที่-> อาคารแทน
  * [ ] ตรวจสอบเงื่อนไขการจองรายเดือนและรายวันไม่ให้จองซ้ำกัน
  * [ ] เพิ่มสถานะยืนยังการจอง
  * [ ] กดจากห้องที่จองข้อมูลมาแสดงที่ การทำสัญญาด้วย
  * [ ] ลำดับปุ่ม ให้กดได้ (Enable) ตามลำดับ บันทึก->ชำระเงิน->ออกใบเสร็จหลังจากพิมใบเสร็จแล้ว จึงย้ายไปเป็นเข้าพัก
  * [ ] ประเภทของรารการค้าใช้จ่าย check box ได้ว่าชำระรายเดือนหรือชำระครั้งเดียว
  * [ ] ยกเลิกและแก้ไขรายการได้
  * [ ] มี UI สร้างใบเสร็จแล้ว แต่ยังไม่มี Function สร้าง
  * [ ] Form ใบเสร็จ และใบกำกับภาษีใช้เลขที่เดียวกันหรือไม่ ?

  * สร้างใบแจ้งหนี้รายเดือน

  * [ ] Filter ห้องที่ต้องการทำใบแจ้งหนี้
  * [ ] มี UI แล้วแต่ Function ยังไม่เสร็จ

  * ใบแจ้งหนี้

  * [ ] มี UI แล้วแต่ Function ยังไม่เสร็จ

  * ออกใบเสร็จ

  * [ ] มี UI แล้วแต่ Function ยังไม่เสร็จ

  * การเช็คเอาท์

  * [ ] มีรายการค่าเช่าล่วงหน้า และค่าประกันมาอยู่ในรายการคำนวน ค่าใช้จ่ายตอนเช็คเอาท์ โดยแสดงรายการเป็น ลบ (-) และเพิ่มเติมรายการเองได้
  * [ ] ถ้าคำนวนแล้วมีเงินคืนจะแสดงที่ช่องเงินคืน
  * [ ] เปลี่ยนชื่อปุ่ม "แจ้งย้ายออก" ใน Module เช็คเอาท์ เป็น "ย้ายออก"

  * แจ้งย้ายออก

  * [ ] ทำหน้า UI
  * [ ] ทำ backend Functions
