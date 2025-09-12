import { Component } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { EventCard } from '@/shared/components/event-card/event-card';
import { Header } from '@/shared/components/header/header';

@Component({
  selector: 'app-events',
  imports: [Header, NgIconComponent, EventCard],
  templateUrl: './events.html',
})
export class Events {
  new: Date | undefined;
}
