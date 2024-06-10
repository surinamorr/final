import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-single-order-details',
  templateUrl: './single-order-details.component.html',
  styleUrls: ['./single-order-details.component.css']
})
export class SingleOrderDetailsComponent {

  orderDetails: any[] = [];
  orderDetail = { order_detail_id: 0, order_id: 0, item_type: '', item_id: 0, quantity: 0, price: 0 };

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // The + operator converts the string to a number
      if (id) {
        const orderID = +id;
        // console.log(orderID);
        this.getSingleOrderDetails(orderID);
      }
    });
  }

  getSingleOrderDetails(id: number) {
    this.orderService.getSingleOrderDetails(id).subscribe(
      (res) => {
        // console.log(res);
        if(res['status'] === 'success') {
          this.orderDetail = res.data.orderDetails[0];
          // console.log(this.orderDetail);
        }
      },
      (err) => {
        console.error('Error fetching orders', err);
      }
    );
}

}

