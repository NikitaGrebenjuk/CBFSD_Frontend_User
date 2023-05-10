import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  public profileForm:FormGroup;
  public errResponse:string ="";
  public user:any;

  constructor(private authService: AuthService, private router:Router) {
    this.profileForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'fullName':  new FormControl(null),
      'contact':  new FormControl(null),
      'city':  new FormControl(null),
      'country':  new FormControl(null),
      'image':  new FormControl(null),
      'password':  new FormControl(null),
      'pincode':  new FormControl(null),
      'state':  new FormControl(null),
      'userId':  new FormControl(null)
    });
    this.user = this.authService.getUser();
    this.profileForm.patchValue(this.user);
  }

  ngOnInit(): void {
   
  //  console.log(this.authService.getUser());
    ;
  }

}
