import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 public  isloggedin:any=false;
 public user:any=null;
  constructor(public login:LoginService,private router:Router){

  }
  ngOnInit(): void {

    this.isloggedin=this.login.isLoggedin();
    this.user=this.login.getUser();

    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isloggedin=this.login.isLoggedin();
      this.user=this.login.getUser();
    })
  }
  
  public logout()
  {
    this.login.logout();
    this.isloggedin=false;
    this.router.navigate( ['login']);
    //window.location.reload();
  }
}

