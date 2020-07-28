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
import { ShareddataService } from '../../../services/shareddata.service';
import * as jsPDF from 'jspdf';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { PopoverController, Platform } from '@ionic/angular';
import { DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ConfigService } from 'src/app/provider/config.service';
import { NumberToWordsPipe } from 'src/app/pipes/num-to-word.pipe';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var Template3Page = /** @class */ (function () {
    function Template3Page(shared, popoverController, datepipe, decimalPipe, httpClient, config, platform, file, fileOpener, numToWord) {
        this.shared = shared;
        this.popoverController = popoverController;
        this.datepipe = datepipe;
        this.decimalPipe = decimalPipe;
        this.httpClient = httpClient;
        this.config = config;
        this.platform = platform;
        this.file = file;
        this.fileOpener = fileOpener;
        this.numToWord = numToWord;
        this.isIntra = true;
        this.pdfObj = null;
    }
    Template3Page.prototype.ngOnInit = function () {
        var _this = this;
        this.companyId = this.shared.companyData.companyId;
        ;
        this.httpClient.get(this.config.url + 'company/getCompany/' + this.companyId).subscribe(function (data) {
            if (data.status == true) {
                _this.shared.companyData = data.result[0];
                _this.gst = localStorage.getItem('custGst');
                console.log('gst', _this.gst);
                // console.log('cgst',this.shared.companyData);
                if (_this.shared.customerData.custGstNumber.substring(0, 2) == _this.shared.companyData.companyGstNo.substring(0, 2)) {
                    _this.isIntra = true;
                }
                else {
                    _this.isIntra = false;
                }
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
        var dat = {};
        dat.custId = localStorage.getItem('custId');
        ;
        dat.companyId = this.shared.companyData.companyId;
        this.httpClient.post(this.config.url + 'customer/getCustomer', dat).subscribe(function (data) {
            if (data.status == true) {
                _this.shared.customerData = data.result[0];
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
        this.config.postHttp('invoice/getInvoiceById/' + this.shared.invoiceData.invoiceId, dat).then(function (data) {
            debugger;
            if (data.status == true) {
                _this.shared.invoiceData = data.result[0];
                _this.invoiceAllData = data.result[0];
                console.log(_this.invoiceAllData);
                var converter = require('number-to-words');
                _this.inwords = _this.numToWord.transform(_this.invoiceAllData.totalAmountAfterTax);
                _this.inword = _this.numToWord.transform(_this.invoiceAllData.subTotal);
                _this.taxAmount = _this.numToWord.transform(_this.invoiceAllData.totalTaxableAmount);
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
        this.httpClient.get(this.config.url + 'item/getItem/' + this.shared.invoiceData.invoiceId).subscribe(function (data) {
            if (data.status == true) {
                _this.shared.invoiceItems = data.result;
                console.log(_this.shared.invoiceItems);
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
        this.date = this.datepipe.transform(new Date(), 'dd/MM/y');
        this.gstBit = parseInt(localStorage.getItem('gstBit'));
    };
    Template3Page.prototype.generatePdf = function () {
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
    Template3Page.prototype.presentPopover = function (ev) {
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
    Template3Page.prototype.create = function () {
        var temp = [];
        var temp1 = [];
        var DescTableTotal = [];
        var tableTotalTax = [];
        temp.push([
            { text: 'Description Of Goods', fillColor: 'whitesmoke' },
            { text: 'HSN/SAC Code', fillColor: 'whitesmoke' },
            { text: 'Qty', fillColor: 'whitesmoke' },
            { text: 'Rate', fillColor: 'whitesmoke' },
            { text: 'Taxable Value', fillColor: 'whitesmoke' },
            { text: 'Disc(%)', fillColor: 'whitesmoke' },
            { text: 'Disc. Value', fillColor: 'whitesmoke' },
            { text: 'Amt', fillColor: 'whitesmoke', alignment: 'right' }
        ]);
        this.shared.invoiceItems.forEach(function (element) {
            temp.push([
                { text: element.itemName },
                { text: element.hsnCode },
                { text: element.quantity, alignment: 'right' },
                { text: element.itemPrice, alignment: 'right' },
                { text: element.subTotal.toFixed(2), alignment: 'right' },
                { text: element.discount.toFixed(2), alignment: 'right' },
                { text: element.discountAmount.toFixed(2), alignment: 'right' },
                { text: element.netTotal, bold: true, alignment: 'right' },
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
                    { text: element.igst.toFixed(2), alignment: 'right' },
                    { text: element.igstAmount.toFixed(2), alignment: 'right' },
                    { text: element.taxAmount.toFixed(2), alignment: 'right' },
                ]);
            });
            DescTableTotal.push([
                { text: 'Total:', alignment: 'right', bold: true },
                { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right', bold: true },
                { text: '' },
                { text: '' },
                { text: '' },
            ], [
                { text: 'Sub Total:', alignment: 'right', bold: true },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right', bold: true },
            ], [
                { text: 'IGST:', alignment: 'right', bold: true },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: this.shared.invoiceData.totalIgstAmount.toFixed(2), alignment: 'right', bold: true },
            ], [
                { text: 'Invoice Total:', alignment: 'right', bold: true },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: this.shared.invoiceData.totalAmountAfterTax.toFixed(2), alignment: 'right', bold: true },
            ]);
            ////////////////////
            tableTotalTax.push([
                { text: 'Total', bold: true, alignment: 'right' },
                { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right' },
                { text: '' },
                { text: '' },
                { text: '' },
                { text: this.shared.invoiceData.totalIgstAmount.toFixed(2), alignment: 'right' },
                { text: this.shared.invoiceData.totalTaxableAmount.toFixed(2), alignment: 'right' }
            ]);
        }
        else {
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
            ///////////////
            DescTableTotal =
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
                ];
            ////////////////////
            tableTotalTax.push([
                { text: 'Total', bold: true, alignment: 'right' },
                { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right' },
                { text: '' },
                { text: this.shared.invoiceData.totalCgstAmount.toFixed(2), alignment: 'right' },
                { text: '' },
                { text: this.shared.invoiceData.totalSgstAmount.toFixed(2), alignment: 'right' },
                { text: this.shared.invoiceData.totalTaxableAmount.toFixed(2), alignment: 'right' }
            ]);
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
                        style: 'header',
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
                        body: tableTotalTax
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
        };
        this.pdfObj = pdfMake.createPdf(docDefination);
        this.download();
    };
    Template3Page.prototype.create1 = function () {
        var temp = [];
        temp.push([
            { text: 'Description Of Goods', fillColor: 'whitesmoke' },
            { text: 'HSN/SAC Code', fillColor: 'whitesmoke' },
            { text: 'Qty', fillColor: 'whitesmoke' },
            { text: 'Rate', fillColor: 'whitesmoke' },
            { text: 'Taxable Value', fillColor: 'whitesmoke' },
            { text: 'Disc(%)', fillColor: 'whitesmoke' },
            { text: 'Disc. Value', fillColor: 'whitesmoke' },
            { text: 'Amt', fillColor: 'whitesmoke', alignment: 'right' }
        ]);
        this.shared.invoiceItems.forEach(function (element) {
            temp.push([
                { text: element.itemName },
                { text: element.hsnCode },
                { text: element.quantity, alignment: 'right' },
                { text: element.itemPrice, alignment: 'right' },
                { text: element.subTotal.toFixed(2), alignment: 'right' },
                { text: element.discount.toFixed(2), alignment: 'right' },
                { text: element.discountAmount.toFixed(2), alignment: 'right' },
                { text: element.subTotal.toFixed(2), bold: true, alignment: 'right' },
            ]);
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
                        style: 'header',
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
        };
        this.pdfObj = pdfMake.createPdf(docDefination);
        this.download();
    };
    Template3Page.prototype.download = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.pdfObj.getBuffer(function (buffer) {
                var blob = new Blob([buffer], { type: 'application/pdf' });
                _this.file.writeFile(_this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(function (fileEntry) {
                    _this.fileOpener.open(_this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
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
    ], Template3Page.prototype, "id", void 0);
    Template3Page = __decorate([
        Component({
            selector: 'app-template3',
            templateUrl: './template3.page.html',
            styleUrls: ['./template3.page.scss'],
        }),
        __metadata("design:paramtypes", [ShareddataService,
            PopoverController,
            DatePipe,
            DecimalPipe,
            HttpClient,
            ConfigService,
            Platform,
            File,
            FileOpener,
            NumberToWordsPipe])
    ], Template3Page);
    return Template3Page;
}());
export { Template3Page };
//# sourceMappingURL=template3.page.js.map