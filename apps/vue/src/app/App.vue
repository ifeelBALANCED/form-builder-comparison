<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ToolbarRoot, ToolbarButton } from 'radix-vue';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();

const isPreview = computed(() => route.name === 'Preview');
const goPreview = () => router.push({ name: 'Preview' });
const goBuilder = () => router.push({ name: 'Editor' });
const goSave = () => {};

URL.revokeObjectURL()

</script>

<template>
  <ToolbarRoot as="header" class="bg-white shadow">
    <div class="container mx-auto flex items-center justify-between py-4 px-6">
      <div class="flex items-center gap-2">
        <Icon
          icon="mdi:form-textbox"
          class="w-6 h-6 text-primary"
          aria-hidden="true"
        />
        <h1 class="text-xl font-bold">Form Builder</h1>
      </div>
      <div class="flex items-center gap-3">
        <ToolbarButton
          v-if="isPreview"
          class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          @click="goBuilder"
        >
          <Icon icon="mdi:arrow-left" class="w-5 h-5" aria-hidden="true" />
          <span>Back to Editor</span>
        </ToolbarButton>
        <template v-else>
          <ToolbarButton
            class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            @click="goSave"
          >
            <Icon
              icon="mdi:content-save-outline"
              class="w-5 h-5"
              aria-hidden="true"
            />
            <span>Save</span>
          </ToolbarButton>
          <ToolbarButton
            class="inline-flex items-center gap-2 px-4 py-2 border border-primary rounded text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            @click="goPreview"
          >
            <Icon icon="mdi:eye-outline" class="w-5 h-5" aria-hidden="true" />
            <span>Preview Form</span>
          </ToolbarButton>
        </template>
      </div>
    </div>
  </ToolbarRoot>

  <main class="w-full bg-gray-50 min-h-[calc(100vh-64px)]">
    <div class="container mx-auto p-6">
      <router-view />
    </div>
  </main>
</template>
