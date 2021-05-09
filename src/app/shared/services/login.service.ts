import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl='http://localhost:8082/api/'; 

  constructor(private http:HttpClient) { }

  loginService(url:string,successCallback,errorCallback,obj:Object){
    return this.http.post(`${this.baseUrl}`+url,obj).subscribe((data)=>successCallback(data),(error)=>errorCallback(error)); 
  }


  getToken(){
    return localStorage.getItem("token");
  }

  login(token){
    localStorage.setItem("token",token);
    return true;
  }

  isLoggedIn(){
    let token=localStorage.getItem("token");
    if(token==undefined||token==''|| token==null){
      return false;
    }else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem('token');
    return true;
  }
}
