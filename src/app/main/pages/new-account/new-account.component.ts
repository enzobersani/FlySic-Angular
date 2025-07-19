import { Component, ViewChild } from '@angular/core';
import { InputTextComponent } from "../../../shared/components/forms/input-text/input-text.component";
import { ButtonPrimaryComponent } from "../../../shared/components/forms/buttons/button-primary/button-primary.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFileComponent } from "../../../shared/components/forms/input-file/input-file.component";
import { InputFileNewComponent } from "../../../shared/components/forms/input-file-new/input-file-new.component";
import { InputCheckboxComponent } from "../../../shared/components/forms/input-checkbox/input-checkbox.component";
import { FileType } from '../../../shared/components/forms/input-file/enums/file-type.enum';
import { NewAccountService } from './service/new-account.service';
import { ModalComponent } from "../../../shared/components/modals/modal/modal.component";
import { TermsComponent } from "../terms/terms.component";
import { FeedbackComponent } from "../../../shared/components/feedback/feedback/feedback.component";
import { FeedbackTypeEnum } from '../../../shared/components/feedback/feedback/enums/feedback-type.enum';
import { LoadingComponent } from "../../../shared/layout/loading/loading.component";
import { Router } from '@angular/router';
import { CalendarSingleComponent } from "../../../shared/components/forms/calendar-single/calendar-single.component";

@Component({
  selector: 'app-new-account',
  standalone: true,
  imports: [
    InputTextComponent,
    ButtonPrimaryComponent,
    ReactiveFormsModule,
    CommonModule,
    InputFileComponent,
    InputCheckboxComponent,
    ModalComponent,
    TermsComponent,
    FeedbackComponent,
    LoadingComponent,
    CalendarSingleComponent
],
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.scss'
})
export class NewAccountComponent {
  @ViewChild('modalTermos') modalTerms!: ModalComponent;
  @ViewChild('modalResponse') modalResponse!: ModalComponent;
  imagePreviewUrl?: string;
  registerForm!: FormGroup;
  fileTypes: FileType[] = [
    FileType.JPEG,
    FileType.PNG,
    FileType.JPG,
    FileType.PDF
  ];
  feedbackTypes: FeedbackTypeEnum [] = [
    FeedbackTypeEnum.SUCCESS,
    FeedbackTypeEnum.WAITING,
    FeedbackTypeEnum.WARNING,
  ];
  loading: boolean = false;
  isModalSuccess: boolean = false;
  isModalError: boolean = false;
  mensagemErro: string = '';

  constructor(
    private fb: FormBuilder, 
    private newAccountService: NewAccountService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      birthYear: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      documentPicture: [null, Validators.required],
      checkboxTermos: [false, Validators.requiredTrue]
    });
  }

  createNewAccount(): void {
    const rawCpf = this.registerForm.get('cpf')?.value.replace(/\D/g, '');   
    const rawPhone = this.registerForm.get('phone')?.value.replace(/\D/g, '');

    const file: File = this.registerForm.get('documentPicture')?.value;
    const formData = new FormData();

    const birthValue = this.registerForm.get('birthYear')?.value;
    const birthDate = birthValue?.initialDate ? new Date(birthValue.initialDate).toISOString() : '';

    formData.append('name', this.registerForm.get('name')?.value);
    formData.append('birthDate', birthDate);
    formData.append('cpf', rawCpf);
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('phone', rawPhone);
    formData.append('isAcceptedTerms', this.registerForm.get('checkboxTermos')?.value.toString());
    formData.append('isDonateHours', this.registerForm.get('checkboxDoandoHoras')?.value.toString());
    formData.append('isSearchHours', this.registerForm.get('checkboxBuscandoHoras')?.value.toString());

    if (file) {
      formData.append('document', file, file.name);
    }

    this.loading = true;
    this.modalResponse.open();
    this.newAccountService.registerNewUser(formData).subscribe({
      next: () => {
        this.isModalSuccess = true;
        this.loading = false;
      },
      error: err => {
        this.isModalError = true;
        console.error('Erro ao enviar', err);
        this.loading = false;

        this.registerForm.reset();
        this.registerForm.patchValue({ checkboxTermos: false })
        if (err.status === 400 && err.error){
          this.mensagemErro = err.error.notifications[0].message;
        } else {
          this.mensagemErro = "Erro ao finalizar o pedido. Tente novamente. Caso continue, acione o suporte.";
        }
      }
    });
  }

  inputFileChange(files: File[]): void {
    const file = files[0];
    if (!file) return;
  
    this.imagePreviewUrl = URL.createObjectURL(file);
  
    this.registerForm.patchValue({
      documentPicture: file
    });
  }

  abrirModal(){
    this.modalTerms.open();
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
