import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.services';
import { Airline } from 'src/app/shared/interfaces/api.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
})
export class AirlinesComponent implements OnInit {
  airlines$: Observable<Airline>;
  displayedColumns: string[] = ['name', 'country', 'actions'];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.airlines$ = this.apiService.getAirlines();
  }

  update() {
    
  }
}
