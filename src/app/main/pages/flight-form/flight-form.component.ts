import { Component } from '@angular/core';
import { InputTextComponent } from "../../../shared/components/forms/input-text/input-text.component";
import { TextareaComponent } from "../../../shared/components/forms/textarea/textarea.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputCheckboxComponent } from "../../../shared/components/forms/input-checkbox/input-checkbox.component";
import { ButtonPrimaryComponent } from "../../../shared/components/forms/buttons/button-primary/button-primary.component";
import { ButtonSecondaryComponent } from "../../../shared/components/forms/buttons/button-secondary/button-secondary.component";

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [InputTextComponent, TextareaComponent, InputCheckboxComponent, ButtonPrimaryComponent, ButtonSecondaryComponent],
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.scss'
})
export class FlightFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ){
    this.form = this.fb.group({
      partidaData: ['', Validators.required],
      partidaHora: ['', Validators.required],
      partidaLocal: ['', Validators.required],
  
      chegadaData: ['', Validators.required],
      chegadaHora: ['', Validators.required],
      chegadaLocal: ['', Validators.required],
  
      tipoAeronave: ['', Validators.required],
  
      comentarioVoo: [''],
      checkboxPernoite: [false]
    });
  }
}
