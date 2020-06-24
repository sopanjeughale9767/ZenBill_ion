import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LoadingController, Platform, PopoverController } from '@ionic/angular';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import domtoimage from 'dom-to-image';
import * as jsPDF from 'jspdf';
import * as pdfmake from 'pdfmake/build/pdfmake';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { NumberToWordsPipe } from 'src/app/pipes/num-to-word.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  today: string;
  items: string[];
  isItemAvailable: boolean = false;
  pdfObj = null;

  formData = {
    name: '',
  }
  date: any;
  loading: any;

  @ViewChild('id') id: ElementRef;
  gst: string;
  isIntra: boolean = true;
  gstBit: number;
  companyId: number;
  public invoiceAllData: { [i: string]: any } = {};
  inwords: any;
  taxAmount: any;
  constructor(
    public platform: Platform,
    public config: ConfigProvider,
    public shared: ShareddataService,
    public socialSharing: SocialSharing,
    public loadingc: LoadingController,
    private file: File,
    private fileOpener: FileOpener,
    public router: Router,
    public datepipe: DatePipe,
    public popoverController: PopoverController,
    public httpClient: HttpClient,
public numToWord: NumberToWordsPipe

  ) {


  }

  ngOnInit() {
    if(this.shared.isSelectGST){
        // console.log('cgst',this.shared.companyData);
        if (this.shared.customerData.custGstNumber.substring(0, 2) == this.shared.companyData.companyGstNo.substring(0, 2)) {
          this.isIntra = true;
        } else {
          this.isIntra = false;
        }
      }
    

    var dat: { [k: string]: any } = {};
    dat.custId = this.shared.customerData.custId;;
    dat.companyId = this.shared.companyData.companyId;

    // this.httpClient.get(this.config.url + 'invoice/getInvoiceById/' + this.shared.invoiceData.invoiceId).subscribe((data: any) => {
    //   debugger
    //   if (data.status == true) {
        // this.shared.invoiceData = data.result[0];
        // this.invoiceAllData = data.result[0];
        // console.log(this.invoiceAllData);
        var converter = require('number-to-words');
        this.inwords =  this.numToWord.transform(this.shared.invoiceData.totalAmountAfterTax);
        this.inwords =  this.numToWord.transform(this.shared.invoiceData.subTotal);
        this.taxAmount =  this.numToWord.transform(this.shared.invoiceData.totalTaxableAmount);

    //   } else {
    //     this.shared.presentDangerToast('Invoice Data Not Found');
    //   }
    // })
debugger
    this.httpClient.get(this.config.url + 'item/getItem/' + this.shared.invoiceData.invoiceId).subscribe((data: any) => {
      if (data.status == true) {
        this.shared.itemData = data.result;
      } else {
        this.shared.presentDangerToast('Invoice Item Data Not Found');
      }
    })
    this.date = this.datepipe.transform(new Date(), 'dd/MM/y'); 
    // this.gstBit = parseInt(localStorage.getItem('gstBit'));
  }

  abc() {
    this.httpClient.get(this.config.url + 'items').subscribe((data: any) => {
      console.log(data);
    })
  }
  async presentLoading(msg) {
    const loading = await this.loadingc.create({
      message: msg,
      duration: 5000
    });
    return await loading.present();
  }




  ionChange(i) {
    this.isItemAvailable = false;
    this.formData.name = i;
    console.log(i);
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
    debugger;

    var temp = [];
    var temp1 = [];
let tableMainTax=[];
    temp.push([
      { text: 'HSN', fillColor: 'whitesmoke' },
      { text: 'Item Name', fillColor: 'whitesmoke' },
      { text: 'Qty', fillColor: 'whitesmoke' },
      { text: 'Price', fillColor: 'whitesmoke' },
      { text: 'Unit', fillColor: 'whitesmoke' }, 
      { text: 'Total', fillColor: 'whitesmoke' },
      { text: 'Disc(%)', fillColor: 'whitesmoke' },
      { text: 'SubTotal', fillColor: 'whitesmoke' },
      { text: 'GST(%)', fillColor: 'whitesmoke' },
      { text: 'Net Total', fillColor: 'whitesmoke' }
    ]);
    if(!this.isIntra){
    temp1.push([
      { text: 'HSN/SAC', alignment: 'center' },
      { text: 'Taxable Amount',  alignment: 'right'},
      { text: ''},
      { text: '' },
      { text: 'IGST(%)',  alignment: 'right'},
      { text: 'IGST Amount',  alignment: 'right'},
      { text: 'Tax Amount',  alignment: 'right'},
    ]);


    this.shared.itemData.forEach(element => {
      temp1.push(
        [
          { text: element.hsnCode },
          { text: element.subTotal.toFixed(2), alignment: 'right' },
          { text: ''},
          { text: '' },
          { text: element.gst, alignment: 'right' },
          { text: element.igstAmount.toFixed(2), alignment: 'right' },
          { text: element.taxAmount.toFixed(2), alignment: 'right' },

        ]
      )

    });
     ///////////
     tableMainTax.push(
      [
        { text: 'Total Invoice Amount In Words:' },
        { text: 'Amount Before Tax', bold: true },
        { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right', bold: true },
      ],
      
      [
        { text: '' },
        { text: 'Add IGST' },
        { text: this.shared.invoiceData.totalIgstAmount.toFixed(2), alignment: 'right' },
      ],
      [
        { text: 'Bank Details' },
        { text: 'Tax Amount : GST', bold: true },
        { text: this.shared.invoiceData.totalTaxableAmount.toFixed(2), alignment: 'right',bold:true },
      ],
      [
        { text: '' },
        { text: 'Extra' },
        { text: this.shared.invoiceData.extra, alignment: 'right' },
      ],
      [
        { text: '' },
        { text: 'Amount After Tax', bold: true },
        { text: this.shared.invoiceData.totalAmountAfterTax.toFixed(2), alignment: 'right',bold:true },
      ])
  }else{
    temp1.push([
      { text: 'HSN/SAC', alignment: 'center' },
      { text: 'Taxable Amount',  alignment: 'right' },
      { text: 'CGST(%)',  alignment: 'right' },
      { text: 'CGST Amount',  alignment: 'right' },
      { text: 'SGST(%)',  alignment: 'right' },
      { text: 'SGST Amount',  alignment: 'right' },
      { text: 'Tax Amount',  alignment: 'right' },
    ]);


    this.shared.itemData.forEach(element => {
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
    ///////////
    tableMainTax.push(
      [
        { text: 'Total Invoice Amount In Words:' },
        { text: 'Amount Before Tax', bold: true },
        { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right', bold: true },
      ],
      [
        { text: this.inwords },
        { text: 'Add CGST' },
        { text: this.shared.invoiceData.totalCgstAmount.toFixed(2), alignment: 'right' },
      ],
      [
        { text: '' },
        { text: 'Add SGST' },
        { text: this.shared.invoiceData.totalSgstAmount.toFixed(2), alignment: 'right' },
      ],
      [
        { text: 'Bank Details' },
        { text: 'Tax Amount : GST', bold: true },
        { text: this.shared.invoiceData.totalTaxableAmount.toFixed(2), alignment: 'right',bold:true },
      ],
      [
        { text: '' },
        { text: 'Extra' },
        { text: this.shared.invoiceData.extra, alignment: 'right' },
      ],
      [
        { text: '' },
        { text: 'Amount After Tax', bold: true },
        { text: this.shared.invoiceData.totalAmountAfterTax.toFixed(2), alignment: 'right',bold:true },
      ])
  }
    this.shared.itemData.forEach(element => {
      temp.push(
        [
          { text: element.hsnCode },
          { text: element.itemName },
          { text: element.quantity , alignment: 'right'},
          { text: element.itemPrice , alignment: 'right'},
          { text: element.unit , alignment: 'right'},
          { text: element.total.toFixed(2) , alignment: 'right'},
          { text: element.discount.toFixed(2) , alignment: 'right'},
          { text: element.subTotal.toFixed(2) , alignment: 'right'},
          { text: element.gst , alignment: 'right'},
          { text: element.netTotal.toFixed(2) ,alignment:'right'}
        ])
    });
    var docDefination = {
      content: [

        {
          text: [
            this.shared.companyData.companyName, '\n',
            this.shared.companyData.companyAddress, '\n', 
            'E-mail-Id:', this.shared.companyData.companyEmail,
            '   GSTIN:', this.shared.companyData.companyGstNo
          ], alignment: 'center'
        },
        { text: '\n' },
        { text: 'TAX INVOICE', alignment: 'center', fillColor: 'whitesmoke' }, ,
        { text: '\n' },
        {

          style: 'tbl2',
          table: {
            widths: ['*', '*', '*', '*'],
            body: [
              [
                { text: 'Invoice Date', style: 'heading' },
                { text: this.date, style: 'data' },
                { text: 'Invoice Number', style: 'heading' },
                { text: this.shared.invoiceData.invoiceNumber, style: 'data' }
              ],
              [
                { text: 'Due Date', style: 'heading' },
                { text: '', style: 'data' },
                { text: 'Transportation', style: 'heading' },
                { text: '', style: 'data' }
              ],

              [
                { text: 'Bill To', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' },
                { text: 'Ship To', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' }
              ],
              [
                { text: 'Name', style: 'heading' },
                { text: this.shared.customerData.custName, style: 'data' },
                { text: 'Name', style: 'heading' },
                { text: this.shared.customerData.custName, style: 'data' },
              ],
              [
                { text: 'Address', style: 'heading' },
                { text: this.shared.customerData.custAddress, style: 'data' },
                { text: 'Address', style: 'heading' },
                { text: '', style: 'data' },
              ],

              [
                { text: 'GST NO.', style: 'heading' },
                { text: this.shared.customerData.custGstNumber, style: 'data' },
                { text: 'GST NO.', style: 'heading' },
                { text: this.shared.customerData.custGstNumber, style: 'data' },
              ],
              [
                { text: 'State', style: 'heading' },
                { text: this.shared.customerData.custStateName, style: 'data' },
                { text: 'State', style: 'heading' },
                { text: '', style: 'data' }
              ],

              [
                { text: 'State No.', style: 'heading' },
                { text: this.shared.customerData.custCode, style: 'data' },
                { text: 'State No.' },
                { text: '' }
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
          style: 'itemTable',
          table: {
            widths: [38, 90, 20, 40, 25, 40, 42, 48, 40, 52],
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
            widths: ['*', 52],
            body:
              [
                [{ text: 'Total', alignment: 'right', bold: true },
                { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right' }]
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
          style: 'tbl2',
          table: {
            widths: ['*', 90, 52],
            body: tableMainTax
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
          style: 'tbl2',
          table: {
            widths: ['*', '*', '*'],
            body: [
              [
                [{ text: 'Tearms And Conditions', bold:true },
                { text: this.shared.companyData.deliveryTerms }
                ],
                { text: '\n\n(Common Seal)' },
                [{ text: 'Certified that the particulars given above are true and correct.\n\n\n' },
              {text:'Authorised Signatory', bold:true}
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
        }
      ],
      styles: {
        tbl1: {
          fontSize: 12
        },
        tbl2: {
          fontSize: 10,

        },
        header: {
          fontSize: 18,
          bold: true
        },
        heading: {
          bold: true
        },
        itemTable: {
          fontSize: 10,
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefination);
    this.download();
  }

  
  create1() {
    debugger;

    var temp = [];
    var temp1 = [];

    temp.push([
      { text: 'HSN', fillColor: 'whitesmoke' },
      { text: 'Item Name', fillColor: 'whitesmoke' },
      { text: 'Qty', fillColor: 'whitesmoke' },
      { text: 'Price', fillColor: 'whitesmoke' },
      { text: 'Unit', fillColor: 'whitesmoke' },
      { text: 'Total', fillColor: 'whitesmoke' },
      { text: 'Disc(%)', fillColor: 'whitesmoke' },
      { text: 'SubTotal', fillColor: 'whitesmoke' },
    ]);

    this.shared.itemData.forEach(element => {
      temp.push(
        [
          { text: element.hsnCode },
          { text: element.itemName },
          { text: element.quantity , alignment: 'right'},
          { text: element.itemPrice , alignment: 'right'},
          { text: element.unit , alignment: 'right'},
          { text: element.total.toFixed(2) , alignment: 'right'},
          { text: element.discount.toFixed(2) , alignment: 'right'},
          { text: element.subTotal.toFixed(2) , alignment: 'right'},
        ])
    });
    var docDefination = {
      content: [

        {
          text: [
            this.shared.companyData.companyName, '\n',
            this.shared.companyData.companyAddress, '\n',
            'E-mail-Id:', this.shared.companyData.companyEmail,
          ], alignment: 'center'
        },
        { text: '\n' },
        { text: 'TAX INVOICE', alignment: 'center', fillColor: 'whitesmoke' }, ,
        { text: '\n' },
        {

          style: 'tbl2',
          table: {
            widths: ['*', '*', '*', '*'],
            body: [
              [
                { text: 'Invoice Date', style: 'heading' },
                { text: this.date, style: 'data' },
                { text: 'Invoice Number', style: 'heading' },
                { text: this.shared.invoiceData.invoiceNumber, style: 'data' }
              ],
              [
                { text: 'Due Date', style: 'heading' },
                { text: '', style: 'data' },
                { text: 'Transportation', style: 'heading' },
                { text: '', style: 'data' }
              ],

              [
                { text: 'Bill To', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' },
                { text: 'Ship To', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' }
              ],
              [
                { text: 'Name', style: 'heading' },
                { text: this.shared.customerData.custName, style: 'data' },
                { text: 'Name', style: 'heading' },
                { text: this.shared.customerData.custName, style: 'data' },
              ],
              [
                { text: 'Address', style: 'heading' },
                { text: this.shared.customerData.custAddress, style: 'data' },
                { text: 'Address', style: 'heading' },
                { text: '', style: 'data' },
              ],

              [
                { text: 'State', style: 'heading' },
                { text: this.shared.customerData.custStateName, style: 'data' },
                { text: 'State', style: 'heading' },
                { text: '', style: 'data' }
              ],

              [
                { text: 'State No.', style: 'heading' },
                { text: this.shared.customerData.custCode, style: 'data' },
                { text: 'State No.' },
                { text: '' }
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
          style: 'itemTable',
          table: {
            widths: [38, 138, 30, 50, 35, 50, 52, 54],
            body:
              temp
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
            widths: ['*', 52],
            body:
              [
                [{ text: 'Total', alignment: 'right', bold: true },
                { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right' }]
              ]
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
          style: 'tbl2',
          table: {
            widths: ['*', '*', '*'],
            body: [
              [
                [{ text: 'Tearms And Conditions', bold:true },
                { text: this.shared.companyData.deliveryTerms }
                ],
                { text: '\n\n(Common Seal)' },
                [{ text: 'Certified that the particulars given above are true and correct.\n\n\n' },
              {text:'Authorised Signatory', bold:true}
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
        }
      ],
      styles: {
        tbl1: {
          fontSize: 12
        },
        tbl2: {
          fontSize: 10,

        },
        header: {
          fontSize: 18,
          bold: true
        },
        heading: {
          bold: true
        },
        itemTable: {
          fontSize: 10,
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
