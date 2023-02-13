
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { SubmitService } from '../submit.service';

@Component({
  selector: 'app-popup2',
  templateUrl: './popup2.component.html',
  styleUrls: ['./popup2.component.css']
})
export class Popup2Component implements OnInit {
  editdata: any;
  public listitems : Array<string> =[];

  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService, private submitSevice: SubmitService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetCompanybycode(this.data.id).subscribe(response => {
        this.editdata = response;
      });
    }
  }

  companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    vamid: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    
    programName: this.builder.control('', Validators.required),
    startDate: this.builder.control('', Validators.required),
    endDate: this.builder.control('', Validators.required),
    SMEName: this.builder.control('', Validators.required),
    statusOfProgram: this.builder.control('', Validators.required),
    filename: this.builder.control('', Validators.required),
  });

  SaveCompany() {
    if (this.companyform.valid) {
      const Editid = this.companyform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateComapny(Editid, this.companyform.getRawValue()).subscribe(response => {
          this.closepopup();
          alertify.success("Updated successfully.")
        });
      } else {
        this.api.CreateComapny(this.companyform.value).subscribe(response => {
          this.closepopup();
          alertify.success("saved successfully.")
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

  dropdown(){
    this.api.getProgramDropDown().subscribe((data: any[])=>{
      data.forEach(element => {
        this.listitems.push(element["techtrack"]);
        
      });
    })
  }
  filename: string='';
  filename1: string='';
  handleInput(event: Event) {
    this.filename = (event.target as HTMLInputElement).value;
    this.filename1 = this.filename.replace(/^.*[\\\/]/, '')
  }
  submit(){
    this.submitSevice.isSubmitted=true;
    //console.log('submitted');
    this.dialog.closeAll();
  }
  


}
