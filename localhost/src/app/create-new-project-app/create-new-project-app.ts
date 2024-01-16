/* create-new-project-app.ts */

// IMPORT SOME BASIC ANGULAR MODULES (SecurityContext and DomSanitizer are important to handle the correct output of our dynamic html code)
import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// WE NEED ANGULAR FORMS
import { FormsModule } from '@angular/forms';
// DUE TO THIS IS A STANDALONE COMPONENT, WE NEED TO IMPORT THOSE ROUTER MODULES
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// IMPORT NG-ICON MODULE
import { NgIconComponent, provideIcons } from '@ng-icons/core';
// IMPORT SOME ICONS FROM THE MODULE
import { faSolidCode,faSolidFileCode,faSolidClipboardList,faSolidLightbulb,faSolidListCheck,faSolidTriangleExclamation,faSolidSquarePen,faSolidGrip,faSolidFloppyDisk,faSolidTrash } from '@ng-icons/font-awesome/solid';
import { faBrandAngular,faBrandNpm,faBrandNode } from '@ng-icons/font-awesome/brands';
import { faSquarePlus } from '@ng-icons/font-awesome/regular';
import { matfAngularColored,matfAngularComponentColored,matfAngularServiceColored } from '@ng-icons/material-file-icons/colored';

// IMPORT THE HEADER
import { AppUIcomponentHeader } from '../app-ui-header/app-ui-header.component';
import { skip } from 'rxjs';


@Component({
  selector: 'package-create-new-project-app',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, AppUIcomponentHeader, NgIconComponent],
  providers: [provideIcons({ faSolidCode,faSolidFileCode,faSolidClipboardList,faSolidLightbulb,faSolidListCheck,faSolidTriangleExclamation,faSolidFloppyDisk,faSolidTrash,
  faSolidSquarePen,faSolidGrip,matfAngularColored,matfAngularComponentColored,matfAngularServiceColored,faBrandAngular,faBrandNpm,faBrandNode,faSquarePlus
  })],
  templateUrl: './create-new-project-app.html',
  styleUrls: ['./create-new-project-app.scss']
})

/*
THIS COMPONENT IS THE MASTER PIECE OF THE ANGULAR CLI DEVKIT, CAUSE IT PROVIDES AN ASSISTANT WHICH GUIDES THE USER
THROUGH THE WHOLE DAMN PROCESS TO CREATE A FULL ANGULAR WORKSPACE WITH AN INITIAL APP IN IT, WITH (OPTIONAL) ADDITIONAL
COMPONENTS, SERVICES, AND ALSO ADDITIONAL NPM MODULES. THE USER CAN CONFIGURE THE WHOLE PROJECT WITH THIS ONE PAGE.

TO REALIZE THAT ASSISTANT, WE NEED TO PREPARE A LOT OF THINGS IN THIS FILE, TO GET A WORKING ASSISTANT ON THE PAGE.
*/
export class CreateNewProjectAppPackage implements OnInit {
  
  /*########################################################################################################*/
  /* FOLLOWING CODE SECTION IS THE GENERAL CODE FOR THE WHOLE PAGE */
  /* ############################################################# */

  ngOnInit() { // THIS FUNCTION WILL BE FIRED, WHEN THE PAGE WILL BE CALLED
    
    // WE'RE GOING TO ADD SOME CONTENT TO OUR WORKSPACE ... FPR TESTING PURPOSE
    /*
    this.CreateAction( this.StepCount, "New Workspace created successfully", "ng new test-project --style scss", "Create Workspace");
    this.CreateAction( this.StepCount, "Component was added successfully to workspace", "ng g c my-component", "Add Component");
    this.CreateAction( this.StepCount, "Service was added successfully to workspace", "ng g s app-data-service", "Add Serive");
    */
    // SET THE VIEW MODE TO 'LANDINGPAGE' WHEN LOADING THE PAGE
    this.ViewMode = this.PageRoute.Landingpage;
  }

  // OBJECT THAT DEFINES OUR OWN "PAGE-ROUTES" ;)
  public PageRoute = {
    Landingpage: "MainPage",        // THE "LANDINGPAGE"
    ProjOptions: "Overview",        // WILL BE SHOWN BETWEEN EACH STEP
    AddCompMode: "AddNewComp",      // PAGE: "ADD COMPONENT"
    AddServMode: "AddNewServ",      // PAGE: "ADD SERVICE"
    AddApplMode: "AddNewAppl",      // PAGE: "ADD APPLICATION"
    AddNPMpacks: "AddNPMpacks",     // PAGE: "ADD NPM MODULES"
    EditProject: "EditProject",     // PAGE: "EDIT PROJECT DETAILS"
    RunCreation: "MakeProject",     // PAGE: "CREATE SCRIPT"
  }

  // THIS VAR SETS THE CURRENT VIEW OF THE PAGE
  public ViewMode: Object = "";
  // THIS VAR STORES THE CURRENT STEP COUNT (1st STEP IS ALWAYS: CREATING A NEW WORKSPACE ;) 
  public StepCount: number = 1;
  // THIS VAR IS NEEDED TO HANDLE THE DISPLAY-MODE OF THE VERSION HISTORY
  public ViewActionHistory: boolean = false;
  
  // THIS IS OUR GLOBAL ARRAY, WHICH STORES ALL THE CHANGES, MADE BY THE USER
  // WE WILL USE THIS ARRAY TO STORE ALL IMPORTANT INFORMATIONS FROM EACH SINGLE STEP
  // THE ARRAY HAS FOLLOWING STRUCTURE IN EACH LINE: [ STEP NO (NUMBER) , ACTION TITLE (STRING) , SHELL CMD (STRING) , ACTION ID (STRING) ]
  public VersionHistory: (number | string)[][] = [ ];
  /* SAMPLE
  addstuff() { this.VersionHistory.push([1, "New Workspace was created successfully", "ng new ...", "Workspace created"]); }
  */
  
  // FOLLOWING ARRAY WILL STORE ALL THE NPM-COMMANDS
  public NPMpackages: (string)[] = [ ];
  

  // THIS VAR WILL STORE THE HTML-CODE FOR THE VERSION HISTORY
  public VerHistoryCode: any = "";
  // THIS VAR STORES THE PROJECT DORECTORY (WHICH IS ACTUALLY THE NAME OF THE NEW WORKSPACE INSIDE THE CURRENT WORKING DIRECTORY)
  // WE NEED THIS VAR SO WE CAN HOP INTO THAT DIRECTORY TO INSTALL ADDITIONAL COMPONENTS, SERVICE, ...
  public ProjectDirectory: string = "";

  // THIS FUNCTION WILL BE CALLED ANY TIME THE USER FINISHES A "STEP". IT ADDS THE SETTINGS TO THE GLOBAL STORAGE ARRAY
  public CreateAction( StepNumber: number, StepTitle: string, StepText: string, StepID: string) {
    // STORE THE INFORMATIONS INSIDE THE 'VERSION HISTORY'
    this.VersionHistory.push([ StepNumber , StepTitle , StepText, StepID ]);
    // ADD 1 TO THE COUNTER
    this.StepCount += 1;
    // SWITCH TO THE 'OVERVIEW'
    this.ViewMode = this.PageRoute.ProjOptions;
  }
  // THIS FUNCTION DELETES A SPECIFIC ENTRY FROM OUR 'VersionHistory' ARRAY
  public DeleteAction( EntryID: any ) {
    EntryID = Number(EntryID);
    // FIND THE ENTRY WHICH HAS 'EntryID' AS FIRST VALUE IN LINE
    const index = this.VersionHistory.findIndex((entry) => entry[0] === EntryID);

    // CHECK IF WE HAVE A MATCH
    if (index !== -1) {
      // CHECK IF IT IS THE FIRST ENTRY
      if( this.VersionHistory[index][0] == 1) { alert("You cannot delete the main workspace."); }
      else {
        // WE CAN DELETE THE ENTRY
        this.VersionHistory.splice(index, 1);
      }
    }
  }

  // SIMPLE FUNCTION TO SWITCH THE PAGE-VIEW. RETURN VAL? MIGHT BE USEFUL :)
  public SetPageView( PageID: string): string {
    let OldPageID = this.ViewMode;    // CATCH THE OLD PAGE
    let NewPageID = PageID;           // CATCH THE PARAM
    this.ViewMode = NewPageID;        // SET THE NEW PAGE
    return String(OldPageID);         // RETURN THE OLD PAGE
  }

  // FOLLOWING FUNCTION IS CALLED BY THE 'FLYING DOT'. IT CREATES THE INNER HTML FOR THE VERSION HISTORY AND SHOWS IT
  public HandleVersionHistory() {
    let UnsafeCode: string = "";
    // CHECK THE CURRENT STATE AND CHANGE IT
    if( this.ViewActionHistory == true ) { this.ViewActionHistory = false; }
    else { this.ViewActionHistory = true; }
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

  /*########################################################################################################*/
  /* FOLLOWING CODE SECTION IS THE PAGE 'CREATE NEW ANGULAR WORKSPACE' */
  /* ################################################################# */

  // THIS VAR STORES THE WHOLE SHELL COMMAND (WHICH WILL BE GENERATED LATER)
  public AppWSAngularCLIcmd: string = "";

  // FOLLOWING CODE IS FOR ALL THE TOGGLES/SWITCHES FOR 'MainPage'
  public AppWSGitHubSwitch: boolean = true;
  AppWStoggleGitHub() { this.AppWSGitHubSwitch = !this.AppWSGitHubSwitch; }
  public AppWSGitRepSwitch: boolean = false;
  AppWStoggleGitRep() { this.AppWSGitRepSwitch = !this.AppWSGitRepSwitch; }
  public AppWSNewAppSwitch: boolean = true;
  AppWStoggleNewApp() { this.AppWSNewAppSwitch = !this.AppWSNewAppSwitch; }
  public AppWSPromptSwitch: boolean = false;
  AppWStogglePrompt() { this.AppWSPromptSwitch = !this.AppWSPromptSwitch; }
  public AppWSDryRunSwitch: boolean = false;
  AppWStoggleDryRun() { this.AppWSDryRunSwitch = !this.AppWSDryRunSwitch; }
  public AppWSForcedSwitch: boolean = false;
  AppWStoggleForced() { this.AppWSForcedSwitch = !this.AppWSForcedSwitch; }
  public AppWSUseInlineCSS: boolean = false;
  AppWStoggleInlineCSS() { this.AppWSUseInlineCSS = !this.AppWSUseInlineCSS; }
  public AppWSUseInlineHTM: boolean = false;
  AppWStoggleInlineHTM() { this.AppWSUseInlineHTM = !this.AppWSUseInlineHTM; }
  public AppWSintactPrompt: boolean = true;
  AppWStoggleIntActCMD() { this.AppWSintactPrompt = !this.AppWSintactPrompt; }
  public AppWSUseMinimumWS: boolean = false;
  AppWStoggleMinimumWS() { this.AppWSUseMinimumWS = !this.AppWSUseMinimumWS; }
  public AppWSUseRouterMod: boolean = true;
  AppWStoggleRouterMod() { this.AppWSUseRouterMod = !this.AppWSUseRouterMod; }
  public AppWSUseDependCfg: boolean = false;
  AppWStoggleDependCfg() { this.AppWSUseDependCfg = !this.AppWSUseDependCfg; }
  public AppWSUseSpecTScfg: boolean = false;
  AppWStoggleSpecTScfg() { this.AppWSUseSpecTScfg = !this.AppWSUseSpecTScfg; }
  public AppWSSingleAPIapp: boolean = false;
  AppWStoggleSingleAPI() { this.AppWSSingleAPIapp = !this.AppWSSingleAPIapp; }
  public AppWSUseStrictApp: boolean = true;
  AppWStoggleStrictApp() { this.AppWSUseStrictApp = !this.AppWSUseStrictApp; }

  // FOLLOWING VARS ARE BIND TO THE INPUT-FIELDS OF OUR FORM
  public AppWSNewProjectName: string = "";
  public AppWSNewProjectRoot: string = "";
  public AppWSPackageManager: string = "empty";
  public AppWSNewProjectPref: string = "";
  public AppWSUseCSSstyleTyp: string = "empty";
  public AppWSUsedEncapsMode: string = "default";

  public ValidateFormNewWorkspace() {
    // FIRST, WE NEED TO MAKE SURE THAT ALL REQUIRED FIELDS ARE GIVEN!
    let ValidForm: boolean = true;  // LOCAL VAR TO CHECK IF EVERYTHING IS OKAY
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let ProjName = document.getElementById('AppWSNewProjectName');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( ProjName ) { ProjName.className = 'FormInput FontFormInput'; }
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let PackMgr = document.getElementById('AppWSPackageManager');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( PackMgr ) { PackMgr.className = 'FormSelect FontFormInput'; }
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let StyleType = document.getElementById('AppWSUseCSSstyleTyp');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( StyleType ) { StyleType.className = 'FormSelect FontFormInput'; }
    
    // THE PROJECT NAME IS LESS THAN 3 CHARS!!
    if( this.AppWSNewProjectName.length <=3 ) {
      ValidForm = false;
      if( ProjName ) { ProjName.className = 'FormInputError FontFormInput'; }
    }
    // NO PACKAGE MANAGER SELECTED
    if( this.AppWSPackageManager.toLowerCase() == "empty") {
      ValidForm = false;
      if( PackMgr ) { PackMgr.className = 'FormSelectError FontFormInput'; }
    }
    // NO STYLE SELECTED
    if( this.AppWSUseCSSstyleTyp.toLowerCase() == "empty") {
      ValidForm = false;
      if( StyleType ) { StyleType.className = 'FormSelectError FontFormInput'; }
    }
    //FINAL CHECK
    if( ValidForm == true) {
      // TIME TO CREATE THE CMD-STRING
      this.AppWSAngularCLIcmd = "ng new "+this.AppWSNewProjectName+"";
      if( this.AppWSGitHubSwitch == false ) { this.AppWSAngularCLIcmd += " --commit "+this.AppWSGitHubSwitch+""; }
      if( this.AppWSGitRepSwitch == true ) { this.AppWSAngularCLIcmd += " --skip-git "+this.AppWSGitRepSwitch+""; }
      if( this.AppWSNewAppSwitch == false ) { this.AppWSAngularCLIcmd += " --create-application "+this.AppWSNewAppSwitch+""; }
      if( this.AppWSPromptSwitch == true ) { this.AppWSAngularCLIcmd += " --defaults "+this.AppWSPromptSwitch+""; }
      if( this.AppWSDryRunSwitch == true ) { this.AppWSAngularCLIcmd += " --dry-run "+this.AppWSDryRunSwitch+""; }
      if( this.AppWSForcedSwitch == true ) { this.AppWSAngularCLIcmd += " --force "+this.AppWSForcedSwitch+""; }
      if( this.AppWSUseInlineCSS == true ) { this.AppWSAngularCLIcmd += " --inline-style "+this.AppWSUseInlineCSS+""; }
      if( this.AppWSUseInlineHTM == true ) { this.AppWSAngularCLIcmd += " --inline-template "+this.AppWSUseInlineHTM+""; }
      if( this.AppWSintactPrompt == false ) { this.AppWSAngularCLIcmd += " --interactive "+this.AppWSintactPrompt+""; }
      if( this.AppWSUseMinimumWS == true ) { this.AppWSAngularCLIcmd += " --minimal "+this.AppWSUseMinimumWS+""; }
      if( this.AppWSNewProjectRoot.length >= 3 ) { this.AppWSAngularCLIcmd += " --new-project-root "+this.AppWSNewProjectRoot+""; }
      this.AppWSAngularCLIcmd += " --package-manager "+this.AppWSPackageManager.toLowerCase()+"";
      if( this.AppWSNewProjectPref.length >= 3 ) { this.AppWSAngularCLIcmd += " --prefix "+this.AppWSNewProjectPref+""; }
      this.AppWSAngularCLIcmd += " --routing "+this.AppWSUseRouterMod+"";
      if( this.AppWSUseDependCfg == true ) { this.AppWSAngularCLIcmd += " --skip-install "+this.AppWSUseDependCfg+""; }
      if( this.AppWSUseSpecTScfg == true ) { this.AppWSAngularCLIcmd += " --skip-tests "+this.AppWSUseSpecTScfg+""; }
      this.AppWSAngularCLIcmd += " --standalone "+this.AppWSSingleAPIapp+"";
      this.AppWSAngularCLIcmd += " --strict "+this.AppWSUseStrictApp+"";
      this.AppWSAngularCLIcmd += " --style "+this.AppWSUseCSSstyleTyp.toLowerCase()+"";
      if( this.AppWSUsedEncapsMode != "default" ) { this.AppWSAngularCLIcmd += " --view-encapsulation "+this.AppWSUsedEncapsMode+""; }
      // STORE THE STEP IN THE VERSION HISTORY
      this.CreateAction( this.StepCount, "New Angular Workspace \""+this.AppWSNewProjectName+"\" created", String(this.AppWSAngularCLIcmd), "Create Workspace");
      // WE NEED TO STORE THE NAME OF THE WORKSPACE
      this.ProjectDirectory = this.AppWSNewProjectName;
    } //else { this.ShowShellWin = false; }

  }


  /*########################################################################################################*/
  /* FOLLOWING CODE SECTION IS FOR THE PAGE 'ADD APPLICATION' */
  /* ######################################################## */

  // THIS VAR STORES THE WHOLE SHELL COMMAND (WHICH WILL BE GENERATED LATER)
  public NewApplAngularCLIcmd: string = "";

// WE NEED A BUNCH OF VARS/FUNCTIONS TO HANDLE ALL THOSE TOGGLES/SWITCHES INSIDE OUR FORM
  public NewApplUseInlineCSS: boolean = false;
  NewAppltoggleInlineCSS() { this.NewApplUseInlineCSS = !this.NewApplUseInlineCSS; }
  public NewApplUseInlineHTM: boolean = false;
  NewAppltoggleInlineHTM() { this.NewApplUseInlineHTM = !this.NewApplUseInlineHTM; }
  public NewApplUseMiniAppWS: boolean = false;
  NewAppltoggleMiniAppWS() { this.NewApplUseMiniAppWS = !this.NewApplUseMiniAppWS; }
  public NewApplUseRouterMod: boolean = true;
  NewAppltoggleRouterMod() { this.NewApplUseRouterMod = !this.NewApplUseRouterMod; }
  public NewApplUseDependCfg: boolean = false;
  NewAppltoggleDependCfg() { this.NewApplUseDependCfg = !this.NewApplUseDependCfg; }
  public NewApplUseJsonFiles: boolean = false;
  NewAppltoggleJsonFiles() { this.NewApplUseJsonFiles = !this.NewApplUseJsonFiles; }
  public NewApplUseSpecTScfg: boolean = false;
  NewAppltoggleSpecTScfg() { this.NewApplUseSpecTScfg = !this.NewApplUseSpecTScfg; }
  public NewApplSingleAPIapp: boolean = false;
  NewAppltoggleSingleAPI() { this.NewApplSingleAPIapp = !this.NewApplSingleAPIapp; }
  public NewApplUseStrictApp: boolean = true;
  NewAppltoggleStrictApp() { this.NewApplUseStrictApp = !this.NewApplUseStrictApp; }

  // FOLLOWING VARS ARE BIND TO THE INPUT-FIELDS OF OUR FORM
  public NewApplNameID: string = "";
  public NewApplPrefixID: string = "";
  public NewApplProjRoot: string = "";
  public NewApplCSStype: string = "empty";
  public NewApplEncapsMode: string = "default";

  // THIS FUNCTION CHECKS IF EVERYTHING IS OAKY AND SHOWS THE SHELL WINDOW
  public ValidateFormAddApplication() {
    // FIRST, WE NEED TO MAKE SURE THAT ALL REQUIRED FIELDS ARE GIVEN!
    let ValidForm: boolean = true;  // LOCAL VAR TO CHECK IF EVERYTHING IS OKAY
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let ApplName = document.getElementById('NewApplNameID');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( ApplName ) { ApplName.className = 'FormInput FontFormInput'; }
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let CSStype = document.getElementById('NewApplCSStype');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( CSStype ) { CSStype.className = 'FormSelect FontFormInput'; }
    
    // THE APP-NAMNE IS TOO SHORT
    if( this.NewApplNameID.length <=3 ) {
      ValidForm = false;
      if( ApplName ) { ApplName.className = 'FormInputError FontFormInput'; }
    }
    
    // NO CSS STYLE SELECTED
    if( this.NewApplCSStype.toLowerCase() == "empty" ) {
      ValidForm = false;
      if( CSStype ) { CSStype.className = 'FormSelectError FontFormInput'; }
    }

    //FINAL CHECK
    if( ValidForm == true) {
      // TIME TO GENERATE THE SHELL COMMAND
      this.NewApplAngularCLIcmd = "ng generate app "+this.NewApplNameID+"";
      if( this.NewApplUseInlineCSS == true ) { this.NewApplAngularCLIcmd += " --inline-style "+this.NewApplUseInlineCSS+""; }
      if( this.NewApplUseInlineHTM == true ) { this.NewApplAngularCLIcmd += " --inline-template "+this.NewApplUseInlineHTM+""; }
      if( this.NewApplUseMiniAppWS == true ) { this.NewApplAngularCLIcmd += " --minimal "+this.NewApplUseMiniAppWS+""; }
      if( this.NewApplPrefixID.length >=3 ) { this.NewApplAngularCLIcmd += " --prefix "+this.NewApplPrefixID.toLowerCase()+""; }
      if( this.NewApplProjRoot.length >=3 ) { this.NewApplAngularCLIcmd += " --project-root "+this.NewApplProjRoot.toLowerCase()+""; }
      this.NewApplAngularCLIcmd += " --routing "+this.NewApplUseRouterMod+"";
      if( this.NewApplUseDependCfg == true ) { this.NewApplAngularCLIcmd += " --skip-install "+this.NewApplUseDependCfg+""; }
      if( this.NewApplUseJsonFiles == true ) { this.NewApplAngularCLIcmd += " --skip-package-json "+this.NewApplUseJsonFiles+""; }
      if( this.NewApplUseSpecTScfg == true ) { this.NewApplAngularCLIcmd += " --skip-tests "+this.NewApplUseSpecTScfg+""; }
      this.NewApplAngularCLIcmd += " --standalone "+this.NewApplSingleAPIapp+"";
      //if( this.NewApplUseStrictApp == false ) { this.NewApplAngularCLIcmd += " --strict "+this.NewApplUseStrictApp+""; }
      this.NewApplAngularCLIcmd += " --strict "+this.NewApplUseStrictApp+"";
      this.NewApplAngularCLIcmd += " --style "+this.NewApplCSStype.toLowerCase()+"";
      if( this.NewApplEncapsMode.toLowerCase() != "default" ) { this.NewApplAngularCLIcmd += " --view-encapsulation "+this.NewApplEncapsMode.toLowerCase()+""; }

      // STORE THE STEP IN THE VERSION HISTORY
      this.CreateAction( this.StepCount, "New Application \""+ this.NewApplNameID +"\" added", String(this.NewApplAngularCLIcmd), "Add Application");
      // RESET THE FORM
      this.NewApplUseInlineCSS = false;
      this.NewApplUseInlineHTM = false;
      this.NewApplUseMiniAppWS = false;
      this.NewApplUseRouterMod = true;
      this.NewApplUseDependCfg = false;
      this.NewApplUseJsonFiles = false;
      this.NewApplUseSpecTScfg = false;
      this.NewApplSingleAPIapp = false;
      this.NewApplUseStrictApp = true;
      this.NewApplNameID = "";
      this.NewApplPrefixID = "";
      this.NewApplProjRoot = "";
      this.NewApplCSStype = "empty";
      this.NewApplEncapsMode = "default";
    }
  }


  /*########################################################################################################*/
  /* FOLLOWING CODE SECTION IS THE PAGE 'ADD NEW COMPONENT' */
  /* ###################################################### */

  // THIS VAR STORES THE WHOLE SHELL COMMAND (WHICH WILL BE GENERATED LATER)
  public NewCompAngularCLIcmd: string = "";

  // WE NEED A BUNCH OF VARS/FUNCTIONS TO HANDLE ALL THOSE TOGGLES/SWITCHES INSIDE OUR FORM
  public NewCompUseShowBlock: boolean = false;
  NewComptoggleShowBlock() { this.NewCompUseShowBlock = !this.NewCompUseShowBlock; }
  public NewCompSetTopLvlCfg: boolean = false;
  NewComptoggleTopLvlCfg() { this.NewCompSetTopLvlCfg = !this.NewCompSetTopLvlCfg; }
  public NewCompUseInlineCSS: boolean = false;
  NewComptoggleInlineCSS() { this.NewCompUseInlineCSS = !this.NewCompUseInlineCSS; }
  public NewCompUseInlineHTM: boolean = false;
  NewComptoggleInlineHTM() { this.NewCompUseInlineHTM = !this.NewCompUseInlineHTM; }
  public NewCompUseSkipImprt: boolean = false;
  NewComptoggleSkipImprt() { this.NewCompUseSkipImprt = !this.NewCompUseSkipImprt; }
  public NewCompUseSelectTag: boolean = false;
  NewComptoggleSelectTag() { this.NewCompUseSelectTag = !this.NewCompUseSelectTag; }
  public NewCompUseSpecTScfg: boolean = false;
  NewComptoggleSpecTScfg() { this.NewCompUseSpecTScfg = !this.NewCompUseSpecTScfg; }
  public NewCompSingleAPIapp: boolean = false;
  NewComptoggleSingleAPI() { this.NewCompSingleAPIapp = !this.NewCompSingleAPIapp; }

  // FOLLOWING VARS ARE BIND TO THE INPUT-FIELDS OF OUR FORM
  public FieldNewCompName: string = "";
  public NewCompDetectModeCfg: string = "default";
  public NewComponentPref: string = "";
  public NewCompProjectNameID: string = "";
  public NewCompUseCSSstyleID: string = "empty";
  public NewCompSetNewFileTyp: string = "";
  public NewCompSetEncapsMode: string = "default";
  
  // THIS FUNCTION CHECKS IF EVERYTHING IS OAKY AND SHOWS THE SHELL WINDOW
  public ValidateFormNewComponent() {
    // FIRST, WE NEED TO MAKE SURE THAT ALL REQUIRED FIELDS ARE GIVEN!
    let ValidForm: boolean = true;  // LOCAL VAR TO CHECK IF EVERYTHING IS OKAY
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let CompName = document.getElementById('FieldNewCompName');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( CompName ) { CompName.className = 'FormInput FontFormInput'; }
    
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let CSSstyle = document.getElementById('NewCompUseCSSstyleID');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( CSSstyle ) { CSSstyle.className = 'FormSelect FontFormInput'; }
    
    // THE COMPONENT NAME IS TOO SHORT (LESS/OR 3)
    if( this.FieldNewCompName.length <=3 ) {
      ValidForm = false;
      if( CompName ) { CompName.className = 'FormInputError FontFormInput'; }
    }

    // NO CSS STYLE SELECTED
    if( this.NewCompUseCSSstyleID.toLowerCase() == "empty" ) {
      ValidForm = false;
      if( CSSstyle ) { CSSstyle.className = 'FormSelectError FontFormInput'; }
    }

    // TIME FOR THE FINAL CHECK
    if( ValidForm == true ) {
      // TIME TO CREATE THE CMD STRING
      this.NewCompAngularCLIcmd = "ng g c "+this.FieldNewCompName+"";
      if( this.NewCompDetectModeCfg != "default" ) { this.NewCompAngularCLIcmd += " --change-detection "+this.NewCompDetectModeCfg.toLowerCase()+""; }
      if( this.NewCompUseShowBlock == true ) { this.NewCompAngularCLIcmd += " --display-block	"+this.NewCompUseShowBlock+""; }
      if( this.NewCompSetTopLvlCfg == true ) { this.NewCompAngularCLIcmd += " --flat "+this.NewCompSetTopLvlCfg+""; }
      if( this.NewCompUseInlineCSS == true ) { this.NewCompAngularCLIcmd += " --inline-style "+this.NewCompUseInlineCSS+""; }
      if( this.NewCompUseInlineHTM == true ) { this.NewCompAngularCLIcmd += " --inline-template "+this.NewCompUseInlineHTM+""; }
      if( this.NewComponentPref.length >= 3 ) { this.NewCompAngularCLIcmd += " --prefix "+this.NewComponentPref+""; }
      if( this.NewCompProjectNameID.length >= 3 ) { this.NewCompAngularCLIcmd += " --project "+this.NewCompProjectNameID+""; }
      if( this.NewCompUseSkipImprt == true ) { this.NewCompAngularCLIcmd += " --skip-import "+this.NewCompUseSkipImprt+""; }
      if( this.NewCompUseSelectTag == true ) { this.NewCompAngularCLIcmd += " --skip-selector "+this.NewCompUseSelectTag+""; }
      //if( this.NewCompUseSpecTScfg == true ) { this.NewCompAngularCLIcmd += " --skip-tests "+this.NewCompUseSpecTScfg+""; }
      this.NewCompAngularCLIcmd += " --skip-tests "+this.NewCompUseSpecTScfg+"";
      this.NewCompAngularCLIcmd += " --standalone "+this.NewCompSingleAPIapp+"";
      this.NewCompAngularCLIcmd += " --style "+this.NewCompUseCSSstyleID.toLowerCase()+"";
      if( this.NewCompSetNewFileTyp.length >= 3 ) { this.NewCompAngularCLIcmd += " --type "+this.NewCompSetNewFileTyp+""; }
      if( this.NewCompSetEncapsMode != "default" ) { this.NewCompAngularCLIcmd += " --view-encapsulation "+this.NewCompSetEncapsMode+""; }

      // STORE THE STEP IN THE VERSION HISTORY
      this.CreateAction( this.StepCount, "New Component \""+ this.FieldNewCompName +"\" added", String(this.NewCompAngularCLIcmd), "Add Component");
      // RESET THE FORM
      this.NewCompUseShowBlock = false;
      this.NewCompSetTopLvlCfg = false;
      this.NewCompUseInlineCSS = false;
      this.NewCompUseInlineHTM = false;
      this.NewCompUseSkipImprt = false;
      this.NewCompUseSelectTag = false;
      this.NewCompUseSpecTScfg = false;
      this.NewCompSingleAPIapp = false;
      this.FieldNewCompName = "";
      this.NewCompDetectModeCfg = "default";
      this.NewComponentPref = "";
      this.NewCompProjectNameID = "";
      this.NewCompUseCSSstyleID = "empty";
      this.NewCompSetNewFileTyp = "";
      this.NewCompSetEncapsMode = "default";
    }
  }

  /*########################################################################################################*/
  /* FOLLOWING CODE SECTION IS THE PAGE 'ADD NEW SERVICE' */
  /* #################################################### */

  public NewServAngularCLIcmd: string = "";

  // WE NEED A BUNCH OF VARS/FUNCTIONS TO HANDLE ALL THOSE TOGGLES/SWITCHES INSIDE OUR FORM
  public NewServSetTopLvlCfg: boolean = true;
  NewServtoggleTopLvlCfg() { this.NewServSetTopLvlCfg = !this.NewServSetTopLvlCfg; }
  public NewServUseSpecTScfg: boolean = false;
  NewServtoggleSpecTScfg() { this.NewServUseSpecTScfg = !this.NewServUseSpecTScfg; }

  // THIS VAR IS BOUND TO THE INPUT-FIELD 'ServiceName' IN OUR HTML-PART
  public NewServFieldName: string = '';
  public MaxLengthOkay: boolean = false;
  // THIS FUNCTION WILL BE CALLED ANY TIME, THE INPUT CHANGES
  public checkServiceNameLength() {
    if( this.NewServFieldName.length > 4 ) { this.MaxLengthOkay = true; }
    else { this.MaxLengthOkay = false }
  }

  // THIS VAR IS BOUND TO THE INPUT-FIELD 'FieldProjName' IN OUR HTML-PART
  public FieldProjName: string = '';
  
  // THIS FUNCTION CHECKS IF EVERYTHING IS OAKY AND SHOWS THE SHELL WINDOW
  public ValidateFormAddComponent() {
    let ValidForm: boolean = true;

    // ACCESS THE DOM AND CATCH THE INPUT FIELD
    let DOMObj = document.getElementById('NewServFieldName');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( DOMObj ) { DOMObj.className = 'FormInput FontFormInput'; }
    // SEEMS LIKE THE NAME OF THE SERVICE IS TOO SHORT OR EMPTY
    if( this.NewServFieldName.length < 3 ) {
      ValidForm = false;
      if( DOMObj ) { DOMObj.className = 'FormInputError FontFormInput'; }
    }
    // FINAL CHECK
    if( ValidForm == true ) {
      // CREATE THE COMMAND STRING
      this.NewServAngularCLIcmd = "ng g s " + this.NewServFieldName + " --flat " + this.NewServSetTopLvlCfg + " --skip-tests " + this.NewServUseSpecTScfg + "";
      if( this.FieldProjName.length >=3 ) {
        this.NewServAngularCLIcmd = "ng g s " + this.NewServFieldName + " --flat " + this.NewServSetTopLvlCfg + " --project " + this.FieldProjName + " --skip-tests " + this.NewServUseSpecTScfg + "";
      }
      // STORE THE STEP IN THE VERSION HISTORY
      this.CreateAction( this.StepCount, "New Service \""+ this.NewServFieldName +"\" added", String(this.NewServAngularCLIcmd), "Add Service");
      // RESET THE FORM
      this.NewServFieldName = "";
      this.FieldProjName = "";
      this.NewServSetTopLvlCfg = true;
      this.NewServUseSpecTScfg = false;
    }

  }


  /*########################################################################################################*/
  /* FOLLOWING CODE SECTION IS FOR THE PAGE 'ADD NPM MODUKE' */
  /* ####################################################### */

  public NPMpackageString: string = '';

  // THIS FUNCTION WILL STORE THE NPM INSTALL COMMAND IN AN ARRAY
  public AddNPMpackage() {
    // ACCESS THE DOM AND CATCH THE HTML-ELEMENT
    let InputField = document.getElementById('NPMpackageString');
    // RESET THE CLASSES TO THE DEFAULT VALUES
    if( InputField ) { InputField.className = 'FormNPMinput FontFormInput'; }
    
    if( this.NPMpackageString.length > 3 ) {
      this.NPMpackages.push( String(this.NPMpackageString) );
      this.NPMpackageString = "";
    } else {
      if( InputField ) { InputField.className = 'FormNPMinputError FontFormInput'; }
    }
  }

  // THIS FUNCTION WILL STORE THE NPM INSTALL COMMAND IN AN ARRAY
  public AddNPMpacksToProject() {
    let NPMinstallcmd: string = "npm i ";
    for(let x=0; x<this.NPMpackages.length; x++) {
      NPMinstallcmd += this.NPMpackages[x]+" ";
    }
    // STORE THE STEP IN THE VERSION HISTORY
    this.CreateAction( this.StepCount, "NPM Module(s) added to Workspace \""+this.ProjectDirectory+"\" ", String(NPMinstallcmd), "Add NPM Module(s)");
    this.NPMpackages.splice(0,this.NPMpackages.length);
  }
  
  /*########################################################################################################*/
  /* FOLLOWING CODE SECTION IS FOR THE "CREATE POWERSHELL SCRIPT" PAGE */
  /* ################################################################# */

  public ScriptCreated: boolean = false;    // HANDLE THE BUTTON

  public PowerShellScript: string = "";     // STORES THE WHOLE SCRIPT
  
  public CreatePowerShellScript() {
    // WIPE OLD CODE
    this.PowerShellScript = "";
    let ErrorHandler: boolean = false;
    // HIDE THE BUTTON
    this.ScriptCreated = true;
    
    let TempScript: string = "";    // TEMP STORAGE FOR THE CODE
    /*
    TempScript += "<#"+"<br>";
    TempScript += "Angular CLI DevKit v1.00.82"+"<br>";
    TempScript += "Written by praetoriani"+"<br>";
    TempScript += "https://github.com/praetoriani"+"<br>";
    TempScript += "#>"+"<br>";
    */
    TempScript += "Write-Host 'Angular CLI DevKit v1.00.82' -ForegroundColor Grey"+"<br>";
    TempScript += "Write-Host 'Written by praetoriani' -ForegroundColor Grey"+"<br>";
    TempScript += "Write-Host 'https://github.com/praetoriani' -ForegroundColor Grey"+"<br>";
    TempScript += " "+"<br>";
    TempScript += "Write-Host 'Setting up your Angular Workspace. Please wait ...' -ForegroundColor White"+"<br>";
    // TIME TO GET SOME CONTENT FROM THE GLOBAL VERSION HISTORY ARRAY
    TempScript += String(this.VersionHistory[0][2])+"<br>";
    this.VersionHistory.shift();
    TempScript += "Write-Host 'Done.' -ForegroundColor White"+"<br>";
    TempScript += " "+"<br>";
    TempScript += "Write-Host 'Switching into your Workspace.' -ForegroundColor White"+"<br>";
    TempScript += "cd "+this.ProjectDirectory+""+"<br>";
    TempScript += " "+"<br>";
    // FROM HERE WE CAN LOOP THROUGH THE ARRAY
    while( this.VersionHistory.length > 0 ) {
      TempScript += "Write-Host 'Next Step: "+String(this.VersionHistory[0][3])+"' -ForegroundColor White"+"<br>";
      TempScript += "Write-Host 'Please wait ... ' -ForegroundColor White"+"<br>";
      TempScript += String(this.VersionHistory[0][2])+"<br>";
      TempScript += " "+"<br>";
      this.VersionHistory.shift();
    }
    TempScript += "Write-Host 'Congratulations. Your project is now ready :)' -ForegroundColor White"+"<br>";
    TempScript += " "+"<br>";
    //TempScript += "Write-Host 'Just try \'ng serve --open\'' -ForegroundColor White"+"<br>";
    TempScript += "Write-Host 'Hit any key to exit'"+"<br>";
    TempScript += "$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')"

    this.PowerShellScript = TempScript;
    /*
    if( ErrorHandler == false ) {
      this.PowerShellScript = TempScript;
    } else {
      this.PowerShellScript = "ERR: CANNOT CREATE POWERSHELL SCRIPT!";
    }
    */
  }

}