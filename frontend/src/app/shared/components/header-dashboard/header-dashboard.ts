import { Component, Input, inject } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { DatePipe, NgClass } from '@angular/common';
import { IEventData } from '@/core/@types/events';
import { getEventDisplay } from '@/shared/utils/get-event-display';
import { Router } from '@angular/router';
import { AuthService } from '@/core/http/auth';

@Component({
  selector: 'app-header-dashboard',
  imports: [NgIconComponent, DatePipe, NgClass],
  templateUrl: './header-dashboard.html',
})
export class HeaderDashboard {
  @Input() event?: IEventData | null;
  @Input() isLoading: boolean = false;
  router = inject(Router);
  authService = inject(AuthService);

  onBack() {
    this.router.navigate(['/events']);
  }

  onLogout() {
    this.authService.logout();
  }

  badgeColor = () => getEventDisplay(this.event?.status!).badge;
  getStatusLabel = () => getEventDisplay(this.event?.status!).label;
}
