import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { SaveService } from '../save.service';
import { SaveapdetailsComponent } from '../saveapdetails/saveapdetails.component';
import { LoginService } from '../shared/services/login.service';
import { ApartmentCONSTANT } from '../shared/ApartmentCONSTANT';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = 'apartment';

  apartmentTitle: string="ABC Apartment";
  apartmentAddress: string="Road No:4,XYZ State";

  componentOutlet:any=[];


  constructor(private loginService:LoginService,private saveService:SaveService ) { }

  ngOnInit(): void {
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
       component:HomeComponent
    }]
   }
 
   onGlimpse(){
     this.componentOutlet=[{
       label:'home',
       component:HomeComponent
    }]
   }

   logOut(){
    this.loginService.logout();
    location.reload();
   }

   showErrorMessage(err:any){
    alert(err)
   }
}
