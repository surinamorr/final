import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
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

  // addMenuItem() {
  //   this.menuService.addMenuItem(this.menuItem).subscribe(
  //     (data) => {
  //       switch (this.menuItem.type) {
  //         case 'starter':
  //           this.starters.push(data);
  //           break;
  //         case 'main':
  //           this.mains.push(data);
  //           break;
  //         case 'dessert':
  //           this.desserts.push(data);
  //           break;
  //         case 'side':
  //           this.sides.push(data);
  //           break;
  //       }
  //       this.menuItem = { type: '', name: '', price: 0 };
  //     },
  //     (error) => {
  //       console.error('Error adding menu item', error);
  //     }
  //   );
  // }

  updateStarter(id: number, data: any) {
    this.menuService.updateStarter(id, data).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.starters = res['id, data']!['starters'];
        }
      },
      (err) => {
        console.error('Error Updating Starter', err);
      }
    );
  }

  updateMain(id: number, data: any) {
    this.menuService.updateMain(id, data).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.mains = res['id, data']!['mains'];
        }
      },
      (err) => {
        console.error('Error Updating Main', err);
      }
    );
  }

  updateDessert(id: number, data: any) {
    this.menuService.updateDessert(id, data).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.desserts = res['id, data']!['desserts'];
        }
      },
      (err) => {
        console.error('Error Updating Desserts', err);
      }
    );
  }

  updateSide(id: number, data: any) {
    this.menuService.updateSide(id, data).subscribe(
      (res) => {
        if(res['status'] === 'success') {
          this.sides = res['id, data']!['sides'];
        }
      },
      (err) => {
        console.error('Error Updating Sides', err);
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
