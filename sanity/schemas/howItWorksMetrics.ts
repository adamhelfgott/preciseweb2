export default {
  name: 'howItWorksMetrics',
  title: 'How It Works Metrics',
  type: 'document',
  fields: [
    {
      name: 'userType',
      title: 'User Type',
      type: 'string',
      options: {
        list: [
          { title: 'Media Buyer', value: 'media-buyer' },
          { title: 'Data Controller', value: 'data-controller' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}