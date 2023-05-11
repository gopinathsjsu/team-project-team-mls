import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/user';
import { JoinService } from '../join.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  msg: string;
  users: any[] = [];
  obj:User={};
  constructor(public joinService: JoinService) { }

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
}
