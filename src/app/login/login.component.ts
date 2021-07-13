import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotpwdComponent } from '../forgotpwd/forgotpwd.component';
import { SaveService } from '../save.service';
import { ApartmentCONSTANT } from '../shared/ApartmentCONSTANT';
import { LoginService } from '../shared/services/login.service';
import { TabService } from '../shared/services/tab.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  })

  loginDetails: any = {};

  constructor(private saveService: SaveService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    private loginService: LoginService,
    private tabService: TabService) { }

  ngOnInit(): void {
    this.removeTokenItem();
  }

  login() {
    this.loginDetails.userName = this.loginForm.controls['userName'].value;
    this.loginDetails.password = this.loginForm.controls['password'].value;
    this.loginService.loginService(ApartmentCONSTANT.LOGIN_URI, (data) => { this.showSuccessMsg(data) }, (err) => { this.showErrorMsg(err) }, this.loginDetails);
  }

  showSuccessMsg(data: any) {
    this.loginService.setUserName(data.message);
    this.loginService.login(data.token);
    //console.log(data.message);
    
    this.router.navigate(['main']);
    // this.toastr.success(
    //   '<i class="fa fa-check"></i>' + data.message, '',
    //   {
    //     timeOut: 5000,
    //     enableHtml: true,
    //     closeButton: true,
    //     toastClass: 'alert alert-success alert-with-icon',
    //     positionClass: 'toast-top-center'
    //   }
    // );
    this.toastr.success('Logged In');
  }

  showErrorMsg(err: any) {
    // this.toastr.error(
    //   '<span class="ngwfmt-icons"><i class="fa fa-check"></i></span>'+err.message,'',
    //   {
    //     timeOut: 5000,
    //     enableHtml: true,
    //     closeButton: true,
    //     toastClass: 'alert alert-error alert-with-icon',
    //     positionClass: 'toast-top-center',
    //   }
    // );
    this.toastr.error('invalid credentials');
  }

  removeTokenItem() {
    this.loginService.logout();
  }

}

