export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'FINISHED' | 'CANCELLED';

export interface IEventData {
  id: string;
  title: string;
  description: string;
  location: string;
  organizer_id: string;
  status: EventStatus;
  start_datetime: string;
  end_datetime: string;
  created_at: string;
  updated_at: string;
}

export type ICreateEventData = Omit<
  IEventData,
  'id' | 'organizer_id' | 'created_at' | 'updated_at'
>;
