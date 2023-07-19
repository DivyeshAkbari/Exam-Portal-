import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!:any;
  emailForm: any;

  isValid:boolean=true;
  constructor(
    private userService:UserService,
    private snack:MatSnackBar,
    private formBuilder: FormBuilder
    ){
      this.emailForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }
    
  ngOnInit(): void {
    this.loadform();
    throw new Error('Method not implemented.');
  }

  public user={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
  }

  // emailValidator(control: FormControl) {
  //   const email = control.value;
  //   if (email && email.indexOf('.com') !== email.lastIndexOf('.com')) {
     
  //     this.snack.open(".com is allowed only one time ||",'',{
  //       duration:3000,
  //       verticalPosition:'top',
  //       // horizontalPosition:'right'
  //     })
  //     return;
  //   }
  // }
  

 get email() {
    return this.emailForm.get('email');
  }

  loadform(){
    this.signUpForm = new FormGroup({
      username: new FormControl('',Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      firstname: new FormControl('', Validators.compose([Validators.required])),
      lastname: new FormControl('', [Validators.required]),
      email:new FormControl(['', [Validators.required, Validators.email]],),
      number:new FormControl('', [Validators.required])
    });
  }

  formSubmit()
  {

    if(this.user.username!="")
    {
      this.userService.checkUserByUserName(this.user.username).subscribe(
        (data:any)=>{
         if(data!=null)
         {
            this.snack.open("UserName is Taken ||","",{
            duration:3000,
            verticalPosition:'top',
            });
          }
          return;
        },
      )

      const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      const digitRegex = /\d/.test(this.user.username);
      if(!specialCharacterRegex.test(this.user.username) || digitRegex!=true)
      {
        this.snack.open("UserName Must Have Atleat one special character and it also has any digits ||","",{
          duration:3000,
          verticalPosition:'top',
        });
        return;
      }
    }

    if(this.user.password!="")
    {
      const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      const digitRegex = /\d/.test(this.user.password);
      if(!specialCharacterRegex.test(this.user.password) || digitRegex!=true)
      {
        this.snack.open("Password Must Have Atleat one special character and it also has any digits ||","",{
          duration:3000,
          verticalPosition:'top',
        });
        return;
      }
    }

    if(this.user.firstname!="")
    {
      const containsNumber = /\d/.test(this.user.firstname);
      if(containsNumber==true)
      {
        this.snack.open("First Name Does not contain Any number ||",'',{
          duration:3000,
          verticalPosition:'top',
          // horizontalPosition:'right'
        })
        return;
      }

      if(this.user.firstname.length<=1)
      {
        this.snack.open("First Name Should have more than one character ||",'',{
          duration:3000,
          verticalPosition:'top',
          // horizontalPosition:'right'
        })
        return;
      }
    }

    if(this.user.lastname!="")
    {
      const containsNumber = /\d/.test(this.user.lastname);
      if(containsNumber==true)
      {
        this.snack.open("Last Name Does not contain Any  number ||",'',{
          duration:3000,
          verticalPosition:'top',
          // horizontalPosition:'right'
        })
        return;
      }

      if(this.user.lastname.length<=1)
      {
        this.snack.open("Last Name Should have one more than one character ||",'',{
          duration:3000,
          verticalPosition:'top',
          // horizontalPosition:'right'
        })
        return;
      }
    }

    if(this.user.email!="")
    {
      this.userService.checkUserByEmail(this.user.email).subscribe(
        (data:any)=>{
          if(data!=null)
          {
              this.snack.open("Email is already exist ||","",{
              duration:3000,
              verticalPosition:'top',

            });
            this.isValid=false;
          } 
        }
      )

      if (this.user.email && this.user.email.indexOf('.com') !== this.user.email.lastIndexOf('.com')) {
     
        this.snack.open(".com is allowed only one time ||",'',{
          duration:3000,
          verticalPosition:'top',
          // horizontalPosition:'right'
        })
        return;
      }

      const  validRegex = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        if(validRegex.test(this.user.email)!=true)
        {
          this.snack.open("Email should be in format","",{
          duration:3000,
          verticalPosition:'top',
         });
          return;
        }
    }

    if(this.user.phone!="")
    {
      this.userService.checkUserByPhone(this.user.phone).subscribe(
        (data:any)=>{
          if(data!=null)
          {
             this.snack.open("Mobile Number is already exist ||","",{
             duration:3000,
             verticalPosition:'top',
            });
          }
          return;
        }
      )

      const numberString=this.user.phone.toString();
      if(numberString.length<10)
      {
        this.snack.open("Number should have 10 digits only||",'',{
          duration:3000,
          verticalPosition:'top',
          // horizontalPosition:'right'
        })
        return;
      }
    }

    if(this.user.username == '' || this.user.username==null)
    {
      this.snack.open("Username is required ||",'',{
        duration:3000,
        verticalPosition:'top',
        // horizontalPosition:'right'
      })
      return;
    }
    else if(this.user.password == '' || this.user.password==null)
    {
      this.snack.open("Password is required ||",'',{
        duration:3000,
        verticalPosition:'top',
        // horizontalPosition:'right'
      })
      return;
    }
    else if(this.user.firstname== '' || this.user.firstname==null)
    {
      this.snack.open("FirstName is required ||",'',{
        duration:3000,
        verticalPosition:'top',
        // horizontalPosition:'right'
      })
      return;
    }
    else if(this.user.lastname == '' || this.user.lastname==null)
    {
      this.snack.open("lastName is required ||",'',{
        duration:3000,
        verticalPosition:'top',
        // horizontalPosition:'right'
      })
      return;
    }
    else if(this.user.email == '' || this.user.email==null)
    {
      this.snack.open("Email is required ||",'',{
        duration:3000,
        verticalPosition:'top',
        // horizontalPosition:'right'
      })
      return;
    }
    else if(this.user.phone == '' || this.user.phone==null)
    {
      this.snack.open("Phone Number is required ||",'',{
        duration:3000,
        verticalPosition:'top',
        // horizontalPosition:'right'
      })
      return;
    }

    if(this.isValid){
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //sucess
        console.log(data);
        // alert("done");
        Swal.fire('suceess','You Are One Step Closer to Registration Check your Email And Verify Link To get Registered','success');
        this.isValid=true;
      },
      (error)=>{
        //error
        console.log("error is "+error);
        this.snack.open("You have entered something wrong information ",'',{
          duration:3000
        })
      }
    );
  }

  }

  resetData()
  {
    this.user={
      username:'',
      password:'',
      firstname:'',
      lastname:'',
      email:'',
      phone:'',
    }
  }
}
