import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdateitemmasteritemPage } from './updateitemmasteritem.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateitemmasteritemPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdateitemmasteritemPage]
})
export class UpdateitemmasteritemPageModule {}
