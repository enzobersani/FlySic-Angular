export interface FlightFormsModel {
    id: string;
    departureDate: string;
    departureTime: string;
    departureAirport?: string;
    departureManualLocation?: string

    arrivalDate: string;
    arrivalTime: string;
    arrivalAirport?: string;
    arrivalManualLocation?: string;

    aircraftType: string;
    flightComment?: string;
    hasOvernight: boolean;
}