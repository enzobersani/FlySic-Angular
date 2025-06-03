import { Component, OnInit } from '@angular/core';
import { InputTextComponent } from "../../../shared/components/forms/input-text/input-text.component";
import { TextareaComponent } from "../../../shared/components/forms/textarea/textarea.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputCheckboxComponent } from "../../../shared/components/forms/input-checkbox/input-checkbox.component";
import { ButtonPrimaryComponent } from "../../../shared/components/forms/buttons/button-primary/button-primary.component";
import { ButtonSecondaryComponent } from "../../../shared/components/forms/buttons/button-secondary/button-secondary.component";
import { ESTADOS_BRASIL } from '../../common/models/estados-brasil.model';
import { SelectComponent } from "../../../shared/components/forms/select/select.component";
import { SelectItemModel } from '../../../shared/components/forms/select/models/select-item.model';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs';
import { IbgeService } from '../../common/services/ibge.service';

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [
    InputTextComponent,
    TextareaComponent,
    InputCheckboxComponent,
    ButtonSecondaryComponent,
    SelectComponent
],
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.scss'
})
export class FlightFormComponent implements OnInit{
  form: FormGroup;
  selectItems: SelectItemModel[] = [
    { key: 1, description: 'Sim' },
    { key: 0, description: 'Não' }
  ]
  estadoBrasil = ESTADOS_BRASIL;
  cidadesPartida: SelectItemModel[] = [];
  cidadesChegada: SelectItemModel[] = [];
  carregandoCidades = false;

  constructor(
    private fb: FormBuilder,
    private ibgeService: IbgeService
  ){
    this.form = this.fb.group({
      partidaData: ['', Validators.required],
      partidaHora: ['', Validators.required],
      partidaUf: ['', Validators.required],
      partidaLocal: ['', Validators.required],

      chegadaData: ['', Validators.required],
      chegadaHora: ['', Validators.required],
      chegadaUf: ['', Validators.required],
      chegadaLocal: ['', Validators.required],

      tipoAeronave: ['', Validators.required],
      comentarioVoo: [''],
      checkboxPernoite: [false]
    });
  }

  ngOnInit(): void {
  
  }

  onSubmit(){
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
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
}
