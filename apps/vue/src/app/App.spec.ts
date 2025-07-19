import { mount } from '@vue/test-utils';
import App from './App.vue';

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = mount(App);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the form builder title', () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain('Form Builder');
  });

  it('has proper header structure', () => {
    const wrapper = mount(App);
    expect(wrapper.find('header').exists()).toBe(true);
  });
});
