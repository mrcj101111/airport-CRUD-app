import { } from 'googlemaps';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Airline, Country, Airport } from 'src/app/shared/interfaces/api.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.services';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-update-airport',
  templateUrl: './update-airport.component.html',
})
export class UpdateAirportComponent implements OnInit {
  airlines$: Observable<Airline>;
  countries$: Observable<Country>;
  airport$: Observable<Airport>;
  airports$: Observable<Airport>;
  createAirportForm: FormGroup;
  selectedCountry: Country;
  selectedAirline: number;
  submitted = false;
  chosenLat: number;
  chosenLong: number;
  airportId$ = Number(this.route.snapshot.paramMap.get('id'));
  @ViewChild('map', { static: true }) mapElement: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.airport$ = this.apiService.getAirport(this.airportId$);
    this.airlines$ = this.apiService.getAirlines();
    this.countries$ = this.apiService.getCountries();
    this.createAirportForm = this.formBuilder.group({
      airport_name: ['', [Validators.required]],
      country_name: ['', [Validators.required]],
      airline_name: ['', [Validators.required]],
    });
    // Set initial map properties based on airport info.
    return this.apiService.getAirport(this.airportId$).pipe(
      map(data => data),
    ).subscribe(data => {
      const mapProperties = {
        center: new google.maps.LatLng(data[0].airport.lat, data[0].airport.long),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      // Create a variable map based on properties.
      const map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
      const infoWindow = new google.maps.InfoWindow();

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
    });
  }

  get f() { return this.createAirportForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.createAirportForm.invalid) {
      return;
    }
    this.apiService.updateAirport(
      this.createAirportForm.value.airport_name, this.chosenLat, this.chosenLong,
      this.selectedCountry.country_id, this.selectedAirline, this.airportId$)
      .subscribe(res => {
        this.toastr.success('Airport successfully updated!');
        this.airports$ = of(res);
        this.router.navigate(['airports']);
      },
        (err) => {
          this.toastr.warning('Oops, something went wrong.');
        }
      );
  }
}
