export default {
  name: 'benefitCard',
  title: 'Benefit Card',
  type: 'document',
  fields: [
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
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order',
    },
  ],
}