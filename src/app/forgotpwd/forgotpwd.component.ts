import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Apartment } from '../Apartment';
import { SaveService } from '../save.service';
import { ApartmentCONSTANT } from '../shared/ApartmentCONSTANT';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent implements OnInit {

  constructor(private service: SaveService,private toastr:ToastrService,private route:Router) { }

  otpForm = new FormGroup({
    userName: new FormControl('', Validators.required)
  })

  newotpForm = new FormGroup({
    otpNumber: new FormControl('', Validators.required)
  })

  changePwdForm = new FormGroup({
    newpwd: new FormControl('', Validators.required)
  })
  hidenewPwd: boolean = false;
  disSpinner: boolean = false;
  isSpinner: boolean=false;
  disbtn: boolean=false;
  isbtn: boolean =false;

  ngOnInit(): void {
  }

  sendOtp() {
    this.disSpinner=true;
    this.disbtn=true;
    let url = ApartmentCONSTANT.GENERATEOTP_URI;
    const params = new HttpParams({
      fromObject: {
        username: this.otpForm.controls['userName'].value,
      }
    })
    this.service.getService(url, (data) => this.success(data), (error) => this.error(error), params)
  }

  success(data) {
    this.disSpinner=false;
    this.disbtn=false;
    this.toastr.success(data.message);
  }
  error(error) {
    this.disSpinner=false;
    this.disbtn=false;
     this.toastr.error("Username not found");
  }

  validateOtp() {
    this.isSpinner=true;
    this.isbtn=true;
    let url = ApartmentCONSTANT.VALIDATEOTP_URI;
    const params = new HttpParams({
      fromObject: {
        username: this.otpForm.controls['userName'].value,
        otp: this.newotpForm.controls['otpNumber'].value,
      }
    })
    this.service.getService(url, (data) => this.successOtp(data), (data) => this.errorOtp(data), params)
  }

  successOtp(data) {
    this.isSpinner=false;
    this.isbtn=false;
    this.toastr.success(data.message);
    this.hidenewPwd = true;
  }
  errorOtp(data) {
    this.isSpinner=false;
    this.isbtn=false;
    this.toastr.error("Invalid OTP");
    this.hidenewPwd = false;
  }

  changePassword(){
    let url = ApartmentCONSTANT.CHANGEPWD_URI;
    let params= new HttpParams({
      fromObject:{
        username:this.otpForm.controls['userName'].value,
        password:this.changePwdForm.controls['newpwd'].value
      }
    })
    this.service.getService(url, (data) => this.successPwd(data), (data) => this.errorPwd(data), params)
  }

  successPwd(data){
     this.toastr.success(data.message);
     this.route.navigateByUrl("/login");
  }
  errorPwd(data){
     this.toastr.error("failed");
  }

  gotoLogin(){
    this.route.navigateByUrl("/login");
  }
}
