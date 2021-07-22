import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveService } from '../save.service';
import { ApartmentCONSTANT } from '../shared/ApartmentCONSTANT';
import { TabService } from '../shared/services/tab.service';

@Component({
  selector: 'app-view-owner',
  templateUrl: './view-owner.component.html',
  styleUrls: ['./view-owner.component.css']
})
export class ViewOwnerComponent implements OnInit {

  imagePath:any;

  constructor(private route:ActivatedRoute,private servive:SaveService, 
    private _sanitizer:DomSanitizer,private tabService:TabService) { }

  ngOnInit(): void {
   this.getImage();
  }

  getImage() {
    let params= new HttpParams({
      fromObject:{
        id:this.tabService.id
      }
    });
    let url:any=ApartmentCONSTANT.GETPROFILEPIC_URI;
    this.servive.getProfileService(url,params).subscribe((data)=>this.success(data));
  }

  success(data){
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${data}`);
  }
  error(data){

  }

  onFileSelect(event:any){
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    let url:any=ApartmentCONSTANT.UPLOADPROFILEPIC_URI;
    let params= new HttpParams({
      fromObject:{
        id:this.tabService.id
      }
    });
    this.servive.uploadProfileService(url,params,formData).subscribe((data)=>this.success(data));
  }
}
