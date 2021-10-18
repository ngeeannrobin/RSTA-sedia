import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminBiboComponent } from './admin-bibo/admin-bibo.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { BiboComponent } from './bibo/bibo.component';
import { CodeComponent } from './code/code.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ParadeStateComponent } from './parade-state/parade-state.component';
import { ProfileComponent } from './profile/profile.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { TemperatureTrackingComponent } from './temperature-tracking/temperature-tracking.component';
import { ViewCoyBiboComponent } from './view-coy-bibo/view-coy-bibo.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "bibo", component: BiboComponent},
  {path: "main", component: MenuComponent},
  {path: "profile", component: ProfileComponent},
  {path: "view-bibo", component: ViewCoyBiboComponent},
  {path: "qr", component: QrcodeComponent},
  {path: "admin", component: AdminMenuComponent},
  {path: "parade-state", component: ParadeStateComponent},
  {path: "temperature", component: TemperatureTrackingComponent},
  {path: "admin-bibo", component: AdminBiboComponent},
  {path: "c/:code", component: CodeComponent},
  {path: "", pathMatch: "full", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
