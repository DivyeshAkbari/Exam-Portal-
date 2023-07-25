import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'user-app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _cat:CategoryService,
    private snack:MatSnackBar
    ){}

  category:any

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        this.category=data;
      },
      (error)=>{
        this.snack.open("Error in loading categories ",'',{
          duration:3000,
        })
      }
    )
  }


  @ViewChild(NavbarComponent) Navbar!:NavbarComponent;

  ngAfterViewInit() {

    this.Navbar.ngOnInit();
  }
}
