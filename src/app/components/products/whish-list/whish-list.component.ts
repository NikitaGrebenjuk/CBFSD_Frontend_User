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
    this.getWhishlist();
  }


  getWhishlist() {
    this.productsService.getWhishlist().subscribe( (response:any)=>{ 
      // console.log(response.content);
      this.productsService.whishlistProducts = response.content;
    });
  }

  removeProductFromWhishlist(wishlistId:number) {
    // let elements = this.productsService.whishlistProducts.splice(prdIdx, 1);
    // console.log(elements[0]['title'], "Product Removed from Whishlist");
    this.productsService.deleteWhishlistItem(wishlistId).subscribe(response=>{
      this.getWhishlist();
    })
  }

  addProductToShoppingCart(whishlist:any, removeBool:boolean, prdIdx:number) {
    this.productsService.addProductToShoppingCart(whishlist, removeBool, prdIdx);
    this.removeProductFromWhishlist(whishlist.wishlistId);
  }
}
