import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatButtonModule, MatInputModule, MatIconModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './modules/callback/callback.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { AirportsComponent } from './modules/airports/airports.component';
import { AirlinesComponent } from './modules/airlines/airlines.component';
import { ApiService } from './services/api.services';
import { CreateAirlineComponent } from './modules/airlines/create-airline/create-airline.component';
import { CountriesComponent } from './modules/countries/countries.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    NavbarComponent,
    AirportsComponent,
    AirlinesComponent,
    CreateAirlineComponent,
    CountriesComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-center'
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // ng-bootstrap
    NgbModule,

    // Angular Material
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [AuthService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
