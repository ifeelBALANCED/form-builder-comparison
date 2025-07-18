<script setup lang="ts">
import { useFormBuilder } from '../model';
import { uniqueId } from '@/shared/lib/unique-id';
import { CheckboxRoot, CheckboxIndicator } from 'radix-vue';
import { Icon } from '@iconify/vue';
import type { Field } from '@/shared/types';

const formBuilder = useFormBuilder();

function onUpdate(field: Field) {
  formBuilder.updateField({ ...field });
}

function addOpt(field: Field) {
  field.options?.push({ id: uniqueId(), label: 'New Option' });
  formBuilder.updateField({ ...field });
}

function removeOption(field: Field, optId: string) {
  if (field.options) {
    field.options = field.options.filter((o) => o.id !== optId);
    formBuilder.updateField({ ...field });
  }
}
</script>

<template>
  <div>
    <div
      v-if="!formBuilder.fieldsArray.length"
      class="h-full flex items-center justify-center text-gray-500"
    >
      No form fields added yet. Use the panel on the left to add form elements.
    </div>

    <div v-else class="space-y-4">
      <div class="flex justify-end">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 border border-red-400 text-red-600 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
          @click="formBuilder.clearAllFields()"
        >
          <Icon icon="mdi:delete-sweep" class="w-5 h-5" />
          Clear All Fields
        </button>
      </div>

      <div
        v-for="(field, idx) in formBuilder.fieldsArray"
        :key="field.id"
        class="bg-white border border-gray-100 rounded-lg p-4"
      >
        <div class="flex items-center justify-between mb-4 space-x-2">
          <input
            v-model="field.label"
            type="text"
            placeholder="Field label"
            class="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-primary"
            @input="onUpdate(field)"
          />
          <div class="flex items-center gap-1">
            <button
              type="button"
              :disabled="idx === 0"
              class="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              @click="
                formBuilder.moveField(
                  field.id,
                  formBuilder.fieldsArray[idx - 1]?.id,
                )
              "
            >
              <Icon icon="mdi:arrow-up" class="w-5 h-5" />
            </button>
            <button
              type="button"
              :disabled="idx === formBuilder.fieldsArray.length - 1"
              class="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              @click="
                formBuilder.moveField(
                  field.id,
                  formBuilder.fieldsArray[idx + 1]?.id,
                )
              "
            >
              <Icon icon="mdi:arrow-down" class="w-5 h-5" />
            </button>
            <button
              type="button"
              class="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              @click="formBuilder.duplicateField(field.id)"
            >
              <Icon icon="mdi:content-duplicate" class="w-5 h-5" />
            </button>
            <button
              type="button"
              class="p-2 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
              @click="formBuilder.removeField(field.id)"
            >
              <Icon icon="mdi:trash-can-outline" class="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>

        <template v-if="field.type === 'text'">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Placeholder</label>
            <input
              v-model="field.placeholder"
              type="text"
              placeholder="Enter placeholder text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-primary"
              @input="onUpdate(field)"
            />
          </div>
        </template>

        <template v-if="field.type === 'textarea'">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Placeholder</label>
            <textarea
              v-model="field.placeholder"
              rows="3"
              placeholder="Enter placeholder text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-primary"
              @input="onUpdate(field)"
            />
          </div>
        </template>

        <template v-if="field.type === 'select'">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Options</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <div
                v-for="opt in field.options"
                :key="opt.id"
                class="flex items-center"
              >
                <input
                  v-model="opt.label"
                  type="text"
                  placeholder="Option label"
                  class="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-primary mr-2"
                  @input="onUpdate(field)"
                />
                <button
                  type="button"
                  class="p-1 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
                  @click="removeOption(field, opt.id)"
                >
                  <Icon icon="mdi:close" class="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <button
              type="button"
              class="inline-flex items-center gap-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              @click="addOpt(field)"
            >
              <Icon icon="mdi:plus" class="w-4 h-4" />
              Add Option
            </button>
          </div>
        </template>

        <template v-if="field.type === 'checkbox'">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Options</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <div
                v-for="opt in field.options"
                :key="opt.id"
                class="flex items-center"
              >
                <input
                  v-model="opt.label"
                  type="text"
                  placeholder="Option label"
                  class="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-primary mr-2"
                  @input="onUpdate(field)"
                />
                <button
                  type="button"
                  class="p-1 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
                  @click="removeOption(field, opt.id)"
                >
                  <Icon icon="mdi:close" class="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <button
              type="button"
              class="inline-flex items-center gap-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              @click="addOpt(field)"
            >
              <Icon icon="mdi:plus" class="w-4 h-4" />
              Add Option
            </button>
          </div>
        </template>

        <div class="mt-4 flex items-center">
          <CheckboxRoot
            :id="`required-${field.id}`"
            v-model:checked="field.required"
            class="w-4 h-4 border border-gray-300 rounded focus:ring-1 focus:ring-primary"
            @update:checked="() => onUpdate(field)"
          >
            <CheckboxIndicator>
              <Icon icon="mdi:check" class="w-3 h-3 text-primary" />
            </CheckboxIndicator>
          </CheckboxRoot>
          <label :for="`required-${field.id}`" class="ml-2 text-sm select-none">
            Required field
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
