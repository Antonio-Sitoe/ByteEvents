import { Header } from '@/shared/components/header/header';
import { EventCard } from '@/shared/components/event-card/event-card';
import { IEventData } from '@/core/@types/events';
import { EventsService } from '@/core/http/events';
import { NgIconComponent } from '@ng-icons/core';
import { Component, OnInit } from '@angular/core';
import { CreateEvent } from '@/shared/components/modals/create-event/create-event';
@Component({
  selector: 'app-events',
  imports: [Header, NgIconComponent, EventCard, CreateEvent],
  templateUrl: './events.html',
})
export class Events implements OnInit {
  isLoading = false;
  events: IEventData[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.isLoading = true;
    this.eventsService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        console.log(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
        this.isLoading = false;
      },
    });
  }

  onViewEvent() {
    console.log('Ver detalhes do evento');
  }

  getEventDate(event: IEventData): Date {
    return new Date(event.start_datetime);
  }
}
