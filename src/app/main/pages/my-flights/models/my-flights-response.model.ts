import { FlightFormStatus } from "../../../common/enum/flight-form-status.enum";

export interface MyFlightsResponseModel {
    id: string; // Guid em C# vira string no TS
    departureDate: Date;
    departureTime: Date;
    departureAirport?: string;
    departureManualLocation?: string;
  
    arrivalDate: Date;
    arrivalTime: Date;
    arrivalAirport?: string;
    arrivalManualLocation?: string;
  
    aircraftType: string;
    hasOvernight: boolean;
    flightComment?: string;
    status: FlightFormStatus;
    pilot: PilotResponseModel;
    rating?: RatingResponseModel;
}

export interface PilotResponseModel {
    id: string;
    name: string;
    email: string;
    phone?: string;
}

export interface RatingResponseModel {
    rating: number;
    comment?: string;
}