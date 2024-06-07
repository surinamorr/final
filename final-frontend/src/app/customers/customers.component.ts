import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers: any[] = [];
  customer = { first_name: '', last_name: '', email: '' };

  constructor(private customerService: CustomerService, private http: HttpClient) {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(
      (data) => {
        this.customers = data;
      },
      (error) => {
        console.error('Error fetching customers', error);
      }
    );
  }

  addCustomer() {
    this.customerService.addCustomer(this.customer).subscribe(
      (data) => {
        this.customers.push(data);
        this.customer = { first_name: '', last_name: '', email: '' };
      },
      (error) => {
        console.error('Error adding customer', error);
      }
    );
  }

  updateCustomer(id: number, customer: any) {
    this.customerService.updateCustomer(id, customer).subscribe(
      (data) => {
        const index = this.customers.findIndex(c => c.id === id);
        if (index !== -1) {
          this.customers[index] = data;
        }
      },
      (error) => {
        console.error('Error updating customer', error);
      }
    );
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(
      () => {
        this.customers = this.customers.filter(customer => customer.id !== id);
      },
      (error) => {
        console.error('Error deleting customer', error);
      }
    );
  }
}

