import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOTPComponent  implements OnInit{
  constructor(private shared:SharedService,
    private snack:MatSnackBar,
    private router:Router,
    ){}

  email:any;
  OTP=0;

  OTP1:any;
  ngOnInit(): void {
    this.email=this.shared.getMail();
    this.OTP=this.shared.getOTP();
  }

  verifyOTP()
  {
    if(this.OTP==this.OTP1)
    {
      this.router.navigate(['update-password']);
    }
    else{
      this.snack.open("Please Provide Valid OTP",'', {
        duration:3000,
      });
    }
  }
}
