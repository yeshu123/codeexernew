import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { companymodel } from '../Model/companymodel';
import { Popup2Component } from '../popup2/popup2.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { SubmitService } from '../submit.service';

@Component({
  selector: 'app-company1',
  templateUrl: './company1.component.html',
  styleUrls: ['./company1.component.css']
})
export class Company1Component implements OnInit {
  faHome=faHome;
  isSubmitted: boolean= false;
  companyform: any;

  constructor(private dialog: MatDialog, private api: ApiService,public submitService: SubmitService) { }
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  companydata!: companymodel[];
  finaldata:any;


  ngOnInit(): void {
    this.LoadCompany();
  }

  displayColums: string[] = ["techTrack","program", "startDate", "endDate","Delaydays","sme", "smeStatus", "upload"]
  SaveCompany() {
    this.isSubmitted= true;
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
    throw new Error('Method not implemented.');
  }
  Openpopup(id: any) {
    const _popup = this.dialog.open(Popup2Component, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.LoadCompany();
    });
  }

  LoadCompany() {
    this.api.Getallcomapny().subscribe(response => {
      this.companydata = response;
      this.finaldata=new MatTableDataSource<companymodel>(this.companydata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }

  EditCompany(id: any) {
    this.Openpopup(id);
  }
  RemoveCompany(id: any) {
    alertify.confirm("Remove Assignment", "do you want delete the assignment?", () => {
      this.api.RemoveCompanybycode(id).subscribe(r => {
        this.LoadCompany();
      });
    }, function () {

    })


  }
  
}
