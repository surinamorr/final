import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orders: any[] = [];
  order = { id: 0, order_date: '', quantity: 0, total_price: 0};

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrders();
}

getAllOrders() {
  this.orderService.getAllOrders().subscribe(
    (res) => {
      if(res['status'] === 'success') {
        this.orders = res['data']!['orders'];
        // console.log(this.orders);
      }
    },
    (err) => {
      console.error('Error fetching orders', err);
    }
  );
}

}
