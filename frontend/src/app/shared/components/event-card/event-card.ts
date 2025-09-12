import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, DatePipe } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';
import { EventStatus } from '@/core/@types/events';
import { getEventDisplay } from '@/shared/utils/get-event-display';

@Component({
  selector: 'app-event-card',
  imports: [NgIconComponent, NgClass, DatePipe],
  templateUrl: './event-card.html',
})
export class EventCard {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input() status: EventStatus = 'DRAFT';
  @Input() eventDate?: Date;
  @Input({ required: true }) location!: string;

  @Output() view = new EventEmitter<void>();
  badgeColor = () => getEventDisplay(this.status).badge;
  getStatusLabel = () => getEventDisplay(this.status).label;
}
