import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private snack:MatSnackBar,
    public shared:SharedService,
    private user:UserService
    ){}

  password:any;
  cpassword:any;

  user1:any={
    email:'',
    password:'',
    confirmPassword:''
  }
  ngOnInit(): void {
    
    this.user1.email=this.shared.getMail();
  }

  verifyPassword()
  {
    if(this.password==this.cpassword)
    {
      this.user.updatePassword(this.user1).subscribe(
        (data:any)=>{
          Swal.fire('suceess','Your password updated','success');
        },
        (error)=>{
          this.snack.open("error ","",{
            duration:3000
          });
        }
      )
    }
    else
    {
      this.snack.open("Both password should match",'',{
        duration:3000
      });
    }
  }
}
