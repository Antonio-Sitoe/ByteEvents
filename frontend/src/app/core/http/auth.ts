import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { http } from './api';
import { ILoginRequest, ILoginResponse, IUser, IAuthState } from '../@types/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  private authState = signal<IAuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  public isAuthenticated = computed(() => this.authState().isAuthenticated);
  public currentUser = computed(() => this.authState().user);
  public currentToken = computed(() => this.authState().token);

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const user = localStorage.getItem(this.USER_KEY);

    if (token && user) {
      const parsedUser = JSON.parse(user);
      this.authState.set({
        isAuthenticated: true,
        token,
        user: parsedUser,
      });
    }
  }

  login(credentials: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${http}/auth/login`, credentials).pipe(
      tap((response) => {
        this.setAuth(response.token, response.user);
      })
    );
  }

  logout(): void {
    this.clearAuth();
    this.router.navigate(['/']);
  }

  private setAuth(token: string, user: IUser): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));

    this.authState.set({
      isAuthenticated: true,
      token,
      user,
    });
  }

  private clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);

    this.authState.set({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  }

  getToken(): string | null {
    return this.authState().token;
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
