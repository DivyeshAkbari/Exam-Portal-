import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  constructor(
    private _category:CategoryService,
    private matsnack:MatSnackBar,
    ){}

  category={
    title:'',
    description:'',
  }

  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null)
    {
      this.matsnack.open("Title Required ",'',{
        duration:3000,
      });
      return;
    }
    
      this._category.addCategory(this.category).subscribe(
        (data:any)=>{
          this.category.title='';
          this.category.description='';
          Swal.fire("Success","category is added successfully",'success');
        },
        (error)=>{
          console.log(error);
          Swal.fire("ERROR","Server Error",'error');
        }
      )
  }
}
