import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  tab:any=[{}];

  constructor() { }

  openTab(component:Component){
   this.tab=[component];
  }
}
