import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ShareddataService } from '../../../services/shareddata.service';
import * as jsPDF from 'jspdf';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { PopoverController, Platform } from '@ionic/angular';
import { DatePipe, DecimalPipe } from '@angular/common';
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
  selector: 'app-template3',
  templateUrl: './template3.page.html',
  styleUrls: ['./template3.page.scss'],
})
export class Template3Page implements OnInit {
  @ViewChild('id') id: ElementRef;
  date: any;
  no: string;
  invoiceAllData: { [k: string]: any; };
  inwords: any;
  gst: string;
  isIntra: boolean = true;
  inword: any;
  gstBit: number;
  companyId: number;
  taxAmount: any;
  pdfObj = null;

  constructor(
    public shared: ShareddataService,
    public popoverController: PopoverController,
    public datepipe: DatePipe,
    public decimalPipe: DecimalPipe,
    public httpClient: HttpClient,
    public config: ConfigService,
    public platform: Platform,
    public file: File,
    public fileOpener: FileOpener
,public numToWord: NumberToWordsPipe

  ) {

  }

  ngOnInit() {

    this.companyId = this.shared.companyData.companyId;;
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
    dat.custId = localStorage.getItem('custId');;
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

      } else {
        this.shared.presentDangerToast(data.message);
      }
    })

    this.httpClient.get(this.config.url + 'item/getItem/' + this.shared.invoiceData.invoiceId).subscribe((data: any) => {
      if (data.status == true) {
        this.shared.invoiceItems = data.result;
        console.log(this.shared.invoiceItems);
      } else {
        this.shared.presentDangerToast(data.message);
      }
    })
    this.date = this.datepipe.transform(new Date(), 'dd/MM/y');
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
    var temp1 = [];
    let DescTableTotal=[];
let tableTotalTax=[];
    temp.push([
      { text: 'Description Of Goods', fillColor:'whitesmoke' },
      { text: 'HSN/SAC Code', fillColor:'whitesmoke' },
      { text: 'Qty' , fillColor:'whitesmoke'},
      
      { text: 'Rate', fillColor:'whitesmoke' },
      { text: 'Taxable Value', fillColor:'whitesmoke' },
      { text: 'Disc(%)' , fillColor:'whitesmoke'},
      { text: 'Disc. Value' , fillColor:'whitesmoke'},
      { text: 'Amt' , fillColor:'whitesmoke', alignment:'right'}

    ]);

    this.shared.invoiceItems.forEach(element => {
      temp.push(
        [
          { text: element.itemName },
          { text: element.hsnCode },
          { text: element.quantity , alignment: 'right'},
          { text: element.itemPrice , alignment: 'right'},
          { text: element.subTotal.toFixed(2), alignment: 'right' },
          { text: element.discount.toFixed(2), alignment: 'right' },
          { text: element.discountAmount.toFixed(2), alignment: 'right' },
          { text: element.netTotal, bold: true, alignment: 'right' },
        ])
    });
    if(!this.isIntra){

      temp1.push([
        { text: 'HSN/SAC', alignment: 'center' },
        { text: 'Taxable Amount', alignment: 'center' },
        { text: '-', alignment: 'center' },
        { text: '-', alignment: 'center' },
        { text: 'IGST(%)', alignment: 'center' },
        { text: 'IGST Amount', alignment: 'center' },
        { text: 'Tax Amount', alignment: 'center' },
      ]);
      this.shared.invoiceItems.forEach(element => {
        temp1.push(
          [
            { text: element.hsnCode },
            { text: element.subTotal.toFixed(2), alignment: 'right' },
            { text: '', alignment: 'right' },
            { text: '', alignment: 'right' }, 
            { text: element.igst.toFixed(2), alignment: 'right' },
            { text: element.igstAmount.toFixed(2), alignment: 'right' }, 
            { text: element.taxAmount.toFixed(2), alignment: 'right' },
  
          ]
        )
  
      });  
      DescTableTotal.push(

      [
        { text: 'Total:', alignment: 'right', bold: true },
        { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right', bold: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
      [
  
        { text: 'Sub Total:', alignment: 'right', bold: true },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right', bold: true },
      ],
     
      [
        { text: 'IGST:', alignment: 'right', bold: true },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: this.shared.invoiceData.totalIgstAmount.toFixed(2), alignment: 'right', bold: true },
      ],
      [
        { text: 'Invoice Total:', alignment: 'right', bold: true },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: this.shared.invoiceData.totalAmountAfterTax.toFixed(2), alignment: 'right', bold: true },
      ]
      );
////////////////////
tableTotalTax.push(
  [
    { text: 'Total', bold: true, alignment: 'right' },
    { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right' },
    { text: '' },
    { text: ''},
    { text: '' },
    { text: this.shared.invoiceData.totalIgstAmount.toFixed(2), alignment: 'right' },
    { text: this.shared.invoiceData.totalTaxableAmount.toFixed(2), alignment: 'right' }
  ])
  }else{
    ////////
    temp1.push([
      { text: 'HSN/SAC', alignment: 'center' },
      { text: 'Taxable Amount', alignment: 'center' },
      { text: 'CGST(%)', alignment: 'center' },
      { text: 'CGST Amount', alignment: 'center' },
      { text: 'SGST(%)', alignment: 'center' },
      { text: 'SGST Amount', alignment: 'center' },
      { text: 'Tax Amount', alignment: 'center' },
    ]);


    this.shared.invoiceItems.forEach(element => {
      temp1.push(
        [
          { text: element.hsnCode },
          { text: element.subTotal.toFixed(2), alignment: 'right' },
          { text: element.gst / 2, alignment: 'right' },
          { text: element.cgstAmount.toFixed(2), alignment: 'right' },
          { text: element.gst / 2, alignment: 'right' },
          { text: element.sgstAmount.toFixed(2), alignment: 'right' },
          { text: element.taxAmount.toFixed(2), alignment: 'right' },

        ]
      )

    });
    ///////////////
    DescTableTotal=

    [
      { text: 'Total:', alignment: 'right', bold: true },
      { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right', bold: true },
      { text: '' },
      { text: '' },
      { text: '' },
    ],
    [

      { text: 'Sub Total:', alignment: 'right', bold: true },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right', bold: true },
    ],
    [
      { text: 'CGST:', alignment: 'right', bold: true },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: this.shared.invoiceData.totalCgstAmount.toFixed(2), alignment: 'right', bold: true },
    ],
    [
      { text: 'SGST:', alignment: 'right', bold: true },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: this.shared.invoiceData.totalSgstAmount.toFixed(2), alignment: 'right', bold: true },
    ],
    [
      { text: 'Invoice Total:', alignment: 'right', bold: true },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: this.shared.invoiceData.totalAmountAfterTax.toFixed(2), alignment: 'right', bold: true },
    ]
    ////////////////////
tableTotalTax.push(
  [
    { text: 'Total', bold: true, alignment: 'right' },
    { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right' },
    { text: '' },
    { text: this.shared.invoiceData.totalCgstAmount.toFixed(2), alignment: 'right' },
    { text: '' },
    { text: this.shared.invoiceData.totalSgstAmount.toFixed(2), alignment: 'right' },
    { text: this.shared.invoiceData.totalTaxableAmount.toFixed(2), alignment: 'right' }
  ])
  }
    var docDefination = {
      content: [
        { text: 'TAX INVOICE', alignment: 'center', style: 'header' },
        {
          table: {

            widths: ['*'],
            body: [
              [
                [{ text: this.shared.companyData.companyName, bold: true, alignment: 'center' },
                { text: this.shared.companyData.companyAddress, alignment: 'center' },
                { text: ['GST:', this.shared.companyData.companyGstNo], alignment: 'center' },
                { text: ['M.No.:', this.shared.companyData.custMobile, '  Email:', this.shared.companyData.companyEmail], alignment: 'center' }
                ]

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
            widths: ['*', '*', '*'],
            body: [
              [
                [
                  { text: ['Party Name :  ', this.shared.customerData.custName] },
                  { text: this.shared.customerData.custAddress },
                  { text: this.shared.customerData.mobileNumber }
                ],

                [{ text: ['INV No:', this.shared.invoiceData.invoiceNumber] },
                { text: ['P.O.No'] },
                { text: ['D.C.No'] }
                ],

                [{ text: ['Date:',this.date] },
                { text: ['Date:',] },
                { text: ['Date:',] }]
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
            style:'header',
            widths: [148, 40, 30, 35, 50, 45, 45, 58],
            body: temp
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
            widths: ['*', 50, 45, 45, 58],
            body: DescTableTotal
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
              [{ text: ['Amount In Word:\n', this.inwords], bold: true }]
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
            widths: ['*', '*', '*', '*', '*', '*', '*'],
            body: temp1
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
            widths: ['*', '*', '*', '*', '*', '*', '*'],
            body:tableTotalTax
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
                { text: ['In Words : ', this.taxAmount], bold: true }
              ],
              [
                { text: ['Note:', this.shared.invoiceData.note] }
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
            widths: ['*', '*'],
            body: [
              [
                { text: ['Declaration\n', this.shared.invoiceData.declaration] },

                { text: ['For : ', this.shared.companyData.companyName, '\n\n\n', 'Auth Sign'] }
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
          fontSize: 10,
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

    temp.push([
      { text: 'Description Of Goods', fillColor:'whitesmoke' },
      { text: 'HSN/SAC Code', fillColor:'whitesmoke' },
      { text: 'Qty' , fillColor:'whitesmoke'},
      { text: 'Rate', fillColor:'whitesmoke' },
      { text: 'Taxable Value', fillColor:'whitesmoke' },
      { text: 'Disc(%)' , fillColor:'whitesmoke'},
      { text: 'Disc. Value' , fillColor:'whitesmoke'},
      { text: 'Amt' , fillColor:'whitesmoke', alignment:'right'}

    ]);

    this.shared.invoiceItems.forEach(element => {
      temp.push(
        [
          { text: element.itemName },
          { text: element.hsnCode },
          { text: element.quantity , alignment: 'right'},
          { text: element.itemPrice , alignment: 'right'},
          { text: element.subTotal.toFixed(2), alignment: 'right' },

          { text: element.discount.toFixed(2) , alignment: 'right'},
          { text: element.discountAmount.toFixed(2) , alignment: 'right'},
          { text: element.subTotal.toFixed(2), bold: true, alignment: 'right' },
        ])
    });


    var docDefination = {
      content: [
        { text: 'TAX INVOICE', alignment: 'center', style: 'header' },
        {
          table: {

            widths: ['*'],
            body: [
              [
                [{ text: this.shared.companyData.companyName, bold: true, alignment: 'center' },
                { text: this.shared.companyData.companyAddress, alignment: 'center' },
                { text: ['M.No.:', this.shared.companyData.custMobile, '  Email:', this.shared.companyData.companyEmail], alignment: 'center' }
                ]

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
            widths: ['*', '*', '*'],
            body: [
              [
                [
                  { text: ['Party Name :  ', this.shared.customerData.custName] },
                  { text: this.shared.customerData.custAddress },
                  { text: this.shared.customerData.mobileNumber }
                ],

                [{ text: ['INV No:', this.shared.invoiceData.invoiceNumber] },
                { text: ['P.O.No'] },
                { text: ['D.C.No'] }
                ],

                [{ text: ['Date:', this.date] },
                { text: ['Date:',] },
                { text: ['Date:',] }]
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
            style:'header',
            widths: ['*', 60, 30,40, 40, 50, 50, 60],

            body: temp
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
            widths: ['*', 50, 45, 45, 58],
            body: [
              [
                { text: 'Total:', alignment: 'right', bold: true },
                { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right', bold: true },
                { text: '' },
                { text: '' },
                { text: '' },
              ],
              [

                { text: 'Sub Total:', alignment: 'right', bold: true },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right', bold: true },
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
        {
          table: {
            widths: ['*'],
            body: [
              [{ text: ['Amount In Word:\n', this.inwords], bold: true }]
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
            widths: ['*'],
            body: [
             
              [
                { text: ['Note:', this.shared.invoiceData.note] }
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
            widths: ['*', '*'],
            body: [
              [
                { text: ['Declaration\n', this.shared.invoiceData.declaration] },

                { text: ['For : ', this.shared.companyData.companyName, '\n\n\n', 'Auth Sign'] }
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
          fontSize: 10,
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
