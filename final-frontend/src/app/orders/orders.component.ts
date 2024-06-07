import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: any[] = [];
  order = { customer_id: 0, order_date: '', total_price: 0, status: '', orderDetails: [] };

  constructor(private orderService: OrderService) {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  addOrder() {
    this.orderService.addOrder(this.order).subscribe(
      (data) => {
        this.orders.push(data);
        this.order = { customer_id: 0, order_date: '', total_price: 0, status: '', orderDetails: [] };
      },
      (error) => {
        console.error('Error adding order', error);
      }
    );
  }

  updateOrder(id: number, order: any) {
    this.orderService.updateOrder(id, order).subscribe(
      (data) => {
        const index = this.orders.findIndex(o => o.id === id);
        if (index !== -1) {
          this.orders[index] = data;
        }
      },
      (error) => {
        console.error('Error updating order', error);
      }
    );
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(
      () => {
        this.orders = this.orders.filter(order => order.id !== id);
      },
      (error: any) => {
        console.error('Error deleting order', error);
      }
    );
  }
}
