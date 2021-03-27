import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ApartmentCONSTANT } from '../shared/ApartmentCONSTANT';
import { SaveService } from '../save.service';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ownerDetails: any = [];
  detais: any;
  tableTitle: string = 'Apartment Details';

  constructor(private saveService: SaveService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.getOwnerDetails();
    // this.initializeJson();
  }


  getOwnerDetails() {
     this.saveService.getService(ApartmentCONSTANT.GET_OWNER_DETAILS_URI,res=>this.prepareData(res),err=>this.showErrorMessage(err));
  //  this.loginService.getService(ApartmentCONSTANT.GET_OWNER_DETAILS_URI,res=>this.prepareData(res),err=>this.showErrorMessage(err));
  }

  prepareData(data: any) {
    for (let i = 0; i < data.length; i++) {
      this.ownerDetails.push(data[i]);
    }
  }

  showErrorMessage(err:any){
   alert(err)
  }



  initializeJson() {
    this.ownerDetails = [
      {
        id: 1,
        name: 'Ravindar Reddy',
        flatNo: 202
      },
      {
        id: 2,
        name: 'Satya Narayana',
        flatNo: 203
      },
      {
        id: 2,
        name: 'Satya Narayana',
        flatNo: 203
      },
      {
        id: 2,
        name: 'Satya Narayana',
        flatNo: 203
      },
      {
        id: 2,
        name: 'Satya Narayana',
        flatNo: 203
      },
      {
        id: 1,
        name: 'Ravindar Reddy',
        flatNo: 202
      },
      {
        id: 2,
        name: 'Satya Narayana',
        flatNo: 203
      },
      {
        id: 2,
        name: 'Satya Narayana',
        flatNo: 203
      },
      {
        id: 2,
        name: 'Satya Narayana',
        flatNo: 203
      },
      {
        id: 2,
        name: 'Satya Narayana',
        flatNo: 203
      }
    ];

  }
}
