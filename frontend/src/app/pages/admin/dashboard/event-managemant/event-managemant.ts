import { Component, inject, OnInit, signal } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { ISpeaker } from '@/core/@types/speakers';
import { SpeakersService } from '@/core/http/speackers';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-managemant',
  imports: [NgIconComponent, DatePipe],
  templateUrl: './event-managemant.html',
})
export class EventManagemant implements OnInit {
  private readonly speakersService = inject(SpeakersService);
  isLoading = false;
  speakers = signal<ISpeaker[]>([]);
  eventId = inject(ActivatedRoute).snapshot.params['id'];

  ngOnInit(): void {
    if (this.eventId) {
      this.loadSpeakers();
    }
  }

  loadSpeakers() {
    this.isLoading = true;
    this.speakersService.findAll(this.eventId).subscribe({
      next: (speakers) => {
        this.speakers.set(speakers.speakers);
        console.log(speakers.speakers);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar palestrantes:', err);
        this.isLoading = false;
      },
    });
  }

  openAddSpeakerModal() {
    console.log('Abrir modal para adicionar palestrante');
  }

  handleEditSpeaker(speaker: ISpeaker) {
    console.log('Editar palestrante:', speaker);
  }

  handleDeleteSpeaker(speakerId: string) {
    console.log('Deletar palestrante com ID:', speakerId);
    this.speakers.update((currentSpeakers) => currentSpeakers.filter((s) => s.name !== speakerId));
  }
}
