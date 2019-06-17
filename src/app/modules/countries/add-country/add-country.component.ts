import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Country } from 'src/app/shared/interfaces/api.models';
import { ApiService } from 'src/app/services/api.services';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
})
export class AddCountryComponent implements OnInit {
  country$: Observable<Country>;
  countries$: Observable<Country>;
  createCountryForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.countries$ = this.apiService.getCountries();
    this.createCountryForm = this.formBuilder.group({
      country_name: ['', [Validators.required]],
    });
  }

  get f() { return this.createCountryForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.createCountryForm.invalid) {
      return;
    }
    this.apiService.addCountry(this.createCountryForm.value.country_name, this.createCountryForm.value.country_code).pipe(
    ).subscribe(res => {
      this.toastr.success('Country was successfully added!');
      this.country$ = of(res);
      this.router.navigate(['/airlines/create-airline']);
    });
  }
}
