import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShareddataService } from '../../../services/shareddata.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import * as jsPDF from 'jspdf';
import { PopoverController, Platform } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ConfigService } from 'src/app/provider/config.service';
import { NumberToWordsPipe } from 'src/app/pipes/num-to-word.pipe';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-template2',
  templateUrl: './template2.page.html',
  styleUrls: ['./template2.page.scss'],
})
export class Template2Page implements OnInit {
  date: any;
  public invoiceAllData: { [i: string]: any } = {};
  inwords: any;
  no: any;
  @ViewChild('id') id: ElementRef;
  gst: string;
  isIntra: boolean = true;
  inword: any;
  gstBit: number;
  companyId: number;
  taxAmount: any;
  pdfObj = null;
  inwordswithoutgst: any;

  constructor(
    public shared: ShareddataService,
    public datepipe: DatePipe,
    public decimalPipe: DecimalPipe,
    public popoverController: PopoverController,
    public httpClient: HttpClient,
    public config: ConfigService,
    public platform: Platform,
    public file: File,
    public fileOpener: FileOpener
,public numToWord: NumberToWordsPipe


  ) {
    this.date = this.datepipe.transform(new Date(), 'dd-mm-yyyy');
    this.no = this.decimalPipe.transform(450.2356, '1.2-2');
    this.gstBit = parseInt(localStorage.getItem('gstBit'));

  }

  ngOnInit() {

    this.companyId = this.shared.companyData.companyId;
    this.httpClient.get(this.config.url + 'company/getCompany/' + this.companyId).subscribe((data: any) => {
      if (data.status == true) {
        this.shared.companyData = data.result[0];
        this.gst = localStorage.getItem('custGst');
        console.log('gst', this.gst);
        // console.log('cgst',this.shared.companyData);
        if (this.shared.customerData.custGstNumber.substring(0, 2) == this.shared.companyData.companyGstNo.substring(0, 2)) {
          this.isIntra = true;
        } else {
          this.isIntra = false;
        }

      } else {
        this.shared.presentDangerToast(data.message);
      }
    })


    var dat: { [k: string]: any } = {};
    dat.custId = this.shared.customerData.custId;
    dat.companyId = this.shared.companyData.companyId;
    this.httpClient.post(this.config.url + 'customer/getCustomer', dat).subscribe((data: any) => {
      if (data.status == true) {
        this.shared.customerData = data.result[0];
      } else {
        this.shared.presentDangerToast(data.message);
      }
    })

    this.config.postHttp('invoice/getInvoiceById/' + this.shared.invoiceData.invoiceId,dat).then((data: any) => {
      debugger
      if (data.status == true) {
        this.shared.invoiceData = data.result[0];
        this.invoiceAllData = data.result[0];
        console.log(this.invoiceAllData);
        var converter = require('number-to-words');
        this.inwords =  this.numToWord.transform(this.invoiceAllData.totalAmountAfterTax);
        this.inword =  this.numToWord.transform(this.invoiceAllData.subTotal);
        this.taxAmount =  this.numToWord.transform(this.invoiceAllData.totalTaxableAmount);
        this.inwordswithoutgst =  this.numToWord.transform(this.shared.invoiceData.subTotal);

      } else {
        this.shared.presentDangerToast(data.message);
      }
    })

    this.httpClient.get(this.config.url + 'item/getItem/' + this.shared.invoiceData.invoiceId).subscribe((data: any) => {
      if (data.status == true) {
        this.shared.invoiceItems = data.result;
        console.log(this.shared.invoiceItems);
      } else {
        this.shared.presentDangerToast('Invoice Item Data Not Found');
      }
    })
    this.date = this.datepipe.transform(new Date(), 'dd-mm-yyyy');
    this.gstBit = parseInt(localStorage.getItem('gstBit'));

  }

  generatePdf() {
    let doc = new jsPDF;
    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }

    };
    let content = this.id.nativeElement;
    doc.fromHTML(content.innerHTML, 10, 10, {
      'width': 200,
      'elementHandlers': specialElementHandlers,

    });
    doc.save('invoice.pdf')
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  create() {

    var temp = [];
    // var temp1 = [];

    temp.push([
      { text: 'Description Of Goods', fillColor: 'whitesmoke' },
      { text: 'Rate', fillColor: 'whitesmoke' },
      { text: 'Quantity', fillColor: 'whitesmoke' },
      { text: 'Discount(%)', fillColor: 'whitesmoke' },
      { text: 'Discount Amount', fillColor: 'whitesmoke' },
      { text: 'Amt', fillColor: 'whitesmoke' }

    ]);

    this.shared.invoiceItems.forEach(element => {
      temp.push(
        [
          { text: element.itemName },
          { text: element.itemPrice },
          { text: element.quantity },
          { text: element.discount },
          { text: element.discountAmount },
          { text: element.netTotal,alignment:'right' },
        ])
    });


    // temp1.push([
    //   { text: 'Tax Amount' },
    //   { text: 'CGST(%)' },
    //   { text: 'SGST(%)' },
    //   { text: 'Tax Amount' },
    // ]);
    // this.shared.invoiceItems.forEach(element => {
    //   temp1.push(
    //     [
    //       { text: element.subTotal },
    //       { text: [element.gst / 2] },
    //       { text: [element.gst / 2] },
    //       { text: element.taxAmount },

    //     ])
    // });

    var docDefination = {

      content: [
        {
          table: {
            widths: ['*'],
            body: [
              [{ text: this.shared.companyData.companyName, alignment: 'center', fontSize: 20 }],
              [{ text: this.shared.companyData.companyAddress, alignment: 'center' }],
              [{ text: this.shared.companyData.companyEmail, alignment: 'center' }],
              [{ text: this.shared.companyData.custMobile, alignment: 'center' }],
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },

        { text: '\n' },
        { text: 'TAX INVOICE', alignment: 'center', style: 'header' },
        { text: '\n' },

        {

          table: {
            widths: [200, '*', '*'],
            body: [
              [
                [{ text: this.shared.companyData.companyName, bold: true },
                { text: this.shared.companyData.companyAddress },
                { text: ['PAN NO.:', this.shared.companyData.pancard] },
                { text: ['GST:', this.shared.companyData.companyGstNo] }
                ],
                [{ text: 'Invoice No:',alignment:'center' },
                { text: this.shared.invoiceData.invoiceNumber, bold: true, alignment:'center' }],
                [{ text: 'Invoice Date:' ,alignment:'center'},
                { text: this.date, bold: true,alignment:'center' }]
              ],


            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },
        {
          table: {
            widths: [200, '*'],
            body: [
              [
                [{ text: 'Buyer' },
                { text: this.shared.customerData.custName, bold: true },
                { text: this.shared.customerData.custGstNumber }],
                [{ text: 'Address Buyer' },
                { text: ['At.Post : ',this.shared.customerData.custAddress] },
                { text: ['State : ',this.shared.customerData.custStateName] }]
              ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },
        {
          table: {
            widths: [200, 50, 45, 50, 60, 62],
            body:
              temp

          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0 : 0;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },
        {
          table: {
            widths: ['*', 62],
            body: [
              [
                { text: 'Total', bold: true, alignment: 'right' },
                { text: this.shared.invoiceData.totalAmountAfterTax }
              ],
              [
                { text: 'Round Off', alignment: 'right' },
                { text: this.shared.invoiceData.totalAmountAfterTax }
              ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },
        {
          table: {
            widths: ['*'],
            body: [
              [
                { text: ['Amount in words(Rs.): ', this.inwords, ' Only'], bold: true }
              ],
              [
                { text: 'GST Included', alignment: 'center' }
              ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },
        // {
        //   table: {
        //     widths: ['*', '*', '*', '*'],
        //     body:
        //       temp1

        //   },
        //   layout: {
        //     hLineWidth: function (i, node) {
        //       return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
        //     },
        //     vLineWidth: function (i, node) {
        //       return 0.1;
        //     },
        //   }
        // },
        {
          table: {
            widths: ['*'],
            body: [
              [{ text: ['Note:\n', this.shared.invoiceData.note] }]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },
        {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: ['Declaration\n', this.shared.invoiceData.declaration] },
                { text: ['For:', this.shared.companyData.companyName, '\n\n\n Auth. Signatory'] }
              ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        }


      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        heading: {
          bold: true
        },
        itemTable: {
          margin: [20, 20, 2, 0]
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefination);
    this.download();
  }

 
  create1() {

    var temp = [];
    // var temp1 = [];

    temp.push([
      { text: 'Description Of Goods', fillColor: 'whitesmoke' },
      { text: 'Rate', fillColor: 'whitesmoke' },
      { text: 'Quantity', fillColor: 'whitesmoke' },
      { text: 'Discount(%)', fillColor: 'whitesmoke' },
      { text: 'Discount Amount', fillColor: 'whitesmoke' },
      { text: 'Amt', fillColor: 'whitesmoke' }

    ]);

    this.shared.invoiceItems.forEach(element => {
      temp.push(
        [
          { text: element.itemName },
          { text: element.itemPrice },
          { text: element.quantity },
          { text: element.discount },
          { text: element.discountAmount },
          { text: element.subTotal },
        ])
    });


    // temp1.push([
    //   { text: 'Tax Amount' },
    //   { text: 'CGST(%)' },
    //   { text: 'SGST(%)' },
    //   { text: 'Tax Amount' },
    // ]);
    // this.shared.invoiceItems.forEach(element => {
    //   temp1.push(
    //     [
    //       { text: element.subTotal },
    //       { text: [element.gst / 2] },
    //       { text: [element.gst / 2] },
    //       { text: element.taxAmount },

    //     ])
    // });

    var docDefination = {

      content: [
        {
          table: {
            widths: ['*'],
            body: [
              [{ text: this.shared.companyData.companyName, alignment: 'center', fontSize: 20 }],
              [{ text: this.shared.companyData.companyAddress, alignment: 'center' }],
              [{ text: this.shared.companyData.companyEmail, alignment: 'center' }],
              [{ text: this.shared.companyData.custMobile, alignment: 'center' }],
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },

        { text: '\n' },
        { text: 'TAX INVOICE', alignment: 'center', style: 'header' },
        { text: '\n' },

        {

          table: {
            widths: [200, '*', '*'],
            body: [
              [
                [{ text: this.shared.companyData.companyName, bold: true },
                { text: this.shared.companyData.companyAddress },
                { text: ['PAN NO.:', this.shared.companyData.pancard] },
                { text: ['GST:', this.shared.companyData.companyGstNo] }
                ],
                [{ text: 'Invoice No:',alignment:'center' },
                { text: this.shared.invoiceData.invoiceNumber, bold: true, alignment:'center' }],
                [{ text: 'Invoice Date:' ,alignment:'center'},
                { text: this.date, bold: true,alignment:'center' }]
              ],


            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },
        {
          table: {
            widths: [200, '*'],
            body: [
              [
                [{ text: 'Buyer' },
                { text: this.shared.customerData.custName, bold: true },
                { text: this.shared.customerData.custGstNumber }],
                [{ text: 'Address Buyer' },
                { text: ['At.Post : ',this.shared.customerData.custAddress] },
                { text: ['State : ',this.shared.customerData.custStateName] }]
              ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },
        {
          table: {
            widths: [200, 50, 45, 50, 60, 62],
            body:
              temp

          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0 : 0;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },
        {
          table: {
            widths: ['*', 62],
            body: [
              [
                { text: 'Total', bold: true, alignment: 'right' },
                { text: this.shared.invoiceData.subTotal }
              ],
              [
                { text: 'Round Off', alignment: 'right' },
                { text: this.shared.invoiceData.subTotal }
              ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },
        {
          table: {
            widths: ['*'],
            body: [
              [
                { text: ['Amount in words(Rs.): ', this.inword, ' Only'], bold: true }
              ],
             
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },
        // {
        //   table: {
        //     widths: ['*', '*', '*', '*'],
        //     body:
        //       temp1

        //   },
        //   layout: {
        //     hLineWidth: function (i, node) {
        //       return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
        //     },
        //     vLineWidth: function (i, node) {
        //       return 0.1;
        //     },
        //   }
        // },
        {
          table: {
            widths: ['*'],
            body: [
              [{ text: ['Note:\n', this.shared.invoiceData.note] }]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },
        {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: ['Declaration\n', this.shared.invoiceData.declaration] },
                { text: ['For:', this.shared.companyData.companyName, '\n\n\n Auth. Signatory'] }
              ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        }


      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        heading: {
          bold: true
        },
        itemTable: {
          margin: [20, 20, 2, 0]
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefination);
    this.download();
  }
  download() {
    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      this.pdfObj.download();
    }
  }
}
