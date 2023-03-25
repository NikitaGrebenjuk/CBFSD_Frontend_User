import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public productsSub: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public whishlistProducts:any[] =[];
  public cartProducts:any[] =[];
  public products:any[] =[];
  public productsRetreived:boolean = false;


  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  // Fetch data from rest apis
  public getProducts() {
    this.httpClient.get(`${environment.baseUrl}/products`).subscribe( (response:any)=>{
      console.log(response);
      
      this.productsSub.next(Object.assign([],response.content));
      this.productsRetreived = true;
    })
  }

  // add products to cart
  addProductToShoppingCart(prd:any, prdRemoveBool?: boolean, prdIdx=-1) {
    // add product into cart for multiple time.
    // if(this.cartProducts.some(x=>x["productId"]===prd["productId"])) { 
    //   let idx = this.cartProducts.findIndex(x=> x["productId"]===prd["productId"]);
    //   this.cartProducts[idx]["quantity"] +=1;
    //   // console.log(prd['title'], "Alreay Added to Cart, Quantity Updated");
    // } else{
    //   this.cartProducts.push( {
    //     ...prd,
    //     "quantity": 1
    //   });
    //   // console.log(prd['title'], "Product Added to Shoping Cart");
    // }
    let cart = {
      userId: this.authService.getUser().userId,
      productId: prd["productId"],
      quantity : 1
    }
    this.httpClient.post(`${environment.baseUrl}/carts`, cart).subscribe( (response:any)=>{ 
      console.log(prd['title'], "Product Added to Shoping Cart", response);
    })
    
    this.getCartList();
  }

  // add products to whish 
  addProductToWhishlist(prd:any, prdRemoveBool?:boolean, prdIdx:number=-1) {
    if(!this.whishlistProducts.some(x=>x["productId"]===prd["productId"])) {
      this.whishlistProducts.push({
        ...prd, "quantity":1
      });
      console.log(prd['title'], "Product Added to Whishlist");
    } else {
      console.log(prd['title'], "Already Added to Whishlist");
    }
    if(prdRemoveBool) {
      this.products.splice(prdIdx, 1);
    }
  }

  getCartList() {
    this.httpClient.get(`${environment.baseUrl}/carts?userId=${this.authService.getUser().userId}`).subscribe( (response:any)=>{ 
      this.cartProducts = response.content;
    })
  }


  deleteCartItem(cartId:any) {
    return this.httpClient.delete<any[]>(`${environment.baseUrl}/orders/${cartId}`);
  }
}
