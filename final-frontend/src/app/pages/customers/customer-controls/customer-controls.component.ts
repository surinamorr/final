import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-controls',
  templateUrl: './customer-controls.component.html',
  styleUrls: ['./customer-controls.component.css']
})
export class CustomerControlsComponent {

  customerId: number = 0;

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  navigateToSingleCustomer(): void {
    if (this.customerId) {
      this.router.navigate([`/single-customer/${this.customerId}`]);
    } else {
      alert('Please enter a valid customer ID');
    }
  }

}
