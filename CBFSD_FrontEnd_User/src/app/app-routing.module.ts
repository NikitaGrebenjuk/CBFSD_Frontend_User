import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'', redirectTo:'/dashboard', pathMatch:"full"},
  {path:'dashboard', component: DashboardComponent},
  {path:'auth', loadChildren: ()=> import('./components/auth/auth.module').then(m =>m.AuthModule)},
  {path:'products', loadChildren: ()=> import('./components/products/products.module').then(m =>m.ProductsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
