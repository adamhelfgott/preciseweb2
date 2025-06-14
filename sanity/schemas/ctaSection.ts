export default {
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
    },
    {
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'primaryButtonHref',
      title: 'Primary Button Link',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
    },
    {
      name: 'secondaryButtonHref',
      title: 'Secondary Button Link',
      type: 'string',
    },
  ],
}