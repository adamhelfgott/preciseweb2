import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'buyerPersona',
  title: 'Buyer Persona',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Persona Type',
      type: 'string',
      options: {
        list: [
          { title: 'Agency', value: 'agency' },
          { title: 'Brand', value: 'brand' },
          { title: 'DSP', value: 'dsp' },
          { title: 'First-Party Data Owner', value: 'firstParty' },
          { title: 'Third-Party Data Provider', value: 'thirdParty' },
          { title: 'Measurement Partner', value: 'measurement' },
          { title: 'Platform', value: 'platform' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'features',
      title: 'Key Features/Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name',
    }),
    defineField({
      name: 'color',
      title: 'Gradient Color',
      type: 'string',
      description: 'Tailwind gradient classes',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
  },
});