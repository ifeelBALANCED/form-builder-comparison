<script setup lang="ts">
import { useFormBuilder } from '../model';
import { Icon } from '@iconify/vue';

const FIELD_VARIANTS = [
  { type: 'text', icon: 'mdi:format-letter-case-upper', label: 'Text' },
  { type: 'textarea', icon: 'mdi:format-paragraph', label: 'Paragraph' },
  { type: 'select', icon: 'mdi:format-list-bulleted', label: 'Select' },
  { type: 'checkbox', icon: 'mdi:checkbox-marked-outline', label: 'Checkbox' },
] as const;

type Variant = (typeof FIELD_VARIANTS)[number]['type'];
const formBuilder = useFormBuilder();
const add = (variant: Variant) => formBuilder.addField(variant);
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <button
      v-for="v in FIELD_VARIANTS"
      :key="v.type"
      class="flex flex-col items-center justify-center gap-1 border border-gray-200 rounded-lg p-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
      type="button"
      @click="add(v.type)"
    >
      <Icon :icon="v.icon" class="w-6 h-6 text-gray-600" aria-hidden="true" />
      <span class="text-sm text-gray-800">{{ v.label }}</span>
    </button>
  </div>
</template>
