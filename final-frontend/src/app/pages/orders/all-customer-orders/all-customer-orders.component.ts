import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-all-customer-orders',
  templateUrl: './all-customer-orders.component.html',
  styleUrls: ['./all-customer-orders.component.css']
})
export class AllCustomerOrdersComponent {

  orders: any[] = [];
  order = { user_id: 0, order_date: '', quantity: 0, total_price: 0};

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getAllUserOrders();
}

getAllUserOrders() {
  this.orderService.getAllUserOrders().subscribe(
    (res) => {
      if(res['status'] === 'success') {
        this.orders = res['data']!['orders'];
        console.log(this.orders)
      }
    },
    (err) => {
      console.error('Error fetching orders', err);
    }
  );
}

}
