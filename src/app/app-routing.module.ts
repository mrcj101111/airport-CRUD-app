import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './modules/callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { AirportsComponent } from './modules/airports/airports.component';
import { AirlinesComponent } from './modules/airlines/airlines.component';
import { CreateAirlineComponent } from './modules/airlines/create-airline/create-airline.component';
import { UpdateAirlineComponent } from './modules/airlines/update-airline/update-airline.component';
import { AirlineDetailComponent } from './modules/airlines/airline-detail/airline-detail.component';
import { CreateAirportComponent } from './modules/airports/create-airport/create-airport.component';
import { AirportDetailComponent } from './modules/airports/airport-detail/airport-detail.component';
import { UpdateAirportComponent } from './modules/airports/update-airport/update-airport.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'airports' },
  { path: 'callback', component: CallbackComponent },
  {
    path: 'airports', canActivate: [AuthGuard],
    children: [
      { path: '', component: AirportsComponent },
      { path: 'create-airport', component: CreateAirportComponent },
      { path: ':id', component: AirportDetailComponent },
      { path: 'update-airport/:id', component: UpdateAirportComponent },
    ]
  },
  {
    path: 'airlines', canActivate: [AuthGuard],
    children: [
      { path: '', component: AirlinesComponent },
      { path: 'create-airline', component: CreateAirlineComponent },
      { path: 'update-airline/:id', component: UpdateAirlineComponent },
      { path: ':id', component: AirlineDetailComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
