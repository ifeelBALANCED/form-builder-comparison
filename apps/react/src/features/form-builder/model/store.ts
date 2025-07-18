import { create } from 'zustand';
import type { Field, FieldType } from '../../../shared/types';
import { uniqueId } from '../../../shared/lib/unique-id';

interface FormBuilderStore {
  builderTitle: string;
  builderDescription: string;
  formFields: Map<string, Field>;

  // computed
  fieldsArray: Field[];
  fieldsCount: number;
  hasFields: boolean;
  requiredFieldsCount: number;
  isFormValid: boolean;

  // actions
  setBuilderTitle: (title: string) => void;
  setBuilderDescription: (desc: string) => void;
  addField: (type: FieldType) => void;
  removeField: (id: string) => void;
  updateField: (updated: Field) => void;
  getField: (id: string) => Field | undefined;
  moveField: (fromId: string, toId: string) => void;
  clearAllFields: () => void;
  duplicateField: (id: string) => void;
}

export const useFormBuilder = create<FormBuilderStore>()((set, get) => ({
  builderTitle: '',
  builderDescription: '',
  formFields: new Map<string, Field>(),

  // computed
  get fieldsArray() {
    return Array.from(get().formFields.values());
  },
  get fieldsCount() {
    return get().formFields.size;
  },
  get hasFields() {
    return get().formFields.size > 0;
  },
  get requiredFieldsCount() {
    return get().fieldsArray.filter(f => f.required).length;
  },
  get isFormValid() {
    return get().builderTitle.trim() !== '' && get().formFields.size > 0;
  },

  // actions
  setBuilderTitle: (title) => set({ builderTitle: title }),
  setBuilderDescription: (desc) => set({ builderDescription: desc }),

  addField: (type) => {
    const id = uniqueId();
    const baseField: Field = {
      id,
      type,
      label: `New ${type} field`,
      placeholder: type === 'text' || type === 'textarea' ? `Enter ${type}` : undefined,
      options: type === 'select' || type === 'checkbox' ? [] : undefined,
      required: false,
    };

    set((state) => ({
      formFields: new Map(state.formFields).set(id, baseField)
    }));
  },

  removeField: (id) => {
    set((state) => {
      const newFields = new Map(state.formFields);
      newFields.delete(id);
      return { formFields: newFields };
    });
  },

  updateField: (updated) => {
    set((state) => {
      if (state.formFields.has(updated.id)) {
        const newFields = new Map(state.formFields);
        newFields.set(updated.id, updated);
        return { formFields: newFields };
      }
      return state;
    });
  },

  getField: (id) => get().formFields.get(id),

  moveField: (fromId, toId) => {
    set((state) => {
      const entries = Array.from(state.formFields.entries());
      const fromIndex = entries.findIndex(([id]) => id === fromId);
      const toIndex = entries.findIndex(([id]) => id === toId);

      if (fromIndex === -1 || toIndex === -1) return state;

      const [moved] = entries.splice(fromIndex, 1);
      entries.splice(toIndex, 0, moved);

      const newFields = new Map();
      for (const [id, field] of entries) {
        newFields.set(id, field);
      }

      return { formFields: newFields };
    });
  },

  clearAllFields: () => set({ formFields: new Map() }),

  duplicateField: (id) => {
    set((state) => {
      const field = state.formFields.get(id);
      if (!field) return state;

      const newId = uniqueId();
      const copy: Field = {
        ...field,
        id: newId,
        label: `${field.label} (Copy)`,
      };

      const newFields = new Map(state.formFields);
      newFields.set(newId, copy);
      return { formFields: newFields };
    });
  },
}));
