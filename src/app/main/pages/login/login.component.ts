import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from "../../../shared/components/forms/input-text/input-text.component";
import { ButtonPrimaryComponent } from "../../../shared/components/forms/buttons/button-primary/button-primary.component";
import { Router, RouterModule } from '@angular/router';
import { ToastListComponent } from "../../../shared/components/feedback/toast-list/toast-list.component";
import { ToastService } from '../../../shared/components/feedback/toast-list/services/toast.service';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { AuthResponseModel } from '../../../infrastructure/models/auth-response.model';
import { ToastErrorModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-error.model';
import { ToastWarnModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-warn.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextComponent,
    ButtonPrimaryComponent,
    RouterModule,
    ToastListComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.toastService.send(new ToastWarnModel("Aviso", "Email e senha obrigatórios."))
      return;
    }

    this.isLoading = true;

    const { userName, password } = this.loginForm.value;

    this.authService.login(userName, password).subscribe({
      next: (response: AuthResponseModel) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error.notifications)
          this.toastService.send(new ToastWarnModel("Aviso", "Email ou senha inválido."));
        else
          this.toastService.send(new ToastErrorModel("Erro", "Ocorreu um erro ao tentar realizar login."))
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
