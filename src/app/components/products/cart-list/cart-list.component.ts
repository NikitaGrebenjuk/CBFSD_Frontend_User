import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { raceWith } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit ,  AfterViewInit{

  public totalItems:number=0;
  public totalPrice:number=0;

  constructor(public productsService: ProductsService,private router: Router) { }

  ngAfterViewInit(): void {
    this.calculate();
  }

  ngOnInit(): void {
    this.productsService.getCartList();
    
  }


  addPrdToWishlist(prd:any, removeBool:boolean, prdIdx:number){
    this.productsService.addProductToWhishlist(prd, removeBool, prdIdx);
    this.removeProductFromCart(prdIdx);
    this.calculate();
  }

  removeProductFromCart(cartId:number){ 
    // let elements = this.productsService.cartProducts.splice(prdIdx, 1);
    // console.log(elements[0]['title'], "Product Removed from Cart");
    this.productsService.deleteCartItem(cartId).subscribe(response=>{
      this.productsService.getCartList();
    })
    this.calculate();
  }

  goTo(url:any){
    this.router.navigateByUrl(url);
  }

  calculate() {
    console.log(this.productsService.cartProducts);
    if(this.productsService.cartProducts)
    this.totalItems = this.productsService.cartProducts.reduce((prev,next)=> prev+next['quantity'],0);
    this.totalPrice = this.productsService.cartProducts.reduce((prev,next)=> prev+ (next['quantity']*next.products['price']),0);
  }
}
