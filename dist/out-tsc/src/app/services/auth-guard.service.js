var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ShareddataService } from './shareddata.service';
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(router, 
    // private auth : AuthService
    shared) {
        this.router = router;
        this.shared = shared;
    }
    AuthGuardService.prototype.canActivate = function (route) {
        debugger;
        // if (this.shared.companyData ) {
        //   this.router.navigate(['/login']);
        //   return false;
        // } else {
        //   return true;
        // }
        // return this.auth.isAuthenticated();
        return true;
    };
    AuthGuardService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Router,
            ShareddataService])
    ], AuthGuardService);
    return AuthGuardService;
}());
export { AuthGuardService };
//# sourceMappingURL=auth-guard.service.js.map