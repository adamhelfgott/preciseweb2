import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the headline (e.g., "For Media Buyers")',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Alternative title text',
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'string',
      description: 'Text to highlight with gradient effect',
    }),
    defineField({
      name: 'headlineHighlight',
      title: 'Headline Highlight',
      type: 'string',
      description: 'Part of headline to show in gradient',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Main descriptive text for the hero section',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text' },
        { name: 'href', type: 'string', title: 'Link' },
      ],
    }),
    defineField({
      name: 'primaryCTA',
      title: 'Primary CTA (Alternative)',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text' },
        { name: 'href', type: 'string', title: 'Link' },
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text' },
        { name: 'href', type: 'string', title: 'Link' },
      ],
    }),
    defineField({
      name: 'secondaryCTA',
      title: 'Secondary CTA (Alternative)',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text' },
        { name: 'href', type: 'string', title: 'Link' },
      ],
    }),
    defineField({
      name: 'trustItems',
      title: 'Trust Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Small trust-building statements below CTAs',
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Badge items to display',
    }),
  ],
  preview: {
    select: {
      title: 'page',
      subtitle: 'headline',
    },
  },
});