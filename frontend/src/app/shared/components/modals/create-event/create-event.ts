import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ZardDialogRef } from '../../dialog/dialog-ref';

import { ZardFormModule } from '../../form/form.module';
import { ZardInputDirective } from '../../input/input.directive';
import { ZardButtonComponent } from '../../button/button.component';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { EventsService } from '@/core/http/events';
import { ICreateEventData } from '@/core/@types/events';
import { HttpErrorResponse } from '@angular/common/http';

export interface FormData {
  title: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  location: string;
}

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.html',
  standalone: true,
  imports: [ReactiveFormsModule, ZardButtonComponent, ZardInputDirective, ZardFormModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CreateEvent {
  private readonly fb = inject(FormBuilder);
  private readonly eventsService = inject(EventsService);
  private readonly dialogRef = inject(ZardDialogRef);
  readonly showSuccess = signal(false);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  readonly form = this.fb.nonNullable.group(
    {
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      start_datetime: ['', Validators.required],
      end_datetime: [''],
      location: ['', [Validators.required]],
    },
    { validators: this.dateRangeValidator }
  );

  isFieldInvalid(fieldName: keyof FormData): boolean {
    const field = this.form.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  getDateError(): string {
    const formErrors = this.form.errors;
    if (formErrors?.['dateRange']) {
      return formErrors['dateRange'];
    }
    return '';
  }

  private dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('start_datetime')?.value;
    const endDate = control.get('end_datetime')?.value;

    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return { dateRange: 'A data de fim não pode ser anterior à data de início' };
    }

    return null;
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
      const eventData: ICreateEventData = {
        title: formData.title,
        description: formData.description,
        start_datetime: formData.start_datetime,
        end_datetime: formData.end_datetime,
        location: formData.location,
        status: 'DRAFT',
        organizer_id: 'cc47f8bb-4534-4921-a77c-d3b14d251d54',
      };

      await firstValueFrom(this.eventsService.createEvent(eventData));

      this.isSubmitting.set(false);
      this.showSuccess.set(true);
      this.form.reset();

      console.log('Event created successfully:', formData);

      setTimeout(() => {
        this.showSuccess.set(false);
        this.dialogRef.close({ success: true });
      }, 1000);
    } catch (error) {
      this.isSubmitting.set(false);
      console.error('Error creating event:', error);
      if (error instanceof HttpErrorResponse) {
        const backendMsg = error.error?.message || error.message;
        this.errorMessage.set(`Erro ao criar evento: ${backendMsg}`);
      } else {
        this.errorMessage.set('Erro inesperado ao criar evento.');
      }
    }
  }

  resetForm(): void {
    this.form.reset();
    this.showSuccess.set(false);
    this.errorMessage.set('');
  }
}
