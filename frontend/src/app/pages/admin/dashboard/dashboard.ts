import { IEventData } from '@/core/@types/events';
import { EventsService } from '@/core/http/events';
import { ActivatedRoute } from '@angular/router';
import { HeaderDashboard } from '@/shared/components/header-dashboard/header-dashboard';
import { EventAnalytics } from './event-analytics/event-analytics';
import { NgIconComponent } from '@ng-icons/core';
import { EventManagemant } from './event-managemant/event-managemant';
import { EventParticipant } from './event-participant/event-participant';
import { Component, inject, OnInit, signal } from '@angular/core';

type Tab = 'dashboard' | 'event' | 'participants';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderDashboard, NgIconComponent, EventAnalytics, EventManagemant, EventParticipant],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly eventsService = inject(EventsService);
  event: IEventData | null = null;
  eventId = inject(ActivatedRoute).snapshot.params['id'];
  isLoading = false;
  activeTab = signal<Tab>('participants');

  ngOnInit(): void {
    if (this.eventId) {
      this.loadEvent(this.eventId);
    }
  }

  loadEvent(eventId: string) {
    this.isLoading = true;

    this.eventsService.getEventById(eventId).subscribe({
      next: (event) => {
        this.event = event;
        console.log(event);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar evento:', error);
        this.isLoading = false;
      },
    });
  }

  setActiveTab(tab: Tab) {
    this.activeTab.set(tab);
  }
}
