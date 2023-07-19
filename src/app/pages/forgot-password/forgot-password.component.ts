import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent  implements OnInit{

  mail:any;

  constructor(private userService:UserService
    ,private snack:MatSnackBar,
    private router:Router,
    private shared:SharedService
    ){}

  ngOnInit(): void {

  }

  validatUser()
  {
    this.userService.validatingUser(this.mail).subscribe(
      (data:any)=>{
        this.userService.sendOTP(data.email).subscribe(
          (Dvyesh:any)=>{
            this.shared.setEmail(Dvyesh.email);
            this.shared.setOTP(Dvyesh.OTP);
            Swal.fire('Suceess','Otp is Send To Your Email id','success');
            this.router.navigate(['verify-OTP']);
          },
          (error)=>
          {
            this.snack.open("error ",'',{
              duration:3000,
            });
          }
        )
      },
      (error)=>{
        this.snack.open("This Email Id does Not Exist ",'', {
          duration:3000,
        });
      }
    )
  }
}







