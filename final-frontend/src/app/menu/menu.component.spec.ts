import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MenuComponent } from './menu.component';
import { MenuService } from '../services/menu.service';
import { of } from 'rxjs';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let menuService: MenuService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ MenuService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    menuService = TestBed.inject(MenuService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load menu items on init', () => {
    const dummyMenu = [
      { id: 1, type: 'starter', name: 'Bruschetta', price: 5.99 },
      { id: 2, type: 'main', name: 'Steak', price: 19.99 },
      { id: 3, type: 'dessert', name: 'Cheesecake', price: 6.99 },
      { id: 4, type: 'side', name: 'Fries', price: 2.99 }
    ];

    spyOn(menuService, 'getMenuItems').and.returnValue(of(dummyMenu));
    component.loadMenu();
    expect(component.starters).toEqual([dummyMenu[0]]);
    expect(component.mains).toEqual([dummyMenu[1]]);
    expect(component.desserts).toEqual([dummyMenu[2]]);
    expect(component.sides).toEqual([dummyMenu[3]]);
  });

  it('should add a menu item', () => {
    const newItem = { id: 5, type: 'starter', name: 'Garlic Bread', price: 4.99 };
    spyOn(menuService, 'addMenuItem').and.returnValue(of(newItem));

    component.menuItem = { type: 'starter', name: 'Garlic Bread', price: 4.99 };
    component.addMenuItem();
    expect(component.starters).toContain(newItem);
  });

  it('should delete a menu item', () => {
    const dummyMenu = [
      { id: 1, type: 'starter', name: 'Bruschetta', price: 5.99 },
      { id: 2, type: 'main', name: 'Steak', price: 19.99 },
      { id: 3, type: 'dessert', name: 'Cheesecake', price: 6.99 },
      { id: 4, type: 'side', name: 'Fries', price: 2.99 }
    ];

    component.starters = [dummyMenu[0]];
    spyOn(menuService, 'deleteMenuItem').and.returnValue(of({}));

    component.deleteMenuItem('starter', 1);
    expect(component.starters.length).toBe(0);
  });
});
