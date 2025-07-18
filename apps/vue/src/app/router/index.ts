import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { EditorPage, PreviewPage, SuccessPage } from '@/pages';

export const pages = {
  Editor: '/',
  Preview: '/preview',
  Success: '/success',
} as const;

const routes: RouteRecordRaw[] = [
  { path: pages.Editor, name: 'Editor', component: EditorPage },
  { path: pages.Preview, name: 'Preview', component: PreviewPage },
  { path: pages.Success, name: 'Success', component: SuccessPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
