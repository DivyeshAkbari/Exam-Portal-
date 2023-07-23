import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public  isloggedin:any=false;
  public user:any=null;
   constructor(public login:LoginService,private router:Router,
    public shared:SharedService
    ){
   }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public logout()
  {
    this.login.logout();
    this.isloggedin=false;
    this.shared.setValue(false);
    this.router.navigate( ['login']);
    //window.location.reload();
  }
}
