const PdfPrinter = require('pdfmake');
const fs = require('fs');
const getStream = require('get-stream');

const generatePdf = async (reportId, title, headers, body) => {
console.log("🚀 ~ file: commonReportTemplate.js ~ line 6 ~ generatePdf ~ reportId, title, headers, body", reportId, title, headers, body)
  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
		'First paragraph',
		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
	]
  };
  console.log("🚀 ~ file: commonReportTemplate.js ~ line 24 ~ generatePdf ~ docDefinition", docDefinition)

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  console.log("🚀 ~ file: commonReportTemplate.js ~ line 27 ~ generatePdf ~ pdfDoc", pdfDoc)

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

module.exports = generatePdf;
