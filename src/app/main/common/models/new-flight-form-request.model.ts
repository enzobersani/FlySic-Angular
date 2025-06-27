export interface NewFlightFormRequestModel {
    partidaData: string;
    partidaHora: string;
    chegadaData: string;
    chegadaHora: string;
    aeroportoPartida?: string | null;
    localPartidaManual?: string | null;
    aeroportoChegada?: string | null;
    localChegadaManual?: string | null;
    tipoAeronave: string;
    comentarioVoo?: string | null;
    checkboxPernoite: boolean;
}