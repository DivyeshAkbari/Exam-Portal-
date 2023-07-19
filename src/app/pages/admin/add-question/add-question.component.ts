import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import Swal from 'sweetalert2';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuizService } from 'src/app/services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{

  public Editor=ClassicEditor;
  
  qId:any;
  title:any;


  count1:any;
  count2:any;
  questionData={
    quiz:{
      qid:'',
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };


  constructor(private _router:ActivatedRoute,
    private _qustion:QuestionServiceService,
    private _quiz:QuizService,
    private snack:MatSnackBar,
    private shared:SharedService
    ){}

  ngOnInit(): void {
    this.qId=this._router.snapshot.params['qid'];
    this.title=this._router.snapshot.params['title'];
    //setting this value to the QuestionData no quiz no qid
    this.questionData.quiz['qid']=this.qId;
  }

  formSubmit()
  {

   if(this.questionData.content.trim()=='' || this.questionData.content==null)
   {
    this.snack.open("Content is required",'',{
      duration:4000,
      verticalPosition:'top',
      // horizontalPosition:'right'
    })
    return;
   }

   if(this.questionData.option1.trim()=='' || this.questionData.option1==null)
   {
    this.snack.open("Option1 is required",'',{
      duration:4000,
      verticalPosition:'top',
      // horizontalPosition:'right'
    })
    return;
   }

   if(this.questionData.option2.trim()=='' || this.questionData.option2==null)
   {
    this.snack.open("Option2 is required",'',{
      duration:4000,
      verticalPosition:'top',
      // horizontalPosition:'right'
    })
    return;
   }

   if(this.questionData.option3.trim()=='' || this.questionData.option3==null)
   {
    this.snack.open("Option3 is required",'',{
      duration:4000,
      verticalPosition:'top',
      // horizontalPosition:'right'
    })
    return;
   }
   if(this.questionData.option4.trim()=='' || this.questionData.option4==null)
   {
    this.snack.open("Option4 is required",'',{
      duration:4000,
      verticalPosition:'top',
      // horizontalPosition:'right'
    })
    return;
   }

   if(this.questionData.answer.trim()=='' || this.questionData.answer==null)
   {
    this.snack.open("Answer is required",'',{
      duration:4000,
      verticalPosition:'top',
      // horizontalPosition:'right'
    })
    return;
   }
 
   this._quiz.getNumberOfQuestios(this.qId).subscribe(
    (data:any)=>{
      this.count1=data.numberofQuestions;
      this.shared.setCount(this.count1);
      alert("count1 is "+this.count1);
    },
    (error)=>{
     }
   )

   this._quiz.getCount(this.qId).subscribe(
    (data:any)=>{
      this.count2=data;
      alert("count2 is "+this.count2);
    }
   )

   if(this.count1>=this.count2)
   {
    alert("if ma");
      this._qustion.addQuestion(this.questionData).subscribe(
    (data:any)=>{
      Swal.fire("Success ","question added Add another question ","success")
      this.questionData.content=''
      this.questionData.option1=''
      this.questionData.option2=''
      this.questionData.option3=''
      this.questionData.option4=''
      this.questionData.answer=''
    },
    (error)=>{
      Swal.fire("Eror","Error in adding question","error")
    }
   )
   }
   else
   {
    this.snack.open("You only can only add " +this.shared.getCount()+" Numbers of question to this quiz ||",'',{
      duration:4000,
      verticalPosition:'top',
      // horizontalPosition:'right'
    })
   }
  }
}
