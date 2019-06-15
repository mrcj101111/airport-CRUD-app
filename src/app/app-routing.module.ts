import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './modules/callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { AirportsComponent } from './modules/airports/airports.component';
import { AirlinesComponent } from './modules/airlines/airlines.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'airports' },
  { path: 'callback', component: CallbackComponent },
  {
    path: 'airports', canActivate: [AuthGuard], component: AirportsComponent,
    children: [
      {
        path: '', component: AirportsComponent,
      },
    ]
  },
  {
    path: 'airlines', canActivate: [AuthGuard], component: AirlinesComponent,
    children: [
      {
        path: 'airlines', component: AirlinesComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
