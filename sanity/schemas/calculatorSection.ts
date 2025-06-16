export default {
  name: 'calculatorSection',
  title: 'Calculator Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'fields',
      title: 'Calculator Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Field Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
            },
            {
              name: 'multiplier',
              title: 'Multiplier',
              type: 'number',
              description: 'Value multiplier for calculation',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'resultText',
      title: 'Result Text',
      type: 'string',
      description: 'Text shown before the calculated result',
    },
  ],
}