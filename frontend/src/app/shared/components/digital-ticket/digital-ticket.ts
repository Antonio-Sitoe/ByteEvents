import { Component, Input } from '@angular/core';
import { QrCodeComponent } from 'ng-qrcode';

@Component({
  selector: 'app-digital-ticket',
  imports: [ QrCodeComponent],
  templateUrl: './digital-ticket.html',
})
export class DigitalTicket {
  @Input() qrCode!: string;
}
