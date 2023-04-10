import { Component } from '@angular/core';
import { JoinService } from './join.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myHealthClub';
  sub:FormGroup;
  user:string;
  z:boolean=false;
  showComponent:boolean=false;
  routes:string[]=['/login','/home','/join'];

  constructor(private js:JoinService,private router: Router,private snackBar:MatSnackBar,private fb:FormBuilder) { 
      this.sub = this.fb.group({
        email:    ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])]
      });
      router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
            console.log(event.url);
            if(event.url.indexOf('/blog/')!==-1 && event.url!=='/blog')
              this.showComponent=true;
            else if(event.url.indexOf('/view/')!==-1 && event.url!=='/view')
              this.showComponent=true;
            else
              this.showComponent = this.routes.indexOf(event.url) !== -1 ;
        }
      });
    }

  
  myMethod()
  {
    let x=document.getElementById("nav");
    if(x.className === "nav")
      x.className="active";
    else
    if(x.className==="active")
      x.className="nav";
  }

}