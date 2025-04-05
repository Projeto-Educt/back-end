export const formatTemplateString = (template: string, props: Record<string, any>) => {
  return template.replace(/{{(.*?)}}/g, (_, chave) => props[chave.trim()] || `{{${chave.trim()}}}`);
};
