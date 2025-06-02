import { Component } from '@angular/core';
import { ButtonPrimaryComponent } from "../../../shared/components/forms/buttons/button-primary/button-primary.component";
import { InputTextComponent } from "../../../shared/components/forms/input-text/input-text.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TabComponent } from "../../../shared/components/navigation/tab/tab.component";
import { TabItemComponent } from "../../../shared/components/navigation/tab/tab-item/tab-item.component";
import { TabHeaderComponent } from "../../../shared/components/navigation/tab/tab-item/tab-header/tab-header.component";
import { ButtonSecondaryComponent } from "../../../shared/components/forms/buttons/button-secondary/button-secondary.component";

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    ButtonPrimaryComponent,
    InputTextComponent,
    CommonModule,
    ReactiveFormsModule,
    TabComponent,
    TabItemComponent,
    TabHeaderComponent,
    ButtonSecondaryComponent
],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  passwordForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      this.isLoading = true;
      
      // Simulando uma requisição assíncrona
      setTimeout(() => {
        console.log('Dados do formulário:', this.passwordForm.value);
        this.isLoading = false;
        
        // Aqui você faria a chamada para o serviço de alteração de senha
        // this.authService.changePassword(this.passwordForm.value).subscribe(...)
      }, 1500);
    }
  }
}
