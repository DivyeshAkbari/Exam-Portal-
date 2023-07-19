import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit  {

  constructor(private quizeservice:QuizService){}

  quizzes=[
    {
      qid:'',
      title:"",
      description:'',
      maxMarks:'',
      numberofQuestions:'',
      active:'',
      category:{
        title:''
      }
    }
  ]

  ngOnInit(): void {

  this.quizeservice.quizzes().subscribe(
    (data:any)=>{
      this.quizzes=data;
      console.log(this.quizzes);
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error ","Error in loading data",'error');
    }
  )
  }

  deleteqQuiz(id:any)
  {

    Swal.fire({
      icon:'info',
      title:"Are You Sure You Want to delete ?",
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed)
      {
        this.quizeservice.deletQuiz(id).subscribe(
          data=>{
            alert("hdhhdhdh");
            alert(data);
            if(data=="success")
            {
              Swal.fire("Success ||","Quiz Deleted","success");
            }
            // else{
            //   this.quizzes=this.quizzes.filter((quiz)=>quiz.qid!=id);
            //   Swal.fire("Success ","Quiz Deleted","success");
            // }
          },
          (error)=>{
            this.quizzes=this.quizzes.filter((quiz)=>quiz.qid!=id);
            Swal.fire("Success ","Quiz Deleted","success");
          }
        )
      }
    })
  }
}
