export interface Airline {
    airline_id: number;
    airline_name: string;
    country: Country;
}

export interface Airport {
    airport_id: number;
    airport_name: string;
    location: number;
    country: Country;
    airline: Airline;
}

export interface Country {
    country_id: number;
    country_code: number;
    country_name: string;
}

export interface FlightPlan {
    flight_plan_id: number;
    country: Country;
}
