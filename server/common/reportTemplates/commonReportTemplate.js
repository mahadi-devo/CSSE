const PdfPrinter = require('pdfmake');
const fs = require('fs');
const getStream = require('get-stream');

const generatePdf = async (reportId, title, headers, body) => {
  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      { text: title, style: 'header' },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: headers.length,
          body: [headers, body],
        },
      },
    ],
    defaultStyle: {
      font: 'Helvetica',
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  pdfDoc.end();

  const docBuffer = await getStream.buffer(pdfDoc);

  const base64 = Buffer.from(docBuffer).toString('base64');
    return `data:application/pdf;base64,${base64}`;
}

const fonts = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique',
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic',
  },
  Symbol: {
    normal: 'Symbol',
  },
  ZapfDingbats: {
    normal: 'ZapfDingbats',
  },
};

module.export = generatePdf;
