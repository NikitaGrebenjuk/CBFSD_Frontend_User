import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public  productService: ProductsService, public authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  public onLogOut() {
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }

}
