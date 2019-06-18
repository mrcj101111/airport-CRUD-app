import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ApiService } from 'src/app/services/api.services';
import { Airline, Country } from 'src/app/shared/interfaces/api.models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-airline',
  templateUrl: './create-airline.component.html',
})
export class CreateAirlineComponent implements OnInit {
  airlines$: Observable<Airline>;
  countries$: Observable<Country>;
  selectedCountry: Country;
  createAirlineForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.countries$ = this.apiService.getCountries();
    this.createAirlineForm = this.formBuilder.group({
      airline_name: ['', [Validators.required]],
      country_name: ['', [Validators.required]],
    });
  }

  get f() { return this.createAirlineForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.createAirlineForm.invalid) {
      return;
    }
    this.apiService.createAirline(this.createAirlineForm.value.airline_name, this.selectedCountry.country_id).pipe(
    ).subscribe(res => {
      this.toastr.success('Airline successfully added!');
      this.airlines$ = of(res);
      this.router.navigate(['airlines']);
    },
      (err) => {
        this.toastr.warning('Oops, this airline already exists.');
      }
    );
  }
}
