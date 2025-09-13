import { Header } from '@/shared/components/header/header';
import { EventCard } from '@/shared/components/event-card/event-card';
import { IEventData } from '@/core/@types/events';
import { EventsService } from '@/core/http/events';
import { NgIconComponent } from '@ng-icons/core';
import { Component, OnInit } from '@angular/core';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';
import { CreateEvent } from '@/shared/components/modals/create-event/create-event';

@Component({
  selector: 'app-events',
  imports: [Header, NgIconComponent, EventCard],
  templateUrl: './events.html',
})
export class Events implements OnInit {
  isLoading = false;
  events: IEventData[] = [];

  constructor(private eventsService: EventsService, private dialogService: ZardDialogService) {}

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

  openCreateEventDialog() {
    const dialogRef = this.dialogService.create({
      zContent: CreateEvent,
      zTitle: 'Criar Novo Evento',
      zMaskClosable: true,
      zHideFooter: true,
      zOkText: null,
      zClosable: undefined,

      zOnOk: (component) => {
        return false;
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadEvents();
      }
    });
  }

  onViewEvent() {
    console.log('Ver detalhes do evento');
  }

  getEventDate(event: IEventData): Date {
    return new Date(event.start_datetime);
  }
}
