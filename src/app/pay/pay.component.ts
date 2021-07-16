import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { SaveService } from '../save.service';
import { ApartmentCONSTANT } from '../shared/ApartmentCONSTANT';
import { CreditCardDirective } from './CreditCardDirective';




@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  ownerDetailsForm= new  FormGroup({
    flatNo: new FormControl(),
    ownerName: new FormControl({value:'',disabled:true})
  });
  flatList:any=[];

  constructor(private service:SaveService) { }

  ngOnInit(): void {
   
  }

  onSearchFlat(data){
   console.log(data.term);
   let flatNo=data.term;
   let url=ApartmentCONSTANT.SEARCH_FLATNO_URI;
   let params= new HttpParams({
     fromObject:{flatno:flatNo}
   })
   this.service.getService(url,(data)=>this.successSearchFlatCallBack(data),(data)=>this.errorSearchFlatCallBack(data),params);
  }

  changeFlat(data){
    console.log(data);
    let flatNo=data;
    let url=ApartmentCONSTANT.CHANGE_FLATNO_URI;
    let params= new HttpParams({
     fromObject:{flatno:flatNo}
   })
    this.service.getService(url,(data)=>this.successchangeFlatCallBack(data),(data)=>this.errorchangeFlatCallBack(data),params);
  }
  successSearchFlatCallBack(data){
    this.flatList=[];
    for(let i=0;i<data.length;i++){
      this.flatList.push(data[i].flatno);
    }
  }

  errorSearchFlatCallBack(data){
    this.flatList=[];
  }
  successchangeFlatCallBack(data){
     console.log(data[0].name)
     this.ownerDetailsForm.patchValue({ownerName:data[0].name});
  }
  errorchangeFlatCallBack(data){

  }
}
