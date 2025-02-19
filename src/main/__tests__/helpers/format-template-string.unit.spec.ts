import { formatTemplateString } from '@/main/helpers/format-template-string';

describe('formatTemplateString', () => {
  it('Should format template string', () => {
    const template = 'Hello, {{name}}';
    const expected = 'Hello, John Doe';
    const props = { name: 'John Doe' };
    const result = formatTemplateString(template, props);
    expect(result).toBe(expected);
  });

  it('Should not format template without props', () => {
    const template = 'Hello, {{name}}';
    const expected = 'Hello, {{name}}';
    const props = {};
    const result = formatTemplateString(template, props);
    expect(result).toBe(expected);
  });

  it('Should not format template with props not found', () => {
    const template = 'Hello, {{name}}';
    const expected = 'Hello, {{name}}';
    const props = { email: 'any_mail@mail.com' };
    const result = formatTemplateString(template, props);
    expect(result).toBe(expected);
  });
});
