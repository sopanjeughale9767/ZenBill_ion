import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { DatePipe } from '@angular/common';
import * as jsPDF from 'jspdf';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { PopoverController, Platform } from '@ionic/angular';
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
  selector: 'app-template1',
  templateUrl: './template1.page.html',
  styleUrls: ['./template1.page.scss'],
})
export class Template1Page implements OnInit {
  invoiceAllData = {
    totalAmountAfterTax: 0,
    subTotal: 0,
    totalTaxableAmount: 0,
    totalSgstAmount: 0,
    totalCgstAmount: 0,
    totalIgstAmount: 0
  };
  inwords: any;
  date: any;
  showDate: any;
  pdfObj = null;

  @ViewChild('id') id: ElementRef;
  CustGSTNumber: string;
  isIntra: boolean = true;
  // gstBit: number;
  inword: any;
  companyId: number;
  taxAmount: any;

  constructor(
    public popoverController: PopoverController,
    public shared: ShareddataService,
    public datepipe: DatePipe,
    public httpClient: HttpClient,
    // public config: ConfigProvider,
    public platform: Platform,
    public file: File,
    public fileOpener: FileOpener,
    public config: ConfigService,
public numToWord: NumberToWordsPipe
  ) {
  }

  ngOnInit() {

        debugger
        // Declaration part
        this.CustGSTNumber = this.shared.customerData.custGstNumber;
        
        if (this.shared.customerData.custGstNumber.substring(0, 2) == this.shared.companyData.companyGstNo.substring(0, 2)) {
          this.isIntra = true;
        } else { 
          this.isIntra = false;
        }


    var dat: { [k: string]: any } = {};
    dat.custId = this.shared.customerData.custId;
    dat.companyId = this.shared.companyData.companyId;

    this.config.postHttp('invoice/getInvoiceById/' + this.shared.invoiceData.invoiceId,dat).then((data: any) => {
      
      if (data.status == true) {
        this.shared.invoiceData = data.result[0];
        this.invoiceAllData = data.result[0];
        //console.log(this.invoiceAllData);
        var converter = require('number-to-words');
        this.inwords = this.numToWord.transform(this.invoiceAllData.totalAmountAfterTax);//  this.numToWord.transform(this.invoiceAllData.totalAmountAfterTax |);
        this.inword =  this.numToWord.transform(this.invoiceAllData.subTotal);
        this.taxAmount =  this.numToWord.transform(this.invoiceAllData.totalTaxableAmount);

      } else {
        this.shared.presentDangerToast(data.message);
      }
    })

    this.config.getHttp('item/getItem/' + this.shared.invoiceData.invoiceId).then((res: any) => {
     
        this.shared.invoiceItems = res;
      
    })
    this.date = this.datepipe.transform(new Date(), 'dd/MM/y');
    // this.gstBit = parseInt(localStoƒƒrage.getItem('gstBit'));


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
    let totalValueTable=[];
    let DescTotalTabl=[];
debugger
    temp.push([

      { text: 'Description Of Goods', fillColor: 'whitesmoke', alignment: 'center' },
      { text: 'Hsn Code', fillColor: 'whitesmoke', alignment: 'center' },

      { text: 'Qty', fillColor: 'whitesmoke', alignment: 'center' }, 
      { text: 'Unit', fillColor: 'whitesmoke',alignment: 'center' },

      { text: 'Rate', fillColor: 'whitesmoke', alignment: 'center' },

      { text: 'Disc (%)', fillColor: 'whitesmoke', alignment: 'center' },
      { text: 'Disc. Amount', fillColor: 'whitesmoke', alignment: 'center' },
      { text: 'Amt', fillColor: 'whitesmoke', alignment: 'center' }

    ]);
debugger
    this.shared.invoiceItems.forEach(element => {
      temp.push(
        [
          { text: element.itemName, bold: true },
          { text: element.hsnCode, alignment: 'right' },
          { text: element.quantity, bold: true, alignment: 'right' },
          { text: element.unit, bold: true, alignment: 'right' },

          { text: element.itemPrice.toFixed(2), alignment: 'right' },
          { text: element.discount, alignment: 'right' },
          { text: element.discountAmount.toFixed(2), alignment: 'right' },
          { text: element.subTotal.toFixed(2), bold: true, alignment: 'right' },
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

          { text: element.igst, alignment: 'right' },
          { text: element.igstAmount.toFixed(2), alignment: 'right' }, 
          { text: element.taxAmount.toFixed(2), alignment: 'right' },

        ]
      )

    });
    totalValueTable.push(
      [
          { text: 'Total', bold: true, alignment: 'right' },
          { text: ''+this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right' },
          { text: '' },
          { text: '' },
          { text: '' },
          { text: ''+this.shared.invoiceData.totalIgstAmount.toFixed(2), alignment: 'right' },
          { text: this.shared.invoiceData.totalTaxableAmount.toFixed(2), alignment: 'right' }
      ]
  );
///////////
DescTotalTabl.push(
  [
    { text: '', style: 'boldalign' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), style: 'boldalign', fillColor:'whitesmoke' },
  ],
  [
    { text: 'IGST', style: 'boldalign' },
    { text: '' },
    { text: '' },

    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: this.invoiceAllData.totalIgstAmount.toFixed(2), style: 'boldalign' },
  ]
);

  }else{
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
    totalValueTable.push(
        [
          { text: 'Total', bold: true, alignment: 'right' },
          { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2) , alignment: 'right' },
          { text: '' },
          { text: this.shared.invoiceData.totalCgstAmount.toFixed(2), alignment: 'right' },
          { text: '' },
          { text: this.shared.invoiceData.totalSgstAmount.toFixed(2), alignment: 'right' },
          { text: this.shared.invoiceData.totalTaxableAmount.toFixed(2), alignment: 'right' }
        ]
  );
///////////
DescTotalTabl.push(
  [
    { text: '', style: 'boldalign' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), style: 'boldalign', fillColor:'whitesmoke' },
  ],
  [
    { text: 'SGST', style: 'boldalign' },
    { text: '' },
    { text: '' },
    { text: '' },

    { text: '' },
    { text: '' },
    { text: '' },
    { text: this.invoiceAllData.totalSgstAmount.toFixed(2), style: 'boldalign' },
  ],
  [
    { text: 'CGST', style: 'boldalign' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
    { text: this.invoiceAllData.totalCgstAmount.toFixed(2), style: 'boldalign' },
  ]
);
  }

    var docDefination = {
      content: [

        { text: 'TAX INVOICE', alignment: 'center', style: 'header' },
        {
          table: {
            style: 'tbl',
            widths: ['*', '*', '*'],
            body: [
              [
                [{ text: this.shared.companyData.companyName, bold: true },
                { text: this.shared.companyData.companyAddress },
                { text: ['Email:', this.shared.companyData.companyEmail] },
                { text: ['GST:', this.shared.companyData.companyGstNo] }
                ],


                {
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: ['Invoice Number\n Inv/',this.shared.invoiceData.paymentMode+"/"+ this.shared.invoiceData.invoiceNumber],bold:true }],
                      [{ text: ['Delivery Note\n', this.shared.invoiceData.deliveryNote] }],
                      [{ text: ['Suppliers Ref.\n', this.shared.invoiceData.supplierRef] }],

                    ],

                  },
                  layout: {
                    hLineWidth: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? 0 : 0.1;
                    },
                    vLineWidth: function (i, node) {
                      return 0;
                    },
                  }
                },

                {
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: ['Date\n', this.date], bold:true }],
                      [{ text: ['Payment Mode\n', this.shared.invoiceData.paymentMode] }],
                      [{ text: ['Other Ref.\n', this.shared.invoiceData.otherRef] }],

                    ],

                  },
                  layout: {
                    hLineWidth: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? 0 : 0.1;
                    },
                    vLineWidth: function (i, node) {
                      return 0;
                    },
                  }
                }

              ],
              [
                [{ text: 'Buyer' },
                { text: this.shared.customerData.custName, bold:true },
                { text: ['GSTIN/UIN :', this.shared.customerData.custGstNumber] },
                { text: ['State Name:', this.shared.customerData.custStateName] },
                { text: ['State Code:', this.shared.customerData.custCode] }],
                {
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: ['Buyers Order No.\n', this.shared.invoiceData.byersOrderNumber] }],
                      [{ text: ['Despatch Document No.\n', this.shared.invoiceData.despatchDocument] }],
                      [{ text: ['Despatch Through\n', this.shared.invoiceData.otherDespatchThrough] }],

                    ],

                  },
                  layout: {
                    hLineWidth: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? 0 : 0.1;
                    },
                    vLineWidth: function (i, node) {
                      return 0;
                    },
                  }
                },

                {

                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: ['Dated\n', this.datepipe.transform(this.shared.invoiceData.byersDate, 'dd/MM/y')] }],
                      [{ text: ['Delivery Note Date\n', ' '] }],
                      [{ text: ['Destination\n', this.shared.invoiceData.destination] }],

                    ],

                  },
                  layout: {
                    hLineWidth: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? 0 : 0.1;
                    },
                    vLineWidth: function (i, node) {
                      return 0;
                    },
                  }
                }


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
            style: 'colfontsize',
            widths: ['*', 40, 50,30, 40,30, 70, 80],

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
            widths: ['*', 40, 50,30, 40,30, 70, 80],


            body: DescTotalTabl
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
            widths: ['*', 40, 50,30, 40,30, 70, 80],
            body: [
              [
                { text: 'Total', style: 'boldalign', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' },
                
                { text: '', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' },
                { text: this.invoiceAllData.totalAmountAfterTax, style: 'boldalign', fillColor: 'whitesmoke' },
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
              [{ text: ['Amount (in wards)\n INR  ', this.inwords, '  Only'], style: 'tblheading' },
              ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0 : 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
          }
        },
        {
          table: {
            // widths: ['*','*', '*', '*', '*', '*', '*', '*'],
            widths: ['*', 90, 30,70, 30,70, 80],


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
            // widths: ['*', '*','*', '*', '*', '*', '*', '*'],
            widths: ['*', 90, 30,70, 30,70, 80],


            body: totalValueTable
            
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
              [{ text: ['Tax Amount (In Word): INR  ', this.taxAmount, '  Only'], style: 'tblheading' }],
              [{ text: ['Note:', this.shared.invoiceData.note] }]
            ],
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
              [{ text: 'Declaration: \n We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.' },
              { text: ['For:', this.shared.companyData.companyName, '\n', '\n', '\n', 'Authorised Signatory'] }]
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
        boldalign: {
          alignment: 'right',
          bold: true
        },
        tblheading: {
          bold: true
        },
        tbl: {
          border: 0
        },
        header: {
          fontSize: 20,
          bold: true
        },
        heading: {
          bold: true
        },
        itemTable: {
          margin: [20, 20, 2, 0]
        },
        colfontsize: {
          fontSize: 2
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefination);
    this.download();
  }

  create1() {
    var temp = [];

    temp.push([

      { text: 'Description Of Goods', fillColor: 'whitesmoke', alignment: 'center' },
      { text: 'Hsn Code', fillColor: 'whitesmoke', alignment: 'center' },

      { text: 'Qty', fillColor: 'whitesmoke', alignment: 'center' },
      
      { text: 'Unit', fillColor: 'whitesmoke' ,alignment: 'center' },

      { text: 'Rate', fillColor: 'whitesmoke', alignment: 'center' },

      { text: 'Disc (%)', fillColor: 'whitesmoke', alignment: 'center' },
      { text: 'Disc. Amount', fillColor: 'whitesmoke', alignment: 'center' },
      { text: 'Amt', fillColor: 'whitesmoke', alignment: 'center' }

    ]);

    this.shared.invoiceItems.forEach(element => {
      temp.push(
        [
          { text: element.itemName, bold: true },
          { text: element.hsnCode, alignment: 'right' },
          { text: element.quantity, bold: true, alignment: 'right' },
          { text: element.unit, bold: true, alignment: 'right' },

          { text: element.itemPrice.toFixed(2), alignment: 'right' },
          { text: element.discount, alignment: 'right' },
          { text: element.discountAmount.toFixed(2), alignment: 'right' },
          { text: element.subTotal.toFixed(2), bold: true, alignment: 'right' },
        ])
    });

    var docDefination = {
      content: [

        { text: 'TAX INVOICE', alignment: 'center', style: 'header' },
        {
          table: {
            style: 'tbl',
            widths: ['*', '*', '*'],
            body: [
              [

                [{ text: this.shared.companyData.companyName, bold: true },
                { text: this.shared.companyData.companyAddress },
                { text: ['Email:', this.shared.companyData.companyEmail] },
                ],


                {
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: ['Invoice Number\n', this.shared.invoiceData.invoiceNumber],bold:true }],
                      [{ text: ['Delivery Note\n', this.shared.invoiceData.deliveryNote] }],
                      [{ text: ['Suppliers Ref.\n', this.shared.invoiceData.supplierRef] }],

                    ],

                  },
                  layout: {
                    hLineWidth: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? 0 : 0.1;
                    },
                    vLineWidth: function (i, node) {
                      return 0;
                    },
                  }
                },

                {
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: ['Date\n', this.date], bold:true }],
                      [{ text: ['Payment Mode\n', this.shared.invoiceData.paymentMode] }],
                      [{ text: ['Other Ref.\n', this.shared.invoiceData.otherRef] }],

                    ],

                  },
                  layout: {
                    hLineWidth: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? 0 : 0.1;
                    },
                    vLineWidth: function (i, node) {
                      return 0;
                    },
                  }
                }

              ],
              [
                [{ text: 'Buyer' },
                { text: this.shared.customerData.custName, bold:true },
                { text: ['State Name:', this.shared.customerData.custStateName] },
                { text: ['State Code:', this.shared.customerData.custCode] }],
                {
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: ['Buyers Order No.\n', this.shared.invoiceData.byersOrderNumber] }],
                      [{ text: ['Despatch Document No.\n', this.shared.invoiceData.despatchDocument] }],
                      [{ text: ['Despatch Through\n', this.shared.invoiceData.otherDespatchThrough] }],

                    ],

                  },
                  layout: {
                    hLineWidth: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? 0 : 0.1;
                    },
                    vLineWidth: function (i, node) {
                      return 0;
                    },
                  }
                },

                {

                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: ['Dated\n', this.datepipe.transform(this.shared.invoiceData.byersDate, 'dd/MM/y')] }],
                      [{ text: ['Delivery Note Date\n', ' '] }],
                      [{ text: ['Destination\n', this.shared.invoiceData.destination] }],

                    ],

                  },
                  layout: {
                    hLineWidth: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? 0 : 0.1;
                    },
                    vLineWidth: function (i, node) {
                      return 0;
                    },
                  }
                }


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
            style: 'colfontsize',
            widths: ['*', 60, 30,40, 40, 50, 50, 60],
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
            widths: ['*', 60, 30,40, 40, 50, 50, 60],

            body: [
              [
                { text: 'Total', style: 'boldalign', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' },

                { text: '', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' },
                { text: '', fillColor: 'whitesmoke' },
                { text: this.invoiceAllData.subTotal.toFixed(2), style: 'boldalign', fillColor: 'whitesmoke' },
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
              [{ text: ['Amount (in wards)\n INR  ', this.inword, '  Only'], style: 'tblheading' },
              ]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0 : 0.1;
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
              [{ text: ['Note:', this.shared.invoiceData.note] }]
            ],
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
              [{ text: 'Declaration: \n We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.' },
              { text: ['For:', this.shared.companyData.companyName, '\n', '\n', '\n', 'Authorised Signatory'] }]
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
        boldalign: {
          alignment: 'right',
          bold: true
        },
        tblheading: {
          bold: true
        },
        tbl: {
          border: 0
        },
        header: {
          fontSize: 20,
          bold: true
        },
        heading: {
          bold: true
        },
        itemTable: {
          margin: [20, 20, 2, 0]
        },
        colfontsize: {
          fontSize: 2
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
        this.file.writeFile(this.file.dataDirectory,  ''+this.shared.invoiceData.paymentMode+"-"+ this.shared.invoiceData.invoiceNumber+'.pdf', blob, { replace: true }).then(fileEntry => {
          this.fileOpener.open(this.file.dataDirectory + ''+this.shared.invoiceData.paymentMode+"-"+ this.shared.invoiceData.invoiceNumber+'.pdf', 'application/pdf');
        })
      });
    } else {
      this.pdfObj.download();
    }
  }
}
