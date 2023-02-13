import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { HttpClient } from '@angular/common/http';
import { companymodel } from '../Model/companymodel';
import { ModuleTeardownOptions } from '@angular/core/testing';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  editdata: any;
  public listitems : Array<string> =["Java",".NET"];
id: number | undefined;
vamid: number | undefined;
resourceName: string='';
manager: string | null | undefined;
email: string='';
  ProgramStatus: string='';
  TechTrack:any;
  startDate:any;
  endDate:any;
  SME:any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.vamid != '' && this.data.vamid != null) {
      this.api.GetCompanybycode(this.data.vamid).subscribe(response => {
        this.editdata = response;
        this.companyform.setValue({
          //id: this.editdata.id,
          vamid: this.editdata.vamid,name: this.editdata.resourceName, email: this.editdata.email,manager: this.editdata.manager,
          TechTrack: this.editdata.TechTrack, startDate: this.editdata.startDate, endDate: this.editdata.endDate,
          SME: this.editdata.SME,ProgramStatus: this.editdata.ProgramStatus
        });
      });
    }
  }

  companyform = this.builder.group({
    //id: this.builder.control({ value: '', disabled: true }),
    vamid: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    manager:this.builder.control('',Validators.required),
    TechTrack: this.builder.control('', Validators.required),
    startDate: this.builder.control('', Validators.required),
    endDate: this.builder.control('', Validators.required),
    SME: this.builder.control('', Validators.required),
    ProgramStatus: this.builder.control('', Validators.required),
  });

  SaveCompany() {
    if (this.companyform.valid) {
      const Editid = this.companyform.getRawValue().vamid;
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
submit(){
  const companyform ={vamid:this.vamid, resourceName:this.resourceName,manager:this.manager,email:this.email,TechTrack:this.TechTrack,
    startDate:this.startDate,endDate:this.endDate,SME:this.SME,status:this.ProgramStatus}
    this.http.post('https://localhost:7260/api/Assign',companyform).subscribe(res => console.log(res));
    //console.log(companyform);
    this.closepopup();
    alertify.success("saved successfully.")
}

}
