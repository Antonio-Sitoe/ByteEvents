import { InvitationService } from '@/core/http/invitation';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-participant-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.html',
})
export class ParticipantSignIn implements OnInit {
  ticketId: string = '';
  private invitationService = inject(InvitationService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.ticketId = this.activatedRoute.snapshot.queryParams['token'];
    if (this.ticketId) {
      this.handleLogin();
    }
  }

  async handleLogin() {
    if (this.ticketId) {
      try {
        console.log('Login attempt:', { ticketId: this.ticketId });
        const res = await firstValueFrom(
          this.invitationService.authParticipant({ token: this.ticketId })
        );
        console.log(res.participant[0].invitation.eventId);
        this.router.navigate(['confirm', res.participant[0].invitation.eventId], {
          queryParams: {
            token: this.ticketId,
            name: res.participant[0].contact.name,
            status: res.participant[0].invitation.status,
          },
        });
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    }
  }
}
