import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  orders: any;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {

  }

  fetchListofOrders() {
    this.orderService.getAllOrders().subscribe(
      (res) => {
        if (res['status'] === 'success') {
          this.orders = res['data']!['orderss'];
          console.log(this.orders);
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
