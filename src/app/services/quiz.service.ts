import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient,private login:LoginService) { }

  public quizzes()
  {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //add quiz
  public addQuizee(quiz:any)
  {
    console.log(quiz);
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  } 

  //delete quiz
  public deletQuiz(id:any)
  {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.delete(`${baseUrl + "/quiz"}/${id}`, { headers: headers });


    // console.log("token is "+this.login.getToken())
    // return this._http.delete(`${baseUrl}/quiz/`,id);
  }

  //get single quiz
  public getQuiz(qid:any)
  {
    return this._http.get(`${baseUrl}/quiz/${qid}`);
  }

  //update quiz
  public updateQuiz(quiz:any)
  {
    return this._http.put(`${baseUrl}/quiz/`,quiz);
  }

  //get quizzes of category
  public getquizzesofcategory(cid:any)
  {
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  //get active quiizes
  public getActiveQuizzes()
  {
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  //get acrive quizzes of category
  public getActiveQuizzesOfCategory(cid:any)
  {
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`)
  }

  //getting number of question for the respective quiz
  public getNumberOfQuestios(qid:any)
  {
    return this._http.get(`${baseUrl}/quiz/question/${qid}`);
  }

  //getting count of question
  public getCount(qid:any)
  {
    return this._http.get(`${baseUrl}/question/count/${qid}`);
  }
}
