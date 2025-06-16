export default {
  name: 'pageHero',
  title: 'Page Hero',
  type: 'document',
  fields: [
    {
      name: 'page',
      title: 'Page',
      type: 'string',
      description: 'Which page this hero is for',
      validation: (Rule: any) => Rule.required(),
    },
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
    },
    {
      name: 'primaryButtonHref',
      title: 'Primary Button Link',
      type: 'string',
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