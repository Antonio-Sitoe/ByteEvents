import { Component } from '@angular/core';

@Component({
  selector: 'app-event-participant',
  imports: [],
  templateUrl: './event-participant.html',
})
export class EventParticipant {
  openAddParticipantModal() {
    console.log('Abrir modal para adicionar participante');
  }
}
