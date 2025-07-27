export interface FinishFlightFormModelRequest {
    flightFormId: string;
    evaluatorId: string;
    evaluatedId: string;
    rating: number;
    comment?: string;
}