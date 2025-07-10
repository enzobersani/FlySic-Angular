export interface FlightFormsListResponseModel {
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
    userAlreadyInterested: boolean;
    
    pilot: PilotFlightForms;
}

export interface PilotFlightForms {
    id: string;
    name: string;
    email: string;
    phone: string;
}