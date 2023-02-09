import { ViewChild } from "@angular/core";
import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { companymodel } from '../Model/companymodel';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditpopupComponent } from "../editpopup/editpopup.component";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-editassignment',
  templateUrl: './editassignment.component.html',
  styleUrls: ['./editassignment.component.css']
})
export class EditassignmentComponent implements OnInit {
  faSearch=faSearch;

  constructor(private dialog: MatDialog, private api: ApiService) {}
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  companydata!: companymodel[];
  finaldata:any;

  ngOnInit(): void {
    this.LoadCompany();
  }
  displayColums: string[] = ["vamid", "name", "email", "TechTrack","Category","ProgramName", "startDate", "endDate","SMEName","ProgramStatus", "action"]

  Openpopup(vamid: any) {
    const _popup = this.dialog.open(EditpopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        vamid:vamid
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

  EditCompany(vamid: any) {
    this.Openpopup(vamid);
    
  }
  RemoveCompany(vamid: any) {
    alertify.confirm("Remove Company", "do you want remove this company?", () => {
      this.api.RemoveCompanybycode(vamid).subscribe(r => {
        this.LoadCompany();
      });
    }, function () {

    })


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finaldata.filter = filterValue.trim().toLowerCase();
  }


}
