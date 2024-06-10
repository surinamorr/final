import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { MenuComponent } from './pages/menu/menu.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthService } from './services/auth.service';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { HeaderComponent } from './pages/partials/header/header.component';
import { FooterComponent } from './pages/partials/footer/footer.component';
import { LogoutComponent } from './pages/partials/logout/logout.component';
import { CustomerProfileComponent } from './pages/customers/customer-profile/customer-profile.component';
import { CreateMenuComponent } from './pages/menu/create-menu/create-menu.component';
import { UpdateMenuComponent } from './pages/menu/update-menu/update-menu.component';
import { DeleteMenuComponent } from './pages/menu/delete-menu/delete-menu.component';
import { AllMenuItemsComponent } from './pages/menu/all-menu-items/all-menu-items.component';
import { AllCustomersComponent } from './pages/customers/all-customers/all-customers.component';
import { SingleCustomerComponent } from './pages/customers/single-customer/single-customer.component';
import { CreateCustomerComponent } from './pages/customers/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './pages/customers/update-customer/update-customer.component';
import { DeleteCustomerComponent } from './pages/customers/delete-customer/delete-customer.component';
import { CustomerControlsComponent } from './pages/customers/customer-controls/customer-controls.component';
import { AllOrdersComponent } from './pages/orders/all-orders/all-orders.component';
import { OrderDirective } from './pages/order.directive';
import { SingleOrderComponent } from './pages/orders/single-order/single-order.component';
import { CreateOrderComponent } from './pages/orders/create-order/create-order.component';
import { UpdateOrderComponent } from './pages/orders/update-order/update-order.component';
import { DeleteOrderComponent } from './pages/orders/delete-order/delete-order.component';
import { AllOrderDetailsComponent } from './pages/orders/all-order-details/all-order-details.component';
import { SingleOrderDetailsComponent } from './pages/orders/single-order-details/single-order-details.component';
import { OrderControlsComponent } from './pages/orders/order-controls/order-controls.component';
import { MenuControlsComponent } from './pages/menu/menu-controls/menu-controls.component';
import { AllCustomerOrdersComponent } from './pages/orders/all-customer-orders/all-customer-orders.component';
import { SingleCustomerOrderComponent } from './pages/orders/single-customer-order/single-customer-order.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    MenuComponent,
    OrdersComponent,
    HomepageComponent,
    SignupComponent,
    LoginComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    LogoutComponent,
    CustomerProfileComponent,
    CreateMenuComponent,
    UpdateMenuComponent,
    DeleteMenuComponent,
    AllMenuItemsComponent,
    AllCustomersComponent,
    SingleCustomerComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent,
    DeleteCustomerComponent,
    CustomerControlsComponent,
    AllOrdersComponent,
    OrderDirective,
    SingleOrderComponent,
    CreateOrderComponent,
    UpdateOrderComponent,
    DeleteOrderComponent,
    AllOrderDetailsComponent,
    SingleOrderDetailsComponent,
    OrderControlsComponent,
    MenuControlsComponent,
    AllCustomerOrdersComponent,
    SingleCustomerOrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000', 'api.nuovaadmin.com'],
        disallowedRoutes: ['http://localhost:3000/api/v1/auth/login', 'http://localhost:3000/api/v1/auth/register']
      }
    })
  ],
  providers: [
    AuthGuard, 
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
