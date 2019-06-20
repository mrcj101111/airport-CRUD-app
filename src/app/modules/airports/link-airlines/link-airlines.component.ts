import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.services';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Airline, Airport, AirportAirline } from 'src/app/shared/interfaces/api.models';

@Component({
  selector: 'app-link-airlines',
  templateUrl: './link-airlines.component.html',
})
export class LinkAirlinesComponent implements OnInit {
  linkAirlineForm: FormGroup;
  submitted = false;
  selectedAirline;
  airlines$: Observable<Airline>;
  selectedAirport;
  airports$: Observable<Airport>;
  airportAirline$: Observable<AirportAirline>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.airportAirline$ = this.apiService.getAirportAirline();
    this.airlines$ = this.apiService.getAirlines();
    this.airports$ = this.apiService.getAirports();
    this.linkAirlineForm = this.formBuilder.group({
      airline_name: ['', [Validators.required]],
      airport_name: ['', [Validators.required]],
    });
  }

  get f() { return this.linkAirlineForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.linkAirlineForm.invalid) {
      return;
    }
    this.apiService.createAirportAirline(this.selectedAirport.id, this.selectedAirline.id).pipe(
    ).subscribe(res => {
      this.toastr.success('Link successfully added!');
      this.airportAirline$ = of(res);
      this.router.navigate(['airlines']);
    },
      (err) => {
        this.toastr.warning('Oops, this link already exists.');
      }
    );
  }
}
