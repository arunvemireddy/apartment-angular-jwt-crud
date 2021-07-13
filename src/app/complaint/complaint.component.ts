import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {

  constructor() { }

  complaintForm= new FormGroup({
    complaintText: new FormControl(''),
  });

  ngOnInit(): void {
  }

  onSubmit(){
       console.log(this.complaintForm.get("complaintText").value);
       this.complaintForm.reset();
  }

}
