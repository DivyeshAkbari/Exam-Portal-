import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  constructor(private _router:ActivatedRoute,private _question:QuestionServiceService){}

  questionId:any;

  questionData:any;


  ngOnInit(): void {
    this.questionId=this._router.snapshot.params['questionid'];
    this.questionData=this._question.getSingleQuestion(this.questionId).subscribe(
      (data:any)=>{
        // alert("success")
        console.log(data);
        this.questionData=data;
      },
      (error)=>{
        alert("error")
        console.log("error is "+error);
      }
    )
  }

  updateQuestion()
  {
    this._question.updateQuestion(this.questionData).subscribe(
      (data:any)=>{
        Swal.fire("Success ||","Question Updated Successfully ","success");
      },
      (error)=>{
        Swal.fire("Error ||","error ","error");
      }
    )
  }
}
