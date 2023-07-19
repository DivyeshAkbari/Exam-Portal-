import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  //add user 
  public addUser(user:any)
  {
    return this.http.post(`${baseUrl}/user/`,user);
  }

  //return this._http.delete(`${baseUrl + "/quiz"}/${id}`, { headers: headers });
  //validatingUser for forgot-password
  public validatingUser(email:any)
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   
    return this.http.get(`${baseUrl+ "/user/forgot/"}${email}`,{headers:headers});
    //return this.http.get(`${baseUrl}/user/forgot/`,email);
  }

  //sendOTP
  public sendOTP(email:any)
  {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // return this.http.post(`${baseUrl+ "/user/sendOTP/"}${email}`,{headers:headers});
    return this.http.get(`${baseUrl +"/user/sendOTP/"}${email}`);
  }


  //update password
  public updatePassword(user:any)
  {
    //  const token = localStorage.getItem('token');
    //  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   // return this.http.put(`${baseUrl + "/user/"}${email}${password}`,{headers:headers});
   return this.http.put(`${baseUrl}/user/`,user);
  }

  //checking userbyusername
  public checkUserByUserName(username:any)
  {
    return this.http.get(`${baseUrl +"/user/"}${username}`);
  }

  //checking UserByEmail
  public checkUserByEmail(email:any)
  {
    //  const token = localStorage.getItem('token');
    //  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${baseUrl+"/user/Email/"}${email}`);
  }

  //checking UserByPhone
  public checkUserByPhone(phone:any)
  {
    return this.http.get(`${baseUrl+"/user/Phone/"}${phone}`);
  }
}
