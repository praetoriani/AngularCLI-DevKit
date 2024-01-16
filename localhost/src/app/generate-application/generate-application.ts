/* generate-application.ts */

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
  selector: 'package-generate-application',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, AppUIcomponentHeader, NgIconComponent],
  providers: [provideIcons({ faSolidCode,faSolidGears,faSolidMessage,faSolidFileCode,faSolidClipboardList })],
  templateUrl: './generate-application.html',
  styleUrls: ['./generate-application.scss']
})

export class GenerateApplicationPackage {
  // THIS VAR STORES THE WHOLE SHELL COMMAND (WHICH WILL BE GENERATED LATER)
  public AngularCLIcmd: string = "";

  // THIS VAR SETS THE VISIBILITY STATE OF THE SHELL-WINDOW
  public ShowShellWin: boolean = false;

// WE NEED A BUNCH OF VARS/FUNCTIONS TO HANDLE ALL THOSE TOGGLES/SWITCHES INSIDE OUR FORM
  public UseInlineCSS: boolean = false;
  toggleInlineCSS() { this.UseInlineCSS = !this.UseInlineCSS; }
  public UseInlineHTM: boolean = false;
  toggleInlineHTM() { this.UseInlineHTM = !this.UseInlineHTM; }
  public UseMiniAppWS: boolean = false;
  toggleMiniAppWS() { this.UseMiniAppWS = !this.UseMiniAppWS; }
  public UseRouterMod: boolean = true;
  toggleRouterMod() { this.UseRouterMod = !this.UseRouterMod; }
  public UseDependCfg: boolean = false;
  toggleDependCfg() { this.UseDependCfg = !this.UseDependCfg; }
  public UseJsonFiles: boolean = false;
  toggleJsonFiles() { this.UseJsonFiles = !this.UseJsonFiles; }
  public UseSpecTScfg: boolean = false;
  toggleSpecTScfg() { this.UseSpecTScfg = !this.UseSpecTScfg; }
  public SingleAPIapp: boolean = false;
  toggleSingleAPI() { this.SingleAPIapp = !this.SingleAPIapp; }
  public UseStrictApp: boolean = true;
  toggleStrictApp() { this.UseStrictApp = !this.UseStrictApp; }

  // FOLLOWING VARS ARE BIND TO THE INPUT-FIELDS OF OUR FORM
  public UseNewApplName: string = "";
  public UseNewPrefixID: string = "";
  public UseNewProjRoot: string = "";
  public UseCSSstyleTyp: string = "empty";
  public EncapsModeConf: string = "default";

  // THIS FUNCTION CHECKS IF EVERYTHING IS OAKY AND SHOWS THE SHELL WINDOW
  public createShellPrompt() {
    // FIRST, WE NEED TO MAKE SURE THAT ALL REQUIRED FIELDS ARE GIVEN!
    let ValidForm: boolean = true;  // LOCAL VAR TO CHECK IF EVERYTHING IS OKAY
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let ApplName = document.getElementById('UseNewApplName');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( ApplName ) { ApplName.className = 'FormInput FontFormInput'; }
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let CSStype = document.getElementById('UseCSSstyleTyp');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( CSStype ) { CSStype.className = 'FormSelect FontFormInput'; }
    
    // THE APP-NAMNE IS TOO SHORT
    if( this.UseNewApplName.length <=3 ) {
      ValidForm = false;
      if( ApplName ) { ApplName.className = 'FormInputError FontFormInput'; }
    }
    
    // NO CSS STYLE SELECTED
    if( this.UseCSSstyleTyp.toLowerCase() == "empty" ) {
      ValidForm = false;
      if( CSStype ) { CSStype.className = 'FormSelectError FontFormInput'; }
    }

    //FINAL CHECK
    if( ValidForm == true) {
      // TIME TO GENERATE THE SHELL COMMAND
      this.AngularCLIcmd = "ng generate app "+this.UseNewApplName+"";
      if( this.UseInlineCSS == true ) { this.AngularCLIcmd += " --inline-style "+this.UseInlineCSS+""; }
      if( this.UseInlineHTM == true ) { this.AngularCLIcmd += " --inline-template "+this.UseInlineHTM+""; }
      if( this.UseMiniAppWS == true ) { this.AngularCLIcmd += " --minimal "+this.UseMiniAppWS+""; }
      if( this.UseNewPrefixID.length >=3 ) { this.AngularCLIcmd += " --prefix "+this.UseNewPrefixID.toLowerCase()+""; }
      if( this.UseNewProjRoot.length >=3 ) { this.AngularCLIcmd += " --project-root "+this.UseNewProjRoot.toLowerCase()+""; }
      this.AngularCLIcmd += " --routing "+this.UseRouterMod+"";
      if( this.UseDependCfg == true ) { this.AngularCLIcmd += " --skip-install "+this.UseDependCfg+""; }
      if( this.UseJsonFiles == true ) { this.AngularCLIcmd += " --skip-package-json "+this.UseJsonFiles+""; }
      if( this.UseSpecTScfg == true ) { this.AngularCLIcmd += " --skip-tests "+this.UseSpecTScfg+""; }
      this.AngularCLIcmd += " --standalone "+this.SingleAPIapp+"";
      //if( this.UseStrictApp == false ) { this.AngularCLIcmd += " --strict "+this.UseStrictApp+""; }
      this.AngularCLIcmd += " --strict "+this.UseStrictApp+"";
      this.AngularCLIcmd += " --style "+this.UseCSSstyleTyp.toLowerCase()+"";
      if( this.EncapsModeConf.toLowerCase() != "default" ) { this.AngularCLIcmd += " --view-encapsulation "+this.EncapsModeConf.toLowerCase()+""; }

      this.ShowShellWin = true;   // SHOW THE SHELL
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
