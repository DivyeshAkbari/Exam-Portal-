import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {  Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 public  isloggedin:any=false;
 public user:any=null;
 public roles:any=null;
 public role:any=null;
 public isadmin:any;

  constructor(public login:LoginService,private router:Router,
    public shared:SharedService
    ){

  }
  ngOnInit(): void {

    this.isloggedin=this.login.isLoggedin();
    this.user=this.login.getUser();

    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isloggedin=this.login.isLoggedin();
      this.user=this.login.getUser();
    })

    console.log("user is "+this.user);
    if(localStorage.getItem('token')!=null)
    {
      this.isloggedin=true;
    }

    this.role=this.login.getUserRole();  

    if(this.role=='ADMIN')
    {
      this.isadmin=true;
    }
    else
    {
      this.isadmin=false;
    }
  }

  public logout()
  {
    this.login.logout();
    this.isloggedin=false;
    this.router.navigate( ['login']);
    this.ngOnInit();
    //window.location.reload();
  }
}

