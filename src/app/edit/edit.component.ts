import { Component, OnInit, ViewChild } from '@angular/core';
import { Apartment } from '../Apartment';
import { SaveService } from '../save.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  apId:number;
  apartmentName:string;
  noofFlats:number;

  updateApartment= new Apartment;

  constructor(private saveService:SaveService) { }

  ngOnInit(): void {
  }

  update(){
     this.updateApartment.apId=this.apId,
     this.updateApartment.apartmentName=this.apartmentName,
     this.updateApartment.noofFlats=this.noofFlats,
     this.saveService.updateDetails(this.updateApartment).subscribe();
  }
  updateDetails(){
    
  }

  getapId(apId:number){
    this.apId=apId;
  }

  getapName(apName:string){
    this.apartmentName=apName;
  }
  getFlat(flat:number){
    this.noofFlats=flat;
  }
}
