import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { User } from 'src/user';
import { Router , ActivatedRoute} from '@angular/router';
import { JoinService } from '../join.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  msg:string;
  useremailavail=false;
  date = new Date();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  matter:string;
  obj:User={};
  mem = localStorage.getItem('user');
  user:User[];
x:any;
  constructor(public js :JoinService ,private router:Router , private route:ActivatedRoute, private fb:FormBuilder,private snackBar:MatSnackBar) { 

    this.js.getUserbyId({_id: this.route.snapshot.paramMap.get('id')}).subscribe(res=>{
      if(res['message']=="success")
      {
        this.loading=false;
        this.user=res['data'];
        this.x = res['data'].username;
        console.log(this.user);
      }
      else
      {
        alert(res['message']);
      }
    });
  }

  ngOnInit() {
    this.loading=false;
    this.registerForm = this.fb.group({
      email:    ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      fname: [''],
      lname: [''],
      address: ['']
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
        this.obj.username=this.x;
        this.obj.lname=this.registerForm.value.lname;
        this.obj.fname=this.registerForm.value.fname;
        this.obj.email=this.registerForm.value.email;
        this.obj.address=this.registerForm.value.address;
        console.log(this.obj);
        this.js.editUser(this.obj).subscribe((res)=>{
          if(res['message']=='success'){
            var dd=this.snackBar.open('About Updated!!','',{
              duration: 3000
            });
          }
          else if(res['message']=='invalid username'){
            var dd=this.snackBar.open('User donot exist!','',{
              duration: 3000
            });
          }
        });
    
      }
}

