const PdfPrinter = require('pdfmake');
const getStream = require('get-stream');

const fonts = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
  Symbol: {
    normal: 'Symbol'
  },
  ZapfDingbats: {
    normal: 'ZapfDingbats'
  }
};

const printer = new PdfPrinter(fonts);

const generatePdf = async (reportId, title, headers, body) => {

  const docDefinition = {
    content: [
      { text: title, style: 'header' },
      {
        style: 'table',
        table: {
          body
        }
      },
	],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      table: {
        margin: [0, 5, 0, 15]
      }
    },
    defaultStyle: {
      font: 'Helvetica'
    }
  };


  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.end();

  const docBuffer = await getStream.buffer(pdfDoc);
  const base64 = Buffer.from(docBuffer).toString('base64');
  return `data:application/pdf;base64,${base64}`;
}


module.exports = generatePdf;
