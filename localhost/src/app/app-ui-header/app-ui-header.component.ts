/* app-ui-header.component.ts */

// IMPORT BASIC ANGULAR MODULES
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// DUE TO THIS IS A STANDALONE COMPONENT, WE NEED TO IMPORT THOSE ROUTER MODULES
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// IMPORT SOME NG-ICON MODULES
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octMarkGithub } from '@ng-icons/octicons';
import { faSolidHouseChimney,faSolidCircleQuestion,faSolidCircleInfo } from '@ng-icons/font-awesome/solid';

@Component({
  selector: 'app-ui-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NgIconComponent],
  providers: [provideIcons({ octMarkGithub,faSolidHouseChimney,faSolidCircleQuestion,faSolidCircleInfo })],
  templateUrl: './app-ui-header.component.html',
  styleUrls: ['./app-ui-header.component.scss']
})

export class AppUIcomponentHeader {

}
