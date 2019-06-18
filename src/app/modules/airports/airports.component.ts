import { Component, OnInit } from '@angular/core';
import { Airport } from 'src/app/shared/interfaces/api.models';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
})
export class AirportsComponent implements OnInit {
  airports$: Observable<Airport>;
  displayedColumns: string[] = ['name', 'country', 'actions'];

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.airports$ = this.apiService.getAirports();
  }
}
