import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = { firstName: '', lastName: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.register(this.user).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error during registration', error);
      }
    );
  }
}
