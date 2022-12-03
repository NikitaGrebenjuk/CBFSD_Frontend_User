import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { WhishListComponent } from './whish-list/whish-list.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClientModule } from '@angular/common/http';


const routes:Routes = [
  { path: '' , component : ProductsComponent },
  { path: 'whishlist' , component : WhishListComponent },
  { path: 'cartlist' , component : CartListComponent },
  { path: 'checkout' , component : CheckoutComponent },
  { path: 'viewproduct' , component : ViewproductComponent },
]


@NgModule({
  declarations: [
    ProductsComponent,
    CartListComponent,
    WhishListComponent,
    ViewproductComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class ProductsModule { }
