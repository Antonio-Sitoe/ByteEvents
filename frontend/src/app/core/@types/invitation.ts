import { IContact } from './contact';

export interface IParticipantResponse {
  message: string;
  participant: Participant[];
}

export interface Participant {
  invitation: Invitation;
  contact: IContact;
}

export interface Invitation {
  id: string;
  eventId: string;
  email: string;
  token: string;
  subject: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface ConfirmPresenceResponse {
  success: boolean;
  message: string;
  data: Invitation;
}
