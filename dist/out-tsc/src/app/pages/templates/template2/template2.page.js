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
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ShareddataService } from '../../../services/shareddata.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import * as jsPDF from 'jspdf';
import { PopoverController, Platform } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { HttpClient } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ConfigService } from 'src/app/provider/config.service';
import { NumberToWordsPipe } from 'src/app/pipes/num-to-word.pipe';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var Template2Page = /** @class */ (function () {
    function Template2Page(shared, datepipe, decimalPipe, popoverController, httpClient, config, platform, file, fileOpener, numToWord) {
        this.shared = shared;
        this.datepipe = datepipe;
        this.decimalPipe = decimalPipe;
        this.popoverController = popoverController;
        this.httpClient = httpClient;
        this.config = config;
        this.platform = platform;
        this.file = file;
        this.fileOpener = fileOpener;
        this.numToWord = numToWord;
        this.invoiceAllData = {};
        this.isIntra = true;
        this.pdfObj = null;
        this.date = this.datepipe.transform(new Date(), 'dd/MM/y');
        this.no = this.decimalPipe.transform(450.2356, '1.2-2');
        this.gstBit = parseInt(localStorage.getItem('gstBit'));
    }
    Template2Page.prototype.ngOnInit = function () {
        var _this = this;
        this.companyId = this.shared.companyData.companyId;
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
        dat.custId = this.shared.customerData.custId;
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
                _this.inwordswithoutgst = _this.numToWord.transform(_this.shared.invoiceData.subTotal);
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
                _this.shared.presentDangerToast('Invoice Item Data Not Found');
            }
        });
        this.date = this.datepipe.transform(new Date(), 'dd/MM/y');
        this.gstBit = parseInt(localStorage.getItem('gstBit'));
    };
    Template2Page.prototype.generatePdf = function () {
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
    Template2Page.prototype.presentPopover = function (ev) {
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
    Template2Page.prototype.create = function () {
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
        this.shared.invoiceItems.forEach(function (element) {
            temp.push([
                { text: element.itemName },
                { text: element.itemPrice, alignment: 'right' },
                { text: element.quantity, alignment: 'right' },
                { text: element.discount, alignment: 'right' },
                { text: element.discountAmount.toFixed(2), alignment: 'right' },
                { text: element.netTotal, alignment: 'right' },
            ]);
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
                                [{ text: 'Invoice No:', alignment: 'center' },
                                    { text: this.shared.invoiceData.invoiceNumber, bold: true, alignment: 'center' }],
                                [{ text: 'Invoice Date:', alignment: 'center' },
                                    { text: this.date, bold: true, alignment: 'center' }]
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
                                    { text: ['At.Post : ', this.shared.customerData.custAddress] },
                                    { text: ['State : ', this.shared.customerData.custStateName] }]
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
                        widths: ['*', 62],
                        body: [
                            [
                                { text: 'Total', bold: true, alignment: 'right' },
                                { text: this.shared.invoiceData.totalAmountAfterTax.toFixed(2), alignment: 'right' }
                            ],
                            [
                                { text: 'Round Off', alignment: 'right' },
                                { text: this.shared.invoiceData.totalAmountAfterTax.toFixed(2), alignment: 'right' }
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
        };
        this.pdfObj = pdfMake.createPdf(docDefination);
        this.download();
    };
    Template2Page.prototype.create1 = function () {
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
        this.shared.invoiceItems.forEach(function (element) {
            temp.push([
                { text: element.itemName },
                { text: element.itemPrice },
                { text: element.quantity },
                { text: element.discount.toFixed(2), alignment: 'right' },
                { text: element.discountAmount.toFixed(2), alignment: 'right' },
                { text: element.subTotal.toFixed(2), alignment: 'right' },
            ]);
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
                                [{ text: 'Invoice No:', alignment: 'center' },
                                    { text: this.shared.invoiceData.invoiceNumber, bold: true, alignment: 'center' }],
                                [{ text: 'Invoice Date:', alignment: 'center' },
                                    { text: this.date, bold: true, alignment: 'center' }]
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
                                    { text: ['At.Post : ', this.shared.customerData.custAddress] },
                                    { text: ['State : ', this.shared.customerData.custStateName] }]
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
                        widths: ['*', 62],
                        body: [
                            [
                                { text: 'Total', bold: true, alignment: 'right' },
                                { text: this.shared.invoiceData.subTotal.toFixed(2), alignment: 'right' }
                            ],
                            [
                                { text: 'Round Off', alignment: 'right' },
                                { text: this.shared.invoiceData.subTotal.toFixed(2), alignment: 'right' }
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
        };
        this.pdfObj = pdfMake.createPdf(docDefination);
        this.download();
    };
    Template2Page.prototype.download = function () {
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
    ], Template2Page.prototype, "id", void 0);
    Template2Page = __decorate([
        Component({
            selector: 'app-template2',
            templateUrl: './template2.page.html',
            styleUrls: ['./template2.page.scss'],
        }),
        __metadata("design:paramtypes", [ShareddataService,
            DatePipe,
            DecimalPipe,
            PopoverController,
            HttpClient,
            ConfigService,
            Platform,
            File,
            FileOpener,
            NumberToWordsPipe])
    ], Template2Page);
    return Template2Page;
}());
export { Template2Page };
//# sourceMappingURL=template2.page.js.map