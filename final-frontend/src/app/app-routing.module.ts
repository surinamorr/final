import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
// import { MenuComponent } from './pages/menu/menu.component';
// import { OrdersComponent } from './pages/orders/orders.component';
// import { CustomersComponent } from './pages/customers/customers.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { CustomerProfileComponent } from './pages/customers/customer-profile/customer-profile.component';
import { LogoutComponent } from './pages/partials/logout/logout.component';
import { CreateMenuComponent } from './pages/menu/create-menu/create-menu.component';
import { UpdateMenuComponent } from './pages/menu/update-menu/update-menu.component';
import { DeleteMenuComponent } from './pages/menu/delete-menu/delete-menu.component';
import { AllMenuItemsComponent } from './pages/menu/all-menu-items/all-menu-items.component';
import { SingleOrderComponent } from './pages/orders/single-order/single-order.component';
import { AllCustomersComponent } from './pages/customers/all-customers/all-customers.component';
import { SingleCustomerComponent } from './pages/customers/single-customer/single-customer.component';
import { CreateCustomerComponent } from './pages/customers/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './pages/customers/update-customer/update-customer.component';
import { DeleteCustomerComponent } from './pages/customers/delete-customer/delete-customer.component';
import { CustomerControlsComponent } from './pages/customers/customer-controls/customer-controls.component';
import { AllOrdersComponent } from './pages/orders/all-orders/all-orders.component';
import { AllOrderDetailsComponent } from './pages/orders/all-order-details/all-order-details.component';
import { SingleOrderDetailsComponent } from './pages/orders/single-order-details/single-order-details.component';
import { CreateOrderComponent } from './pages/orders/create-order/create-order.component';
import { UpdateOrderComponent } from './pages/orders/update-order/update-order.component';
import { DeleteOrderComponent } from './pages/orders/delete-order/delete-order.component';
import { MenuControlsComponent } from './pages/menu/menu-controls/menu-controls.component';
import { OrderControlsComponent } from './pages/orders/order-controls/order-controls.component';
import { AllCustomerOrdersComponent } from './pages/orders/all-customer-orders/all-customer-orders.component';
import { SingleCustomerOrderComponent } from './pages/orders/single-customer-order/single-customer-order.component';
import { RoleGuard } from './shared/guards/role.guard';

const routes: Routes = [

  //NO LOGIN
    // HOME PAGE
      { path: '', component: HomepageComponent },
    // ABOUT PAGE
      { path: 'about', component: AboutComponent },
    // MENU PAGE
      { path: 'all-menu-items', component: AllMenuItemsComponent },

  //LOGGED IN CUSTOMER
    { path: 'all-customer-orders', component: AllCustomerOrdersComponent, canActivate: [AuthGuard] }, // TO DO
    { path: 'single-customer-order/:id', component: SingleCustomerOrderComponent, canActivate: [AuthGuard] }, // TO DO
    { path: 'customer-profile', component: CustomerProfileComponent, canActivate: [AuthGuard] },
    
  //LOGGED IN ADMINS
    // MENU CONTROLS
      { path: 'create-menu', component: CreateMenuComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'update-menu', component: UpdateMenuComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'delete-menu', component: DeleteMenuComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'menu-controls', component: MenuControlsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } }, // MENU CONTROL PAGE
    
    // CUSTOMER CONTROLS
      { path: 'all-customers', component: AllCustomersComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'single-customer/:id', component: SingleCustomerComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'create-customer', component: CreateCustomerComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'update-customer', component: UpdateCustomerComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'delete-customer', component: DeleteCustomerComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'customer-controls', component: CustomerControlsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } }, // CUSTOMER CONTROL PAGE
      
    // ORDER CONTROLS
      { path: 'all-orders', component: AllOrdersComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'single-order/:id', component: SingleOrderComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'all-order-details', component: AllOrderDetailsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'single-order-details/:id', component: SingleOrderDetailsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'create-order', component: CreateOrderComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'update-order', component: UpdateOrderComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'delete-order', component: DeleteOrderComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
      { path: 'order-controls', component: OrderControlsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } }, // ORDER CONTROL PAGE

  //AUTH
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
