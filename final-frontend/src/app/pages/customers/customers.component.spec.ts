import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomersComponent } from './customers.component';
import { CustomerService } from '../../services/customer.service';
import { of } from 'rxjs';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let customerService: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ CustomerService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    customerService = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load customers on init', () => {
    const dummyCustomers = [
      { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' },
      { id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jane.doe@example.com' }
    ];

    spyOn(customerService, 'getCustomers').and.returnValue(of(dummyCustomers));
    component.loadCustomers();
    expect(component.customers).toEqual(dummyCustomers);
  });

  it('should add a customer', () => {
    const newCustomer = { id: 3, first_name: 'Tom', last_name: 'Smith', email: 'tom.smith@example.com' };
    spyOn(customerService, 'addCustomer').and.returnValue(of(newCustomer));

    component.customer = { first_name: 'Tom', last_name: 'Smith', email: 'tom.smith@example.com' };
    component.addCustomer();
    expect(component.customers).toContain(newCustomer);
  });

  it('should delete a customer', () => {
    const dummyCustomers = [
      { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' },
      { id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jane.doe@example.com' }
    ];

    component.customers = dummyCustomers;
    spyOn(customerService, 'deleteCustomer').and.returnValue(of({}));

    component.deleteCustomer(1);
    expect(component.customers.length).toBe(1);
    expect(component.customers).toEqual([{ id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jane.doe@example.com' }]);
  });
});
