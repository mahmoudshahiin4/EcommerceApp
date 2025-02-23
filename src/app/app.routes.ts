import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/gaurds/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlanckLayoutComponent } from './layouts/blanck-layout/blanck-layout.component';
import { loggedGuard } from './core/gaurds/logged.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: AuthLayoutComponent, canActivate:[loggedGuard] , children: [
        { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'login' },
        { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: 'register' },
        { path: 'forgot', loadComponent: () => import('./shared/components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent), title: 'forgot' },
    ]},
    { path: '', component: BlanckLayoutComponent  , canActivate:[authGuard] , children: [
        { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'home'},
        { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: 'cart'  },
        { path: 'wishlist', loadComponent: () => import('./pages/wish-list/wish-list.component').then(m => m.WishListComponent), title: 'wishlist'  },
        { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), title: 'products' },
        { path: 'allorders', loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent), title: 'alllOrders' },
        { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), title: 'categories' },
        { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: 'brands' },
        { path: 'checkout/:id', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), title: 'checkout' },
        { path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), title: 'details' },
        { path: 'detailsCat/:id', loadComponent: () => import('./pages/details-categories/details-categories.component').then(m => m.DetailsCategoriesComponent), title: 'detailsCat' },
        { path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent), title: 'notfound' }
    ]},
];

