import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  email:string="";
  OTP:number=0;
  count:number=0;
  constructor() { }


  setEmail(data:any)
  {
    this.email=data;
  }
  getMail()
  {
    return this.email;
  }

  setOTP(data:any)
  {
    this.OTP=data;
  }
  getOTP()
  {
    return this.OTP;
  }

  setCount(data:any)
  {
    this.count=data;
  }
  getCount()
  {
    return this.count;
  }
}
