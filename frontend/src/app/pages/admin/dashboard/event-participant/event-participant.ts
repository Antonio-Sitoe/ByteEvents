import { Component, inject, OnInit, signal } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { IContact } from '@/core/@types/contact';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';
import { CreateContact } from '@/shared/components/modals/create-contact/create-contact';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '@/core/http/contacts';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardAlertDialogService } from '@/shared/components/alert-dialog/alert-dialog.service';
import { ModernCheckbox } from '@/shared/components/modern-checkbox/modern-checkbox';
import { SendEmail } from '@/shared/components/modals/send-email/send-email';

type Contact = IContact;

@Component({
  selector: 'app-event-participant',
  imports: [NgIconComponent, FormsModule, ZardButtonComponent, ModernCheckbox],
  templateUrl: './event-participant.html',
})
export class EventParticipant implements OnInit {
  searchTerm = signal('');
  selectedContacts = signal<Contact[]>([]);
  selectAllChecked = false;
  eventId = inject(ActivatedRoute).snapshot.params['id'];
  private alertDialogService = inject(ZardAlertDialogService);

  contacts = signal<Contact[]>([]);
  constructor(private dialogService: ZardDialogService, private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.selectedContacts.set([]);
    this.selectAllChecked = false;
    this.contactsService.findAll().subscribe(({ contacts }) => {
      this.contacts.set(contacts);
    });
  }

  get filteredContacts(): Contact[] {
    let filtered = this.contacts();

    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(term) || contact.email.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  openAddParticipantModal() {
    const dialogRef = this.dialogService.create({
      zContent: CreateContact,
      zTitle: 'Criar Novo Contacto',
      zMaskClosable: true,
      zHideFooter: true,
      zOkText: null,
      zClosable: undefined,
      zOnOk: () => {
        return false;
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadContacts();
      }
    });
  }
  openSendEmailsModal() {
    const dialogRef = this.dialogService.create({
      zContent: SendEmail,
      zTitle: 'Enviar Convites por Email',
      zMaskClosable: true,
      zHideFooter: true,
      zOkText: null,
      zClosable: undefined,
      zData: {
        contacts: this.selectedContacts(),
        eventId: this.eventId,
      },
      zOnOk: () => {
        return false;
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadContacts();
      }
    });
  }

  handleSelectAll(checked: boolean) {
    this.selectAllChecked = checked;
    if (checked) {
      this.selectedContacts.set([...this.filteredContacts]);
    } else {
      this.selectedContacts.set([]);
    }
  }

  isContactSelected(contactId: string): boolean {
    return this.selectedContacts().some((c) => c.id === contactId);
  }

  handleSelectContact(contact: Contact, checked: boolean) {
    console.log(contact, checked);
    if (checked) {
      this.selectedContacts.update((contacts) => [...contacts, contact]);
    } else {
      this.selectedContacts.update((contacts) => contacts.filter((c) => c.id !== contact.id));
    }
    this.updateSelectAllState();
  }

  private updateSelectAllState() {
    this.selectAllChecked =
      this.selectedContacts().length === this.filteredContacts.length &&
      this.filteredContacts.length > 0;
  }

  handleEdit(contact: Contact) {
    console.log(contact);
    const dialogRef = this.dialogService.create({
      zContent: CreateContact,
      zTitle: 'Editar Contacto',
      zMaskClosable: true,
      zHideFooter: true,
      zOkText: null,
      zClosable: undefined,
      zData: {
        contact,
      },
      zOnOk: () => {
        return false;
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadContacts();
      }
    });
  }

  handleDelete(contact: Contact) {
    this.alertDialogService.confirm({
      zTitle: 'Você tem certeza absoluta?',
      zDescription:
        'Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados dos nossos servidores.',
      zOkText: 'Continuar',
      zCancelText: 'Cancelar',
      zOnOk: () => {
        this.contactsService.delete(contact?.id!).subscribe({
          next: () => {
            this.loadContacts();
          },
        });
      },
    });
  }
}
