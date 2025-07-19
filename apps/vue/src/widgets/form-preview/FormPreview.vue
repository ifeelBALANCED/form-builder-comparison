<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { formBuilderModel } from '@/features/form-builder';
import { useRouter } from 'vue-router';
import { CheckboxRoot, CheckboxIndicator } from 'radix-vue';
import { Icon } from '@iconify/vue';

const formBuilder = formBuilderModel.useFormBuilder();
const router = useRouter();

const data = reactive<Record<string, string | string[]>>({});

watch(
  () => formBuilder.fieldsArray,
  (fields) => {
    fields.forEach((f) => {
      if (!(f.id in data)) data[f.id] = f.type === 'checkbox' ? [] : '';
    });
    Object.keys(data).forEach((k) => {
      if (!fields.some((f) => f.id === k)) delete data[k];
    });
  },
  { immediate: true },
);

const hasFields = computed(() => formBuilder.fieldsArray.length > 0);
const isFormValid = computed(() =>
  formBuilder.fieldsArray.every(
    (f) =>
      !f.required ||
      (f.type === 'checkbox' && Array.isArray(data[f.id])
        ? data[f.id].length > 0
        : Boolean(data[f.id]?.toString().trim())),
  ),
);

function onSubmit() {
  if (!isFormValid.value) return;
  router.push({ name: 'Success', query: data });
}

function onCheckboxChange(fieldId: string, label: string, checked: boolean) {
  const arr = data[fieldId] as string[];
  const idx = arr.indexOf(label);
  if (checked && idx === -1) arr.push(label);
  if (!checked && idx > -1) arr.splice(idx, 1);
}
</script>

<template>
  <div>
    <div v-if="hasFields" class="space-y-8">
      <header class="px-6 py-4 bg-gray-50 rounded-lg">
        <h1 class="text-2xl font-bold text-gray-800">
          {{ formBuilder.builderTitle || 'Untitled Form' }}
        </h1>
        <p v-if="formBuilder.builderDescription" class="mt-2 text-gray-600">
          {{ formBuilder.builderDescription }}
        </p>
      </header>

      <form class="space-y-6" @submit.prevent="onSubmit">
        <div
          v-for="field in formBuilder.fieldsArray"
          :key="field.id"
          class="mb-6"
        >
          <label :for="field.id" class="block mb-2 font-medium">
            {{ field.label }}
            <span v-if="field.required" class="text-red-500">*</span>
          </label>

          <template v-if="field.type === 'text'">
            <input
              :id="field.id"
              v-model="data[field.id]"
              type="text"
              :placeholder="field.placeholder"
              :aria-invalid="
                field.required && !(data[field.id] as string).trim()
              "
              class="w-full border rounded px-3 py-2 focus:ring-primary"
            />
          </template>

          <template v-if="field.type === 'textarea'">
            <textarea
              :id="field.id"
              v-model="data[field.id]"
              :placeholder="field.placeholder"
              rows="4"
              :aria-invalid="
                field.required && !(data[field.id] as string).trim()
              "
              class="w-full border rounded px-3 py-2 focus:ring-primary"
            />
          </template>

          <template v-if="field.type === 'select'">
            <select
              :id="field.id"
              v-model="data[field.id]"
              :aria-invalid="field.required && !(data[field.id] as string)"
              class="w-full border rounded px-3 py-2 focus:ring-primary"
            >
              <option disabled value="">Select an option</option>
              <option
                v-for="opt in field.options || []"
                :key="opt.id"
                :value="opt.label"
              >
                {{ opt.label }}
              </option>
            </select>
          </template>

          <template v-if="field.type === 'checkbox'">
            <div class="flex flex-wrap gap-4">
              <div
                v-for="opt in field.options || []"
                :key="opt.id"
                class="flex items-center"
              >
                <CheckboxRoot
                  :id="`${field.id}-${opt.id}`"
                  :value="opt.label"
                  :checked="(data[field.id] as string[]).includes(opt.label)"
                  class="w-4 h-4 border rounded focus:ring-primary"
                  @update:checked="
                    (checked) => onCheckboxChange(field.id, opt.label, checked)
                  "
                >
                  <CheckboxIndicator>
                    <Icon icon="mdi:check" class="w-3 h-3 text-primary" />
                  </CheckboxIndicator>
                </CheckboxRoot>
                <label :for="`${field.id}-${opt.id}`" class="ml-2 text-sm">
                  {{ opt.label }}
                </label>
              </div>
            </div>
          </template>
        </div>

        <button
          type="submit"
          :disabled="!isFormValid"
          class="mt-6 px-6 py-3 border rounded-full text-primary border-primary hover:bg-primary/10 disabled:opacity-50"
        >
          <Icon icon="mdi:check" class="w-5 h-5 inline-block mr-2" />
          Submit
        </button>
      </form>
    </div>

    <div
      v-else
      class="flex flex-col items-center justify-center p-8 text-gray-500"
    >
      <Icon icon="mdi:alert-circle-outline" class="w-12 h-12 mb-4" />
      <p>No form fields available at the moment. Please check back later.</p>
    </div>
  </div>
</template>
