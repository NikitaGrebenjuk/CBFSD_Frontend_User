import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { raceWith } from 'rxjs';
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
    this.getCartList();
  }

  getCartList() {
    this.productsService.getCartList().subscribe( (response:any)=>{ 
      this.productsService.cartProducts = response.content;
      this.calculate();
    });
  }


  addPrdToWishlist(cart:any, removeBool:boolean, prdIdx:number){
    this.productsService.addProductToWhishlist(cart, removeBool, prdIdx);
    this.removeProductFromCart(cart.cartId);
    this.calculate();
  }

  removeProductFromCart(cartId:number){ 
    // let elements = this.productsService.cartProducts.splice(prdIdx, 1);
    // console.log(elements[0]['title'], "Product Removed from Cart");
    this.productsService.deleteCartItem(cartId).subscribe(response=>{
      this.getCartList();
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
