import { describe, it, expect } from 'vitest';
import { ContactComponent } from '../../modules/contact/contact.component';

describe('ContactComponent', () => {
  it('should create', () => {
    expect(ContactComponent).toBeDefined();
  });

  it('should have empty initial values', () => {
    const component = new ContactComponent();
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.message).toBe('');
    expect(component.sent).toBe(false);
    expect(component.sending).toBe(false);
  });
});