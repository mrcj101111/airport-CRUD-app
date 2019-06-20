import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Airline, Country, Airport, AirportAirline } from '../shared/interfaces/api.models';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
    baseUrl = environment.apiRoot;

    URL_AIRLINE = 'airlines';
    URL_COUNTRY = 'countries';
    URL_AIRPORTS = 'airports';

    constructor(protected http: HttpClient) { }

    // Airlines
    getAirlines(): Observable<Airline> {
        return this.http.get(this.baseUrl + this.URL_AIRLINE).pipe(
            map(data => data as Airline)
        );
    }

    getAirline(airlineId: number): Observable<Airline> {
        return this.http.get(this.baseUrl + this.URL_AIRLINE + '/' + airlineId).pipe(
            map(data => data as Airline)
        );
    }

    createAirline(airlineName: string, countryId: number): Observable<Airline> {
        return this.http.post(this.baseUrl + this.URL_AIRLINE + '/create-airline', { airlineName, countryId }).pipe(
            map(data => data as Airline)
        );
    }

    updateAirline(airlineName: string, countryId: number, airlineId: number): Observable<Airline> {
        return this.http.patch(this.baseUrl + this.URL_AIRLINE + '/update-airline/' + airlineId, { airlineName, countryId }).pipe(
            map(data => data as Airline)
        );
    }

    deleteAirline(airlineId: number): Observable<Airline> {
        return this.http.delete(this.baseUrl + this.URL_AIRLINE + '/delete-airline/' + airlineId).pipe(
            map(data => data as Airline)
        );
    }

    // Airports
    getAirports(): Observable<Airport> {
        return this.http.get(this.baseUrl + this.URL_AIRPORTS).pipe(
            map(data => data as Airport)
        );
    }

    getAirport(airportId: number): Observable<Airport> {
        return this.http.get(this.baseUrl + this.URL_AIRPORTS + '/' + airportId).pipe(
            map(data => data as Airport)
        );
    }

    createAirport(airportName: string, lat: number, long: number, countryId: number): Observable<Airport> {
        return this.http.post(this.baseUrl + this.URL_AIRPORTS + '/create-airport', {
            airportName, lat, long, countryId
        }).pipe(map(data => data as Airport)
        );
    }

    deleteAirport(airportId: number): Observable<Airport> {
        return this.http.delete(this.baseUrl + this.URL_AIRPORTS + '/delete-airport/' + airportId).pipe(
            map(data => data as Airport)
        );
    }

    updateAirport(airportName: string, lat: number, long: number, countryId: number, airportId: number): Observable<Airport> {
        return this.http.patch(this.baseUrl + this.URL_AIRPORTS + '/update-airport/' + airportId,
        { airportName, lat, long, countryId }).pipe(
            map(data => data as Airport)
        );
    }

    createAirportAirline(airportId: number, airlineId: number): Observable<AirportAirline> {
        return this.http.post(this.baseUrl + this.URL_AIRPORTS + '/add-airport-airline', {
            airportId, airlineId
        }).pipe(map(data => data as AirportAirline));
    }

    getAirportAirline(): Observable<AirportAirline> {
        return this.http.get(this.baseUrl + this.URL_AIRPORTS + '/airport-airline').pipe(
            map(data => data as AirportAirline)
        );
    }

    // Countries
    getCountries(): Observable<Country> {
        return this.http.get(this.baseUrl + this.URL_COUNTRY).pipe(
            map(data => data as Country)
        );
    }
}
