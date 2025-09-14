import { InvitationService } from '@/core/http/invitation';
import { Component, inject, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-invitations-sent',
  imports: [],
  templateUrl: './invitations-sent.html',
})
export class InvitationsSent implements OnInit {
  @Input() eventId!: string;
  private readonly invitationService = inject(InvitationService);
  value = signal(0);
  ngOnInit(): void {
    if (this.eventId) {
      this.invitationService.getStatics(this.eventId).subscribe((res) => {
        this.value.set(res.data.total);
      });
    }
  }
}
