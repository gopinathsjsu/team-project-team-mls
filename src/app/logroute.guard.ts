import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogrouteGuard implements CanActivate {
  canActivate():boolean {
    let token=localStorage.getItem('signedToken');
    if(token==undefined){
      return true;
    }
    else{
      alert('Already Logged in.....');
      return false;
    }
  }
  
}
