import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { CallbackComponent } from './modules/callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { AirportsComponent } from './modules/airports/airports.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'callback', component: CallbackComponent },
  {
    path: 'home', canActivate: [AuthGuard], component: HomeComponent,
    children: [
      {
        path: '', component: AirportsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
