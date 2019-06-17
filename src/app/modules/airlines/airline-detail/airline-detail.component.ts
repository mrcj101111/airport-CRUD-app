import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Airline } from 'src/app/shared/interfaces/api.models';

@Component({
  selector: 'app-airline-detail',
  templateUrl: './airline-detail.component.html',
})
export class AirlineDetailComponent implements OnInit {
  airlineId = Number(this.route.snapshot.paramMap.get('id'));
  airlines$: Observable<Airline>;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.airlines$ = this.apiService.getAirline(this.airlineId);
  }
}
