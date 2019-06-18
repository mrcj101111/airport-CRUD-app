import { } from 'googlemaps';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.services';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Airline, Country, Airport } from 'src/app/shared/interfaces/api.models';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-airport',
  templateUrl: './create-airport.component.html',
})
export class CreateAirportComponent implements OnInit {
  airlines$: Observable<Airline>;
  countries$: Observable<Country>;
  airport$: Observable<Airport>;
  createAirportForm: FormGroup;
  selectedCountry: Country;
  selectedAirline: Airline;
  submitted = false;
  chosenLat: number;
  chosenLong: number;
  @ViewChild('map', { static: true }) mapElement: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    // Set initial map properties.
    const mapProperties = {
      center: new google.maps.LatLng(50.145761, 8.499695),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Create a variable map based on properties.
    const map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    const infoWindow = new google.maps.InfoWindow();

    // Listen to user's click to add location of airport.
    map.addListener('click', e => {
      placeMarkerAndPanTo(e.latLng, map);
      this.chosenLat = e.latLng.lat();
      this.chosenLong = e.latLng.lng();
    });

    function placeMarkerAndPanTo(latLng, map) {
      const marker = new google.maps.Marker({
        position: latLng,
        map
      });
      map.panTo(latLng);
    }
    this.airlines$ = this.apiService.getAirlines();
    this.countries$ = this.apiService.getCountries();
    this.createAirportForm = this.formBuilder.group({
      airport_name: ['', [Validators.required]],
      country_name: ['', [Validators.required]],
      airline_name: [''],
    });
  }

  get f() { return this.createAirportForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.createAirportForm.invalid) {
      return;
    }
    this.apiService.createAirport(
      this.createAirportForm.value.airport_name, this.chosenLat, this.chosenLong,
      this.selectedCountry.country_id, this.selectedAirline.airline_id).pipe(
        tap(data => console.log(data))
      ).subscribe(res => {
        this.toastr.success('Airport successfully added!');
        this.airport$ = of(res);
        this.router.navigate(['airports']);
      });
  }
}
