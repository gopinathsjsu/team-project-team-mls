import { Component, OnInit } from '@angular/core';
import { Classes } from '../classes';
import { Locations } from '../locations';
import { JoinService } from '../join.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DisplayComponent} from '../display/display.component';
import { ClassesComponent } from '../classes/classes.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  range:Locations[]=[];
  data:Locations={};
  user:string;
  loading:boolean=true;
  constructor(private js:JoinService,private router:Router,private dialog:MatDialog,private snackbar:MatSnackBar) { }

  ngOnInit() {

    this.js.getLocation({}).subscribe(res=>{
      if(res["message"]=="success")
      {
        this.loading=false;
        this.range=res['data'];
      }
      else
       console.log((res['message']));
    });
  }
  method1()
  {
    //alert(obj);
    // localStorage.setItem('course',obj._id);
    // var blogDialog=this.dialog.open(ClassesComponent,{
    //   height: '600px',
    //   width: '900px'
    // });
    this.router.navigate(['/courses'])
  }
}

