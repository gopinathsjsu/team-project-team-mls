import { Injectable, EventEmitter } from '@angular/core';
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
  link:string="http://localhost:8080";
  //link:string="";
  constructor(private http:HttpClient) { }

  mycourses(obj){
    return this.http.post(this.link+'/user/mycourses',obj);
  }


  dpUpdate(obj){
    return this.http.post(this.link+'/user/dpUpdate',obj)
  }

  getUserbyname(obj){
    return this.http.post(this.link+'/user/getUserbyname',obj)
  }

  activityUpdate(obj){
    console.log(obj);
    return this.http.post(this.link+'/user/activityUpdate',obj)
  }

  timeUpdate(obj){
    console.log(obj);
    return this.http.post(this.link+'/user/timeUpdate',obj)
  }

  profileUpdate(data){
    return this.http.post(this.link+'/user/profileUpdate',data);
  }

  getScores(obj){
    console.log(obj);
    return this.http.post(this.link+'/user/getScores',obj)
  }

  isAdmin(){
    return localStorage.getItem("isAdmin");
  }

  profileRead(data:User){
    return this.http.post(this.link+'/user/profileRead',data);
  }

  joinuser(obj:User)
  {
    console.log(obj);
    return this.http.post(this.link+'/user/join',obj);
  }

  adduser(obj:User)
  {
    console.log(obj);
    return this.http.post(this.link+'/user/add',obj);
  }

  login(obj:User)
  {
    return this.http.post(this.link+'/user/login',obj);
  }

  forgotpass(obj)
  {
    return this.http.post(this.link+'/user/forgotpass',obj);
  }

  changePassword(obj)
  {
    console.log(obj);
    return this.http.post(this.link+'/user/changePassword',obj);
  }

  updateAbout(obj)
  {
    console.log(obj);
    return this.http.post(this.link+'/user/updateAbout',obj);
  }

  editUser(obj)
  {
    console.log(obj);
    return this.http.post(this.link+'/user/editUser',obj);
  }

  deleteUser(obj){
    console.log(obj);
    return this.http.post(this.link+'/user/deleteUser',obj);
  }

  getBlog(obj){
    return this.http.post(this.link+'/user/getBlogs',obj);
  }

  getBlogById(obj){
    return this.http.post(this.link+'/user/getBlogById',obj);
  }
  
  postBlog(obj){
    return this.http.post(this.link+'/user/postBlog',obj);
  }

  postClass(obj){
    return this.http.post(this.link+'/user/postClass',obj);
  }

  getClass(obj){
    return this.http.post(this.link+'/user/getClass',obj);
  }

  getLocation(obj){
    return this.http.post(this.link+'/user/getLocation',obj);
  }

  getClassbyId(obj)
  {
     return this.http.post(this.link+'/user/getClassbyId',obj);
  }

  getUserbyId(obj)
  {
    return this.http.post(this.link+'/user/getUserbyId',obj);
  }

  enrollClass(obj)
  {
    return this.http.post(this.link+'/user/enrollClass',obj);
  }
  validEmail(obj)
  {
    return this.http.post(this.link+'/user/validEmail',obj);
  }

  getAllUsers()
  {
    return this.http.get<any[]>(this.link+"/user/allUsers");
    
  }
}
