import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// DUE TO THIS IS A STANDALONE COMPONENT, WE NEED TO IMPORT THOSE ROUTER MODULES
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// IMPORT THE HEADER
import { AppUIcomponentHeader } from '../app-ui-header/app-ui-header.component';
// IMPORT SOME NG-ICON MODULES
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matfFolderProjectColored,matfFolderAngularColored,matfFolderSrcColored,matfFolderConnectionColored,matfFolderControllerColored } from '@ng-icons/material-file-icons/colored';

@Component({
  selector: 'content-page-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,AppUIcomponentHeader,NgIconComponent],
  providers: [provideIcons({ matfFolderProjectColored,matfFolderAngularColored,matfFolderSrcColored,matfFolderConnectionColored,matfFolderControllerColored })],
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})

export class PageHomeComponent {
  
  /* 
  LET'S IMPLEMENT A FUNCTION WHICH DISPLAYS MORE INFORMATIONS ABOUT THE SINGLE OPTIONS.
  IF THE USER HOVERS OVER ONE OF THE ACTION-BUTTONS, WE'RE GOING TO SHOW SOME MORE
  INFORMATIONS ABOUT THE SELECTED ACTION RIGHT BELOW THE ACTION BUTTONS.
  */
  // THIS OBJECT STORES THE INFORMATION TEXT WHICH WILL BE SHOWN, WHEN THE USER HOVERS THE ACTION-BUTTONS
  public MoreInfo = {
    ClearInfos: "",
    NewProject: "This option will guide you step-by-step through the process of creating a complete Angular project with components, services, npm modules and more",
    AngularApp: "With this option, you are going to create a<br>new workspace with an Angular App in it.",
    GenerateComp: "If you need a new component inside your existing<br> Angular Workspace, this is the right option for you.",
    GenerateServ: "Do you need a global service in your<br>existing Angular Workspace?<br>Then you should choose this option.",
    GenerateAppl: "This option allows you to add<br>a built-in (nested) application<br>to your Angular Workspace",
  };

  // THIS VAR WILL STORE THE FINAL INFORMATIONS WHICH WILL BE SHOWN IN THE INFORMATION BOX RIGHT BELOW THE ACTION BUTTONS
  public ViewInfoAbout: string = "Please hover over each option,<br>to get more informations about it.<br><strong>ng new start-now</strong>";

  // A SIMPLE FUNCTION WHICH SETS THE STRING FOR THE INFORMATION
  public SetInfoString(InfoString: string) {
    // GO THROUGH THE DIFFERENT CASES
    if( InfoString.toUpperCase() == "NEWPROJECT") { this.ViewInfoAbout = this.MoreInfo.NewProject; }
    else if( InfoString.toUpperCase() == "ANGULARAPP") { this.ViewInfoAbout = this.MoreInfo.AngularApp; }
    else if( InfoString.toUpperCase() == "GENERATECOMP") { this.ViewInfoAbout = this.MoreInfo.GenerateComp; }
    else if( InfoString.toUpperCase() == "GENERATESERV") { this.ViewInfoAbout = this.MoreInfo.GenerateServ; }
    else if( InfoString.toUpperCase() == "GENERATEAPPL") { this.ViewInfoAbout = this.MoreInfo.GenerateAppl; }
    else { this.ViewInfoAbout = this.MoreInfo.ClearInfos; }
  }

}
