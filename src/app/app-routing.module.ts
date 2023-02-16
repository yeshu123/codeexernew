import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AddproductComponent } from './addproduct/addproduct.component';
import { CompanyComponent } from './company/company.component';
import { EditassignmentComponent } from './editassignment/editassignment.component';
import { LoginComponent } from './login/login.component';
import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';
import { Company1Component } from './company1/company1.component';
import { ProgramComponent } from './program/program.component';


const routes: Routes = [
  
  {
    component:LoginComponent,path:"login",pathMatch:'full'
  },
  {
    component:CompanyComponent,path:"company",pathMatch:'full'
  },
  {
    component:EditassignmentComponent,path:"editassignment",pathMatch:'full'
  },
  {
    component:EditassignmentComponent,path:"editassignment/:id",pathMatch:'full'
  },
  {
    component:ViewAssignmentComponent,path:"viewassignment",pathMatch:'full'
  },
  {
    component:Company1Component,path:"resource",pathMatch:'full'
  },
  {
    component:ProgramComponent,path:"SME",pathMatch:'full'
  },
  {
    component:LoginComponent,path:"",pathMatch:'full'
  }
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
