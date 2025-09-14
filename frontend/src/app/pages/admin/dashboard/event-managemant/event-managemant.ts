import { Component, inject, OnInit, signal } from '@angular/core';
import { ISpeaker } from '@/core/@types/speakers';
import { ActivatedRoute } from '@angular/router';
import { CreateSpeackers } from '@/shared/components/modals/create-speackers/create-speackers';
import { SpeakersService } from '@/core/http/speackers';
import { NgIconComponent } from '@ng-icons/core';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';
import { ZardAlertDialogService } from '@/shared/components/alert-dialog/alert-dialog.service';
@Component({
  selector: 'app-event-managemant',
  imports: [NgIconComponent],
  templateUrl: './event-managemant.html',
})
export class EventManagemant implements OnInit {
  isLoading = false;
  speakers = signal<ISpeaker[]>([]);
  eventId = inject(ActivatedRoute).snapshot.params['id'];

  private alertDialogService = inject(ZardAlertDialogService);
  private readonly speakersService = inject(SpeakersService);
  constructor(private dialogService: ZardDialogService) {}

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
    const dialogRef = this.dialogService.create({
      zContent: CreateSpeackers,
      zTitle: 'Criar Novo Palestrante',
      zMaskClosable: true,
      zHideFooter: true,
      zOkText: null,
      zClosable: undefined,
      zData: { eventId: this.eventId },
      zOnOk: () => {
        return false;
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadSpeakers();
      }
    });
  }

  handleEditSpeaker(speaker: ISpeaker) {
    console.log('Editar palestrante:', speaker);
    const dialogRef = this.dialogService.create({
      zContent: CreateSpeackers,
      zTitle: 'Editar Palestrante',
      zMaskClosable: true,
      zHideFooter: true,
      zOkText: null,
      zClosable: undefined,
      zData: { eventId: this.eventId, speaker: speaker },
      zOnOk: () => {
        return false;
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadSpeakers();
      }
    });
  }

  handleDeleteSpeaker(speaker: ISpeaker) {
    this.alertDialogService.confirm({
      zTitle: 'Você tem certeza absoluta?',
      zDescription:
        'Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados dos nossos servidores.',
      zOkText: 'Continuar',
      zCancelText: 'Cancelar',
      zOnOk: () => {
        this.speakersService.delete(speaker?.id!).subscribe({
          next: () => {
            this.loadSpeakers();
          },
        });
      },
    });
  }
}
