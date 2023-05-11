import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/user';
import { JoinService } from '../join.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  msg: string;
  users: any[] = [];
  obj:User={};
  selectedUser: any;

    currentTime: Date = new Date();
    clockedInTime: Date;
    clockedOutTime: Date;
    totalTime= { hours: 0, minutes: 0, seconds: 0 };
  constructor(public joinService: JoinService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.joinService.getAllUsers().subscribe((data: any[]) => {
      console.log(data);
      this.users = data;
    }, (error: any) => {

      this.msg = "Something went wrong"
    });
  }

  deleteUser(username: string) {
    console.log(username);
    this.obj.username = username
    this.joinService.deleteUser(this.obj).subscribe((data: string) => {
      console.log(data);
    }, (error: any) => {

      this.msg = "Something went wrong"
    });
  }

  clockIn() {
    this.clockedInTime = new Date();
  }

  clockOut() {
    this.clockedOutTime = new Date();
    const timeDiff = this.clockedOutTime.getTime() - this.clockedInTime.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);
    this.totalTime.hours = hours;
    this.totalTime.minutes = minutes;
    this.totalTime.seconds = seconds;
    console.log(this.selectedUser);

    this.joinService.timeUpdate({user: this.selectedUser,totalTime: this.totalTime}).subscribe((res)=>{
      if(res['message']=='success'){
        var dd=this.snackBar.open('activity Updated!!','',{
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
