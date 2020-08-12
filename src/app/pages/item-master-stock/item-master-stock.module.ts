import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ItemMasterStockPage } from './item-master-stock.page';

const routes: Routes = [
  {
    path: '',
    component: ItemMasterStockPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ItemMasterStockPage]
})
export class ItemMasterStockPageModule {}
