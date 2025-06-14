import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'outcomeMetric',
  title: 'Outcome Metric',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Performance Marketing', value: 'performance' },
          { title: 'Customer Lifetime Value', value: 'ltv' },
          { title: 'Churn & Retention', value: 'retention' },
          { title: 'Brand Marketing', value: 'brand' },
          { title: 'Media Efficiency', value: 'efficiency' },
          { title: 'Speed & Agility', value: 'speed' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Metric Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'impact',
            title: 'Impact',
            type: 'string',
            description: 'e.g., "↓34% average reduction"',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'verified',
            title: 'Verified',
            type: 'boolean',
            description: 'Show verified badge',
            initialValue: true,
          },
        ],
      }],
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name',
    }),
    defineField({
      name: 'color',
      title: 'Color Gradient',
      type: 'string',
      description: 'Tailwind gradient classes',
    }),
  ],
  preview: {
    select: {
      title: 'category',
    },
  },
});