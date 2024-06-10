import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit{
  
  constructor(private authService: AuthService) { }

  user: any;

  ngOnInit(): void {
      this.fetchUserData();
  }

  fetchUserData() {
    this.authService.getCurrentUser(() => {
      this.user = this.authService.currentUser;
      console.log(`USER DATA: ${JSON.stringify(this.user)}`);
    })
  }
}
