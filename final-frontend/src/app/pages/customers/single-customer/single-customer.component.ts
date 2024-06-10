import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-single-customer',
  templateUrl: './single-customer.component.html',
  styleUrls: ['./single-customer.component.css']
})
export class SingleCustomerComponent implements OnInit{

  // customers: any[] = [];
  customer = { id: 0, first_name: '', last_name: '', email: '', role: '' };

  constructor(private customerService: CustomerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // The + operator converts the string to a number
      if (id) {
        const customerID = +id;
        console.log(customerID);
        this.getSingleCustomer(customerID);
      }
    });
  }

  getSingleCustomer(id: number) {
    this.customerService.getSingleCustomer(id).subscribe(
      (res) => {
        // console.log(res.data.customers);
        if(res['status'] === 'success') {
          this.customer = res.data.customers;
          // console.log(this.customer.first_name);
        }
      },
      (err) => {
        console.error('Error Getting Customer Information', err);
      }
    );
  }

}
