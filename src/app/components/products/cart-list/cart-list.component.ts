import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  public totalItems:number=0;
  public totalPrice:number=0;

  constructor(public productsService: ProductsService,private router: Router) { }

  ngOnInit(): void {
    this.calculate();
  }

  addPrdToWishlist(prd:any, removeBool:boolean, prdIdx:number){
    this.productsService.addProductToWhishlist(prd, removeBool, prdIdx);
    this.removeProductFromCart(prdIdx);
    this.calculate();
  }

  removeProductFromCart(prdIdx:number){ 
    let elements = this.productsService.cartProducts.splice(prdIdx, 1);
    console.log(elements[0]['title'], "Product Removed from Cart");
    this.calculate();
  }

  goTo(url:any){
    this.router.navigateByUrl(url);
  }

  calculate() {
    this.totalItems = this.productsService.cartProducts.reduce((prev,next)=> prev+next['quantity'],0);
    this.totalPrice = this.productsService.cartProducts.reduce((prev,next)=> prev+ (next['quantity']*next['price']),0);
  }
}
