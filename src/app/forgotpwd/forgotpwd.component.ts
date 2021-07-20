import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apartment } from '../Apartment';
import { SaveService } from '../save.service';
import { ApartmentCONSTANT } from '../shared/ApartmentCONSTANT';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent implements OnInit {

  constructor(private service:SaveService) { }

  otpForm = new FormGroup({
    userName: new FormControl('',Validators.required)
  })

  newotpForm= new FormGroup({
    otpNumber: new FormControl('',Validators.required)
  })

  ngOnInit(): void {
  }

  sendOtp(){
  let url=ApartmentCONSTANT.GENERATEOTP_URI; 
   const params = new HttpParams({
     fromObject:{
      username:this.otpForm.controls['userName'].value,
     }
   })
   this.service.getService(url,(data)=>this.success(data),(data)=>this.error(data),params)
  }

  success(data){
     console.log(data);
  }
  error(data){

  }

  validateOtp(){
    let url=ApartmentCONSTANT.VALIDATEOTP_URI; 
   const params = new HttpParams({
     fromObject:{
      username:this.otpForm.controls['userName'].value,
      otp:this.newotpForm.controls['otpNumber'].value,
     }
   })
   this.service.getService(url,(data)=>this.success(data),(data)=>this.error(data),params)
  }
}
