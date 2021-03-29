import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ToastrService } from 'ngx-toastr';
import { SaveService } from './save.service';
import { ApartmentCONSTANT } from './shared/ApartmentCONSTANT';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  isShow:boolean =false;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  

  constructor(
    private saveService:SaveService,
    private fb:FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    private localService:LoginService,
    private idle: Idle, 
    private keepalive: Keepalive) { }

  ngOnInit(){

  }

  @HostListener('window:unload', ['$event'])
  async unloadHandler(event) {
    if (event.currentTarget.performance.navigation.type !== PerformanceNavigation.TYPE_RELOAD) {
      localStorage.clear();
    }
  }
}
