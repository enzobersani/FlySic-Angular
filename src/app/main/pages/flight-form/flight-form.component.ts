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
import { NewFlightFormRequestModel } from '../../common/models/new-flight-form-request.model';
import { ToastListComponent } from "../../../shared/components/feedback/toast-list/toast-list.component";
import { ToastService } from '../../../shared/components/feedback/toast-list/services/toast.service';
import { ToastSuccessModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-success.model';
import { ToastErrorModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-error.model';
import { ModalComponent } from "../../../shared/components/modals/modal/modal.component";
import { FeedbackComponent } from "../../../shared/components/feedback/feedback/feedback.component";
import { FeedbackTypeEnum } from '../../../shared/components/feedback/feedback/enums/feedback-type.enum';
import { LoadingComponent } from "../../../shared/layout/loading/loading.component";
import { FlightFormsListResponseModel } from '../../common/models/flight-forms-list-response.model';
import { FlightService } from '../../common/services/flight.service';
import { FlightFormRequestModel } from '../../common/models/flight-form-request.model';

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
    LoadingComponent
],
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.scss'
})
export class FlightFormComponent implements OnInit{
  @Input() flightFormId?: string;
  @ViewChild('modalResponse') modalResponse!: ModalComponent;
  flight!: FlightFormsListResponseModel;
  isLoading: boolean = false;
  form: FormGroup;
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
  showCustomLocation = {
    partida: false,
    chegada: false
  }
  placeholderIcao: SelectTextsModel = {
    placeholder: 'Comece a digitar para buscar',
    notFoundPlaceHolder: 'Não foram encontrados dados'
  }

  @ViewChild('selectAeroportoPartida') selectAeroportoPartida?: SelectComponent;
  @ViewChild('selectAeroportoChegada') selectAeroportoChegada?: SelectComponent;

  constructor(
    private fb: FormBuilder,
    private ibgeService: IbgeService,
    private airportService: AirportService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private flightService: FlightService
  ){
    this.form = this.fb.group({
      partidaData: ['', Validators.required],
      partidaHora: ['', Validators.required],
      aeroportoPartida: ['', Validators.required],
      localPartidaManual: [''],
    
      chegadaData: ['', Validators.required],
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

    if (this.flightFormId){
      this.loadFlightFormData();
    }
  }

  onSubmit(){
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    const toDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}`;
    };

    const toTime = (timeStr: string, dateStr: string) => {
      const [day, month, year] = dateStr.split('/');
      const [hour, minute] = timeStr.split(':');
      return `${year}-${month}-${day}T${hour}:${minute}:00`;
    };

    this.isLoading = true;
    const request: FlightFormRequestModel = {
      partidaData: toDate(formValue.partidaData),
      partidaHora: toTime(formValue.partidaHora, formValue.partidaData),
      aeroportoPartida: formValue.aeroportoPartida !== 'sem-icao' ? formValue.aeroportoPartida : null,
      localPartidaManual: formValue.aeroportoPartida === 'sem-icao' ? formValue.localPartidaManual : null,
  
      chegadaData: toDate(formValue.chegadaData),
      chegadaHora: toTime(formValue.chegadaHora, formValue.chegadaData),
      aeroportoChegada: formValue.aeroportoChegada !== 'sem-icao' ? formValue.aeroportoChegada : null,
      localChegadaManual: formValue.aeroportoChegada === 'sem-icao' ? formValue.localChegadaManual : null,
  
      tipoAeronave: formValue.tipoAeronave,
      comentarioVoo: formValue.comentarioVoo,
      checkboxPernoite: formValue.checkboxPernoite
    };

    this.modalResponse.open();
    if (this.flightFormId) {
      this.flightService.updateFlightForm(this.flightFormId, request).subscribe({
        next: () => {
          // this.toastService.send(new ToastSuccessModel("Sucesso", "Ficha de voo atualizada!", "Agora"));
          this.isLoading = false;
        },
        error: (err) => {
          this.toastService.send(new ToastErrorModel("Erro", "Ocorreu um erro ao atualizar ficha!", "Agora"));
          this.isLoading = false;
          this.modalResponse.close();
        }
      });
    } else {
      this.airportService.createFlight(request).subscribe({
        next: () => {
          // this.toastService.send(new ToastSuccessModel("Sucesso", "Ficha de voo criada!", "Agora"));
          this.isLoading = false;
        },
        error: (err) => {
          this.toastService.send(new ToastErrorModel("Erro", "Ocorreu um erro ao criar ficha!", "Agora"));
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

  // onEstadoChange(event: string) {
  //   this.estado = event;
  //   if (this.estado) {
  //     this.buscarCidadesPorUf(this.estado);
  //   } else {
  //     this.cidadesUf = [];
  //   }
  // }

  // buscarCidadesPorUf(uf: string) {
  //   if (uf) {
  //     this.enderecoService.buscarCidadePorUf(uf).subscribe({
  //       next: (cidades) => {
  //         this.cidadesUf = cidades.map((cidade: any) => ({ label: cidade.nome, value: cidade.id }));
  //       },
  //       error: (error) => {
  //         console.error('Erro ao buscar cidades:', error);
  //         this.toastService.send(new ToastErrorModel('Erro', 'Não foi possível buscar as cidades.', ''));
  //         this.cidadesUf = [];
  //       },
  //     });
  //   } else {
  //     this.cidadesUf = [];
  //   }
  // }

  onSearchAirport(icao: string, tipo: 'partida' | 'chegada') {
    if (!icao) return;
  
    this.airportService.searchAirport(icao).subscribe({
      next: (airports) => {
        const mapped = airports.map(a => ({
          key: a.icao,
          description: `${a.icao} - ${a.airport}`
        }));

        mapped.push({
          key: 'sem-icao',
          description: 'Não possui ICAO (aeródromo privado)'
        });
  
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
          setTimeout(() => this.patchFlightForm());
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
  
    this.form.patchValue({
      partidaData: this.formatDateToInput(flight.departureDate),
      partidaHora: this.formatTimeToInput(flight.departureTime),
      aeroportoPartida: flight.departureAirport ?? 'sem-icao',
      localPartidaManual: flight.departureManualLocation ?? '',
  
      chegadaData: this.formatDateToInput(flight.arrivalDate),
      chegadaHora: this.formatTimeToInput(flight.arrivalTime),
      aeroportoChegada: flight.arrivalAirport ?? 'sem-icao',
      localChegadaManual: flight.arrivalManualLocation ?? '',
  
      tipoAeronave: flight.aircraftType,
      comentarioVoo: flight.flightComment,
      checkboxPernoite: flight.hasOvernight
    });

    setTimeout(() => {
      this.showCustomLocation.partida = !flight.departureAirport;
      this.showCustomLocation.chegada = !flight.arrivalAirport;

      const partidaKey = this.form.get('aeroportoPartida')?.value;
      const chegadaKey = this.form.get('aeroportoChegada')?.value;
    
      const partidaItem = this.aeroportosPartida.find(i => i.key === partidaKey);
      const chegadaItem = this.aeroportosChegada.find(i => i.key === chegadaKey);
    
      if (partidaItem) {
        this.selectAeroportoPartida?.select(partidaItem);
      }
    
      if (chegadaItem) {
        this.selectAeroportoChegada?.select(chegadaItem);
      }

      this.cdr.detectChanges();
    });
  }  

  private formatDateToInput(dateStr: string): string {
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  }
  
  private formatTimeToInput(datetimeStr: string): string {
    const date = new Date(datetimeStr);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }
}
