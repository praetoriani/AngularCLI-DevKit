/* app-routing.module.ts */

// LET'S IMPORT BASIC ANGULAR MODULES
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TIME TO IMPORT THE CONTENT PAGES FOR OUR APP
import { PageHomeComponent } from './page-home/page-home.component';
import { PageInfoComponent } from './page-info/page-info.component';
import { PageHelpComponent } from './page-help/page-help.component';
/* WE DO NOT NEED TO IMPORT THOSE UI ELEMENTS. CAUSE THEY WILL BE RENDERED INSIDE THE CONTENT PAGES ... AND THOSE CONTENT PAGES WILL BE RENDERED INSIDE OUR ROUTES ... GOT IT?!
import { AppUIcomponentHeader } from './app-ui-header/app-ui-header.component';
import { AppUIcomponentFooter } from './app-ui-footer/app-ui-footer.component';
*/
import { CreateNewAngularAppPackage } from './create-new-angular-app/create-new-angular-app';
import { CreateNewProjectAppPackage } from './create-new-project-app/create-new-project-app';
import { GenerateComponentPackage } from './generate-component/generate-component';
import { GenerateServicePackage } from './generate-service/generate-service';
import { GenerateApplicationPackage } from './generate-application/generate-application';

const routes: Routes = [
  // THE FOLOWING THREE LINES ARE THE MAIN CONTENT PAGES. THE APP WILL OPEN 'landigpage' AS DEFAULT PAGE INSIDE THE ROUTES
  { path: 'landingpage', component: PageHomeComponent },
  { path: 'information', component: PageInfoComponent },
  { path: 'helpme', component: PageHelpComponent },
  // NEXT LINES ARE OUR "ANGULAR CLI PACKAGES" THE APP HAS TO OFFER
  { path: 'new-angular-workspace', component: CreateNewAngularAppPackage },
  { path: 'generate-full-project', component: CreateNewProjectAppPackage },
  { path: 'generate-new-comp', component: GenerateComponentPackage },
  { path: 'generate-new-serv', component: GenerateServicePackage },
  { path: 'generate-new-appl', component: GenerateApplicationPackage },  
  // THIS LINE SETS THE 'DEFAULT'-PAGE TO OUR BODY-FRAME
  { path: '', redirectTo: '/landingpage', pathMatch: 'full' }
  // THIS LINE DOES THE SAME BUT DIFFERENT ;)
  //{ path: '', pathMatch: 'full', component: PageStartComponent }
  // WILDCARD-ROUT FOR 404-PAGE
  //{ path: '**', component: Error404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
