import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {EventInfoComponent} from "./pages/event-info/event-info.component";
import {CityComponent} from "./pages/city/city.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {path: 'city/:city', component: CityComponent},
  {path: 'event/:id', component: EventInfoComponent},
  {path: 'my-events', component: DashboardComponent},
  { // Default route
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];
