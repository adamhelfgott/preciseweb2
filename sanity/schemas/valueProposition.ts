import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'valueProposition',
  title: 'Value Proposition',
  type: 'document',
  fields: [
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'Media Buyers', value: 'mediaBuyers' },
          { title: 'Data Controllers', value: 'dataControllers' },
          { title: 'Media Buyer', value: 'media-buyer' },
          { title: 'Data Controller', value: 'data-controller' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Section Subheadline',
      type: 'text',
    }),
    defineField({
      name: 'props',
      title: 'Value Props',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Lucide icon name (e.g., TrendingUp, Shield)',
          },
          {
            name: 'gradient',
            title: 'Gradient',
            type: 'string',
            description: 'Tailwind gradient classes',
          },
        ],
      }],
    }),
  ],
  preview: {
    select: {
      title: 'section',
      subtitle: 'headline',
    },
  },
});