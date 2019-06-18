import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.services';
import { ActivatedRoute } from '@angular/router';
import { Airport } from 'src/app/shared/interfaces/api.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-airport-detail',
  templateUrl: './airport-detail.component.html',
})
export class AirportDetailComponent implements OnInit {
airportId$ = Number(this.route.snapshot.paramMap.get('id'));
airport$: Observable<Airport>;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.airport$ = this.apiService.getAirport(this.airportId$);
  }
}
