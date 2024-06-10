import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrdersComponent } from './orders.component';
import { OrderService } from '../../services/order.service';
import { of } from 'rxjs';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let orderService: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ OrderService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders on init', () => {
    const dummyOrders = [
      { id: 1, customer_id: 1, order_date: '2023-05-01', total_price: 100, status: 'pending', orderDetails: [] },
      { id: 2, customer_id: 2, order_date: '2023-05-02', total_price: 200, status: 'completed', orderDetails: [] }
    ];

    spyOn(orderService, 'getOrders').and.returnValue(of(dummyOrders));
    component.loadOrders();
    expect(component.orders).toEqual(dummyOrders);
  });

  it('should add an order', () => {
    const newOrder = { id: 3, customer_id: 3, order_date: '2023-05-03', total_price: 150, status: 'pending', orderDetails: [] };
    spyOn(orderService, 'addOrder').and.returnValue(of(newOrder));

    component.order = { customer_id: 3, order_date: '2023-05-03', total_price: 150, status: 'pending', orderDetails: [] };
    component.addOrder();
    expect(component.orders).toContain(newOrder);
  });

  it('should delete an order', () => {
    const dummyOrders = [
      { id: 1, customer_id: 1, order_date: '2023-05-01', total_price: 100, status: 'pending', orderDetails: [] },
      { id: 2, customer_id: 2, order_date: '2023-05-02', total_price: 200, status: 'completed', orderDetails: [] }
    ];

    component.orders = dummyOrders;
    spyOn(orderService, 'deleteOrder').and.returnValue(of({}));

    component.deleteOrder(1);
    expect(component.orders.length).toBe(1);
    expect(component.orders).toEqual([dummyOrders[1]]);
  });
});
