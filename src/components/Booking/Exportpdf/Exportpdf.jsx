import { jsPDF } from "jspdf";
import {AddFont_jsPDF } from './AddFont'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'


AddFont_jsPDF(jsPDF);
const doc = new jsPDF();

export const export_pdf  = ( timestart:String , timeend:String , building:String ,unitprice , roomstart , roomend) =>{
    console.log('export pdf ')
     let pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
     let pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  

    doc.setFont("angsa",'normal');
    doc.setFontSize(36);
    doc.text('รายงานยอดรวมการใช้ไฟฟ้า', pageWidth / 2, 24, {align: 'center'});
    
    doc.setFontSize(24);

    doc.text(`เริ่ม ${timestart ? timestart :  "--/--/----  --:--" }`,pageWidth / 4,24*2 ,{align: 'center'})
    doc.text(`ถึง ${timeend ? timeend :"--/--/----  --:--" }`,3*pageWidth / 4,24*2 ,{align: 'center'})


    doc.text(`อาคาร ${building ? building :"---"}`,pageWidth / 4,24*3 ,{align: 'center'})
    doc.text(`ราคา/หน่วย ${unitprice ? unitprice :"---"}`,3*pageWidth / 4,24*3 ,{align: 'center'})

    doc.text(`ห้องเริ่มต้น ${roomstart ? roomstart:"---"}`,pageWidth / 4,24*4 ,{align: 'center'})
    doc.text(`ห้องสิ้นสุด ${roomend ? roomend : "---"}`,3*pageWidth / 4,24*4 ,{align: 'center'})


     let drawCell = function(data) {
        var doc = data.doc;
        var rows = data.table.body;
        if (rows.length === 1) {
        } else if (data.row.index === rows.length - 1) {
            doc.setFont("angsa",'normal');
            doc.setFontSize("10");
            doc.setFillColor(255, 255, 255);
        }
        };

    doc.autoTable({
    headStyles: { fillColor: '#bde4d1', textColor: '#333333' , fontStyle: 'angsa' },
    head: [['ห้อง', 'รุ่น', 'ชื่อมิตเตอร์','เริ่ม','สิ้นสุด','ผลต่าง','ราคา','อัตราส่วนต่อการใช้ไฟทั้งหมด (%)']],
    body: [
        ['209', 'KM-24-L', 'M209','150','200','50','250','20'],
      
    ],
    willDrawCell: drawCell,

    startY: 120
    })

/** Perview PDF  */
var string = doc.output('datauristring');
var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
var x = window.open();
x.document.open();
x.document.write(iframe);
x.document.close();

  //  doc.save("สรุปค่าไฟ.pdf");
}