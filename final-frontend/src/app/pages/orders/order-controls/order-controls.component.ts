import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-controls',
  templateUrl: './order-controls.component.html',
  styleUrls: ['./order-controls.component.css']
})
export class OrderControlsComponent {

  orderId: number = 0;
  orderDetailsId: number = 0;

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  navigateToSingleOrder(): void {
    if (this.orderId) {
      this.router.navigate([`/single-order/${this.orderId}`]);
    } else {
      alert('Please enter a valid order ID');
    }
  }

  navigateToSingleOrderDetails(): void {
    if (this.orderDetailsId) {
      this.router.navigate([`/single-order-details/${this.orderDetailsId}`]);
    } else {
      alert('Please enter a valid order details ID');
    }
  }

}
