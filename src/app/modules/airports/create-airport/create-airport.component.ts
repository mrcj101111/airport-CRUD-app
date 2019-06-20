import { } from 'googlemaps';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.services';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Country, Airport } from 'src/app/shared/interfaces/api.models';

@Component({
  selector: 'app-create-airport',
  templateUrl: './create-airport.component.html',
})
export class CreateAirportComponent implements OnInit {
  countries$: Observable<Country>;
  airport$: Observable<Airport>;
  createAirportForm: FormGroup;
  selectedCountry: Country;
  submitted = false;
  chosenLat: number;
  chosenLong: number;
  @ViewChild('map', { static: true }) mapElement: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute
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
    // Get airline and country info to display.
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
      this.selectedCountry.country_id)
      .subscribe(res => {
        this.toastr.success('Airport successfully added!');
        this.airport$ = of(res);
        this.router.navigate(['./link-airlines'], {relativeTo: this.route});
      },
        (err) => {
          this.toastr.warning('Oops, airport already exists.');
        }
      );
  }
}
