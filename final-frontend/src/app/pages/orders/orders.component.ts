import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from './item.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit{
  orders: any[] = [];
  orderDetails: any[] = [];
  order = { customer_id: 0, order_date: '', quantity: 0, total_price: 0};
  orderDetail = { item_id: 0, item_type: '' };

  starter = "starter"
  main = "main"
  dessert = "dessert"
  side = "side"

  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrderService) { 
    this.orderForm = this.fb.group({
      customer_id: ['', Validators.required],
      order_date: ['', Validators.required],
      total_price: [0, Validators.required],
      starter: this.fb.group({
        item_id: ['', Validators.required],
        quantity: ['', Validators.required],
        price: ['', Validators.required]
      }),
      main: this.fb.group({
        item_id: ['', Validators.required],
        quantity: ['', Validators.required],
        price: ['', Validators.required]
      }),
      dessert: this.fb.group({
        item_id: ['', Validators.required],
        quantity: ['', Validators.required],
        price: ['', Validators.required]
      }),
      side: this.fb.group({
        item_id: ['', Validators.required],
        quantity: ['', Validators.required],
        price: ['', Validators.required]
      })
    });
   }

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

  getSingleOrder(id: number) {
    this.orderService.getSingleOrder(id).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.orders = res['id']!['orders'];
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

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.order = res['id']!['orders'];
        }
      },
      (err) => {
        console.error('Error Deleting Order', err);
      }
    );
  }
  onSubmit() {
    if (this.orderForm.valid) {
      const orderData = {
        customer_id: this.orderForm.get('customer_id')!.value,
        order_date: this.orderForm.get('order_date')!.value,
        total_price: this.orderForm.get('total_price')!.value,
        items: [] as Item[]
      };

      const starter = this.orderForm.get('starter')!.value;
      const main = this.orderForm.get('main')!.value;
      const dessert = this.orderForm.get('dessert')!.value;
      const side = this.orderForm.get('side')!.value;

      if (starter.item_id) {
        orderData.items.push({ item_type: 'starter', ...starter });
      }
      if (main.item_id) {
        orderData.items.push({ item_type: 'main', ...main });
      }
      if (dessert.item_id) {
        orderData.items.push({ item_type: 'dessert', ...dessert });
      }
      if (side.item_id) {
        orderData.items.push({ item_type: 'side', ...side });
      }

      this.orderService.createOrder(orderData).subscribe(
        (res) => {
          if (res.status === 'success') {
            console.log('Order created successfully', res.data);
          }
        },
        (err) => {
          console.error('Error creating order', err);
        }
      );
    }
  }
}
