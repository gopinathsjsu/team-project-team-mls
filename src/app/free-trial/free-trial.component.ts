import { Component } from '@angular/core';

@Component({
  selector: 'app-free-trial',
  templateUrl: './free-trial.component.html',
  styleUrls: ['./free-trial.component.scss']
})
export class FreeTrialComponent {

  treadmillTime = { hours: 0, minutes: 0, seconds: 0 };
 
  treadmillInterval: any;
 
  totalTreadmillTime = { hours: 0, minutes: 0, seconds: 0 };


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


}
