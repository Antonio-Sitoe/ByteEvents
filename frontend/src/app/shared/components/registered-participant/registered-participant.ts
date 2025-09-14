import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { InvitationService } from '../../../core/http/invitation';

@Component({
  selector: 'app-registered-participant',
  imports: [],
  templateUrl: './registered-participant.html',
})
export class RegisteredParticipant implements OnInit {
  @Input() eventId!: string;
  private readonly invitationService = inject(InvitationService);
  value = signal(0);
  invitationsSent = signal(0);

  ngOnInit(): void {
    if (this.eventId) {
      this.invitationService.getStatics(this.eventId).subscribe((res) => {
        this.value.set(res.data.accepted);
        this.invitationsSent.set(res.data.total);
        console.log(res);
      });
    }
  }
}
