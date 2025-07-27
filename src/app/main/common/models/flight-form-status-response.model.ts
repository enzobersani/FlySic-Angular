import { FlightFormStatus } from "../enum/flight-form-status.enum";

export interface FlightFormStatusResponseModel {
    status: FlightFormStatus;
    evaluatedId: string;
}