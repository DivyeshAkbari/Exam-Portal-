import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  updateQuizForm!: any;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService){}

  qId=0;
  categories:any;
  
  loadform(){
    this.updateQuizForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('', Validators.compose([Validators.required])),
      maxMarks: new FormControl('', Validators.compose([Validators.required])),
      numberofQuestions: new FormControl('', [Validators.required]),
      active:new FormControl('', [Validators.required]),
      category:new FormControl('', [Validators.required])
    });
  }

  quiz: any;

  ngOnInit(): void {
    this.loadform();
    this.qId=this._route.snapshot.params['qid'];
    //alert("ohhoo baby"+this.qId);

    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=>
      {
        console.log(error);
      }
    )

    this._cat.categories().subscribe((data:any)=>{

      this.categories=data;
    },
    error=>{
      alert("error");
    }
    )
  }
  public updateQuiz()
  {
    //validation

    alert("yooo");
    if(this.updateQuizForm.valid){
      alert("yooo2");
    this._quiz.updateQuiz(this.quiz).subscribe((data)=>{
      Swal.fire("Success ","Quiz updated","success");
    },
    (error)=>{
      Swal.fire("Error","Error in updating Quiz","error");
    }
    )
  }
  }
}
