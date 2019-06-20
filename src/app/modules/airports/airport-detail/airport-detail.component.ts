import { } from 'googlemaps';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.services';
import { ActivatedRoute } from '@angular/router';
import { Airport, Airline, AirportAirline } from 'src/app/shared/interfaces/api.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-airport-detail',
  templateUrl: './airport-detail.component.html',
})
export class AirportDetailComponent implements OnInit {
  airportId$ = Number(this.route.snapshot.paramMap.get('id'));
  airport$: Observable<Airport>;
  airlineName$: Observable<Airline>;
  airlineId$: Observable<AirportAirline>;
  @ViewChild('map', { static: true }) mapElement: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.airlineName$ = this.apiService.getAirlines();
    this.airlineId$ = this.apiService.getAirportAirline();
    this.airport$ = this.apiService.getAirport(this.airportId$);
    // Set initial map properties based on airport info.
    return this.apiService.getAirport(this.airportId$).pipe(
      map(data => data),
    ).subscribe(data => {
      const mapProperties = {
        center: new google.maps.LatLng(data[0].airport.lat, data[0].airport.long),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      // Create a map based on properties.
      const map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

      // Add marker to airport loaction.
      const marker = new google.maps.Marker({
        position: { lat: Number(data[0].airport.lat), lng: Number(data[0].airport.long) },
        map,
        title: data[0].airport.name
      });
    });
  }
}
