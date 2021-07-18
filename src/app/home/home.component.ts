import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ApartmentCONSTANT } from '../shared/ApartmentCONSTANT';
import { SaveService } from '../save.service';
import { LoginService } from '../shared/services/login.service';
import { HttpParams } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
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
  

  constructor(private saveService: SaveService,private loginService:LoginService) {
    // setInterval(()=>{
    //  this.getOwnerDetails();
    // },1000)
   }

  ngOnInit(): void {
    this.sendPage(this.pageSize);
    // this.initializeJson();
  }


  getOwnerDetails() {
    const page= new HttpParams({
      fromObject:{
        pageNo:this.pageNo,
        pageSize:this.pageSize
      }
    });
     this.saveService.getService(ApartmentCONSTANT.GET_OWNER_DETAILS_URI,res=>this.prepareData(res),err=>this.showErrorMessage(err),page);
  //  this.loginService.getService(ApartmentCONSTANT.GET_OWNER_DETAILS_URI,res=>this.prepareData(res),err=>this.showErrorMessage(err));
  }

  prepareData(data:any) {
      this.ownerDetails=data[0];
      this.totalRecords=data[1];
      this.totalPages=Math.floor(this.totalRecords/this.pageSize) ;
      console.log(this.totalPages);
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
    console.log(pageSize);
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
    console.log("sa");
    let url:any=ApartmentCONSTANT.DOWNLOADOWNERTABLE_URI;
    // this.saveService.downloadService(url).subscribe(x=>{
    //   this.successDownload(x)
    // })
  //  let csv:any;
  //  const data: Blob = new Blob([this.csvToBuffer(csv)], { type: EXCEL_TYPE });
 // this.saveService.getService(url,(data)=>this.successDownload(data),(data)=>this.errorDownload(data))
 this.saveService.downloadService(url).subscribe(blob=>FileSaver.saveAs(blob,'data.csv'))
  }

  successDownload(data:Blob){
    // console.log(data);
    FileSaver.saveAs(data,"data.csv");
  }
  errorDownload(data){

  }
}
