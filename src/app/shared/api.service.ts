import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { companymodel } from '../Model/companymodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/company';

  Getallcomapny(): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(this.apiurl);
  }

  GetCompanybycode(vamid: any): Observable<companymodel> {
    return this.http.get<companymodel>(this.apiurl + '/' + vamid);
  }

  RemoveCompanybycode(vamid: any) {
    return this.http.delete(this.apiurl + '/' + vamid);
  }

  CreateComapny(companydata: any) {
    return this.http.post(this.apiurl, companydata);
  }

  UpdateComapny(vamid: any, companydata: any) {
    return this.http.put(this.apiurl + '/' + vamid, companydata);
  }

  getProgramDropDown():Observable<any>{
    return this.http.get<companymodel[]>("https://localhost:7260/api/ProgramTracker/GetTechTracks"+ 'program');
  }

}
