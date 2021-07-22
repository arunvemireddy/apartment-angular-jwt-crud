import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ApartmentCONSTANT } from '../shared/ApartmentCONSTANT';
import { SaveService } from '../save.service';
import { LoginService } from '../shared/services/login.service';
import { HttpParams } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { popper } from '@popperjs/core';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { TabService } from '../shared/services/tab.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.csv';
const EXCEL_EXTENSION_XLSX = '.xlsx';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ownerDetails: any = [];
  detais: any;
  tableTitle: string = 'Apartment Details';
  pageNo: any=0;
  pageSize:any=10;
  totalRecords:any;
  totalPages:any;
  OwnerDetails:any;
  colName:any=['id','name','flatno','contact'];
  

  constructor(private saveService: SaveService,
    private loginService:LoginService,
    private router:Router,
    private tabservice:TabService) {
   }

  ngOnInit(): void {
    this.sendPage(this.pageSize);
  }


  getOwnerDetails() {
    const page= new HttpParams({
      fromObject:{
        pageNo:this.pageNo,
        pageSize:this.pageSize
      }
    });
     this.saveService.getService(ApartmentCONSTANT.GET_OWNER_DETAILS_URI,res=>this.prepareData(res),err=>this.showErrorMessage(err),page);
  }

  prepareData(data:any) {
      this.ownerDetails=data.content;
      this.totalRecords=data.totalElements;
      this.totalPages=Math.floor(this.totalRecords/this.pageSize) ;
  }

  showErrorMessage(err:any){
   alert(err)
  }

  nextPage(){
    if(this.pageNo<this.totalPages){
      this.pageNo++;
    }
    

    const page= new HttpParams({
      fromObject:{
        pageNo:this.pageNo,
        pageSize:this.pageSize
      }
    });
    this.saveService.getService(ApartmentCONSTANT.GET_OWNER_DETAILS_URI,res=>this.prepareData(res),err=>this.showErrorMessage(err),page);
  }

  prevPage(){
    if(this.pageNo>0){
      this.pageNo--;
    }
    
    const page= new HttpParams({
      fromObject:{
        pageNo:this.pageNo,
        pageSize:this.pageSize
      }
    });
    this.saveService.getService(ApartmentCONSTANT.GET_OWNER_DETAILS_URI,res=>this.prepareData(res),err=>this.showErrorMessage(err),page);
  }

  sendPage(pageSize:any){
    this.pageSize=pageSize;
    const page= new HttpParams({
      fromObject:{
        pageNo:this.pageNo,
        pageSize:this.pageSize
      }
    });
    this.saveService.getService(ApartmentCONSTANT.GET_OWNER_DETAILS_URI,res=>this.prepareData(res),err=>this.showErrorMessage(err),page);
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

  downloadFile(){
    let url:any=ApartmentCONSTANT.DOWNLOADOWNERTABLE_URI;
    this.saveService.downloadService(url).subscribe(blob=>FileSaver.saveAs(blob,'data.csv'))
  }

  successDownload(data:Blob){
    FileSaver.saveAs(data,"data.csv");
  }

  errorDownload(data){

  }

  sortColfetch(data){
    console.log(data);
    const page= new HttpParams({
      fromObject:{
        pageNo:this.pageNo,
        pageSize:this.pageSize,
        colName:data
      }
    });
     this.saveService.getService(ApartmentCONSTANT.GET_OWNER_DETAILS_URI,res=>this.prepareData(res),err=>this.showErrorMessage(err),page);
  }

  viewOwner(data){
   // console.log(data);
    this.tabservice.passValue(data);
    
  }
}
