import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { DigitalTicket } from '@/shared/components/digital-ticket/digital-ticket';
import { ActivatedRoute } from '@angular/router';
import { InvitationService } from '@/core/http/invitation';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-confirm',
  imports: [DigitalTicket],
  templateUrl: './confirm.html',
})
export class Confirm implements OnInit {
  participant = signal({});
  participantEvent = signal({});
  name = signal('');
  status = signal('');
  qrCode = signal('');
  private activatedRoute = inject(ActivatedRoute);
  private invitationService = inject(InvitationService);
  private eventId = inject(ActivatedRoute).snapshot.params['id'];
  ngOnInit(): void {
    this.name.set(this.activatedRoute.snapshot.queryParams['name']);
    this.status.set(this.activatedRoute.snapshot.queryParams['status']);
    this.qrCode.set(this.activatedRoute.snapshot.queryParams['token']);
  }

  async handleConfirmParticipation() {
    try {
      const res = await firstValueFrom(
        this.invitationService.acceptInvitation({
          eventId: this.eventId,
          token: this.activatedRoute.snapshot.queryParams['token'],
        })
      );
      console.log('Confirmando participação...', res);
      this.participant.set(res.data);
      this.participantEvent.set(res.data.eventId);
      this.status.set(res.data.status);
      this.qrCode.set(res.data.token);
    } catch (error) {
      console.error('Erro ao confirmar participação:', error);
    }
  }
}
