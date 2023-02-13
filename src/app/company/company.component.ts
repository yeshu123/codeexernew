import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { companymodel } from '../Model/companymodel';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faHome, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { EditpopupComponent } from '../editpopup/editpopup.component';
import { EditassignmentComponent } from '../editassignment/editassignment.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  faHome=faHome;
  faSearch=faSearch;

  constructor(private dialog: MatDialog, private api: ApiService,private router: Router) { }
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  companydata!: companymodel[];
  finaldata:any;
  // searchText:string='';

  ngOnInit(): void {
    this.LoadCompany();
  }

  displayColums: string[] = ["id","vamid", "resourceName", "email","manager","techTrack", "startDate", "endDate","sme","programStatus", "action"]

  Openpopup(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
      width: '1500px',
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
  routing(id:any) {
    this.router.navigate(['/editassignment']);
    this.api.GetCompanybycode(id);


  }
  
// onSearchTextEntered(searchValue:string){
//   this.searchText=searchValue;
//   console.log(this.searchText);
// }

// filterData($event:any){
//  this.finaldata.filter = $event.target.searchValue;
// }


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.finaldata.filter = filterValue.trim().toLowerCase();
}


}
function id(id: any) {
  throw new Error('Function not implemented.');
}

