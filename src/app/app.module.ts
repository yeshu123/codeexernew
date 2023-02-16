import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/MaterialModule';
import { CompanyComponent } from './company/company.component';
import { PopupComponent } from './popup/popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditassignmentComponent } from './editassignment/editassignment.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MbscModule } from '@mobiscroll/angular';
import { MatMenuModule} from '@angular/material/menu';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'
import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SearchComponent } from './search/search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditpopupComponent } from './editpopup/editpopup.component';
import { CommentpopupComponent } from './commentpopup/commentpopup.component';
import { Header1Component } from './header1/header1.component';
import { MatSelectModule } from '@angular/material/select';
import { Search1Component } from './search1/search1.component';
import { ProgramComponent } from './program/program.component';
import { Popup1Component } from './popup1/popup1.component';
import { Company1Component } from './company1/company1.component';
import { Popup2Component } from './popup2/popup2.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    PopupComponent,
    EditassignmentComponent,
    LoginComponent,
    HeaderComponent,
    NavbarComponent,
    ViewAssignmentComponent,
    SearchComponent,
    EditpopupComponent,
    CommentpopupComponent,
    Header1Component,
    Search1Component,ProgramComponent,Popup1Component, 
    Company1Component, 
    Popup2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MbscModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
