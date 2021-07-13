import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SaveService } from '../save.service';
import { ApartmentCONSTANT } from '../shared/ApartmentCONSTANT';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-mydetails',
  templateUrl: './mydetails.component.html',
  styleUrls: ['./mydetails.component.css']
})
export class MydetailsComponent implements OnInit {

  constructor(private service:SaveService,private loginService:LoginService) { }

  userId:any;
  userName:any;
  name:any;
  role:any;

  ngOnInit(): void {
    this.findOwnerByName();
  }

  findOwnerByName(){
    let uName:any=this.loginService.getUserName();
    let url:any=ApartmentCONSTANT.FINDUSERBYNAME_URI;
    let params= new HttpParams({
      fromObject:{
        userName:uName
      }
    });
    this.service.getService(url,(data)=>this.onSuccess(data),(data)=>this.onFailure(data),params);
  }

  onSuccess(data:any){
       console.log(data);
       this.userId=data.id;
       this.userName=data.username;
       this.name=data.name;
       this.role=data.roles;
  }

  onFailure(data:any){

  }

}
