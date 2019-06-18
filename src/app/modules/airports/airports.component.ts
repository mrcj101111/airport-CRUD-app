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

  delete(id: number) {
    return this.apiService.deleteAirport(id).subscribe(res => {
        this.toastr.success('Airport successfully deleted!');
        this.airports$ = this.apiService.getAirports();
      },
      (err) => {
        this.toastr.warning('Oop, something went wrong...');
      }
    );
  }
}
