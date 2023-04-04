export const todoSchema = {
  type      : 'object',
  properties: {
    title      : { type: 'string', maxLength: 255, },
    description: { type: 'string', maxLength: 255, },
    isComplete : { type: 'boolean' },
    dueDate    : { type: 'string', format: 'date' }
  },
  required            : [ 'title', 'dueDate' ],
  additionalProperties: false
};
