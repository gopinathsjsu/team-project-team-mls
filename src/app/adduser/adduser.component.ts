import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { User } from 'src/user';
import { Router } from '@angular/router';
import { JoinService } from '../join.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  msg:string;
  useremailavail=false;
  date = new Date();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  matter:string;
  obj:User={};

  constructor(public js :JoinService ,private router:Router , private fb:FormBuilder,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.loading=false;
    this.registerForm = this.fb.group({
      email:    ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      fname: ['',Validators.required],
      lname: ['',Validators.required],
      username: ['', Validators.required]
    });
  }

  get f() { 
    return this.registerForm.controls; 
  }  

  // addUser(form:NgForm){

    
  //   form.value.date = this.date;
  // this.js.joinuser(form.value).subscribe((data:string)=>{
  //   console.log(data);
   
  //   this.msg = data;
    
  //   form.reset();

  // }, (error:any)=>{

  //   console.log(error);

  //   this.msg = "Something Went Wrong!!";

  // });

  // }
  

  onSubmit() {
    this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }
        this.loading=true;
        this.obj.username=this.registerForm.value.username;
        this.obj.lname=this.registerForm.value.lname;
        this.obj.fname=this.registerForm.value.fname;
        this.obj.email=this.registerForm.value.email;
        this.obj.gender='';
        this.obj.weight=0;
        this.obj.height=0;
        this.obj.joindate=new Date();
        this.obj.contact=0;
        this.obj.efreq='';
        this.obj.address='';
        this.obj.city='';
        this.obj.state='';
        this.obj.country='';
        this.obj.pincode=0;
        this.obj.img='http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
        this.obj.about='';
        this.obj.courses=[];
        console.log(this.obj);
        this.js.adduser(this.obj).subscribe((res)=>{
          if(res["message"]=="user exists")
          {
            var dd=this.snackBar.open('An user already exists with that username!','',{
              duration: 3000
            });
          }
          if(res["message"]=="user created")
          {
            this.loading=false;
            var dd=this.snackBar.open('Successfully Registered^_^! Please check your inbox!','',{
              duration: 3000
            }); 
            this.router.navigate(['/manager'])
          }
          
        });
    
      }
}