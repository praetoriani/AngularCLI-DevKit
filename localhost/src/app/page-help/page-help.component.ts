/* page-help.component.ts */

// IMPORT BASIC ANGULAR MODULES
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// DUE TO THIS IS A STANDALONE COMPONENT, WE NEED TO IMPORT THOSE ROUTER MODULES
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// IMPORT THE HEADER
import { AppUIcomponentHeader } from '../app-ui-header/app-ui-header.component';

@Component({
  selector: 'content-page-help',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AppUIcomponentHeader],
  templateUrl: './page-help.component.html',
  styleUrls: ['./page-help.component.scss']
})

export class PageHelpComponent {

}
