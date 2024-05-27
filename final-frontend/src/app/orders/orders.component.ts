import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: any[] = [];

  constructor(private orderService: OrderService) {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  addOrder(order: any): void {
    this.orderService.addOrder(order).subscribe(newOrder => {
      this.orders.push(newOrder);
    });
  }

  updateOrder(id: number, order: any): void {
    this.orderService.updateOrder(id, order).subscribe(updatedOrder => {
      const index = this.orders.findIndex(o => o.order_id === id);
      if (index !== -1) {
        this.orders[index] = updatedOrder;
      }
    });
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.orders = this.orders.filter(o => o.order_id !== id);
    });
  }
}
