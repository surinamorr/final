import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit{
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
      
  }
  
  addStarter(data: any) {
    this.menuService.addStarter(data).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.starters = res['data']!['starters'];
        }
      },
      (err) => {
        console.error('Error Creating Starters', err);
      }
    );
  }

  addMain(data: any) {
    this.menuService.addMain(data).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.mains = res['data']!['mains'];
        }
      },
      (err) => {
        console.error('Error Creating Mains', err);
      }
    );
  }

  addDessert(data: any) {
    this.menuService.addDessert(data).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.desserts = res['data']!['desserts'];
        }
      },
      (err) => {
        console.error('Error Creating Desserts', err);
      }
    );
  }

  addSide(data: any) {
    this.menuService.addSide(data).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.sides = res['data']!['sides'];
        }
      },
      (err) => {
        console.error('Error Creating Sides', err);
      }
    );
  }

}
