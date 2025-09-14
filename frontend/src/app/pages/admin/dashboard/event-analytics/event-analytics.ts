import { Component, Input, OnInit } from '@angular/core';
import { InvitationsSent } from '@/shared/components/invitations-sent/invitations-sent';
import { RegisteredParticipant } from '@/shared/components/registered-participant/registered-participant';
import { SpeackerDash } from '@/shared/components/speacker-dash/speacker-dash';
@Component({
  selector: 'app-event-analytics',
  imports: [InvitationsSent, RegisteredParticipant, SpeackerDash],
  templateUrl: './event-analytics.html',
})
export class EventAnalytics implements OnInit {
  @Input() eventId!: string;

  ngOnInit(): void {
    console.log(this.eventId);
  }
}
