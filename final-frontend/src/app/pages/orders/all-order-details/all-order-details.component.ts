import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-order-details.component.html',
  styleUrls: ['./all-order-details.component.css']
})

export class AllOrderDetailsComponent implements OnInit {

  orderDetails: any[] = [];
  orderDetail = { order_id: 0, item_type: '', item_id: 0, quantity: 0, price: 0};

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrderDetails();
  }

  getAllOrderDetails() {
    this.orderService.getAllOrderDetails().subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.orderDetails = res['data']!['orderDetails'];
        }
      },
      (err) => {
        console.error('Error fetching orders', err);
      }
    );
}

}
