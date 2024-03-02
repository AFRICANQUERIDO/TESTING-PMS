import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { loginDetails, signUpDetails, users } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = localStorage.getItem('token') as string;

  constructor(private http:HttpClient) { }
  signUpUser(sign_details: signUpDetails) {
    return this.http.post<{ users: users[], message: string, error: string }>('http://localhost:5000/users/signup', sign_details)
  }

  loginUser(user_details:loginDetails){
    return this.http.post<{message:string, token:string}>('http://localhost:5000/users/login', user_details)
  }

}
