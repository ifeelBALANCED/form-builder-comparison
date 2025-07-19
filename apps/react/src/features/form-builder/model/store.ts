import { atom } from 'jotai';
import {
  builderTitleAtom,
  builderDescriptionAtom,
  formFieldsAtom
} from './atoms/formBuilder';
import type { Field, FieldType } from '../../../shared/types';
import { uniqueId } from '../../../shared/lib/unique-id';

// Actions

export const setBuilderTitleAtom = atom(null, (get, set, title: string) => {
  set(builderTitleAtom, title);
});

export const setBuilderDescriptionAtom = atom(null, (get, set, desc: string) => {
  set(builderDescriptionAtom, desc);
});

export const addFieldAtom = atom(null, (get, set, type: FieldType) => {
  const id = uniqueId();
  const baseField: Field = {
    id,
    type,
    label: `New ${type} field`,
    placeholder: type === 'text' || type === 'textarea' ? `Enter ${type}` : undefined,
    options: type === 'select' || type === 'checkbox' ? [] : undefined,
    required: false,
  };

  const prev = new Map(get(formFieldsAtom));
  prev.set(id, baseField);
  set(formFieldsAtom, prev);
});

export const removeFieldAtom = atom(null, (get, set, id: string) => {
  const prev = new Map(get(formFieldsAtom));
  prev.delete(id);
  set(formFieldsAtom, prev);
});

export const updateFieldAtom = atom(null, (get, set, updated: Field) => {
  const prev = new Map(get(formFieldsAtom));
  if (prev.has(updated.id)) {
    prev.set(updated.id, updated);
    set(formFieldsAtom, prev);
  }
});

export const duplicateFieldAtom = atom(null, (get, set, id: string) => {
  const prev = new Map(get(formFieldsAtom));
  const field = prev.get(id);
  if (!field) return;

  const newId = uniqueId();
  const copy: Field = {
    ...field,
    id: newId,
    label: `${field.label} (Copy)`,
  };

  prev.set(newId, copy);
  set(formFieldsAtom, prev);
});

export const clearAllFieldsAtom = atom(null, (_, set) => {
  set(formFieldsAtom, new Map());
});

export const moveFieldAtom = atom(null, (get, set, { fromId, toId }: { fromId: string, toId: string }) => {
  const entries = Array.from(get(formFieldsAtom).entries());
  const fromIndex = entries.findIndex(([id]) => id === fromId);
  const toIndex = entries.findIndex(([id]) => id === toId);
  if (fromIndex === -1 || toIndex === -1) return;

  const [moved] = entries.splice(fromIndex, 1);
  entries.splice(toIndex, 0, moved);

  const newFields = new Map<string, Field>();
  for (const [id, field] of entries) {
    newFields.set(id, field);
  }

  set(formFieldsAtom, newFields);
});
