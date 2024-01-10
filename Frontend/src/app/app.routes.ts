import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';

export const routes: Routes = [
    {
        path: 'login', 
        component: LoginFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register', 
        component: RegisterFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'add', 
        component: ProductFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'update', 
        component: ProductFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'search/:keyword', 
        component: ProductListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'category/:categoryId', 
        component: ProductListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'category', 
        component: ProductListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'products/:productId', 
        component: ProductDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'products', 
        component: ProductListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cart-details', 
        component: CartDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '', 
        redirectTo: '/products', 
        pathMatch: 'full'
    },
];
