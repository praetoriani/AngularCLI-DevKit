/* generate-service.ts */

// IMPORT BASIC ANGULAR MODULES
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// WE NEED ANGULAR FORMS
import { FormsModule } from '@angular/forms';
// DUE TO THIS IS A STANDALONE COMPONENT, WE NEED TO IMPORT THOSE ROUTER MODULES
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// IMPORT THE HEADER
import { AppUIcomponentHeader } from '../app-ui-header/app-ui-header.component';
// IMPORT SOME NG-ICON MODULES
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidCode,faSolidGears,faSolidMessage,faSolidFileCode,faSolidClipboardList } from '@ng-icons/font-awesome/solid';

@Component({
  selector: 'package-generate-service',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, AppUIcomponentHeader, NgIconComponent],
  providers: [provideIcons({ faSolidCode,faSolidGears,faSolidMessage,faSolidFileCode,faSolidClipboardList })],
  templateUrl: './generate-service.html',
  styleUrls: ['./generate-service.scss']
})

export class GenerateServicePackage {

  public AngularCLIcmd: string = "";

  // WE NEED A BUNCH OF VARS/FUNCTIONS TO HANDLE ALL THOSE TOGGLES/SWITCHES INSIDE OUR FORM
  public SetTopLvlCfg: boolean = true;
  toggleTopLvlCfg() { this.SetTopLvlCfg = !this.SetTopLvlCfg; }
  public UseSpecTScfg: boolean = false;
  toggleSpecTScfg() { this.UseSpecTScfg = !this.UseSpecTScfg; }

  // THIS VAR IS BOUND TO THE INPUT-FIELD 'ServiceName' IN OUR HTML-PART
  public FieldServiceName: string = '';
  public MaxLengthOkay: boolean = false;
  // THIS FUNCTION WILL BE CALLED ANY TIME, THE INPUT CHANGES
  public checkServiceNameLength() {
    if( this.FieldServiceName.length > 4 ) { this.MaxLengthOkay = true; }
    else { this.MaxLengthOkay = false }
  }

  // THIS VAR IS BOUND TO THE INPUT-FIELD 'FieldProjName' IN OUR HTML-PART
  public FieldProjName: string = '';

  // THIS VAR SETS THE VISIBILITY STATE OF THE SHELL-WINDOW
  public ShowShellWin: boolean = false;

  // THIS FUNCTION CHECKS IF EVERYTHING IS OAKY AND SHOWS THE SHELL WINDOW
  public createShellPrompt() {
    // ACCESS THE DOM AND CATCH THE INPUT FIELD
    let DOMObj = document.getElementById('FieldServiceName');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( DOMObj ) { DOMObj.className = 'FormInput FontFormInput'; }
    // SHOW THE CONSOLE IF EVERYTHING IS OKAY
    if( this.FieldServiceName.length >= 3) {
      this.AngularCLIcmd = "ng g s " + this.FieldServiceName + " --flat " + this.SetTopLvlCfg + " --skip-tests " + this.UseSpecTScfg + "";
      if( this.FieldProjName.length >=3 ) {
        this.AngularCLIcmd = "ng g s " + this.FieldServiceName + " --flat " + this.SetTopLvlCfg + " --project " + this.FieldProjName + " --skip-tests " + this.UseSpecTScfg + "";
      }
      this.ShowShellWin = true;
    }
    else {
      this.ShowShellWin = false;
      if( DOMObj ) { DOMObj.className = 'FormInputError FontFormInput'; }
    }
  }
  // FUNCTION COPIES THE CMD-PROMPT TO THE CLIPBOARD
  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      console.log('TEXT COPIED');
    } catch (error) {
      console.error('ERROR WHILE COPYING TEXT', error);
    }
  }
}
