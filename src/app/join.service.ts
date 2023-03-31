import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class JoinService {

  isLoggedIn=false;
  LoggedInUser:string;
  data:any;
  data1:any;
  constructor(private http:HttpClient) { }
  login(obj:User)
  {
    return this.http.post('/user/login',obj);
  }
}
