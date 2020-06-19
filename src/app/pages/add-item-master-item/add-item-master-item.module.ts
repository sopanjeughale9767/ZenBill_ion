import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddItemMasterItemPage } from './add-item-master-item.page';

const routes: Routes = [
  {
    path: '',
    component: AddItemMasterItemPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddItemMasterItemPage]
})
export class AddItemMasterItemPageModule {}
