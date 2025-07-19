import { vi } from 'vitest';

// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useRoute: () => ({
    name: 'Editor',
  }),
  createRouter: vi.fn(),
  createWebHistory: vi.fn(),
}));

// Mock radix-vue components
vi.mock('radix-vue', () => ({
  ToolbarRoot: {
    name: 'ToolbarRoot',
    template: '<div><slot /></div>',
  },
  ToolbarButton: {
    name: 'ToolbarButton',
    template: '<button><slot /></button>',
  },
}));

// Mock iconify
vi.mock('@iconify/vue', () => ({
  Icon: {
    name: 'Icon',
    template: '<span><slot /></span>',
  },
}));

// Mock features
vi.mock('@/features/form-builder', () => ({
  formBuilderModel: {
    useFormBuilder: () => ({
      saveSchema: vi.fn(),
    }),
  },
}));
