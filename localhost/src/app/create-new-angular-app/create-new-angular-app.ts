/* create-new-angular-app.ts */

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
  selector: 'package-create-new-angular-app',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, AppUIcomponentHeader, NgIconComponent],
  providers: [provideIcons({ faSolidCode,faSolidGears,faSolidMessage,faSolidFileCode,faSolidClipboardList })],
  templateUrl: './create-new-angular-app.html',
  styleUrls: ['./create-new-angular-app.scss']
})

export class CreateNewAngularAppPackage {
  // THIS VAR STORES THE WHOLE SHELL COMMAND (WHICH WILL BE GENERATED LATER)
  public AngularCLIcmd: string = "";

  // THIS VAR SETS THE VISIBILITY STATE OF THE SHELL-WINDOW
  public ShowShellWin: boolean = false;

// WE NEED A BUNCH OF VARS/FUNCTIONS TO HANDLE ALL THOSE TOGGLES/SWITCHES INSIDE OUR FORM
  public GitHubSwitch: boolean = true;
  toggleGitHub() { this.GitHubSwitch = !this.GitHubSwitch; }
  public GitRepSwitch: boolean = false;
  toggleGitRep() { this.GitRepSwitch = !this.GitRepSwitch; }
  public NewAppSwitch: boolean = true;
  toggleNewApp() { this.NewAppSwitch = !this.NewAppSwitch; }
  public PromptSwitch: boolean = false;
  togglePrompt() { this.PromptSwitch = !this.PromptSwitch; }
  public DryRunSwitch: boolean = false;
  toggleDryRun() { this.DryRunSwitch = !this.DryRunSwitch; }
  public ForcedSwitch: boolean = false;
  toggleForced() { this.ForcedSwitch = !this.ForcedSwitch; }
  public UseInlineCSS: boolean = false;
  toggleInlineCSS() { this.UseInlineCSS = !this.UseInlineCSS; }
  public UseInlineHTM: boolean = false;
  toggleInlineHTM() { this.UseInlineHTM = !this.UseInlineHTM; }
  public intactPrompt: boolean = true;
  toggleIntActCMD() { this.intactPrompt = !this.intactPrompt; }
  public UseMinimumWS: boolean = false;
  toggleMinimumWS() { this.UseMinimumWS = !this.UseMinimumWS; }
  public UseRouterMod: boolean = true;
  toggleRouterMod() { this.UseRouterMod = !this.UseRouterMod; }
  public UseDependCfg: boolean = false;
  toggleDependCfg() { this.UseDependCfg = !this.UseDependCfg; }
  public UseSpecTScfg: boolean = false;
  toggleSpecTScfg() { this.UseSpecTScfg = !this.UseSpecTScfg; }
  public SingleAPIapp: boolean = false;
  toggleSingleAPI() { this.SingleAPIapp = !this.SingleAPIapp; }
  public UseStrictApp: boolean = true;
  toggleStrictApp() { this.UseStrictApp = !this.UseStrictApp; }

  // FOLLOWING VARS ARE BIND TO THE INPUT-FIELDS OF OUR FORM
  public NewProjectName: string = "";
  public NewProjectRoot: string = "";
  public PackageManager: string = "empty";
  public NewProjectPref: string = "";
  public UseCSSstyleTyp: string = "empty";
  public UsedEncapsMode: string = "default";

  // THIS FUNCTION CHECKS IF EVERYTHING IS OAKY AND SHOWS THE SHELL WINDOW
  public createShellPrompt() {
    // FIRST, WE NEED TO MAKE SURE THAT ALL REQUIRED FIELDS ARE GIVEN!
    let ValidForm: boolean = true;  // LOCAL VAR TO CHECK IF EVERYTHING IS OKAY
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let ProjName = document.getElementById('NewProjectName');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( ProjName ) { ProjName.className = 'FormInput FontFormInput'; }
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let PackMgr = document.getElementById('PackageManager');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( PackMgr ) { PackMgr.className = 'FormSelect FontFormInput'; }
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let StyleType = document.getElementById('UseCSSstyleTyp');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( StyleType ) { StyleType.className = 'FormSelect FontFormInput'; }
    
    // THE PROJECT NAME IS LESS THAN 3 CHARS!!
    if( this.NewProjectName.length <=3 ) {
      ValidForm = false;
      if( ProjName ) { ProjName.className = 'FormInputError FontFormInput'; }
    }
    // NO PACKAGE MANAGER SELECTED
    if( this.PackageManager.toLowerCase() == "empty") {
      ValidForm = false;
      if( PackMgr ) { PackMgr.className = 'FormSelectError FontFormInput'; }
    }
    // NO STYLE SELECTED
    if( this.UseCSSstyleTyp.toLowerCase() == "empty") {
      ValidForm = false;
      if( StyleType ) { StyleType.className = 'FormSelectError FontFormInput'; }
    }

    //FINAL CHECK
    if( ValidForm == true) {
      // TIME TO CREATE THE CMD-STRING
      /* FOLLOWING CODE JUST SHOWS THE FULL VERSION!! 
      this.AngularCLIcmd = "ng new "+this.NewProjectName+" --commit "+this.GitHubSwitch+" --skip-git "+this.GitRepSwitch+
      " --create-application "+this.NewAppSwitch+" --defaults "+this.PromptSwitch+" --dry-run "+this.DryRunSwitch+" --force	"+this.ForcedSwitch+
      " --inline-style "+this.UseInlineCSS+" --inline-template "+this.UseInlineHTM+" --interactive "+this.intactPrompt+" --minimal	"+this.UseMinimumWS+
      " --new-project-root "+this.NewProjectRoot+" --package-manager "+this.PackageManager+" --prefix "+this.NewProjectPref+" --routing	"+this.UseRouterMod+
      " --skip-install "+this.UseDependCfg+" --skip-tests "+this.UseSpecTScfg+" --standalone "+this.SingleAPIapp+" --strict	"+this.UseStrictApp+
      " --style "+this.UseCSSstyleTyp+" --view-encapsulation "+this.UsedEncapsMode+"";
      */
      this.AngularCLIcmd = "ng new "+this.NewProjectName+"";
      if( this.GitHubSwitch == false ) { this.AngularCLIcmd += " --commit "+this.GitHubSwitch+""; }
      if( this.GitRepSwitch == true ) { this.AngularCLIcmd += " --skip-git "+this.GitRepSwitch+""; }
      if( this.NewAppSwitch == false ) { this.AngularCLIcmd += " --create-application "+this.NewAppSwitch+""; }
      if( this.PromptSwitch == true ) { this.AngularCLIcmd += " --defaults "+this.PromptSwitch+""; }
      if( this.DryRunSwitch == true ) { this.AngularCLIcmd += " --dry-run "+this.DryRunSwitch+""; }
      if( this.ForcedSwitch == true ) { this.AngularCLIcmd += " --force "+this.ForcedSwitch+""; }
      if( this.UseInlineCSS == true ) { this.AngularCLIcmd += " --inline-style "+this.UseInlineCSS+""; }
      if( this.UseInlineHTM == true ) { this.AngularCLIcmd += " --inline-template "+this.UseInlineHTM+""; }
      if( this.intactPrompt == false ) { this.AngularCLIcmd += " --interactive "+this.intactPrompt+""; }
      if( this.UseMinimumWS == true ) { this.AngularCLIcmd += " --minimal "+this.UseMinimumWS+""; }
      if( this.NewProjectRoot.length >= 3 ) { this.AngularCLIcmd += " --new-project-root "+this.NewProjectRoot+""; }
      this.AngularCLIcmd += " --package-manager "+this.PackageManager.toLowerCase()+"";
      if( this.NewProjectPref.length >= 3 ) { this.AngularCLIcmd += " --prefix "+this.NewProjectPref+""; }
      this.AngularCLIcmd += " --routing "+this.UseRouterMod+"";
      if( this.UseDependCfg == true ) { this.AngularCLIcmd += " --skip-install "+this.UseDependCfg+""; }
      if( this.UseSpecTScfg == true ) { this.AngularCLIcmd += " --skip-tests "+this.UseSpecTScfg+""; }
      this.AngularCLIcmd += " --standalone "+this.SingleAPIapp+"";
      this.AngularCLIcmd += " --strict "+this.UseStrictApp+"";
      this.AngularCLIcmd += " --style "+this.UseCSSstyleTyp.toLowerCase()+"";
      if( this.UsedEncapsMode != "default" ) { this.AngularCLIcmd += " --view-encapsulation "+this.UsedEncapsMode+""; }

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