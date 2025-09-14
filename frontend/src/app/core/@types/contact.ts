export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}

export type ICreateContactData = Omit<IContact, 'id' | 'created_at' | 'updated_at'>;
