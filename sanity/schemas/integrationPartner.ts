export default {
  name: 'integrationPartner',
  title: 'Integration Partner',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'DSP', value: 'dsp' },
          { title: 'Platform', value: 'platform' },
          { title: 'Identity', value: 'identity' },
          { title: 'Measurement', value: 'measurement' },
          { title: 'Analytics', value: 'analytics' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
}