import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-whish-list',
  templateUrl: './whish-list.component.html',
  styleUrls: ['./whish-list.component.css']
})
export class WhishListComponent implements OnInit {

  constructor(public productsService: ProductsService,private router: Router) { }

  ngOnInit(): void {
  }

  removeProductFromWhishlist(prdIdx:number) {
    let elements = this.productsService.whishlistProducts.splice(prdIdx, 1);
    console.log(elements[0]['title'], "Product Removed from Whishlist");
  }

  addProductToShoppingCart(prd:any, removeBool:boolean, prdIdx:number) {
    this.productsService.addProductToShoppingCart(prd, removeBool, prdIdx);
    this.removeProductFromWhishlist(prdIdx);
  }
}
