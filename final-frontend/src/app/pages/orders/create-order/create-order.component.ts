import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {

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
      
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const orderData = {
        user_id: this.orderForm.get('customer_id')!.value,
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
