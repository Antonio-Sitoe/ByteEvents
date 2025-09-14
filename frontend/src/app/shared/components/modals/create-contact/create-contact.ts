import {
  ZardFormFieldComponent,
  ZardFormControlComponent,
  ZardFormLabelComponent,
  ZardFormMessageComponent,
} from '../../form/form.component';

import { IContact } from '@/core/@types/contact';
import { Z_MODAL_DATA } from '../../dialog/dialog.service';
import { ZardDialogRef } from '../../dialog/dialog-ref';
import { firstValueFrom } from 'rxjs';
import { NgIconComponent } from '@ng-icons/core';
import { ContactsService } from '@/core/http/contacts';
import { HttpErrorResponse } from '@angular/common/http';
import { ZardInputDirective } from '../../input/input.directive';
import { ZardButtonComponent } from '../../button/button.component';
import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface IFormData extends IContact {}

@Component({
  selector: 'app-create-contact',
  imports: [
    FormsModule,
    NgIconComponent,
    ZardInputDirective,
    ZardButtonComponent,
    ReactiveFormsModule,
    ZardFormFieldComponent,
    ZardFormLabelComponent,
    ZardFormControlComponent,
    ZardFormMessageComponent,
  ],
  templateUrl: './create-contact.html',
})
export class CreateContact implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(ZardDialogRef);
  private readonly modalData = inject(Z_MODAL_DATA, { optional: true });
  private readonly contactsService = inject(ContactsService);

  readonly showSuccess = signal(false);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');
  readonly contact = this.modalData?.contact || null;
  tags = signal<string[]>([]);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    newTag: [''],
  });

  ngOnInit(): void {
    if (this.contact) {
      this.form.patchValue({
        name: this.contact.name,
        email: this.contact.email,
        phone: this.contact.phone || '',
      });
      this.tags.set(this.contact.tags || []);
    }
  }

  isFieldInvalid(fieldName: keyof IFormData): boolean {
    const field = this.form.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  addTag() {
    const tag = this.form.get('newTag')?.value?.trim() || '';
    if (tag && !this.tags().includes(tag)) {
      this.tags.update((tags) => [...tags, tag]);
      this.form.get('newTag')?.setValue('');
    }
  }

  removeTag(tagToRemove: string) {
    this.tags.update((tags) => tags.filter((tag) => tag !== tagToRemove));
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTag();
    }
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
      const contactData: IContact = {
        id: this.contact?.id || '',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        tags: this.tags(),
      };

      let contact: IContact;

      if (this.contact?.id) {
        contact = await firstValueFrom(this.contactsService.update(this.contact.id, contactData));
      } else {
        contact = await firstValueFrom(this.contactsService.create(contactData));
      }

      console.log('Contacto salvo com sucesso:', contact);

      this.isSubmitting.set(false);
      this.showSuccess.set(true);
      this.form.reset();
      this.tags.set([]);

      setTimeout(() => {
        this.dialogRef.close({ success: true });
        this.showSuccess.set(false);
      }, 1000);
    } catch (error) {
      this.isSubmitting.set(false);
      console.error('Erro ao salvar contacto:', error);
      if (error instanceof HttpErrorResponse) {
        const backendMsg = error.error?.message || error.message;
        this.errorMessage.set(`Erro ao salvar contacto: ${backendMsg}`);
      } else {
        this.errorMessage.set('Erro inesperado ao salvar contacto.');
      }
    }
  }

  resetForm(): void {
    this.form.reset();
    this.tags.set([]);
    this.errorMessage.set('');
    this.showSuccess.set(false);
  }
}
