import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-all-menu-items',
  templateUrl: './all-menu-items.component.html',
  styleUrls: ['./all-menu-items.component.css']
})
export class AllMenuItemsComponent implements OnInit{
  
  starters: any[] = [];
  mains: any[] = [];
  desserts: any[] = [];
  sides: any[] = [];

  starter = { name: '', price: 0 };
  main = { name: '', price: 0 };
  dessert = { name: '', price: 0 };
  side = { name: '', price: 0 };

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.loadMenu();
  }
  loadMenu() {
    this.getAllStarters();
    this.getAllMains();
    this.getAllDesserts();
    this.getAllSides();
  }

  getAllStarters() {
    this.menuService.getAllStarters().subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.starters = res['data']!['starters'];
        }
      },
      (err) => {
        console.error('Error fetching starters', err);
      }
    );
  }

  getAllMains() {
    this.menuService.getAllMains().subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.mains = res['data']!['mains'];
        }
      },
      (err) => {
        console.error('Error fetching mains', err);
      }
    );
  }

  getAllDesserts() {
    this.menuService.getAllDesserts().subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.desserts = res['data']!['desserts'];
        }
      },
      (err) => {
        console.error('Error fetching desserts', err);
      }
    );
  }

  getAllSides() {
    this.menuService.getAllSides().subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.sides = res['data']!['sides'];
        }
      },
      (err) => {
        console.error('Error fetching sides', err);
      }
    );
  }
}
