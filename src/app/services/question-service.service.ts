import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private _http:HttpClient) { }


  // const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     //return this._http.delete(`${baseUrl + "/quiz"}/${id}`, { headers: headers });


  public getQuestionOfQuiz(qid:any,temp:any)
  {
    return this._http.get(`${baseUrl}/question/quiz/${qid}/${temp}`);
  }
  public addQuestion(question:any)
  {
    return this._http.post(`${baseUrl}/question/`,question);
  }

  public getSingleQuestion(questionId:any)
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(`${baseUrl + "/question"}/${questionId}`,{ headers: headers });
  }

  public updateQuestion(questionData:any)
  {
    return this._http.put(`${baseUrl}/question/`,questionData);
  }
  public deletQuestion(qid:any)
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.delete(`${baseUrl+ "/question"}/${qid}`,{headers: headers });
  }


  //evaluation of quiz
  public evalQuiz(question:any)
  {
    return this._http.post(`${baseUrl}/question/eval-quiz`,question);
  }
}
