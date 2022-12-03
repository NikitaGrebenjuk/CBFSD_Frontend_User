import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes:Routes = [
  { path: 'login' , component : LoginComponent },
  { path: 'register' , component : RegisterComponent },
  { path: 'forget-password' , component : ForgetPasswordComponent },
  { path: 'change-password' , component : ChangePasswordComponent },
  { path: 'user-profile' , component : UserProfileComponent },
]

@NgModule({
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    RegisterComponent,
    UserProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthModule { }
