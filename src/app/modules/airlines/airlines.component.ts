import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.services';
import { Airline } from 'src/app/shared/interfaces/api.models';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
})
export class AirlinesComponent implements OnInit {
  airlines$: Observable<Airline>;
  displayedColumns: string[] = ['name', 'country', 'actions'];

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.airlines$ = this.apiService.getAirlines();
  }

  // Delete selected airline.
  delete(id: number) {
    return this.apiService.deleteAirline(id).subscribe(res => {
        this.toastr.success('Airline successfully deleted!');
        this.airlines$ = this.apiService.getAirlines();
      }
    );
  }
}
