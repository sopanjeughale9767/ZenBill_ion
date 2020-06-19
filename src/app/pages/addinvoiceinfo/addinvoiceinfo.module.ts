import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddinvoiceinfoPage } from './addinvoiceinfo.page';

const routes: Routes = [
  {
    path: '',
    component: AddinvoiceinfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddinvoiceinfoPage]
})
export class AddinvoiceinfoPageModule {}
