import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit{

  order = { customer_id: 0, order_id: 0, order_date: '', quantity: 0, total_price: 0};

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // The + operator converts the string to a number
      if (id) {
        const customerID = + id;
        // console.log(customerID);
        this.getSingleOrder(customerID);
      }
    });
  }

  getSingleOrder(id: number) {
    this.orderService.getSingleOrder(id).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.order = res.data.orders;
          // console.log(this.order);
        }
      },
      (err) => {
        console.error('Error fetching orders', err);
      }
    );
  }

}
