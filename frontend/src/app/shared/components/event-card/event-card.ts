import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, DatePipe } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-event-card',
  imports: [NgIconComponent, NgClass, DatePipe],
  templateUrl: './event-card.html',
})
export class EventCard {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input() status: 'published' | 'draft' = 'draft';
  @Input() eventDate?: Date = new Date();
  @Input() registeredParticipants?: number;
  @Input() maxParticipants?: number;

  @Output() view = new EventEmitter<void>();
}
