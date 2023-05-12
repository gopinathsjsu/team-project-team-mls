import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Classes} from '../classes'
import { JoinService } from '../join.service';
import { MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  classes:Classes={};
  user:string;
  msg:string;
  data:string[]=[];
  x:boolean=false;
  users: any[] = [];
  constructor(private snackBar:MatSnackBar,private router:Router,private js:JoinService, private dialog1:MatDialog) { 
    
    this.js.getAllUsers().subscribe((data: any[]) => {
      console.log(data);
      this.users = data;
    }, (error: any) => {

      this.msg = "Something went wrong"
    });
    
  }

  ngOnInit(): void {
    this.js.getAllUsers().subscribe((data: any[]) => {
      console.log(data);
      this.users = data;
    }, (error: any) => {

      this.msg = "Something went wrong"
    });
  }
  
  // closeDialog(){
  //       this.dialog.close('cancel');
  // }

enroll(){
  if(this.user==undefined)
  {
   // this.dialog.close();
    var dd=this.snackBar.open('Login to enroll to the course','Login',{
          duration: 3000
    });
    dd.onAction().subscribe(()=>{
      this.router.navigate(['/login']);
    });
  }
  else
  {
    let arr=this.classes.users;
    if(arr[0]=="")
      arr[0]=this.user;
    else
      arr.push(this.user);
    console.log(arr);
    this.classes.users=arr;
    this.js.enrollClass({username:this.user,classobj:this.classes}).subscribe((res)=>{
      if(res['message']=="success")
      {
        var dd=this.snackBar.open('Enrolled Successfully','My Courses',{
          duration: 3000
        });
        dd.onAction().subscribe(()=>{
          this.router.navigate(['/mycourses']);
        });
        //this.closeDialog();
      }
      else
      {
        var dd=this.snackBar.open(res['message'],'',{
          duration: 3000
        });
      }
    });
  }
}



}
