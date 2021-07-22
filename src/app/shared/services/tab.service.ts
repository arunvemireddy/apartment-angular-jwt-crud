import { Component, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  id:any;

  ownerName= new Subject<any>();

  tab:any=[{}];

  constructor() { }

  openTab(component:Component){
   this.tab=[component];
  }

  passValue(data){
   this.ownerName.next(data);
  }
}
