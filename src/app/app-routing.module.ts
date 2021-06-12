import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BiboComponent } from './bibo/bibo.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "bibo", component: BiboComponent},
  {path: "main", component: MenuComponent},
  {path: "profile", component: ProfileComponent},
  {path: "", pathMatch: "full", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
