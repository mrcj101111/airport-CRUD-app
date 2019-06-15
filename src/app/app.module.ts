import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CallbackComponent } from './modules/callback/callback.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { AirportsComponent } from './modules/airports/airports.component';
import { AirlinesComponent } from './modules/airlines/airlines.component';
import { ApiService } from './services/api.services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    NavbarComponent,
    AirportsComponent,
    AirlinesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Angular Material
    MatTableModule,
    MatButtonModule,
  ],
  providers: [AuthService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
