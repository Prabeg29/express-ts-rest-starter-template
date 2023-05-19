export const labelSchema = {
  type      : 'object',
  properties: {
    name: { type: 'string', maxLength: 255, },
  },
  required            : [ 'name' ],
  additionalProperties: false
};
