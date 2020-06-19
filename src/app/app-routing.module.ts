import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { InvoiceComponent } from './invoices/invoice/invoice.component';

const routes: Routes = [
  
  { path: '',canActivate: [AuthGuardService], redirectTo: 'home1',  pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuardService] },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'forgotpassword', loadChildren: './pages/forgotpassword/forgotpassword.module#ForgotpasswordPageModule',canActivate: [AuthGuardService] },
  { path: 'addproduct', loadChildren: './pages/addproduct/addproduct.module#AddproductPageModule',canActivate: [AuthGuardService] },
  { path: 'addnewcustomer', loadChildren: './pages/addnewcustomer/addnewcustomer.module#AddnewcustomerPageModule',canActivate: [AuthGuardService] },
  { path: 'addnewcustomer/:id', loadChildren: './pages/addnewcustomer/addnewcustomer.module#AddnewcustomerPageModule',canActivate: [AuthGuardService] },
  { path: 'additem', loadChildren: './pages/additem/additem.module#AdditemPageModule' ,canActivate: [AuthGuardService]},
  { path: 'itemmaster', loadChildren: './pages/itemmaster/itemmaster.module#ItemmasterPageModule' ,canActivate: [AuthGuardService]},
  { path: 'template1', loadChildren: './pages/templates/template1/template1.module#Template1PageModule' ,canActivate: [AuthGuardService]},
  { path: 'template2', loadChildren: './pages/templates/template2/template2.module#Template2PageModule' ,canActivate: [AuthGuardService]},
  { path: 'template3', loadChildren: './pages/templates/template3/template3.module#Template3PageModule',canActivate: [AuthGuardService] },
  { path: 'home1', loadChildren: './pages/home1/home1.module#Home1PageModule' ,canActivate: [AuthGuardService]},
  { path: 'addcustomer', loadChildren: './pages/addcustomer/addcustomer.module#AddcustomerPageModule',canActivate: [AuthGuardService] },
  { path: 'addinvoiceinfo', loadChildren: './pages/addinvoiceinfo/addinvoiceinfo.module#AddinvoiceinfoPageModule' ,canActivate: [AuthGuardService]},
  { path: 'updateitemmasteritem/:id', loadChildren: './pages/updateitemmasteritem/updateitemmasteritem.module#UpdateitemmasteritemPageModule',canActivate: [AuthGuardService] },
  { path: 'addItemMasterItem', loadChildren: './pages/add-item-master-item/add-item-master-item.module#AddItemMasterItemPageModule',canActivate: [AuthGuardService] },
  { path: 'searchcustomer', loadChildren: './pages/searchcustomer/searchcustomer.module#SearchcustomerPageModule',canActivate: [AuthGuardService] },
  { path: 'searchitem', loadChildren: './pages/searchitem/searchitem.module#SearchitemPageModule' ,canActivate: [AuthGuardService]},
  { path: 'edit', loadChildren: './pages/edit/edit.module#EditPageModule',canActivate: [AuthGuardService] },
  { path: 'invoice', component: InvoiceComponent,canActivate: [AuthGuardService] },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
