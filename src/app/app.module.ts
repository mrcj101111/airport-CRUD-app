import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HomeComponent } from './modules/home/home.component';
import { CallbackComponent } from './modules/callback/callback.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { AirportsComponent } from './modules/airports/airports.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    NavbarComponent,
    AirportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Angular Material
    MatTableModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
