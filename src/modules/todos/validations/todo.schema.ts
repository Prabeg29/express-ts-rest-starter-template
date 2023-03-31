export const todoSchema = {
  type      : 'object',
  properties: {
    title      : { type: 'string', maxLength: 255, },
    description: { type: 'string', maxLength: 255, },
    isComplete : { type: 'boolean' },
  },
  required            : ['title'],
  additionalProperties: false
};
