import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Apartment } from '../Apartment';
import { ApartmentCONSTANT } from '../shared/ApartmentCONSTANT';
import { SaveService } from '../save.service';


@Component({
  selector: 'app-saveapdetails',
  templateUrl: './saveapdetails.component.html',
  styleUrls: ['./saveapdetails.component.css']
})
export class SaveapdetailsComponent implements OnInit {

  name: string;
  apdetails: Apartment = new Apartment();
  apd: Observable<Apartment[]>;
  submitted: boolean;
  disSpinner: boolean = false;  //spinner disable
  disBtn: boolean = true;      // button disable
  ownerForm = new FormGroup({
    ownerName: new FormControl('', Validators.required),
    flatNo: new FormControl('', Validators.required),
    contactNo: new FormControl('', Validators.required)
  });
  updateForm = new FormGroup({
    FlatNo: new FormControl(),
    Owner: new FormControl(),
    Contact: new FormControl(),
    id: new FormControl()
  });
  FlatList: any = [];
  FlatNoLabel: any = 'Flat No';
  apdetailsForm = new FormGroup({
    apartmentName: new FormControl(),
    noofFlats: new FormControl()
  })
  submitDetails: any = {};
  updateOwnerDetails: any = {};
  constructor(private saveService: SaveService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSelectFlat(flatNo: any) {
    let flats: any = {};
    flats.flatno = flatNo;
    this.saveService.postService(ApartmentCONSTANT.SELECT_OWNER_DETAILS_URI, (data) => this.prepareData1(data), (err) => this.showErrorMsg(err), flats)
  }

  onSearchFlat(flatNo: any) {
    let flats: any = {};
    var numberValue = Number(flatNo.term);
    flats.flatno = numberValue;
    this.saveService.postService(ApartmentCONSTANT.SEARCH_OWNER_DETAILS_URI, (data) => this.prepareData(data), (err) => this.showErrorMsg(err), flats)
  }

  updateDetails() {
    this.updateOwnerDetails.flatno = this.updateForm.controls['FlatNo'].value;
    this.updateOwnerDetails.name = this.updateForm.controls['Owner'].value;
    this.updateOwnerDetails.contact = this.updateForm.controls['Contact'].value;
    this.updateOwnerDetails.id = this.updateForm.controls['id'].value;
    this.saveService.postService(ApartmentCONSTANT.UPDATE_OWNER_DETAILS_URI, (data) => this.showSuccessMsg(data), (err) => this.showErrorMsg(err), this.updateOwnerDetails)
  }

  prepareData(data: any) {
    this.FlatList = data;

  }

  prepareData1(data: any) {
    this.updateForm.patchValue({
      Owner: data[0].name,
      Contact: data[0].contact,
      id: data[0].id
    })
  }

  saveOwnerDetails() {
    this.submitDetails.name = this.ownerForm.controls['ownerName'].value;
    this.submitDetails.flatno = this.ownerForm.controls['flatNo'].value;
    this.submitDetails.contact = this.ownerForm.controls['contactNo'].value;
    this.saveService.postService(ApartmentCONSTANT.SAVE_OWNER_DETAILS_URI, (data) => this.showSuccessMsg(data), (err) => this.showErrorMsg(err), this.submitDetails);
    this.disSpinner = true;
  }

  showSuccessMsg(data: any) {
    this.disSpinner = false;
    this.toastr.success(data.message, '', { timeOut: 5000 });
  }

  showErrorMsg(err: any) {
    // this.toastr.error(
    //   '<span class="ngwfmt-icons"><i class="fa fa-check"></i></span>'+err.message,'',
    //   {
    //     timeOut: 5000,
    //     enableHtml: true,
    //     closeButton: true,
    //     toastClass: 'alert alert-error alert-with-icon',
    //     positionClass: 'toast-top-center',
    //   }
    // );
    this.toastr.error(err, '', { timeOut: 5000 });
    this.disSpinner = false;
  }

  saveDetails(save) {
    this.apdetails = new Apartment();
    this.apdetails.apartmentName = this.ApartmentName.value;
    this.apdetails.noofFlats = this.NoOfFlats.value;
    console.log(this.apdetails);
    let x = this.saveService.saveDetails(this.apdetails)
      .subscribe(data => console.log(data), error => console.log(error));
    this.apdetails = new Apartment();;
    this.submitted = true;

  }

  getdetails() {
    this.saveService.getDetails().subscribe((data) => {
      this.apd = data;
    })
    this.name = "arun";
  }


  get ApartmentName() {
    return this.apdetailsForm.get('apartmentName');
  }

  get NoOfFlats() {
    return this.apdetailsForm.get('noofFlats');
  }

  addApForm() {
    this.submitted = false;
    this.apdetailsForm.reset();
  }

  clearDetails() {
    this.ownerForm.patchValue({
      ownerName: '',
      flatNo: '',
      contactNo: ''
    })
  }


}
