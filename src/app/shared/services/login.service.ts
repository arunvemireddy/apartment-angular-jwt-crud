import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl='http://localhost:8082/api/'; 

  userNameEmit= new EventEmitter();
  userName:any;

  constructor(private http:HttpClient) { }

  loginService(url:string,successCallback,errorCallback,obj:Object){
    return this.http.post(`${this.baseUrl}`+url,obj).subscribe((data)=>successCallback(data),(error)=>errorCallback(error)); 
  }

  setUserName(userName:string){
    this.userName=userName;
    localStorage.setItem("userName",userName);
  }

  getUserName(){
    return localStorage.getItem("userName");
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
    localStorage.removeItem('userName');
    return true;
  }
}
