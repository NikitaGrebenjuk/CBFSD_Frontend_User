import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public productsSub: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public whishlistProducts:any[] =[];
  public cartProducts:any[] =[];
  public products:any[] =[];
  public productsRetreived:boolean = false;


  constructor(private httpClient:HttpClient) { }

  // Fetch data from rest apis
  public getProducts() {
    this.httpClient.get(`${environment.apiUrl}/products`).subscribe( (response)=>{
      this.productsSub.next(Object.assign([],response));
      this.productsRetreived = true;
    })
  }

  // add products to cart
  addProductToShoppingCart(prd:any, prdRemoveBool?: boolean, prdIdx=-1) {
    // add product into cart for multiple time.
    if(this.cartProducts.some(x=>x["id"]===prd["id"])) { 
      let idx = this.cartProducts.findIndex(x=> x["id"]===prd["id"]);
      this.cartProducts[idx]["quantity"] +=1;
      console.log(prd['title'], "Alreay Added to Cart, Quantity Updated");
    } else{
      this.cartProducts.push( {
        ...prd,
        "quantity": 1
      });
      console.log(prd['title'], "Product Added to Shoping Cart");
    }
    console.log(this.cartProducts);
    
  }

  // add products to whish 
  addProductToWhishlist(prd:any, prdRemoveBool?:boolean, prdIdx:number=-1) {
    if(!this.whishlistProducts.some(x=>x["id"]===prd["id"])) {
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
}
