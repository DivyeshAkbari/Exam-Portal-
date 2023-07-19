import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit{

  qId:any;
  qTitle:any;

  
  questions=[
    {
      id:'',
      content:'',
      image:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:'',
    }
  ];
  constructor(private _route:ActivatedRoute,
    private _question:QuestionServiceService,
    private snack:MatSnackBar
    ){}


  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];


    this._question.getQuestionOfQuiz(this.qId,1).subscribe((data:any)=>{
      console.log(data)
      this.questions=data;
    },
    (error)=>{
      console.log(error);
    }
  )
  }

  deletQuestion(qid:any)
  {
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you Sure You Want to Delete this question',
    }).then((result)=>{
      if(result.isConfirmed)
      {
        this._question.deletQuestion(qid).subscribe(
          (data)=>{
            this.snack.open("Question Deleted ",'',{
              duration:3000,
            });
            this.questions=this.questions.filter((questions:any)=>questions.id!=qid)
          },
          (error)=>{
            this.snack.open("Error in deleting question ",'',{
              duration:3000,
            });
          }
        )
      }
    })
  }
}


