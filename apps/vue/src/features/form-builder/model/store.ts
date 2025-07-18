import type { Field, FieldOption, FieldType } from '@/shared/types';
import { uniqueId } from '@/shared/lib/unique-id';
import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

export const useFormBuilder = defineStore('formBuilder', () => {
  const builderTitle = ref('');
  const builderDescription = ref('');
  const formFields = reactive(new Map<string, Field>());

  function addField(type: FieldType) {
    const id = uniqueId();
    const baseField: Field = {
      id,
      type,
      label: `New ${type} field`,
      placeholder:
        type === 'text' || type === 'textarea' ? `Enter ${type}` : undefined,
      options:
        type === 'select' || type === 'checkbox'
          ? ([] as FieldOption[])
          : undefined,
      required: false,
    };
    formFields.set(id, baseField);
  }

  function removeField(id: string) {
    formFields.delete(id);
  }

  function updateField(updated: Field) {
    if (formFields.has(updated.id)) {
      formFields.set(updated.id, updated);
    }
  }

  function getField(id: string): Field | undefined {
    return formFields.get(id);
  }

  function moveField(fromId: string, toId: string) {
    const entries = Array.from(formFields.entries());
    const fromIndex = entries.findIndex(([id]) => id === fromId);
    const toIndex = entries.findIndex(([id]) => id === toId);
    if (fromIndex === -1 || toIndex === -1) return;
    const [moved] = entries.splice(fromIndex, 1);
    entries.splice(toIndex, 0, moved);
    formFields.clear();
    for (const [id, field] of entries) {
      formFields.set(id, field);
    }
  }

  function clearAllFields() {
    formFields.clear();
  }

  function duplicateField(id: string) {
    const field = formFields.get(id);
    if (!field) return;
    const newId = uniqueId();
    const copy: Field = {
      ...field,
      id: newId,
      label: `${field.label} (Copy)`,
    };
    formFields.set(newId, copy);
  }

  const fieldsArray = computed(() => Array.from(formFields.values()));
  const fieldsCount = computed(() => formFields.size);
  const hasFields = computed(() => formFields.size > 0);
  const requiredFieldsCount = computed(
    () => fieldsArray.value.filter((f) => f.required).length,
  );
  const isFormValid = computed(
    () => builderTitle.value.trim() !== '' && formFields.size > 0,
  );

  return {
    builderTitle,
    builderDescription,
    formFields,
    addField,
    removeField,
    updateField,
    getField,
    moveField,
    clearAllFields,
    duplicateField,
    fieldsArray,
    fieldsCount,
    hasFields,
    requiredFieldsCount,
    isFormValid,
  };
});
