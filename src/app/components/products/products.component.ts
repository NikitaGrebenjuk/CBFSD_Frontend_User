import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products:any[]= [];
  fetching: boolean = false;

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts();
    this.productService.productsSub.subscribe((data)=>{
      if(data.length !=0){
        this.products = Object.assign([],data);
        this.fetching = false;
        console.log(this.products);
      }
    })
  }


  addProductToShoppingCart(product:any){
    this.productService.addProductToShoppingCart(product);
  }

  addProductToWhishlist(product:any) {
    this.productService.addProductToWhishlist(product);
  }
}
