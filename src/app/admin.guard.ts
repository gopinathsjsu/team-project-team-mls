import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JoinService } from './join.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(public joinService : JoinService, public myRouter : Router)
  {

  }
  isAdmin:String=this.joinService.isAdmin();
  canActivate():  boolean  {

    let token = localStorage.getItem('user');
    if(token == "admin")
    {
      return true;
    }
    else{
      alert("not authorized");
      return false;
    }
  }
  
}
