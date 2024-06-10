import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit{

  customers: any[] = [];
  customer = { first_name: '', last_name: '', email: '', password: '', role: '' };

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
      
  }

  createCustomer(data: any) {
    this.customerService.createCustomer(data).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.customers = res['data']!['customers'];
        }
      },
      (err) => {
        console.error('Error Creating Customer', err);
      }
    );
  }

}
