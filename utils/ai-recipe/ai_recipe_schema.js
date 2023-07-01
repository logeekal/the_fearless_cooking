export const aiRecipeSchema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    recipeName: {
      type: 'string',
    },
    excerpt: {
      type: 'string',
    },
    servings: {
      type: 'string',
    },
    prepTime: {
      type: 'string',
    },
    cookTime: {
      type: 'string',
    },
    totalTime: {
      type: 'string',
    },
    ingredients: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            ingredients: {
              type: 'array',
              items: [
                {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                    },
                    quantity: {
                      type: 'string',
                    },
                    notes: {
                      type: 'string',
                    },
                  },
                  required: ['name', 'quantity'],
                },
              ],
            },
          },
        },
      ],
    },
    instructions: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            instructions: {
              type: 'array',
              items: [
                {
                  type: 'string',
                },
                {
                  type: 'string',
                },
                {
                  type: 'string',
                },
                {
                  type: 'string',
                },
                {
                  type: 'string',
                },
              ],
            },
          },
          required: ['name', 'instructions'],
        },
      ],
    },
    nutrition: {
      type: 'object',
      properties: {
        calories: {
          type: 'string',
        },
        fat: {
          type: 'string',
        },
        sugar: {
          type: 'string',
        },
        protein: {
          type: 'string',
        },
      },
      required: ['calories', 'fat', 'sugar', 'protein'],
    },
  },
  required: [
    'recipeName',
    'excerpt',
    'servings',
    'prepTime',
    'cookTime',
    'totalTime',
    'ingredients',
    'instructions',
    'nutrition',
  ],
}
