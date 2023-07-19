import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid:any;
  questionData:any;

  marksGot=0;
  currectAnswer=0;
  attempted=0;

  isSubmit=false;

  timer:any;


  constructor(private location:LocationStrategy,
    private route:ActivatedRoute,
    private qiuestion:QuestionServiceService
    ){}

  ngOnInit(): void {
    this.preventBackButton();

    this.qid=this.route.snapshot.params['qid'];
    this.loaQuestions();
  }

  loaQuestions() {
    this.qiuestion.getQuestionOfQuiz(this.qid,0).subscribe(
      (data:any)=>{
        this.questionData=data;

        this.timer=this.questionData.length*2*60;



        // this.questionData.forEach(function (q: any) {
        //   q['givenAnswer'] = '';
        // });

        console.log(this.questionData);
        this.startTimer();
      },
      (error)=>{
        Swal.fire("Error ","Error","error");
      }
    )
  }

  preventBackButton()
  {
    history.pushState(null,location.href);
    this.location.onPopState(()=>{
      history.pushState(null,location.href);
    })
  }

  submitQuiz()
  {
    Swal.fire({
      title: 'Do you want to Submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon:'info'
     }).then((e)=>{
      if(e.isConfirmed)
      {
        this.evalQuiz();
      }
     })
  }


  startTimer()
  {
    let t:any=window.setInterval(()=>{

      if(this.timer<=0)
      {
        this.evalQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    },1000);
  }


  getFormattedTime()
  {
    let minute=Math.floor(this.timer/60);
    let ss=this.timer-minute*60;
    return `${minute} min : ${ss} sec`;
  }

  evalQuiz()
  {
    //call to server to check question
    this.qiuestion.evalQuiz(this.questionData).subscribe(
      (data:any)=>{
        console.log(data);
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.currectAnswer=data.currectAnswer;
        this.attempted=data.attempted;
        this.isSubmit=true; 
      },
      (error)=>{
        console.log(error);
      }
    )

    //calculation
    // this.isSubmit=true;
    // this.questionData.forEach((q:any)=>{
    //   if(q.givenAnswer==q.answer)
    //   {
    //     this.currectAnswer++;
    //     let marksSingle=this.questionData[0].quiz.maxMarks/this.questionData.length;
    //     this.marksGot+=marksSingle;
    //   }

    //   if(q.givenAnswer.trim()!='')
    //   {
    //     this.attempted++;
    //   }
    // })
    // console.log("correct answers "+this.currectAnswer);
    // console.log("Marks got "+this.marksGot);
    // console.log(this.questionData)
    // console.log("Attempted is "+this.attempted);
  }

  printResult()
  {
    alert("hhh");
    window.print();
  }
}



