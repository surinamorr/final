import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  isLoggedIn: boolean = true;
  loginText: string = 'Login';
  loginLink: string = '/login';
  profileLink: string | null = '';
  profileText: string = '';
  orderLink: string = '';
  orderText: string = '';
  menuLink: string = '';
  menuText: string = '';

  user: any;

  constructor(private router: Router, private authService: AuthService){ }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.user = this.authService.getCurrentUser(() => {
        this.user = this.authService.currentUser;
        if (this.user.role === 'CUSTOMER') {
          this.profileLink = '/customer-profile';
          this.orderLink = '/all-customer-orders';
          this.menuLink = '/all-menu-items';
        }else {
          this.profileLink = '/customer-controls';
          this.orderLink = '/order-controls';
          this.menuLink = '/menu-controls';
        }
        this.isLoggedIn = true;
        this.loginText = 'Logout';
        this.loginLink = '/logout';
      })
    } else {
      this.isLoggedIn = false;
      this.profileLink = null;
      this.loginText = 'Login';
      this.loginLink = '/login';
      this.menuLink = '/all-menu-items';
    }

    this.profileOrControls();

  }

  profileOrControls(this: any): void {
    this.authService.getCurrentUser(() => {
      this.user = this.authService.currentUser;
      if (this.user.role === 'CUSTOMER') {
        this.profileText = 'Profile';
        this.orderText = 'Orders';
        this.menuText = 'Menu';
        // console.log('Profile')
      }else {
        this.profileText = 'Customer-Controls';
        this.orderText = 'Order-Controls';
        this.menuText = 'Menu-Controls';
        // console.log('Customer-Controls')
      }
    })
  }

}// END OF HEADER COMPONENT

