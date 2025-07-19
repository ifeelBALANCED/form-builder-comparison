export type { Field, FieldOption, FieldType } from './form';
export interface FieldOption {
  id: string;
  label: string;
}

export interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: FieldOption[];
}