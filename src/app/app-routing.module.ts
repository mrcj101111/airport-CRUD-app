import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './modules/callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { AirportsComponent } from './modules/airports/airports.component';
import { AirlinesComponent } from './modules/airlines/airlines.component';
import { CreateAirlineComponent } from './modules/airlines/create-airline/create-airline.component';
import { CountriesComponent } from './modules/countries/countries.component';
import { AddCountryComponent } from './modules/countries/add-country/add-country.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'airports' },
  { path: 'callback', component: CallbackComponent },
  {
    path: 'airports', canActivate: [AuthGuard], component: AirportsComponent,
    children: [
      { path: '', component: AirportsComponent },
    ]
  },
  {
    path: 'airlines', canActivate: [AuthGuard],
    children: [
      { path: '', component: AirlinesComponent },
      { path: 'create-airline', component: CreateAirlineComponent }
    ]
  },
  {
    path: 'countries', canActivate: [AuthGuard],
    children: [
      { path: '', component: CountriesComponent },
      { path: 'add-country', component: AddCountryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
