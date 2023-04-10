import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './join/join.component';
import { LogrouteGuard } from './logroute.guard';

const routes: Routes = [
  { path: '',    
    redirectTo: 'home',    
    pathMatch: 'full'    
  }, 
  { path:'login', component:LoginComponent,canActivate:[LogrouteGuard]},
  { path:'join', component:JoinComponent,canActivate:[LogrouteGuard]}, 
  /*{ path:'home', component:HomeComponent},
  { path:'profile', component:ProfileComponent,canActivate:[ProfileGuard],canDeactivate:[ProfileExitGuard]},
  { path:'forgotpass', component:ForgotpassComponent,canActivate:[LogrouteGuard]},
  { path:'bmi', component:BmiComponent},
  { path:'classes',component:ClassesComponent},
  { path:'myclasses',component:MyclassesComponent},
  { path:'view/:id',component:ViewComponent},
  { path:'postcourse',component:PostCourseComponent},
  { path:'**', 
    pathMatch: 'full', 
    component:PageNotFoundComponent,
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
