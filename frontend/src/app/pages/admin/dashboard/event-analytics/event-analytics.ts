import { Component, Input } from '@angular/core';
import { InvitationsSent } from '@/shared/components/invitations-sent/invitations-sent';
import { RegisteredParticipant } from '@/shared/components/registered-participant/registered-participant';
import { SpeackerDash } from '@/shared/components/speacker-dash/speacker-dash';
import { LineEvoluationChart } from '@/shared/components/line-evoluation-chart/line-evoluation-chart';

@Component({
  selector: 'app-event-analytics',
  imports: [InvitationsSent, RegisteredParticipant, SpeackerDash, LineEvoluationChart],
  templateUrl: './event-analytics.html',
})
export class EventAnalytics {
  @Input() eventId!: string;
}
