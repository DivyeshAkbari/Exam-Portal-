import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent  implements OnInit{

  catgories=[
    {
      cid:'',
      title:"",
      description:"",
    }
  ]

  constructor(private category:CategoryService){}
  ngOnInit(): void {
    
    this.category.categories().subscribe((data:any)=>{
      //css
      this.catgories=data;
      console.log(this.catgories);
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error || ","error in loading data","error")
    }
    )
  }
}
