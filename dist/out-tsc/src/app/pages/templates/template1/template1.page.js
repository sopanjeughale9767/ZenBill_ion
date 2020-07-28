var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { DatePipe } from '@angular/common';
import * as jsPDF from 'jspdf';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { PopoverController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ConfigService } from 'src/app/provider/config.service';
import { NumberToWordsPipe } from 'src/app/pipes/num-to-word.pipe';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var Template1Page = /** @class */ (function () {
    function Template1Page(popoverController, shared, datepipe, httpClient, 
    // public config: ConfigProvider,
    platform, file, fileOpener, config, numToWord) {
        this.popoverController = popoverController;
        this.shared = shared;
        this.datepipe = datepipe;
        this.httpClient = httpClient;
        this.platform = platform;
        this.file = file;
        this.fileOpener = fileOpener;
        this.config = config;
        this.numToWord = numToWord;
        this.invoiceAllData = {
            totalAmountAfterTax: 0,
            subTotal: 0,
            totalTaxableAmount: 0,
            totalSgstAmount: 0,
            totalCgstAmount: 0,
            totalIgstAmount: 0
        };
        this.pdfObj = null;
        this.isIntra = true;
    }
    Template1Page.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        // Declaration part
        this.CustGSTNumber = this.shared.customerData.custGstNumber;
        if (this.shared.customerData.custGstNumber.substring(0, 2) == this.shared.companyData.companyGstNo.substring(0, 2)) {
            this.isIntra = true;
        }
        else {
            this.isIntra = false;
        }
        var dat = {};
        dat.custId = this.shared.customerData.custId;
        dat.companyId = this.shared.companyData.companyId;
        this.config.postHttp('invoice/getInvoiceById/' + this.shared.invoiceData.invoiceId, dat).then(function (data) {
            if (data.status == true) {
                _this.shared.invoiceData = data.result[0];
                _this.invoiceAllData = data.result[0];
                //console.log(this.invoiceAllData);
                var converter = require('number-to-words');
                _this.inwords = _this.numToWord.transform(_this.invoiceAllData.totalAmountAfterTax); //  this.numToWord.transform(this.invoiceAllData.totalAmountAfterTax |);
                _this.inword = _this.numToWord.transform(_this.invoiceAllData.subTotal);
                _this.taxAmount = _this.numToWord.transform(_this.invoiceAllData.totalTaxableAmount);
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
        this.config.getHttp('item/getItem/' + this.shared.invoiceData.invoiceId).then(function (data) {
            if (data.status == true) {
                _this.shared.invoiceItems = data.result;
                console.log(_this.shared.invoiceItems);
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
        this.date = this.datepipe.transform(new Date(), 'dd/MM/y');
        // this.gstBit = parseInt(localStoƒƒrage.getItem('gstBit'));
    };
    Template1Page.prototype.generatePdf = function () {
        var doc = new jsPDF;
        var specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };
        var content = this.id.nativeElement;
        doc.fromHTML(content.innerHTML, 10, 10, {
            'width': 200,
            'elementHandlers': specialElementHandlers,
        });
        doc.save('invoice.pdf');
    };
    Template1Page.prototype.presentPopover = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: PopoverComponent,
                            event: ev,
                            translucent: true
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Template1Page.prototype.create = function () {
        var temp = [];
        var temp1 = [];
        var totalValueTable = [];
        var DescTotalTabl = [];
        debugger;
        temp.push([
            { text: 'Description Of Goods', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Hsn Code', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Qty', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Unit', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Rate', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Disc (%)', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Disc. Amount', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Amt', fillColor: 'whitesmoke', alignment: 'center' }
        ]);
        debugger;
        this.shared.invoiceItems.forEach(function (element) {
            temp.push([
                { text: element.itemName, bold: true },
                { text: element.hsnCode, alignment: 'right' },
                { text: element.quantity, bold: true, alignment: 'right' },
                { text: element.unit, bold: true, alignment: 'right' },
                { text: element.itemPrice.toFixed(2), alignment: 'right' },
                { text: element.discount, alignment: 'right' },
                { text: element.discountAmount.toFixed(2), alignment: 'right' },
                { text: element.subTotal.toFixed(2), bold: true, alignment: 'right' },
            ]);
        });
        if (!this.isIntra) {
            temp1.push([
                { text: 'HSN/SAC', alignment: 'center' },
                { text: 'Taxable Amount', alignment: 'center' },
                { text: '-', alignment: 'center' },
                { text: '-', alignment: 'center' },
                { text: 'IGST(%)', alignment: 'center' },
                { text: 'IGST Amount', alignment: 'center' },
                { text: 'Tax Amount', alignment: 'center' },
            ]);
            this.shared.invoiceItems.forEach(function (element) {
                temp1.push([
                    { text: element.hsnCode },
                    { text: element.subTotal.toFixed(2), alignment: 'right' },
                    { text: '', alignment: 'right' },
                    { text: '', alignment: 'right' },
                    { text: element.igst, alignment: 'right' },
                    { text: element.igstAmount.toFixed(2), alignment: 'right' },
                    { text: element.taxAmount.toFixed(2), alignment: 'right' },
                ]);
            });
            totalValueTable.push([
                { text: 'Total', bold: true, alignment: 'right' },
                { text: '' + this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' + this.shared.invoiceData.totalIgstAmount.toFixed(2), alignment: 'right' },
                { text: this.shared.invoiceData.totalTaxableAmount.toFixed(2), alignment: 'right' }
            ]);
            ///////////
            DescTotalTabl.push([
                { text: '', style: 'boldalign' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), style: 'boldalign', fillColor: 'whitesmoke' },
            ], [
                { text: 'IGST', style: 'boldalign' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: this.invoiceAllData.totalIgstAmount.toFixed(2), style: 'boldalign' },
            ]);
        }
        else {
            temp1.push([
                { text: 'HSN/SAC', alignment: 'center' },
                { text: 'Taxable Amount', alignment: 'center' },
                { text: 'CGST(%)', alignment: 'center' },
                { text: 'CGST Amount', alignment: 'center' },
                { text: 'SGST(%)', alignment: 'center' },
                { text: 'SGST Amount', alignment: 'center' },
                { text: 'Tax Amount', alignment: 'center' },
            ]);
            this.shared.invoiceItems.forEach(function (element) {
                temp1.push([
                    { text: element.hsnCode },
                    { text: element.subTotal.toFixed(2), alignment: 'right' },
                    { text: element.gst / 2, alignment: 'right' },
                    { text: element.cgstAmount.toFixed(2), alignment: 'right' },
                    { text: element.gst / 2, alignment: 'right' },
                    { text: element.sgstAmount.toFixed(2), alignment: 'right' },
                    { text: element.taxAmount.toFixed(2), alignment: 'right' },
                ]);
            });
            totalValueTable.push([
                { text: 'Total', bold: true, alignment: 'right' },
                { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right' },
                { text: '' },
                { text: this.shared.invoiceData.totalCgstAmount.toFixed(2), alignment: 'right' },
                { text: '' },
                { text: this.shared.invoiceData.totalSgstAmount.toFixed(2), alignment: 'right' },
                { text: this.shared.invoiceData.totalTaxableAmount.toFixed(2), alignment: 'right' }
            ]);
            ///////////
            DescTotalTabl.push([
                { text: '', style: 'boldalign' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), style: 'boldalign', fillColor: 'whitesmoke' },
            ], [
                { text: 'SGST', style: 'boldalign' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: this.invoiceAllData.totalSgstAmount.toFixed(2), style: 'boldalign' },
            ], [
                { text: 'CGST', style: 'boldalign' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: this.invoiceAllData.totalCgstAmount.toFixed(2), style: 'boldalign' },
            ]);
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
                                            [{ text: ['Invoice Number\n Inv/', this.shared.invoiceData.paymentMode + "/" + this.shared.invoiceData.invoiceNumber], bold: true }],
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
                                            [{ text: ['Date\n', this.date], bold: true }],
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
                                    { text: this.shared.customerData.custName, bold: true },
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
                        widths: ['*', 40, 50, 30, 40, 30, 70, 80],
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
                        widths: ['*', 40, 50, 30, 40, 30, 70, 80],
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
                        widths: ['*', 40, 50, 30, 40, 30, 70, 80],
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
                        widths: ['*', 90, 30, 70, 30, 70, 80],
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
                        widths: ['*', 90, 30, 70, 30, 70, 80],
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
        };
        this.pdfObj = pdfMake.createPdf(docDefination);
        this.download();
    };
    Template1Page.prototype.create1 = function () {
        var temp = [];
        temp.push([
            { text: 'Description Of Goods', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Hsn Code', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Qty', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Unit', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Rate', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Disc (%)', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Disc. Amount', fillColor: 'whitesmoke', alignment: 'center' },
            { text: 'Amt', fillColor: 'whitesmoke', alignment: 'center' }
        ]);
        this.shared.invoiceItems.forEach(function (element) {
            temp.push([
                { text: element.itemName, bold: true },
                { text: element.hsnCode, alignment: 'right' },
                { text: element.quantity, bold: true, alignment: 'right' },
                { text: element.unit, bold: true, alignment: 'right' },
                { text: element.itemPrice.toFixed(2), alignment: 'right' },
                { text: element.discount, alignment: 'right' },
                { text: element.discountAmount.toFixed(2), alignment: 'right' },
                { text: element.subTotal.toFixed(2), bold: true, alignment: 'right' },
            ]);
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
                                            [{ text: ['Invoice Number\n', this.shared.invoiceData.invoiceNumber], bold: true }],
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
                                            [{ text: ['Date\n', this.date], bold: true }],
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
                                    { text: this.shared.customerData.custName, bold: true },
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
                        widths: ['*', 60, 30, 40, 40, 50, 50, 60],
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
                        widths: ['*', 60, 30, 40, 40, 50, 50, 60],
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
        };
        this.pdfObj = pdfMake.createPdf(docDefination);
        this.download();
    };
    Template1Page.prototype.download = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.pdfObj.getBuffer(function (buffer) {
                var blob = new Blob([buffer], { type: 'application/pdf' });
                _this.file.writeFile(_this.file.dataDirectory, '' + _this.shared.invoiceData.paymentMode + "-" + _this.shared.invoiceData.invoiceNumber + '.pdf', blob, { replace: true }).then(function (fileEntry) {
                    _this.fileOpener.open(_this.file.dataDirectory + '' + _this.shared.invoiceData.paymentMode + "-" + _this.shared.invoiceData.invoiceNumber + '.pdf', 'application/pdf');
                });
            });
        }
        else {
            this.pdfObj.download();
        }
    };
    __decorate([
        ViewChild('id'),
        __metadata("design:type", ElementRef)
    ], Template1Page.prototype, "id", void 0);
    Template1Page = __decorate([
        Component({
            selector: 'app-template1',
            templateUrl: './template1.page.html',
            styleUrls: ['./template1.page.scss'],
        }),
        __metadata("design:paramtypes", [PopoverController,
            ShareddataService,
            DatePipe,
            HttpClient,
            Platform,
            File,
            FileOpener,
            ConfigService,
            NumberToWordsPipe])
    ], Template1Page);
    return Template1Page;
}());
export { Template1Page };
//# sourceMappingURL=template1.page.js.map