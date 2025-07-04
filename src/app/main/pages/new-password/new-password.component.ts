import { Component } from '@angular/core';
import { ButtonPrimaryComponent } from "../../../shared/components/forms/buttons/button-primary/button-primary.component";
import { InputTextComponent } from "../../../shared/components/forms/input-text/input-text.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonSecondaryComponent } from "../../../shared/components/forms/buttons/button-secondary/button-secondary.component";
import { UserService } from '../../common/services/user.service';
import { UpdatePasswordModel } from '../../common/models/update-password.model';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { ToastListComponent } from "../../../shared/components/feedback/toast-list/toast-list.component";
import { ToastService } from '../../../shared/components/feedback/toast-list/services/toast.service';
import { ToastSuccessModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-success.model';
import { ToastErrorModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-error.model';
import { ToastWarnModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-warn.model';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    InputTextComponent,
    CommonModule,
    ReactiveFormsModule,
    ButtonSecondaryComponent,
    ToastListComponent
],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  passwordForm: FormGroup;
  isLoading = false;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    const userId = this.authService.getDecodedToken()?.sub
    if (userId) this.userId = userId
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      this.isLoading = true;
      const formValue = this.passwordForm.value;
      const request: UpdatePasswordModel = {
        userId: this.userId,
        oldPassword: formValue.currentPassword,
        newPassword: formValue.newPassword,
        confirmPassword: formValue.confirmPassword
      };

      this.userService.updatePassword(request).subscribe({
        next: (response) => {
          this.passwordForm.reset();
          this.toastService.send(new ToastSuccessModel("Sucesso", "Senha alterada com sucesso.", "Agora"));
          this.isLoading = false;
        },
        error: (err) => {
          if (err.status === 400 && err.error){
            this.toastService.send(new ToastWarnModel("Aviso", err.error.notifications[0].message, "Agora")); 
          } else {
            this.toastService.send(new ToastErrorModel("Erro", "Ocorreu um erro.", "Agora"));
          }
          this.isLoading = false;
        }
      })
    }
  }
}
