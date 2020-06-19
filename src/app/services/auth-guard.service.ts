import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { ShareddataService } from './shareddata.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    public router: Router,
    // private auth : AuthService
    private shared :ShareddataService,
    
  ) {
   }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    debugger
    // if (this.shared.companyData ) {
    //   this.router.navigate(['/login']);
    //   return false;
    // } else {
    //   return true;
    // }
// return this.auth.isAuthenticated();
return true;
  }
}
