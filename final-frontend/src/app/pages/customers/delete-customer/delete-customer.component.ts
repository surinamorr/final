import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent {

  customers: any[] = [];
  customer = { first_name: '', last_name: '', email: '', password: '', role: ''};

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

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.customers = res['id']!['customers'];
        }
      },
      (err) => {
        console.error('Error Deleting Customer', err);
      }
    );
  }
}
