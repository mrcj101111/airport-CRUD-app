import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Airline, Country } from '../shared/interfaces/api.models';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
    baseUrl = environment.apiRoot;

    URL_AIRLINE = 'airlines';
    URL_COUNTRY = 'countries';

    constructor(protected http: HttpClient) { }

    // Airlines
    getAirlines(): Observable<Airline> {
        return this.http.get(this.baseUrl + this.URL_AIRLINE).pipe(
            map(data => data as Airline)
        );
    }

    createAirline(airlineName: string, countryId: number): Observable<Airline> {
        return this.http.post(this.baseUrl + this.URL_AIRLINE + '/create-airline', { airlineName, countryId }).pipe(
            map(data => data as Airline)
        );
    }

    // Countries
    getCountries(): Observable<Country> {
        return this.http.get(this.baseUrl + this.URL_COUNTRY).pipe(
            map(data => data as Country)
        );
    }
}
