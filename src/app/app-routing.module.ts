import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { BiboComponent } from './bibo/bibo.component';
import { CodeComponent } from './code/code.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { ViewBiboComponent } from './view-bibo/view-bibo.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "bibo", component: BiboComponent},
  {path: "main", component: MenuComponent},
  {path: "profile", component: ProfileComponent},
  {path: "view-bibo", component: ViewBiboComponent},
  {path: "qr", component: QrcodeComponent},
  {path: "admin", component: AdminMenuComponent},
  {path: "code/:code", component: CodeComponent},
  {path: "", pathMatch: "full", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
