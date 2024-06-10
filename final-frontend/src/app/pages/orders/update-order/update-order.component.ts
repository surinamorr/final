import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit{

  orders: any[] = [];
  orderDetails: any[] = [];
  order = { customer_id: 0, order_date: '', quantity: 0, total_price: 0};
  orderDetail = { item_id: 0, item_type: '' };

  starter = "starter"
  main = "main"
  dessert = "dessert"
  side = "side"

  constructor (private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.orders = res['data']!['orders'];
        }
      },
      (err) => {
        console.error('Error fetching orders', err);
      }
    );
  }

  updateOrder(id: number, data: any) {
    this.orderService.updateOrder(id, data).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.order = res['id, data']!['customers'];
        }
      },
      (err) => {
        console.error('Error Updating Orders', err);
      }
    );
  }

}
