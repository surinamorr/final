import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit{
  customers: any[] = [];
  customer = { first_name: '', last_name: '', email: '' };

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.customers = res['data']!['customers'];
          console.log(this.customers);
        }
      },
      (err) => {
        console.error('Error fetching customers', err);
      }
    );
  }
}
