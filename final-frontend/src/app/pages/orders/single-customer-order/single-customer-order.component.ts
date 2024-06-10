import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-single-customer-order',
  templateUrl: './single-customer-order.component.html',
  styleUrls: ['./single-customer-order.component.css']
})
export class SingleCustomerOrderComponent {

  orders: any[] = [];
  order = { id: 0, order_id: 0, order_date: '', quantity: 0, total_price: 0};

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // The + operator converts the string to a number
      if (id) {
        const orderID = +id;
        console.log(orderID);
        this.getSingleUserOrders(orderID);
      }
    });
  }

  getSingleUserOrders(id: number) {
    this.orderService.getSingleUserOrders(id).subscribe(
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
