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
import { LoadingController, Platform, PopoverController } from '@ionic/angular';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { NumberToWordsPipe } from 'src/app/pipes/num-to-word.pipe';
var HomePage = /** @class */ (function () {
    function HomePage(platform, config, shared, socialSharing, loadingc, file, fileOpener, router, datepipe, popoverController, httpClient, numToWord) {
        this.platform = platform;
        this.config = config;
        this.shared = shared;
        this.socialSharing = socialSharing;
        this.loadingc = loadingc;
        this.file = file;
        this.fileOpener = fileOpener;
        this.router = router;
        this.datepipe = datepipe;
        this.popoverController = popoverController;
        this.httpClient = httpClient;
        this.numToWord = numToWord;
        this.isItemAvailable = false;
        this.pdfObj = null;
        this.formData = {
            name: '',
        };
        this.isIntra = true;
        this.invoiceAllData = {};
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.shared.isSelectGST) {
            // console.log('cgst',this.shared.companyData);
            if (this.shared.customerData.custGstNumber.substring(0, 2) == this.shared.companyData.companyGstNo.substring(0, 2)) {
                this.isIntra = true;
            }
            else {
                this.isIntra = false;
            }
        }
        var dat = {};
        dat.custId = this.shared.customerData.custId;
        ;
        dat.companyId = this.shared.companyData.companyId;
        // this.httpClient.get(this.config.url + 'invoice/getInvoiceById/' + this.shared.invoiceData.invoiceId).subscribe((data: any) => {
        //   debugger
        //   if (data.status == true) {
        // this.shared.invoiceData = data.result[0];
        // this.invoiceAllData = data.result[0];
        // console.log(this.invoiceAllData);
        var converter = require('number-to-words');
        this.inwords = this.numToWord.transform(this.shared.invoiceData.totalAmountAfterTax);
        this.inwords = this.numToWord.transform(this.shared.invoiceData.subTotal);
        this.taxAmount = this.numToWord.transform(this.shared.invoiceData.totalTaxableAmount);
        //   } else {
        //     this.shared.presentDangerToast('Invoice Data Not Found');
        //   }
        // })
        debugger;
        this.httpClient.get(this.config.url + 'item/getItem/' + this.shared.invoiceData.invoiceId).subscribe(function (data) {
            if (data.status == true) {
                _this.shared.itemData = data.result;
            }
            else {
                _this.shared.presentDangerToast('Invoice Item Data Not Found');
            }
        });
        this.date = this.datepipe.transform(new Date(), 'dd/MM/y');
        // this.gstBit = parseInt(localStorage.getItem('gstBit'));
    };
    HomePage.prototype.abc = function () {
        this.httpClient.get(this.config.url + 'items').subscribe(function (data) {
            console.log(data);
        });
    };
    HomePage.prototype.presentLoading = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingc.create({
                            message: msg,
                            duration: 5000
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.ionChange = function (i) {
        this.isItemAvailable = false;
        this.formData.name = i;
        console.log(i);
    };
    HomePage.prototype.presentPopover = function (ev) {
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
    HomePage.prototype.create = function () {
        debugger;
        var temp = [];
        var temp1 = [];
        var tableMainTax = [];
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
        if (!this.isIntra) {
            temp1.push([
                { text: 'HSN/SAC', alignment: 'center' },
                { text: 'Taxable Amount', alignment: 'right' },
                { text: '' },
                { text: '' },
                { text: 'IGST(%)', alignment: 'right' },
                { text: 'IGST Amount', alignment: 'right' },
                { text: 'Tax Amount', alignment: 'right' },
            ]);
            this.shared.itemData.forEach(function (element) {
                temp1.push([
                    { text: element.hsnCode },
                    { text: element.subTotal.toFixed(2), alignment: 'right' },
                    { text: '' },
                    { text: '' },
                    { text: element.gst, alignment: 'right' },
                    { text: element.igstAmount.toFixed(2), alignment: 'right' },
                    { text: element.taxAmount.toFixed(2), alignment: 'right' },
                ]);
            });
            ///////////
            tableMainTax.push([
                { text: 'Total Invoice Amount In Words:' },
                { text: 'Amount Before Tax', bold: true },
                { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right', bold: true },
            ], [
                { text: '' },
                { text: 'Add IGST' },
                { text: this.shared.invoiceData.totalIgstAmount.toFixed(2), alignment: 'right' },
            ], [
                { text: 'Bank Details' },
                { text: 'Tax Amount : GST', bold: true },
                { text: this.shared.invoiceData.totalTaxableAmount.toFixed(2), alignment: 'right', bold: true },
            ], [
                { text: '' },
                { text: 'Extra' },
                { text: this.shared.invoiceData.extra, alignment: 'right' },
            ], [
                { text: '' },
                { text: 'Amount After Tax', bold: true },
                { text: this.shared.invoiceData.totalAmountAfterTax.toFixed(2), alignment: 'right', bold: true },
            ]);
        }
        else {
            temp1.push([
                { text: 'HSN/SAC', alignment: 'center' },
                { text: 'Taxable Amount', alignment: 'right' },
                { text: 'CGST(%)', alignment: 'right' },
                { text: 'CGST Amount', alignment: 'right' },
                { text: 'SGST(%)', alignment: 'right' },
                { text: 'SGST Amount', alignment: 'right' },
                { text: 'Tax Amount', alignment: 'right' },
            ]);
            this.shared.itemData.forEach(function (element) {
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
            ///////////
            tableMainTax.push([
                { text: 'Total Invoice Amount In Words:' },
                { text: 'Amount Before Tax', bold: true },
                { text: this.shared.invoiceData.totalAmountBeforTax.toFixed(2), alignment: 'right', bold: true },
            ], [
                { text: this.inwords },
                { text: 'Add CGST' },
                { text: this.shared.invoiceData.totalCgstAmount.toFixed(2), alignment: 'right' },
            ], [
                { text: '' },
                { text: 'Add SGST' },
                { text: this.shared.invoiceData.totalSgstAmount.toFixed(2), alignment: 'right' },
            ], [
                { text: 'Bank Details' },
                { text: 'Tax Amount : GST', bold: true },
                { text: this.shared.invoiceData.totalTaxableAmount.toFixed(2), alignment: 'right', bold: true },
            ], [
                { text: '' },
                { text: 'Extra' },
                { text: this.shared.invoiceData.extra, alignment: 'right' },
            ], [
                { text: '' },
                { text: 'Amount After Tax', bold: true },
                { text: this.shared.invoiceData.totalAmountAfterTax.toFixed(2), alignment: 'right', bold: true },
            ]);
        }
        this.shared.itemData.forEach(function (element) {
            temp.push([
                { text: element.hsnCode },
                { text: element.itemName },
                { text: element.quantity, alignment: 'right' },
                { text: element.itemPrice, alignment: 'right' },
                { text: element.unit, alignment: 'right' },
                { text: element.total.toFixed(2), alignment: 'right' },
                { text: element.discount.toFixed(2), alignment: 'right' },
                { text: element.subTotal.toFixed(2), alignment: 'right' },
                { text: element.gst, alignment: 'right' },
                { text: element.netTotal.toFixed(2), alignment: 'right' }
            ]);
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
                        widths: ['*', 52],
                        body: [
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
                                [{ text: 'Tearms And Conditions', bold: true },
                                    { text: this.shared.companyData.deliveryTerms }
                                ],
                                { text: '\n\n(Common Seal)' },
                                [{ text: 'Certified that the particulars given above are true and correct.\n\n\n' },
                                    { text: 'Authorised Signatory', bold: true }
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
        };
        this.pdfObj = pdfMake.createPdf(docDefination);
        this.download();
    };
    HomePage.prototype.create1 = function () {
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
        this.shared.itemData.forEach(function (element) {
            temp.push([
                { text: element.hsnCode },
                { text: element.itemName },
                { text: element.quantity, alignment: 'right' },
                { text: element.itemPrice, alignment: 'right' },
                { text: element.unit, alignment: 'right' },
                { text: element.total.toFixed(2), alignment: 'right' },
                { text: element.discount.toFixed(2), alignment: 'right' },
                { text: element.subTotal.toFixed(2), alignment: 'right' },
            ]);
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
                        body: temp
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
                        body: [
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
                                [{ text: 'Tearms And Conditions', bold: true },
                                    { text: this.shared.companyData.deliveryTerms }
                                ],
                                { text: '\n\n(Common Seal)' },
                                [{ text: 'Certified that the particulars given above are true and correct.\n\n\n' },
                                    { text: 'Authorised Signatory', bold: true }
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
        };
        this.pdfObj = pdfMake.createPdf(docDefination);
        this.download();
    };
    HomePage.prototype.download = function () {
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
    ], HomePage.prototype, "id", void 0);
    HomePage = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        }),
        __metadata("design:paramtypes", [Platform,
            ConfigProvider,
            ShareddataService,
            SocialSharing,
            LoadingController,
            File,
            FileOpener,
            Router,
            DatePipe,
            PopoverController,
            HttpClient,
            NumberToWordsPipe])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map