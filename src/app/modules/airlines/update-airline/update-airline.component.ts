import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Airline, Country } from 'src/app/shared/interfaces/api.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.services';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-update-airline',
  templateUrl: './update-airline.component.html',
})
export class UpdateAirlineComponent implements OnInit {
  airline$: Observable<Airline>;
  countries$: Observable<Country>;
  updateAirlineForm: FormGroup;
  submitted = false;
  airlineId = Number(this.route.snapshot.paramMap.get('id'));
  selectedCountry: Country;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit() {
    this.countries$ = this.apiService.getCountries();
    this.airline$ = this.apiService.getAirline(this.airlineId);
    this.updateAirlineForm = this.formBuilder.group({
      airline_name: ['', [Validators.required]],
      country_name: ['', [Validators.required]],
    });
  }

  get f() { return this.updateAirlineForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.updateAirlineForm.invalid) {
      return;
    }
    console.log(this.selectedCountry);
    this.apiService.updateAirline(this.updateAirlineForm.value.airline_name, this.selectedCountry.country_id, this.airlineId)
      .subscribe(res => {
        this.toastr.success('Airline successfully updated!');
        this.airline$ = of(res);
        this.router.navigate(['airlines']);
      });
  }
}
