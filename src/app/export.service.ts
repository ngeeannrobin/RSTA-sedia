import { Injectable } from '@angular/core';
import * as Excel from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }


  ExportExcel(data,dateString){
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("Bibo");

    // Declare headers
    worksheet.columns = [
      { header: 'Cat', key: 'cat'},
      { header: 'Name', key: 'name'},
      { header: 'Book In Date', key: 'bid'},
      { header: 'Book In Time', key: 'bit'},
      { header: 'Book Out Date', key: 'bod'},
      { header: 'Book Out Time', key: 'bot'}
    ];

    // Insert data
    let longestName = 0;
    data.forEach(record => {
      let row = [];
      row[0] = record.cat?record.cat:'NA';
      row[1] = record.name;
      row[record.in?2:4] = this.ConvertDateToDate(record.time);
      row[record.in?3:5] = this.ConvertDateToHour(record.time);
      worksheet.addRow(row);
      longestName = Math.max(longestName,record.name.length);
    });

    // Apply styles
    worksheet.getRows(1,1)[0].font = {bold: true};

    worksheet.getColumn("cat").width = 5;
    worksheet.getColumn("name").width = longestName+2;



    ["A", "C","D","E","F"].forEach(col=>{
      worksheet.getColumn(col).alignment = {horizontal: "center",}
    });

    ["A1","B1","C1","D1","E1","F1"].forEach(cell => {
      worksheet.getCell(cell).alignment = {wrapText: true, vertical: 'middle', horizontal: 'center'}
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `Bibo-${dateString}.xlsx`);
    });
  }

  ConvertDateToDate(ts){
    const dt = new Date(ts.seconds*1000);
    return `${dt.getDate().toString().padStart(2,"0")}${(dt.getMonth() + 1).toString().padStart(2,"0")}${dt.getFullYear().toString().substr(2,2)}`;
  }
  ConvertDateToHour(ts){
    const dt = new Date(ts.seconds*1000);
    return `${dt.getHours().toString().padStart(2,"0")}${dt.getMinutes().toString().padStart(2,"0")}`
  }
}
