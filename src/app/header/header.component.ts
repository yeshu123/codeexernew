import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { faUser } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faHome=faHome;
  faUser=faUser
  collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
