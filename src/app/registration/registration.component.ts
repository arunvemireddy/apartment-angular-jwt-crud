import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SaveService } from '../save.service';
import { ApartmentCONSTANT } from '../shared/ApartmentCONSTANT';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm=new FormGroup(
    {
     name : new FormControl('',Validators.required), 
     username : new FormControl('',Validators.required),
     password : new FormControl('',Validators.required),
     role : new FormControl('',Validators.required),
    }
  )

  constructor(private service:LoginService,private toastr: ToastrService,
    public router: Router) { }

  ngOnInit(): void {
  }

  register(){
    let roles:any=[];
    let register:any={};
    register.name=this.registrationForm.controls['name'].value;
    register.username=this.registrationForm.controls['username'].value;
    register.password=this.registrationForm.controls['password'].value;
    roles.push(this.registrationForm.controls['role'].value);
    register.role=roles;
    return register;
  }

  sendData(){
    console.log(this.register());
    this.service.loginService(ApartmentCONSTANT.REGISTER_URI, (data) => { this.showSuccessMsg(data) }, (err) => { this.showErrorMsg(err) }, this.register());
  }

  showSuccessMsg(data: any) {
    this.router.navigate(['login']);
    this.toastr.success('Logged In');
  }

  showErrorMsg(err: any) {
    this.toastr.error('Register Again');
  }

}
