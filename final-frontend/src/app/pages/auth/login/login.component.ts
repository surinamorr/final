import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hasError: boolean = false;
  errorMessage: string = '';
  user: any;


  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  private customerLink = '/customer-profile';
  private adminLink = '/customer-controls'; //NEED TO CHANGE UP PAGE STRUCTURES AND LET THIS BE customer-list (getAllCustomers)

  currentRole: string = '';

  ngOnInit(): void {
      
  }

  login(oForm: NgForm): void {
    this.authService.login(oForm.value).subscribe(
      (res) => {
        if (res['status'] === 'success') {
          this.authService.authToken = res['data']!['token'];
          this.authService.saveAuthToken();
          this.authService.getCurrentUser(() => {
            this.user = this.authService.currentUser;
            this.currentRole = this.user.role;
            // console.log(`USER DATA: ${JSON.stringify(this.user)}`);
            if (this.currentRole === 'CUSTOMER') {
              this.router.navigate([this.customerLink]);
              // console.log('CUSTOMER');
            } else {
              this.router.navigate([this.adminLink]);
              // console.log('ADMIN');
            }
            // this.router.navigate(['/customer-profile']);
          })
        }else{
          // console.log(`RESPONSE DATA: ${JSON.stringify(res)}`);
        }
      },
      (err) => {
        this.hasError = true;
        this.errorMessage = err.error.message;
        console.log(err);
      }
    )}
}
