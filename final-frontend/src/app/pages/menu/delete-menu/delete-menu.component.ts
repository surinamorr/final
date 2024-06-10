import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-delete-menu',
  templateUrl: './delete-menu.component.html',
  styleUrls: ['./delete-menu.component.css']
})
export class DeleteMenuComponent implements OnInit {
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
  
  deleteStarter(id: number) {
    this.menuService.deleteStarter(id).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.starters = res['id']!['starters'];
        }
      },
      (err) => {
        console.error('Error Deleting Starter', err);
      }
    );
  }

  deleteMain(id: number) {
    this.menuService.deleteMain(id).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.mains = res['id']!['mains'];
        }
      },
      (err) => {
        console.error('Error Deleting Main', err);
      }
    );
  }

  deleteDessert(id: number) {
    this.menuService.deleteDessert(id).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.desserts = res['id']!['desserts'];
        }
      },
      (err) => {
        console.error('Error Deleting Dessert', err);
      }
    );
  }

  deleteSide(id: number) {
    this.menuService.deleteSide(id).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.sides = res['id']!['sides'];
        }
      },
      (err) => {
        console.error('Error Deleting Side', err);
      }
    );
  }

}
