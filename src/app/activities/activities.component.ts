
import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JoinService } from '../join.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {
  

  constructor(private js:JoinService,private snackBar:MatSnackBar) { }

  usr = localStorage.getItem('user');
  treadmillTime = { hours: 0, minutes: 0, seconds: 0 };
  cyclingTime = { hours: 0, minutes: 0, seconds: 0 };
  weightTrainingTime = { hours: 0, minutes: 0, seconds: 0 };
  treadmillInterval: any;
  cyclingInterval: any;
  weightTrainingInterval: any;
  totalTreadmillTime = { hours: 0, minutes: 0, seconds: 0 };
  totalCyclingTime = { hours: 0, minutes: 0, seconds: 0 };
  totalWeightTrainingTime = { hours: 0, minutes: 0, seconds: 0 };

  startTreadmill() {
    this.treadmillInterval = setInterval(() => {
      if (this.treadmillTime.seconds < 59) {
        this.treadmillTime.seconds++;
      } else {
        this.treadmillTime.seconds = 0;
        if (this.treadmillTime.minutes < 59) {
          this.treadmillTime.minutes++;
        } else {
          this.treadmillTime.minutes = 0;
          this.treadmillTime.hours++;
        }
      }
    }, 1000);
  }

  stopTreadmill() {
    clearInterval(this.treadmillInterval);
    this.totalTreadmillTime.hours += this.treadmillTime.hours;
    this.totalTreadmillTime.minutes += this.treadmillTime.minutes;
    this.totalTreadmillTime.seconds += this.treadmillTime.seconds;
    this.treadmillTime = { hours: 0, minutes: 0, seconds: 0 };
  }

  resetTreadmill() {
    this.treadmillTime = { hours: 0, minutes: 0, seconds: 0 };
    this.totalTreadmillTime = { hours: 0, minutes: 0, seconds: 0 };
  }

  startCycling() {
    this.cyclingInterval = setInterval(() => {
      if (this.cyclingTime.seconds < 59) {
        this.cyclingTime.seconds++;
      } else {
        this.cyclingTime.seconds = 0;
        if (this.cyclingTime.minutes < 59) {
          this.cyclingTime.minutes++;
        } else {
          this.cyclingTime.minutes = 0;
          this.cyclingTime.hours++;
        }
      }
    }, 1000);
  }

  stopCycling() {
    clearInterval(this.cyclingInterval);
    this.totalCyclingTime.hours += this.cyclingTime.hours;
    this.totalCyclingTime.minutes += this.cyclingTime.minutes;
    this.totalCyclingTime.seconds += this.cyclingTime.seconds;
    this.cyclingTime = { hours: 0, minutes: 0, seconds: 0 };
  }

  resetCycling() {
    this.cyclingTime = { hours: 0, minutes: 0, seconds: 0 };
    this.totalCyclingTime = { hours: 0, minutes: 0, seconds: 0 };
  }
 
    startWeightTraining() {
      this.weightTrainingInterval = setInterval(() => {
        if (this.weightTrainingTime.seconds < 59) {
          this.weightTrainingTime.seconds++;
        } else {
          this.weightTrainingTime.seconds = 0;
          if (this.weightTrainingTime.minutes < 59) {
            this.weightTrainingTime.minutes++;
          } else {
            this.weightTrainingTime.minutes = 0;
            this.weightTrainingTime.hours++;
          }
        }
      }, 1000);
    }
  
    stopWeightTraining() {
      clearInterval(this.weightTrainingInterval);
      this.totalWeightTrainingTime.hours += this.weightTrainingTime.hours;
      this.totalWeightTrainingTime.minutes += this.weightTrainingTime.minutes;
      this.totalWeightTrainingTime.seconds += this.weightTrainingTime.seconds;
      this.weightTrainingTime = { hours: 0, minutes: 0, seconds: 0 };
    }
    resetWeightTraining() {
      this.weightTrainingTime = { hours: 0, minutes: 0, seconds: 0 };
      this.totalWeightTrainingTime = { hours: 0, minutes: 0, seconds: 0 };
    }

    recordScores(){
      this.js.activityUpdate({user: this.usr,totalWeightTrainingTime: this.totalWeightTrainingTime, totalCyclingTime: this.totalCyclingTime, totalTreadmillTime: this.totalTreadmillTime}).subscribe((res)=>{
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



// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { interval, Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';

// @Component({
//   selector: 'app-activities',
//   templateUrl: './activities.component.html',
//   styleUrls: ['./activities.component.scss']
// })
// export class ActivitiesComponent{

//     treadmillTime = { hours: 0, minutes: 0, seconds: 0 };
//     cyclingTime = { hours: 0, minutes: 0, seconds: 0 };
//     weightTrainingTime = { hours: 0, minutes: 0, seconds: 0};
//     treadmillInterval: any;
//     cyclingInterval: any;
//     weightTrainingInterval: any;
  
//     startTreadmill() {
//       this.treadmillInterval = setInterval(() => {
//         if (this.treadmillTime.seconds < 59) {
//           this.treadmillTime.seconds++;
//         } else {
//           this.treadmillTime.seconds = 0;
//           if (this.treadmillTime.minutes < 59) {
//             this.treadmillTime.minutes++;
//           } else {
//             this.treadmillTime.minutes = 0;
//             this.treadmillTime.hours++;
//           }
//         }
//       }, 1000);
//     }
  
//     stopTreadmill() {
//       clearInterval(this.treadmillInterval);
    
//     }
//     resetTreadmill() {
//       this.treadmillTime = { hours: 0, minutes: 0, seconds: 0};
//     }
  
//     startCycling() {
//       this.cyclingInterval = setInterval(() => {
//         if (this.cyclingTime.seconds < 59) {
//           this.cyclingTime.seconds++;
//         } else {
//           this.cyclingTime.seconds = 0;
//           if (this.cyclingTime.minutes < 59) {
//             this.cyclingTime.minutes++;
//           } else {
//             this.cyclingTime.minutes = 0;
//             this.cyclingTime.hours++;
//           }
//         }
//       }, 1000);
//     }
  
//     stopCycling() {
//       clearInterval(this.cyclingInterval);
//     }
//     resetCycling() {
//       this.cyclingTime = { hours: 0, minutes: 0, seconds: 0};
//     }
  

  





// private destroy$ = new Subject<void>();
// hours = 0;
// minutes = 0;
// seconds = 0;

// startCountdown() {
//   interval(1000)
//     .pipe(takeUntil(this.destroy$))
//     .subscribe(() => {
//       if (this.seconds < 59) {
//         this.seconds++;
//       } else {
//         this.seconds = 0;
//         if (this.minutes < 59) {
//           this.minutes++;
//         } else {
//           this.minutes = 0;
//           this.hours++;
//         }
//       }
//     });
// }

// endCountdown() {
//   this.destroy$.next();
// }

// ngOnDestroy() {
//   this.destroy$.next();
//   this.destroy$.complete();
// }