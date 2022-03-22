import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminBiboComponent } from './admin-bibo/admin-bibo.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { BiboComponent } from './bibo/bibo.component';
import { CodeComponent } from './code/code.component';
import { ELanyardComponent } from './e-lanyard/e-lanyard.component';
import { LoginComponent } from './login/login.component';
import { MedicalApptComponent } from './medical-appt/medical-appt.component';
import { MenuComponent } from './menu/menu.component';
import { ParadeStateComponent } from './parade-state/parade-state.component';
import { ProfileComponent } from './profile/profile.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { TemperatureTrackingComponent } from './temperature-tracking/temperature-tracking.component';
import { ViewCoyBiboComponent } from './view-coy-bibo/view-coy-bibo.component';


const routes: Routes = [
  {path: "admin", component: AdminMenuComponent},
  {path: "admin-bibo", component: AdminBiboComponent},
  {path: "bibo", component: ELanyardComponent},
  {path: "c/:code", component: CodeComponent},
  {path: "login", component: LoginComponent},
  {path: "ma", component: MedicalApptComponent},
  {path: "main", component: MenuComponent},
  {path: "parade-state", component: ParadeStateComponent},
  {path: "profile", component: ProfileComponent},
  {path: "qr", component: QrcodeComponent},
  {path: "temperature", component: TemperatureTrackingComponent},
  {path: "view-bibo", component: ViewCoyBiboComponent},
  {path: "", pathMatch: "full", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
