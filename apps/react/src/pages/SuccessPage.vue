<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';

const route = useRoute();
</script>

<template>
  <div class="flex flex-col items-center py-20 text-center">
    <Icon
      icon="mdi:check-circle-outline"
      class="w-16 h-16 text-green-500 mb-4"
      aria-hidden="true"
    />
    <h2 class="text-2xl font-bold mb-2">Form submitted successfully!</h2>
    <p class="text-gray-600 mb-6">Thank you for your submission.</p>

    <pre
      class="bg-gray-100 text-sm p-4 rounded w-full max-w-md text-left overflow-auto"
      >{{ JSON.stringify(route.query, null, 2) }}
    </pre>

    <RouterLink
      to="/preview"
      class="mt-4 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
    >
      ← Back to form
    </RouterLink>
  </div>
</template>
