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
import { Router } from '@angular/router';
import { identifierName } from "@angular/compiler";
import { programstracker } from "../Model/programstracker";


@Component({
  selector: 'app-editassignment',
  templateUrl: './editassignment.component.html',
  styleUrls: ['./editassignment.component.css']
})
export class EditassignmentComponent implements OnInit {
  faSearch=faSearch;
  id ! :number;

  constructor(private dialog: MatDialog, private api: ApiService,private router: Router) {}
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  companydata!: companymodel[];

  finaldata:any;

  ngOnInit(): void {
    this.LoadCompany();
  }
  displayColums: string[] = ["vamid", "resourceName", "techTrack","category","program", "startDate", "endDate","sme","action"]

  Openpopup(data: any) {
    const _popup = this.dialog.open(EditpopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        // id:id
        item:data
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.LoadCompany();
    });
  }
value:any;
  LoadCompany() {
  this.value=localStorage.getItem('id')
   //this.id=parseInt(this.value);
    //this.router.getCurrentNavigation().extras.state.example
    this.api.GetCompanybycode(this.value).subscribe(response => {
      this.companydata = response;
      this.finaldata=new MatTableDataSource<companymodel>(this.companydata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }
  

  EditCompany(data: any) {
    this.Openpopup(data);
    
  }
  RemoveCompany(id: any) {
    alertify.confirm("Delete Assignment", "Do you want delete the assignment?", () => {
      this.api.RemoveCompanybycode(id).subscribe(r => {
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
function h(h: any) {
  throw new Error("Function not implemented.");
}

