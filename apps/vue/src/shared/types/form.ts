export type FieldType = 'text' | 'textarea' | 'select' | 'checkbox';

export interface FieldOption {
  id: string;
  label: string;
}

export type Field = {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: FieldOption[];
  required: boolean;
};
