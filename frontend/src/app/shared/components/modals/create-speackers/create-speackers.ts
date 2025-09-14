import { Component, inject, signal } from '@angular/core';
import { ISpeaker } from '@/core/@types/speakers';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ZardDialogRef } from '../../dialog/dialog-ref';
import { SpeakersService } from '@/core/http/speackers';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ZardFormFieldComponent,
  ZardFormControlComponent,
  ZardFormLabelComponent,
  ZardFormMessageComponent,
} from '../../form/form.component';
import { ZardInputDirective } from '../../input/input.directive';
import { ZardButtonComponent } from '../../button/button.component';
import { Z_MODAL_DATA } from '../../dialog/dialog.service';

export interface IFormData extends ISpeaker {}

@Component({
  selector: 'app-create-speackers',
  imports: [
    ReactiveFormsModule,
    ZardFormFieldComponent,
    ZardFormControlComponent,
    ZardFormLabelComponent,
    ZardFormMessageComponent,
    ZardInputDirective,
    ZardButtonComponent,
  ],
  templateUrl: './create-speackers.html',
})
export class CreateSpeackers {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(ZardDialogRef);
  private readonly speakersService = inject(SpeakersService);
  readonly showSuccess = signal(false);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');
  private readonly modalData = inject(Z_MODAL_DATA, { optional: true });
  readonly eventId = this.modalData?.eventId || '';
  readonly speaker = this.modalData?.speaker || null;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    topic: ['', [Validators.required, Validators.minLength(2)]],
    bio: ['', [Validators.required, Validators.minLength(10)]],
    startTime: ['', Validators.required],
    duration: [0, [Validators.required, Validators.min(1)]],
  });

  constructor() {
    if (this.speaker) {
      this.form.patchValue({
        name: this.speaker!.name,
        topic: this.speaker!.topic,
        bio: this.speaker!.bio,
        startTime: this.speaker!.startTime,
        duration: this.speaker!.duration,
      });
    }
  }

  isFieldInvalid(fieldName: keyof IFormData): boolean {
    const field = this.form.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  async handleSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    try {
      const formData = this.form.getRawValue();
      const speakerData: ISpeaker = {
        ...this.speaker!,
        name: formData.name,
        topic: formData.topic,
        bio: formData.bio,
        startTime: formData.startTime,
        duration: formData.duration,
        eventId: this.eventId,
      };

      if (this.speaker) {
        await firstValueFrom(this.speakersService.update(speakerData, this.speaker!.id));
      } else {
        await firstValueFrom(this.speakersService.create(speakerData));
      }

      this.isSubmitting.set(false);
      this.showSuccess.set(true);
      this.form.reset();

      this.dialogRef.close({ success: true });

      setTimeout(() => {
        this.showSuccess.set(false);
      }, 1000);
    } catch (error) {
      this.isSubmitting.set(false);
      console.error('Erro ao salvar palestrante:', error);
      if (error instanceof HttpErrorResponse) {
        const backendMsg = error.error?.message || error.message;
        this.errorMessage.set(`Erro ao salvar palestrante: ${backendMsg}`);
      } else {
        this.errorMessage.set('Erro inesperado ao salvar palestrante.');
      }
    }
  }

  resetForm(): void {
    this.form.reset();
    this.errorMessage.set('');
    this.showSuccess.set(false);
  }
}
