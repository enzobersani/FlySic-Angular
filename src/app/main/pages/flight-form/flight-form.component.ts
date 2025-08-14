import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { InputTextComponent } from "../../../shared/components/forms/input-text/input-text.component";
import { TextareaComponent } from "../../../shared/components/forms/textarea/textarea.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputCheckboxComponent } from "../../../shared/components/forms/input-checkbox/input-checkbox.component";
import { ButtonSecondaryComponent } from "../../../shared/components/forms/buttons/button-secondary/button-secondary.component";
import { ESTADOS_BRASIL } from '../../common/models/estados-brasil.model';
import { SelectComponent } from "../../../shared/components/forms/select/select.component";
import { SelectItemModel } from '../../../shared/components/forms/select/models/select-item.model';
import { IbgeService } from '../../common/services/ibge.service';
import { AirportService } from '../../common/services/airport.service';
import { NgIf } from '@angular/common';
import { SelectTextsModel } from '../../../shared/components/forms/select/models/texts/select-texts.model';
import { ToastListComponent } from "../../../shared/components/feedback/toast-list/toast-list.component";
import { ToastService } from '../../../shared/components/feedback/toast-list/services/toast.service';
import { ToastErrorModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-error.model';
import { ModalComponent } from "../../../shared/components/modals/modal/modal.component";
import { FeedbackComponent } from "../../../shared/components/feedback/feedback/feedback.component";
import { FeedbackTypeEnum } from '../../../shared/components/feedback/feedback/enums/feedback-type.enum';
import { LoadingComponent } from "../../../shared/layout/loading/loading.component";
import { FlightFormsListResponseModel } from '../../common/models/flight-forms-list-response.model';
import { FlightService } from '../../common/services/flight.service';
import { FlightFormRequestModel } from '../../common/models/flight-form-request.model';
import { FlightFormStatus } from '../../common/enum/flight-form-status.enum';
import { FlightFormStatusResponseModel } from '../../common/models/flight-form-status-response.model';
import { ToastWarnModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-warn.model';
import { Router } from '@angular/router';
import { CalendarSingleComponent } from "../../../shared/components/forms/calendar-single/calendar-single.component";
import { futureOrTodayDateValidator } from '../../common/validators/future-or-today-date.validator';

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [
    InputTextComponent,
    TextareaComponent,
    InputCheckboxComponent,
    ButtonSecondaryComponent,
    SelectComponent,
    NgIf,
    ToastListComponent,
    ModalComponent,
    FeedbackComponent,
    LoadingComponent,
    CalendarSingleComponent
  ],
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.scss'
})
export class FlightFormComponent implements OnInit {
  @Input() flightFormId?: string;
  @ViewChild('modalResponse') modalResponse!: ModalComponent;
  @ViewChild('selectAeroportoPartida') selectAeroportoPartida?: SelectComponent;
  @ViewChild('selectAeroportoChegada') selectAeroportoChegada?: SelectComponent;

  form: FormGroup;
  flight!: FlightFormsListResponseModel;
  isLoading = false;
  canSubmit = true;

  selectItems: SelectItemModel[] = [
    { key: 1, description: 'Sim' },
    { key: 0, description: 'Não' }
  ];
  feedbackTypes: FeedbackTypeEnum[] = [
    FeedbackTypeEnum.SUCCESS,
    FeedbackTypeEnum.WAITING,
    FeedbackTypeEnum.WARNING,
  ];
  estadoBrasil = ESTADOS_BRASIL;

  cidadesPartida: SelectItemModel[] = [];
  cidadesChegada: SelectItemModel[] = [];
  carregandoCidades = false;

  aeroportosPartida: SelectItemModel[] = [];
  aeroportosChegada: SelectItemModel[] = [];

  showCustomLocation = { partida: false, chegada: false };

  placeholderIcao: SelectTextsModel = {
    placeholder: 'Comece a digitar para buscar',
    notFoundPlaceHolder: 'Não foram encontrados dados'
  };

  statusFlightForm!: FlightFormStatus;

  constructor(
    private fb: FormBuilder,
    private ibgeService: IbgeService,
    private airportService: AirportService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private flightService: FlightService,
    private router: Router
  ) {
    this.form = this.fb.group({
      partidaData: [null, [Validators.required, futureOrTodayDateValidator()]],
      partidaHora: ['', Validators.required],
      aeroportoPartida: ['', Validators.required],
      localPartidaManual: [''],

      chegadaData: [null, [Validators.required, futureOrTodayDateValidator()]],
      chegadaHora: ['', Validators.required],
      aeroportoChegada: ['', Validators.required],
      localChegadaManual: [''],

      tipoAeronave: ['', Validators.required],
      comentarioVoo: [''],
      checkboxPernoite: [false]
    });
  }

  ngOnInit(): void {
    const semIcaoOption: SelectItemModel = {
      key: 'sem-icao',
      description: 'Não possui ICAO (aeródromo privado)'
    };
    this.aeroportosPartida = [semIcaoOption];
    this.aeroportosChegada = [semIcaoOption];

    if (this.flightFormId) {
      this.loadFlightFormData();
      this.getStatus(); // canSubmit é decidido no subscribe
    }
  }

  getStatus(): void {
    this.flightService.getStatus(this.flightFormId!).subscribe({
      next: (status: FlightFormStatusResponseModel) => {
        this.statusFlightForm = status.status;
        this.canSubmit = this.statusFlightForm === FlightFormStatus.Aberta;
      },
    });
  }

  loadFlightFormData() {
    this.airportService.getByFlightId(this.flightFormId!).subscribe({
      next: (flight) => {
        this.flight = flight;

        if (flight.departureAirport) {
          this.onSearchAirport(flight.departureAirport, 'partida');
        }
        if (flight.arrivalAirport) {
          this.onSearchAirport(flight.arrivalAirport, 'chegada');
        }
        if (!flight.departureAirport && !flight.arrivalAirport) {
          this.patchFlightForm();
        }
      },
      error: () => {
        this.toastService.send(new ToastErrorModel("Erro", "Erro ao carregar ficha de voo!", "Agora"));
      }
    });
  }

  patchFlightForm() {
    const flight = this.flight;
    if (!flight) return;

    const dPartida = new Date(flight.departureDate);
    const dChegada = new Date(flight.arrivalDate);

    // Patch único: inclui datas já no formato que o CalendarSingle entende
    this.form.patchValue({
      partidaData: { initialDate: dPartida, finalDate: dPartida },
      chegadaData: { initialDate: dChegada, finalDate: dChegada },

      partidaHora: this.formatTimeToInput(flight.departureTime),
      chegadaHora: this.formatTimeToInput(flight.arrivalTime),

      aeroportoPartida: flight.departureAirport ?? 'sem-icao',
      localPartidaManual: flight.departureManualLocation ?? '',

      aeroportoChegada: flight.arrivalAirport ?? 'sem-icao',
      localChegadaManual: flight.arrivalManualLocation ?? '',

      tipoAeronave: flight.aircraftType,
      comentarioVoo: flight.flightComment,
      checkboxPernoite: flight.hasOvernight
    }, { emitEvent: true });

    // Mostra/oculta campos manuais
    this.showCustomLocation.partida = !flight.departureAirport;
    this.showCustomLocation.chegada = !flight.arrivalAirport;

    // Ajusta validadores dos campos manuais conforme seleção atual
    this.onIcaoChange('partida');
    this.onIcaoChange('chegada');

    // Seleciona as opções dos selects (após listas carregadas por onSearchAirport)
    const partidaKey = this.form.get('aeroportoPartida')?.value;
    const chegadaKey = this.form.get('aeroportoChegada')?.value;

    const partidaItem = this.aeroportosPartida.find(i => i.key === partidaKey);
    const chegadaItem = this.aeroportosChegada.find(i => i.key === chegadaKey);

    if (partidaItem) this.selectAeroportoPartida?.select(partidaItem);
    if (chegadaItem) this.selectAeroportoChegada?.select(chegadaItem);

    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    type RangeLike = { initialDate?: any; finalDate?: any } | null | undefined;
    const v = this.form.getRawValue();

    const getSelectValue = (val: any) =>
      (val && typeof val === 'object' && 'key' in val) ? val.key : val;

    const extractDateFromRange = (val: any): any =>
      (val && typeof val === 'object' && 'initialDate' in val)
        ? (val as RangeLike)!.initialDate
        : val;

    const coerceToDate = (val: unknown): Date => {
      if (val instanceof Date) return val;
      if (typeof val === 'string') {
        if (val.includes('/')) {
          const [dd, mm, yyyy] = val.split('/').map(Number);
          return new Date(yyyy, (mm ?? 1) - 1, dd ?? 1);
        }
        const parsed = new Date(val);
        if (!isNaN(parsed.getTime())) return parsed;
      }
      return new Date(val as any);
    };

    const toIsoDate = (value: unknown): string => {
      const raw = extractDateFromRange(value);
      const d = coerceToDate(raw);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}T00:00:00`;
    };

    const toIsoDateTime = (time: unknown, date: unknown): string => {
      const rawDate = extractDateFromRange(date);
      const d = coerceToDate(rawDate);
      let hh = '00', mi = '00';

      if (time instanceof Date) {
        hh = String(time.getHours()).padStart(2, '0');
        mi = String(time.getMinutes()).padStart(2, '0');
      } else if (typeof time === 'string' && time.includes(':')) {
        const [h, m] = time.split(':');
        hh = String(h ?? '00').padStart(2, '0');
        mi = String(m ?? '00').padStart(2, '0');
      }

      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}T${hh}:${mi}:00`;
    };

    const aeroportoPartidaVal = getSelectValue(v.aeroportoPartida);
    const aeroportoChegadaVal = getSelectValue(v.aeroportoChegada);

    const request: FlightFormRequestModel = {
      partidaData: toIsoDate(v.partidaData),
      partidaHora: toIsoDateTime(v.partidaHora, v.partidaData),

      chegadaData: toIsoDate(v.chegadaData),
      chegadaHora: toIsoDateTime(v.chegadaHora, v.chegadaData),

      aeroportoPartida: aeroportoPartidaVal !== 'sem-icao' ? aeroportoPartidaVal : null,
      localPartidaManual: aeroportoPartidaVal === 'sem-icao' ? v.localPartidaManual : null,

      aeroportoChegada: aeroportoChegadaVal !== 'sem-icao' ? aeroportoChegadaVal : null,
      localChegadaManual: aeroportoChegadaVal === 'sem-icao' ? v.localChegadaManual : null,

      tipoAeronave: v.tipoAeronave,
      comentarioVoo: v.comentarioVoo,
      checkboxPernoite: !!v.checkboxPernoite
    };

    this.isLoading = true;
    this.modalResponse.open();

    if (this.flightFormId) {
      this.flightService.updateFlightForm(this.flightFormId, request).subscribe({
        next: () => { this.isLoading = false; },
        error: (err) => {
          if (err.status === 400 && err.error) {
            this.toastService.send(new ToastWarnModel("Erro", err.error.notifications[0].message));
          } else {
            this.toastService.send(new ToastErrorModel("Erro", "Ocorreu um erro ao atualizar ficha!", "Agora"));
          }
          this.isLoading = false;
          this.modalResponse.close();
        }
      });
    } else {
      this.airportService.createFlight(request).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(["/home"]);
        },
        error: (err) => {
          if (err.status === 400 && err.error) {
            this.toastService.send(new ToastWarnModel("Erro", err.error.notifications[0].message));
          } else {
            this.toastService.send(new ToastErrorModel("Erro", "Ocorreu um erro ao criar ficha!", "Agora"));
          }
          this.isLoading = false;
          this.modalResponse.close();
        }
      });
    }
  }

  setupCitySelects() {
    const partidaUf = this.form.get('partidaUf')?.value;
    const chegadaUf = this.form.get('chegadaUf')?.value;

    if (partidaUf) {
      this.form.get('partidaLocal')?.reset();
      this.ibgeService.buscarCidadePorUf(partidaUf).subscribe({
        next: (cidades: any[]) => {
          this.cidadesPartida = cidades.map(c => ({ key: c.nome, description: c.nome }));
        },
        error: () => this.cidadesPartida = []
      });
    } else {
      this.cidadesPartida = [];
      this.form.get('partidaLocal')?.reset();
    }

    if (chegadaUf) {
      this.form.get('chegadaLocal')?.reset();
      this.ibgeService.buscarCidadePorUf(chegadaUf).subscribe({
        next: (cidades: any[]) => {
          this.cidadesChegada = cidades.map(c => ({ key: c.nome, description: c.nome }));
        },
        error: () => this.cidadesChegada = []
      });
    } else {
      this.cidadesChegada = [];
      this.form.get('chegadaLocal')?.reset();
    }
  }

  onSearchAirport(icao: string, tipo: 'partida' | 'chegada') {
    if (!icao) return;

    this.airportService.searchAirport(icao).subscribe({
      next: (airports) => {
        const mapped = airports.map(a => ({
          key: a.icao,
          description: `${a.icao} - ${a.airport}`
        }));

        mapped.push({ key: 'sem-icao', description: 'Não possui ICAO (aeródromo privado)' });

        if (tipo === 'partida') {
          this.aeroportosPartida = mapped;
        } else {
          this.aeroportosChegada = mapped;
        }

        this.patchFlightForm();
      },
      error: () => {
        if (tipo === 'partida') this.aeroportosPartida = [];
        else this.aeroportosChegada = [];
        this.patchFlightForm();
      }
    });
  }

  onIcaoChange(tipo: 'partida' | 'chegada') {
    const key = tipo === 'partida' ? 'aeroportoPartida' : 'aeroportoChegada';
    const manualKey = tipo === 'partida' ? 'localPartidaManual' : 'localChegadaManual';

    const value = this.form.get(key)?.value;
    this.showCustomLocation[tipo] = value === 'sem-icao';

    if (this.showCustomLocation[tipo]) {
      this.form.get(manualKey)?.setValidators(Validators.required);
    } else {
      this.form.get(manualKey)?.clearValidators();
      this.form.get(manualKey)?.setValue('');
    }
    this.form.get(manualKey)?.updateValueAndValidity();
  }

  private formatTimeToInput(datetimeStr: string): string {
    const date = new Date(datetimeStr);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }
}
