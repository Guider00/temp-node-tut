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
  * [ ] เพิ่มเบอร์โทรลูกค้าในการค้นหา หน้า checkin
  * [ ] link ข้อมูลการ จองกับการ checkin
  * [X] แจ้งเตือนรายการจองของวันปัจจุบัน
  * [X] สร้างหน้าใบเสร็จ
  * [X] สร้างหน้าใบแจ้งหนี้
  * [ ] แก้ไข หน้าใบแจ้งหนี้และใบเสร็จ
  * [ ] ผูกหน้า checkin กับหน้าสร้างใบแจ้งหนี้
  * [ ] ผูกหน้าใบแจ้งหน้ากับ หน้าใบเสร็จ
