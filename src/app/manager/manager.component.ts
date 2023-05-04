import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JoinService } from '../join.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  msg: string;
  users: any[] = [];
  constructor(public joinService: JoinService) { }

  ngOnInit(): void {
    this.joinService.getAllUsers().subscribe((data: any[]) => {
      console.log(data);
      this.users = data;
    }, (error: any) => {

      this.msg = "Something went wrong"
    });
  }

  deleteUser(userId: number) {}
  // deleteUser(userId: number) {

  //   if (confirm("Do you want to delete this user?")) {
  //     //console.log("User deleted with id"+userId);
  //     this.joinService.deleteUserData(userId).subscribe((data: string) => {
  //       this.msg = data;
  //       var index = this.users.findIndex((obj) => {
  //         return obj._id == userId;
  //       });
  //       this.users.splice(index, 1);
  //     }, (error: any) => {
  //       this.msg = "something went wrong";


  //     });
  //   }
  // }
}
