import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { SaveService } from '../save.service';
import { SaveapdetailsComponent } from '../saveapdetails/saveapdetails.component';
import { LoginService } from '../shared/services/login.service';
import { ApartmentCONSTANT } from '../shared/ApartmentCONSTANT';
import { Subject } from 'rxjs';
import { ComplaintComponent } from '../complaint/complaint.component';
import { Router } from '@angular/router';
import { PayComponent } from '../pay/pay.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { MydetailsComponent } from '../mydetails/mydetails.component';
import { ViewOwnerComponent } from '../view-owner/view-owner.component';
import { TabService } from '../shared/services/tab.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = 'apartment';

  apartmentTitle: string="ABC Apartment";
  apartmentAddress: string="Road No:4,XYZ State";
  userName:any;

  user= new Subject<string>();

  componentOutlet:any=[];
  dateMessage:any;


  constructor(private loginService:LoginService,private saveService:SaveService,private route:Router,
    private tabservice:TabService) { 
    setInterval(()=>{
        this.getDate();
    },1000)
  }

  ngOnInit(): void {
    // this.user.subscribe((data)=>{this.userName=data});
    // this.user.next(this.loginService.getUserName());
    this.userName=this.loginService.getUserName();
    this.saveService.getService(ApartmentCONSTANT.GET_APARTMENT_DETAILS_URI,res=>this.getApartmentDetails(res),err=>this.showErrorMessage(err));
   
  //  console.log(this.userName);
  this.tabservice.ownerName.subscribe(
    data=>{
      this.onViewOwner(data);
    }
  );
  }

  asycall(){
    this.saveService.getService(ApartmentCONSTANT.GET_APARTMENT_DETAILS_URI,res=>this.getApartmentDetails(res),err=>this.showErrorMessage(err));
  }

  getApartmentDetails(data:any){
    data.forEach(element => {
      this.apartmentTitle=element.aptName;
      this.apartmentAddress=element.aptAddress
    });  
  }
  
  onHome(){
    this.componentOutlet=[{
       label:'home',
       component:HomeComponent
    }]
   }
 
   onAdmin(){
 
     this.componentOutlet=[{
       label:'save',
       component:SaveapdetailsComponent
    }]
 
   }
 
   onHelp(){
     this.componentOutlet=[{
       label:'home',
       component:HomeComponent
    }]
   }
 
   onComplaints(){
     this.componentOutlet=[{
       label:'home',
       component:ComplaintComponent
    }]
   }
 
   onGlimpse(){
     this.componentOutlet=[{
       label:'home',
       component:GalleryComponent
    }]
   }

   logOut(){
    this.loginService.logout();
    location.reload();
   }

   showErrorMessage(err:any){
    alert(err)
   }

   getDate(){
     let date= new Date();
     this.dateMessage=date;
   }

   onDetails(){
    this.componentOutlet=[{
      label:'home',
      component:MydetailsComponent
   }]
   }

   onPay(){
    this.componentOutlet=[{
      label:'home',
      component:PayComponent
   }]
   }

   onViewOwner(data){
    this.tabservice.id=data; 
    this.componentOutlet=[{
      label:'viewowner',
      component:ViewOwnerComponent
   }]
   }
}
