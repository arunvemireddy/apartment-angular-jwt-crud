import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'; 
import { Apartment } from './Apartment';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private baseUrl='http://localhost:8080/api/'; 

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    })
  };

  constructor(private http:HttpClient) { }

  saveDetails(apdetails:object):Observable<any>{
    return this.http.post(`${this.baseUrl}`+'save', apdetails,{responseType:'text'});  
    console.log(apdetails);
  }

  getDetails():Observable<any>{
    return this.http.get(`${this.baseUrl}`+'fetch');
  }
  updateDetails(apartment:Apartment):Observable<any>{
       return this.http.put(`${this.baseUrl}`+'update',apartment,this.httpOptions);
  }

  getOwnerDetails():Observable<any>{
    return this.http.get(`${this.baseUrl}`+'getOwnerDetais');
  }

  saveOwnerDetail(ownerDetails:object):Observable<any>{
    return this.http.post(`${this.baseUrl}`+'saveOwnerDetails', ownerDetails,{responseType:'text'}); 
  }


  getService(url:string,successCallback,errorCallback){
    return this.http.get(`${this.baseUrl}`+url,this.httpOptions).subscribe(
      (data)=>successCallback(data),
      (error)=>errorCallback(error)
    );
  }

  postService(url:string,successCallback,errorCallback,obj:Object){
    return this.http.post(`${this.baseUrl}`+url,obj).subscribe((data)=>successCallback(data),(error)=>errorCallback(error.error)); 
  }

  public generateToken(request){
      return this.http.post(`${this.baseUrl}`+'login',request,{responseType: 'text' as 'json'});
  }
}
