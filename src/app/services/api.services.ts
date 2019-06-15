import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Airline } from '../shared/interfaces/api.models';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
    baseUrl = environment.apiRoot;

    URL_AIRLINE = 'airlines';


    constructor(protected http: HttpClient) { }

    getAirlines(): Observable<Airline>  {
        return this.http.get(this.baseUrl + this.URL_AIRLINE).pipe(
            map(data => data as Airline)
        );
    }
}
