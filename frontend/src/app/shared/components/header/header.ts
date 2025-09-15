import { AuthService } from '@/core/http/auth';
import { Component, inject } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-header',
  imports: [NgIconComponent],
  templateUrl: './header.html',
})
export class Header {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
