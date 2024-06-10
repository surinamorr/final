import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit{

  customers: any[] = [];
  customer = { first_name: '', last_name: '', email: '', role: '', id: 0 };

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.customers = res['data']!['customers'];
        }
      },
      (err) => {
        console.error('Error fetching customers', err);
      }
    );
  }

  updateCustomer(id: number, data: any) {
    this.customerService.updateCustomer(id, data).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.customers = res['id, data']!['customers'];
        }
      },
      (err) => {
        console.error('Error Updating Customer', err);
      }
    );
  }
}
