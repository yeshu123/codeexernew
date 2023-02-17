import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { companymodel } from '../Model/companymodel';
import { techtracks } from '../Model/techtracks';
import {  userInfo } from '../Model/userInfomodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiurl = 'https://localhost:7260/api/Assign';

  Getallcomapny(): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(this.apiurl);
  }

  GetCompanybycode(id: number): Observable<companymodel[]> {

    return this.http.get<companymodel[]>('https://localhost:7260/api/Assign/GetResourceHistoryById'+'/'+id);
     //return this.http.get<companymodel[]>(this.apiurl+'/GetResourceHistoryById'+'/'+id);
     //https://localhost:7260/api/Assign
    
    //return this.http.get<companymodel[]>('https://localhost:7260/api/Assign/GetResourceHistoryById/'+id);
  }

  RemoveCompanybycode(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }


  CreateComapny(companydata: any) {
    return this.http.post(this.apiurl, companydata);
  }

  UpdateComapny(id: any, companydata: any) {
    return this.http.put(this.apiurl + '/' + id, companydata);

  }
  // fileUpload(id:any,object:any):Observable<any> {
  //   return this.http.post("https://localhost:7260/api/File/DownloadFile/"+id,object);
  // }

  upload(file:any):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
   
      
    // Store form name as "file" with file data
    formData.append("file", file,file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post("https://localhost:7260/api/File/PostSingleFile", formData);
  }

  getProgramDropDown():Observable<any>{
    return this.http.get<techtracks[]>("https://localhost:7260/api/ProgramTracker/GetTechTracks");
  }
  getUserInfo(vamid: any): Observable<any> {
      return this.http.get<userInfo[]>('https://localhost:7260/api/UserInfo/' + vamid);}



}
