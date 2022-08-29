const ExcelJS = require('exceljs');
(async () => {

  const workbook = new ExcelJS.Workbook();

  await workbook.xlsx.readFile(__dirname + "/result_wen.xlsx");

  const sheet = workbook.worksheets[0];
  const data = []
  sheet.eachRow(function (row, rowNumber) {

      // console.log(row.values.length)

      // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));

      let user = { name: row.values[1], address: row.values[2], value: [row.values[3], row.values[4]] };

      data.push(user)


  });
  console.log(JSON.stringify(data))

})()


