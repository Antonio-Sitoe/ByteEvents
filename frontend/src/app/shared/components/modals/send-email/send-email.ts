import { Component, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Z_MODAL_DATA } from '../../dialog/dialog.service';
import { FormsModule } from '@angular/forms';
import { IContact } from '@/core/@types/contact';
import { InvitationService } from '@/core/http/invitation';
import { ZardDialogRef } from '../../dialog/dialog-ref';
import { toast } from 'ngx-sonner';
import { NgIconComponent } from '@ng-icons/core';

interface SendEmailData {
  emails: string[];
  subject: string;
}

@Component({
  selector: 'app-send-email',
  imports: [FormsModule, NgIconComponent],
  templateUrl: './send-email.html',
})
export class SendEmail {
  private readonly dialogRef = inject(ZardDialogRef);
  private readonly modalData = inject(Z_MODAL_DATA);
  private readonly invitationService = inject(InvitationService);
  selectedContacts = this.modalData?.contacts || [];
  isSubmitting = signal(false);
  subject: string = '';
  eventId = this.modalData.eventId as string;

  async handleSendInvites() {
    this.isSubmitting.set(true);
    const sendEmailData: SendEmailData = {
      emails: this.selectedContacts.map((contact: IContact) => contact.email),
      subject: this.subject,
    };
    await firstValueFrom(this.invitationService.sendEmail(sendEmailData, this.eventId));
    toast.success('Convites enviados com sucesso', {
      description: 'Convites enviados com sucesso',
    });
    this.dialogRef.close({ success: true });

    this.isSubmitting.set(false);
  }
}
