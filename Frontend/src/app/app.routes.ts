import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {EventInfoComponent} from "./pages/event-info/event-info.component";
import {CityComponent} from "./pages/city/city.component";
import {CreateEventComponent} from "./pages/add-event/create-event.component";
import {FeedbackComponent} from "./pages/feedback/feedback.component";
import {UserEventsComponent} from "./pages/user-events/user-events.component";

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
  { path: 'create-event/:city', component: CreateEventComponent },
  { path: 'edit-event/:city/:id', component: CreateEventComponent },
  {path: 'my-events', component: UserEventsComponent},
  { path: 'feedback', component: FeedbackComponent },
  { // Default route
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];
