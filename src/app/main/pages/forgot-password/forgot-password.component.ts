import { Component, OnInit } from '@angular/core';
import { ButtonPrimaryComponent } from "../../../shared/components/forms/buttons/button-primary/button-primary.component";
import { InputTextComponent } from "../../../shared/components/forms/input-text/input-text.component";
import { ToastListComponent } from "../../../shared/components/feedback/toast-list/toast-list.component";
import { ToastErrorModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-error.model';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { ToastService } from '../../../shared/components/feedback/toast-list/services/toast.service';
import { ToastSuccessModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-success.model';
import { ToastWarnModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-warn.model';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    ButtonPrimaryComponent,
    RouterModule,
    ToastListComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{
  form!: FormGroup;
  step: number = 1;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  onSendCode(): void {
    if (this.form.get('email')?.invalid) {
      this.toastService.send(new ToastWarnModel('Aviso', 'Informe um e-mail válido.'));
      return;
    }

    this.isLoading = true;

    const email = this.form.get('email')?.value;

    this.authService.sendRecoveryCode(email)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: () => {
        this.toastService.send(new ToastSuccessModel('Código enviado', 'Verifique seu e-mail.'));
        this.step = 2;
      },
      error: () => {
        this.toastService.send(new ToastErrorModel('Erro', 'Não foi possível enviar o código.'));
      }
    });
  }

  onValidateCode(): void {
    const email = this.form.get('email')?.value;
    const code = this.form.get('code')?.value;

    if (!code) {
      this.toastService.send(new ToastWarnModel('Aviso', 'Informe o código recebido.'));
      return;
    }

    this.isLoading = true;

    this.authService.validateRecoveryCode(email, code)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: () => {
        this.toastService.send(new ToastSuccessModel('Código validado', 'Agora defina sua nova senha.'));
        this.step = 3;
      },
      error: () => {
        this.toastService.send(new ToastErrorModel('Erro', 'Código inválido ou expirado.'));
      }
    });
  }

  onResetPassword(): void {
    const newPassword = this.form.get('newPassword')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;

    if (!newPassword || !confirmPassword) {
      this.toastService.send(new ToastWarnModel('Aviso', 'Preencha os dois campos de senha.'));
      return;
    }

    if (newPassword !== confirmPassword) {
      this.toastService.send(new ToastWarnModel('Aviso', 'As senhas não coincidem.'));
      return;
    }

    this.isLoading = true;

    const email = this.form.get('email')?.value;
    const code = this.form.get('code')?.value;

    this.authService.resetPassword(email, code, newPassword)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: () => {
        this.toastService.send(new ToastSuccessModel('Senha redefinida', 'Você pode fazer login com sua nova senha.'));
        this.router.navigate(['/login']);
      },
      error: () => {
        this.toastService.send(new ToastErrorModel('Erro', 'Não foi possível redefinir a senha.'));
      }
    });
  }
}
