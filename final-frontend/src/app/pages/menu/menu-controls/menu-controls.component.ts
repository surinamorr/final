import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-controls',
  templateUrl: './menu-controls.component.html',
  styleUrls: ['./menu-controls.component.css']
})
export class MenuControlsComponent {

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

}
