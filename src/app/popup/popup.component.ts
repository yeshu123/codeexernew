import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { HttpClient } from '@angular/common/http';
import { companymodel } from '../Model/companymodel';
import { ModuleTeardownOptions } from '@angular/core/testing';
import { techtracks } from '../Model/techtracks';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  editdata: any;
  public listitems : any;
  track: techtracks[];
  id: number;
vamid: number | undefined;
resourceName: string='';
manager: string | null | undefined;
email: string='';
  ProgramStatus: string='';
  techTrack:any;
  startDate:any;
  endDate:any;
  sme:any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.vamid != '' && this.data.vamid != null) {
      this.api.GetCompanybycode(this.data.vamid).subscribe(response => {
        this.editdata = response;
        this.companyform.setValue({
          id: this.editdata.id,
          vamid: this.editdata.vamid,resourceName: this.editdata.resourceName, email: this.editdata.email,manager: this.editdata.manager,
          techTrack: this.editdata.techTrack, startDate: this.editdata.startDate, endDate: this.editdata.endDate,
          sme: this.editdata.sme
        });
      });
    }
    this.dropdown();
  }
  

  companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    vamid: this.builder.control('', Validators.required),
    resourceName: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    manager:this.builder.control('',Validators.required),
    techTrack: this.builder.control('', Validators.required),
    startDate: this.builder.control('', Validators.required),
    endDate: this.builder.control('', Validators.required),
    sme: this.builder.control('', Validators.required),
    //ProgramStatus: this.builder.control('', Validators.required),
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
      // data.forEach(element => {
      //   this.listitems.push(element["techtrack"]);
      //   console.log(listitems);
        
      // });
      this.listitems=data;
      console.log(this.listitems);
    })
  }
submit(){
  const companyform ={vamid:this.vamid, resourceName:this.resourceName,manager:this.manager,email:this.email,techTrack:this.techTrack,
    startDate:this.startDate,endDate:this.endDate,sme:this.sme }
    this.http.post('https://localhost:7260/api/Assign',companyform).subscribe(res => console.log(res));
    //console.log(companyform);
    this.closepopup();
    alertify.success("saved successfully.")
}


}
