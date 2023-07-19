import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quize',
  templateUrl: './add-quize.component.html',
  styleUrls: ['./add-quize.component.css']
})
export class AddQuizeComponent implements OnInit{
  

  categories=[
    {
      id:'',
      title:'',
    }
  ]

  quizdata={
    title:'',
    description:'',
    maxMarks:'',
    numberofQuestions:'',
    active:'true',
    category:{
      id:'',
    },
  }
addQuizForm!: any;

  constructor (private _cat:CategoryService,private _quiz:QuizService){}
  ngOnInit(): void {
    
    this.loadform();
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error ","Error in loading data from server","error");
      }
    )
  }

  loadform(){
  this.addQuizForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('', Validators.compose([Validators.required])),
    maxMarks: new FormControl('', Validators.compose([Validators.required])),
    numberofQuestions: new FormControl('', [Validators.required]),
    active:new FormControl('', [Validators.required]),
    category:new FormControl('', [Validators.required])
  });

}
  public addQuiz()
  {
    if(this.quizdata.title.trim()=='' || this.quizdata.title==null)
    {
      Swal.fire("Error ||","Enter Title ",'error');
    }
    
    //add rest of the validations
    console.log("Value is "+this.addQuizForm.valid);
    if(this.addQuizForm.valid)
    {
      console.log("if ni andar")
        this._quiz.addQuizee(this.addQuizForm.value).subscribe(
          
          (data:any): void=>{
            console.log("data inside "+data)
            Swal.fire('Success ','Quiz is added','success');
            this.quizdata={
              title:'',
              description:'',
              maxMarks:'',
              numberofQuestions:'',
              active:'true',
              category:{
                id:'',
              },
            };
            console.log(data);
          }
        )
     }
     else
     {
      Swal.fire('Error ||','Error While Adding Quiz','error');
      //  console.log(error);
     }
  }
}
