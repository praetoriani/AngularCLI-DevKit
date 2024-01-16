/* generate-component.ts */

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
  selector: 'package-generate-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, AppUIcomponentHeader, NgIconComponent],
  providers: [provideIcons({ faSolidCode,faSolidGears,faSolidMessage,faSolidFileCode,faSolidClipboardList })],
  templateUrl: './generate-component.html',
  styleUrls: ['./generate-component.scss']
})

export class GenerateComponentPackage {
  // THIS VAR STORES THE WHOLE SHELL COMMAND (WHICH WILL BE GENERATED LATER)
  public AngularCLIcmd: string = "";

  // THIS VAR SETS THE VISIBILITY STATE OF THE SHELL-WINDOW
  public ShowShellWin: boolean = false;

  // WE NEED A BUNCH OF VARS/FUNCTIONS TO HANDLE ALL THOSE TOGGLES/SWITCHES INSIDE OUR FORM
  public UseShowBlock: boolean = false;
  toggleShowBlock() { this.UseShowBlock = !this.UseShowBlock; }
  public SetTopLvlCfg: boolean = false;
  toggleTopLvlCfg() { this.SetTopLvlCfg = !this.SetTopLvlCfg; }
  public UseInlineCSS: boolean = false;
  toggleInlineCSS() { this.UseInlineCSS = !this.UseInlineCSS; }
  public UseInlineHTM: boolean = false;
  toggleInlineHTM() { this.UseInlineHTM = !this.UseInlineHTM; }
  public UseSkipImprt: boolean = false;
  toggleSkipImprt() { this.UseSkipImprt = !this.UseSkipImprt; }
  public UseSelectTag: boolean = false;
  toggleSelectTag() { this.UseSelectTag = !this.UseSelectTag; }
  public UseSpecTScfg: boolean = false;
  toggleSpecTScfg() { this.UseSpecTScfg = !this.UseSpecTScfg; }
  public SingleAPIapp: boolean = false;
  toggleSingleAPI() { this.SingleAPIapp = !this.SingleAPIapp; }

  // FOLLOWING VARS ARE BIND TO THE INPUT-FIELDS OF OUR FORM
  public ComponentName: string = "";
  public DetectModeCfg: string = "default";
  public ComponentPref: string = "";
  public ProjectNameID: string = "";
  public UseCSSstyleID: string = "empty";
  public SetNewFileTyp: string = "";
  public SetEncapsMode: string = "default";
  
  // THIS FUNCTION CHECKS IF EVERYTHING IS OAKY AND SHOWS THE SHELL WINDOW
  public createShellPrompt() {
    // FIRST, WE NEED TO MAKE SURE THAT ALL REQUIRED FIELDS ARE GIVEN!
    let ValidForm: boolean = true;  // LOCAL VAR TO CHECK IF EVERYTHING IS OKAY
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let CompName = document.getElementById('ComponentName');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( CompName ) { CompName.className = 'FormInput FontFormInput'; }
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let CSSstyle = document.getElementById('UseCSSstyleID');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( CSSstyle ) { CSSstyle.className = 'FormSelect FontFormInput'; }
    
    // THE COMPONENT NAME IS TOO SHORT (LESS/OR 3)
    if( this.ComponentName.length <=3 ) {
      ValidForm = false;
      if( CompName ) { CompName.className = 'FormInputError FontFormInput'; }
    }

    // NO CSS STYLE SELECTED
    if( this.UseCSSstyleID.toLowerCase() == "empty" ) {
      ValidForm = false;
      if( CSSstyle ) { CSSstyle.className = 'FormSelectError FontFormInput'; }
    }

    // TIME FOR THE FINAL CHECK
    if( ValidForm == true ) {
      // TIME TO CREATE THE CMD STRING
      this.AngularCLIcmd = "ng g c "+this.ComponentName+"";
      if( this.DetectModeCfg != "default" ) { this.AngularCLIcmd += " --change-detection "+this.DetectModeCfg.toLowerCase()+""; }
      if( this.UseShowBlock == true ) { this.AngularCLIcmd += " --display-block	"+this.UseShowBlock+""; }
      if( this.SetTopLvlCfg == true ) { this.AngularCLIcmd += " --flat "+this.SetTopLvlCfg+""; }
      if( this.UseInlineCSS == true ) { this.AngularCLIcmd += " --inline-style "+this.UseInlineCSS+""; }
      if( this.UseInlineHTM == true ) { this.AngularCLIcmd += " --inline-template "+this.UseInlineHTM+""; }
      if( this.ComponentPref.length >= 3 ) { this.AngularCLIcmd += " --prefix "+this.ComponentPref+""; }
      if( this.ProjectNameID.length >= 3 ) { this.AngularCLIcmd += " --project "+this.ProjectNameID+""; }
      if( this.UseSkipImprt == true ) { this.AngularCLIcmd += " --skip-import "+this.UseSkipImprt+""; }
      if( this.UseSelectTag == true ) { this.AngularCLIcmd += " --skip-selector "+this.UseSelectTag+""; }
      //if( this.UseSpecTScfg == true ) { this.AngularCLIcmd += " --skip-tests "+this.UseSpecTScfg+""; }
      this.AngularCLIcmd += " --skip-tests "+this.UseSpecTScfg+"";
      this.AngularCLIcmd += " --standalone "+this.SingleAPIapp+"";
      this.AngularCLIcmd += " --style "+this.UseCSSstyleID.toLowerCase()+"";
      if( this.SetNewFileTyp.length >= 3 ) { this.AngularCLIcmd += " --type "+this.SetNewFileTyp+""; }
      if( this.SetEncapsMode != "default" ) { this.AngularCLIcmd += " --view-encapsulation "+this.SetEncapsMode+""; }

      this.ShowShellWin = true; // SHOW THE CONSOLE
    } else { this.ShowShellWin = false; }
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
