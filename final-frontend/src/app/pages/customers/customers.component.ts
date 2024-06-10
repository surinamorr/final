import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  customers: any[] = [];
  customer = { first_name: '', last_name: '', email: '' };

  constructor(private customerService: CustomerService) { }
  // constructor(private customerService: CustomerService, private http: HttpClient) {}


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

