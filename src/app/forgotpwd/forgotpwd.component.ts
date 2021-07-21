import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private service: SaveService,private toastr:ToastrService) { }

  otpForm = new FormGroup({
    userName: new FormControl('', Validators.required)
  })

  newotpForm = new FormGroup({
    otpNumber: new FormControl('', Validators.required)
  })
  hidenewPwd: boolean = false;

  ngOnInit(): void {
  }

  sendOtp() {
    let url = ApartmentCONSTANT.GENERATEOTP_URI;
    const params = new HttpParams({
      fromObject: {
        username: this.otpForm.controls['userName'].value,
      }
    })
    this.service.getService(url, (data) => this.success(data), (data) => this.error(data), params)
  }

  success(data) {
    this.toastr.success(data.message);
  }
  error(data) {
     this.toastr.error(data);
  }

  validateOtp() {
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
    this.hidenewPwd = true;
  }
  errorOtp(data) {
    this.hidenewPwd = false;
  }
}
