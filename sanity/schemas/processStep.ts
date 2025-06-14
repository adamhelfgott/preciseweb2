export default {
  name: 'processStep',
  title: 'Process Step',
  type: 'document',
  fields: [
    {
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from lucide-react',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
}