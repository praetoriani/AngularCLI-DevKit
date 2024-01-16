/* page-info.component.ts */

// IMPORT BASIC ANGULAR MODULES
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// DUE TO THIS IS A STANDALONE COMPONENT, WE NEED TO IMPORT THOSE ROUTER MODULES
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// IMPORT THE HEADER
import { AppUIcomponentHeader } from '../app-ui-header/app-ui-header.component';
// IMPORT THE MODAL WINDOW
import { ModalWindowExtension } from '../modal-window/modal-window.extension';

@Component({
  selector: 'content-page-info',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AppUIcomponentHeader,ModalWindowExtension],
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.scss']
})
export class PageInfoComponent {

}
