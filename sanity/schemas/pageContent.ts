import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page Identifier',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique identifier for the page (e.g., "data-sellers", "media-buyers")',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      description: 'Section identifier (e.g., "hero", "cta")',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'SEO description for the page',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        { name: 'headline', type: 'string', title: 'Headline' },
        { name: 'highlightedText', type: 'string', title: 'Highlighted Text' },
        { name: 'description', type: 'text', title: 'Description' },
        {
          name: 'primaryCTA',
          type: 'object',
          title: 'Primary CTA',
          fields: [
            { name: 'text', type: 'string', title: 'Button Text' },
            { name: 'href', type: 'string', title: 'Link' },
          ],
        },
        {
          name: 'steps',
          type: 'array',
          title: 'Steps',
          of: [{
            type: 'object',
            fields: [
              { name: 'number', type: 'string', title: 'Step Number' },
              { name: 'title', type: 'string', title: 'Step Title' },
              { name: 'description', type: 'text', title: 'Step Description' },
            ],
          }],
        },
        {
          name: 'stats',
          type: 'array',
          title: 'Stats',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', type: 'string', title: 'Value' },
              { name: 'label', type: 'string', title: 'Label' },
            ],
          }],
        },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Text Section',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'content', type: 'text', title: 'Content' },
          ],
        },
        {
          type: 'object',
          name: 'benefitsList',
          title: 'Benefits List',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            {
              name: 'benefits',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
        {
          type: 'object',
          name: 'comparison',
          title: 'Comparison',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            {
              name: 'traditional',
              type: 'object',
              fields: [
                { name: 'title', type: 'string' },
                { name: 'points', type: 'array', of: [{ type: 'string' }] },
              ],
            },
            {
              name: 'precise',
              type: 'object',
              fields: [
                { name: 'title', type: 'string' },
                { name: 'points', type: 'array', of: [{ type: 'string' }] },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'page',
    },
  },
});