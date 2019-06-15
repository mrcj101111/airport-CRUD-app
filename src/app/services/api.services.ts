import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
    baseUrl = environment.apiRoot;

    URL_AIRLINE = 'airlines';


    constructor(protected http: HttpClient) { }

    getAirlines() {
        return this.http.get(this.baseUrl + this.URL_AIRLINE);
    }


}
