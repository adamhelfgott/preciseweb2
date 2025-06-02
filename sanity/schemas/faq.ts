export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Compliance', value: 'compliance' },
          { title: 'Security', value: 'security' },
          { title: 'Revenue', value: 'revenue' },
          { title: 'Queries', value: 'queries' },
          { title: 'Implementation', value: 'implementation' },
          { title: 'Technical', value: 'technical' },
        ],
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order',
    },
  ],
}