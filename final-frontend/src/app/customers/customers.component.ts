import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers: any[] = [];

  constructor(private customerService: CustomerService) {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  addCustomer(customer: any): void {
    this.customerService.addCustomer(customer).subscribe(newCustomer => {
      this.customers.push(newCustomer);
    });
  }

  updateCustomer(id: number, customer: any): void {
    this.customerService.updateCustomer(id, customer).subscribe(updatedCustomer => {
      const index = this.customers.findIndex(c => c.customer_id === id);
      if (index !== -1) {
        this.customers[index] = updatedCustomer;
      }
    });
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.customers = this.customers.filter(c => c.customer_id !== id);
    });
  }
}
