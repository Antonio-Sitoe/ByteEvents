import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@/core/http/auth';
import { ILoginRequest } from '@/core/@types/auth';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.html',
})
export class SignIn {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  loginForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      const credentials: ILoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      try {
        await firstValueFrom(this.authService.login(credentials));
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/events';
        this.router.navigate([returnUrl]);
      } catch (error: any) {
        this.errorMessage.set(
          error.error?.message || 'Erro ao fazer login. Verifique suas credenciais.'
        );
        console.error('Login error:', error);
      } finally {
        this.isLoading.set(false);
      }
    } else {
      this.errorMessage.set('Por favor, preencha todos os campos corretamente.');
    }
  }
}
