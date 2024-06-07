import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  starters: any[] = [];
  mains: any[] = [];
  desserts: any[] = [];
  sides: any[] = [];

  menuItem = { type: '', name: '', price: 0 };

  constructor(private menuService: MenuService) {
    this.loadMenu();
  }

  loadMenu() {
    this.menuService.getMenuItems().subscribe(
      (data) => {
        this.starters = data.filter(item => item.type === 'starter');
        this.mains = data.filter(item => item.type === 'main');
        this.desserts = data.filter(item => item.type === 'dessert');
        this.sides = data.filter(item => item.type === 'side');
      },
      (error) => {
        console.error('Error fetching menu items', error);
      }
    );
  }

  addMenuItem() {
    this.menuService.addMenuItem(this.menuItem).subscribe(
      (data) => {
        switch (this.menuItem.type) {
          case 'starter':
            this.starters.push(data);
            break;
          case 'main':
            this.mains.push(data);
            break;
          case 'dessert':
            this.desserts.push(data);
            break;
          case 'side':
            this.sides.push(data);
            break;
        }
        this.menuItem = { type: '', name: '', price: 0 };
      },
      (error) => {
        console.error('Error adding menu item', error);
      }
    );
  }

  deleteMenuItem(type: string, id: number) {
    this.menuService.deleteMenuItem(type, id).subscribe(
      () => {
        switch (type) {
          case 'starter':
            this.starters = this.starters.filter(item => item.id !== id);
            break;
          case 'main':
            this.mains = this.mains.filter(item => item.id !== id);
            break;
          case 'dessert':
            this.desserts = this.desserts.filter(item => item.id !== id);
            break;
          case 'side':
            this.sides = this.sides.filter(item => item.id !== id);
            break;
        }
      },
      (error: any) => {
        console.error('Error deleting menu item', error);
      }
    );
  }
}
