import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],

})

export class LoadQuizComponent implements OnInit {

  constructor(private route:ActivatedRoute,private _quiz:QuizService){}

  catid:any;
  quizzes:any;

  ngOnInit(): void {
    this.route.params.subscribe((params:any)=>{
      this.catid=this.route.snapshot.params['catId'];
      console.log("param is "+params);

    if(this.catid==0)
     {
        console.log("load all quiz");
        this._quiz.getActiveQuizzes().subscribe(
        (data:any)=>{
          this.quizzes=data;
          console.log(this.quizzes);
        },  
      )
    }
    else
    {
      console.log("load specific quiz")
      this._quiz.getActiveQuizzesOfCategory(this.catid).subscribe(
        (data:any)=>{
          this.quizzes=data;
        },
        (error)=>{
          alert("error in loading quiz")
        }
      )
    }
    });
  }
}
