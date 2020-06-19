import { NgModule } from '@angular/core';

import { TermSearchPipe } from './term-search.pipe';
import {  NumberToWordsPipe } from './num-to-word.pipe';

export const pipes = [
    TermSearchPipe
];

@NgModule({
  declarations: [pipes, NumberToWordsPipe],
  exports: [pipes]
})

export class PipesModule { }
