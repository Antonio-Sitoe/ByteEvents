import { SpeakersService } from '@/core/http/speackers';
import { Component, inject, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-speacker-dash',
  imports: [],
  templateUrl: './speacker-dash.html',
})
export class SpeackerDash implements OnInit {
  @Input() eventId!: string;
  private readonly speakersService = inject(SpeakersService);
  speakers = signal<number>(0);

  ngOnInit(): void {
    if (this.eventId) {
      console.log(this.eventId);
      this.speakersService.findAll(this.eventId).subscribe((speakers) => {
        this.speakers.set(speakers.speakers.length);
        console.log(speakers);
      });
    }
  }
}
