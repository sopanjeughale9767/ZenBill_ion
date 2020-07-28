var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var NumberToWordsPipe = /** @class */ (function () {
    function NumberToWordsPipe() {
        this.a = [
            '',
            'One ',
            'Two ',
            'Three ',
            'Four ',
            'Five ',
            'Six ',
            'Seven ',
            'Eight ',
            'Nine ',
            'Ten ',
            'Eleven ',
            'Twelve ',
            'Thirteen ',
            'Fourteen ',
            'Fifteen ',
            'Sixteen ',
            'Seventeen ',
            'Eighteen ',
            'Nineteen '
        ];
        this.b = [
            '',
            '',
            'Twenty',
            'Thirty',
            'Forty',
            'Fifty',
            'Sixty',
            'Seventy',
            'Eighty',
            'Ninety'
        ];
    }
    NumberToWordsPipe.prototype.transform = function (value, args) {
        debugger;
        if (value) {
            var num = Number(value.toString().split(".")[0]);
            if (num) {
                if ((num = num.toString()).length > 9) {
                    return 'OUT OF LIMIT:)';
                }
                var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
                if (!n) {
                    return '';
                }
                var str = '';
                str += (Number(n[1]) !== 0) ? (this.a[Number(n[1])] || this.b[n[1][0]] + ' ' + this.a[n[1][1]]) + 'Crore ' : '';
                str += (Number(n[2]) !== 0) ? (this.a[Number(n[2])] || this.b[n[2][0]] + ' ' + this.a[n[2][1]]) + 'Lakh ' : '';
                str += (Number(n[3]) !== 0) ? (this.a[Number(n[3])] || this.b[n[3][0]] + ' ' + this.a[n[3][1]]) + 'Thousand ' : '';
                str += (Number(n[4]) !== 0) ? (this.a[Number(n[4])] || this.b[n[4][0]] + ' ' + this.a[n[4][1]]) + 'Hundred ' : '';
                str += (Number(n[5]) !== 0) ? ((str !== '') ? 'And ' : '') +
                    (this.a[Number(n[5])] || this.b[n[5][0]] + ' ' +
                        this.a[n[5][1]]) + 'Rupee' : '';
                //for paise
                var paise = Number(value.toString().split(".")[1]);
                //
                if (paise) {
                    debugger;
                    if ((paise = paise.toString()).length > 9) {
                        return 'OUT OF LIMIT:)';
                    }
                    var n_1 = ('000000000' + paise).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
                    if (!n_1) {
                        return '';
                    }
                    var strP = '';
                    strP += (Number(n_1[1]) !== 0) ? (this.a[Number(n_1[1])] || this.b[n_1[1][0]] + ' ' + this.a[n_1[1][1]]) + 'Crore ' : '';
                    strP += (Number(n_1[2]) !== 0) ? (this.a[Number(n_1[2])] || this.b[n_1[2][0]] + ' ' + this.a[n_1[2][1]]) + 'Lakh ' : '';
                    strP += (Number(n_1[3]) !== 0) ? (this.a[Number(n_1[3])] || this.b[n_1[3][0]] + ' ' + this.a[n_1[3][1]]) + 'Thousand ' : '';
                    strP += (Number(n_1[4]) !== 0) ? (this.a[Number(n_1[4])] || this.b[n_1[4][0]] + ' ' + this.a[n_1[4][1]]) + 'Hundred ' : '';
                    strP += (Number(n_1[5]) !== 0) ? ((str !== '') ? 'And ' : '') +
                        (this.a[Number(n_1[5])] || this.b[n_1[5][0]] + ' ' +
                            this.a[n_1[5][1]]) + 'Paise' : '';
                    str = str + ' ' + strP;
                }
                return str;
            }
            else {
                return '';
            }
        }
        else {
            return '';
        }
    };
    NumberToWordsPipe = __decorate([
        Pipe({
            name: 'numToWord'
        })
    ], NumberToWordsPipe);
    return NumberToWordsPipe;
}());
export { NumberToWordsPipe };
//# sourceMappingURL=num-to-word.pipe.js.map