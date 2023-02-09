import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component implements OnInit {
  faHome=faHome;
  collapsed = true;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
