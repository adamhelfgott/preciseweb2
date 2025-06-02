export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'links',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
}