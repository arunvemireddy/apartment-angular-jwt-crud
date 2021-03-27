import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SaveapdetailsComponent } from './saveapdetails/saveapdetails.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/login'},
  {path:'login',component:LoginComponent},
  {path:'edit',component:EditComponent},
  {path:'home',component:HomeComponent},
  {path:'save',component:SaveapdetailsComponent},
  {path:'main',component:MainComponent,pathMatch:"full",canActivate:[AuthGuard]},
  {path:'forgotPwd',component:ForgotpwdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
