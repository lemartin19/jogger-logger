import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import LoginButton from '../app/LoginButton.vue';

describe('LoginButton', () => {
  it('renders properly', () => {
    const wrapper = mount(LoginButton);
    expect(wrapper.text()).toContain('Login');
  });
});
