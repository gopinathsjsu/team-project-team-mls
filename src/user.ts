export interface User{
    username?:string;
    fname?:string;
    lname?:string;
    password?:string;
    email?:string;
    joindate?:Date;
    dob?:Date;
    gender?:string;
    weight?:number;
    height?:number;
    contact?:number;
    efreq?:string;
    address?:string;
    city?:string;
    state?:string;
    country?:string;
    membershiptype?:string;
    pincode?:number;
    img?:string;
    timespent?:{ hours: number, minutes: number, seconds: number };
    about?:string;
    courses?:string[];
    totalTreadmillTime?: { hours: number, minutes: number, seconds: number };
    totalCyclingTime?: { hours: number, minutes: number, seconds: number };
    totalWeightTrainingTime?: { hours: number, minutes: number, seconds: number };
}