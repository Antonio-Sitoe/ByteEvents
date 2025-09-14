import { Component, Input, inject } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { DatePipe, NgClass } from '@angular/common';
import { IEventData } from '@/core/@types/events';
import { getEventDisplay } from '@/shared/utils/get-event-display';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-dashboard',
  imports: [NgIconComponent, DatePipe, NgClass],
  templateUrl: './header-dashboard.html',
})
export class HeaderDashboard {
  @Input() event?: IEventData | null;
  @Input() isLoading: boolean = false;
  router = inject(Router);

  onBack() {
    this.router.navigate(['/']);
  }

  badgeColor = () => getEventDisplay(this.event?.status!).badge;
  getStatusLabel = () => getEventDisplay(this.event?.status!).label;
}
