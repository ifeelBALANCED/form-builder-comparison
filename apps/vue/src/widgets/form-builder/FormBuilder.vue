<script setup lang="ts">
import { FieldList, formBuilderModel, Toolbox } from '@/features/form-builder';

const formBuilder = formBuilderModel.useFormBuilder();
</script>

<template>
  <div class="grid grid-cols-3 gap-6">
    <aside aria-label="Add Form Elements">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Add Form Elements</h2>
        <Toolbox />
      </div>
    </aside>

    <section class="col-span-2">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="bg-purple-50 p-6">
          <input
            v-model="formBuilder.builderTitle"
            placeholder="Untitled Form"
            class="w-full bg-transparent text-xl font-bold focus:outline-none focus:placeholder-gray-400"
          />
          <input
            v-model="formBuilder.builderDescription"
            placeholder="Form description"
            class="w-full mt-1 bg-transparent text-gray-600 focus:outline-none focus:placeholder-gray-400"
          />
        </div>

        <div class="p-6 min-h-[200px]">
          <FieldList />
        </div>
      </div>
    </section>
  </div>
</template>
