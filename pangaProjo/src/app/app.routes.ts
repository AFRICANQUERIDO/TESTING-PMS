import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [{
    path: '', redirectTo: 'landing', pathMatch: 'full'
},
{
    path: 'login', component: LoginComponent
},
{
    path: 'dashboard', component: DashboardComponent
}
    , {
    path: 'register', component: RegisterComponent
}, {
    path: '', component: LandingComponent
}

];
