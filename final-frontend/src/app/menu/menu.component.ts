import { Component } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuItems: any = {
    starters: [],
    mains: [],
    desserts: [],
    sides: []
  };

  constructor(private menuService: MenuService) {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.menuService.getMenuItems().subscribe(data => {
      this.menuItems = data;
    });
  }

  addMenuItem(menuItem: any, type: string): void {
    this.menuService.addMenuItem(menuItem).subscribe(newMenuItem => {
      this.menuItems[type].push(newMenuItem);
    });
  }
}
