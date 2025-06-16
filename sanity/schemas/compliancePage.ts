import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'compliancePage',
  title: 'Compliance Page',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Compliance Through Architecture'
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
      initialValue: 'Stay compliant by design, not policy. Our federated infrastructure ensures you never become a data broker while enabling valuable collaboration.'
    }),

    // Key Benefits
    defineField({
      name: 'keyBenefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'description',
            title: 'Description',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'iconType',
            title: 'Icon Type',
            type: 'string',
            options: {
              list: [
                { title: 'Shield', value: 'shield' },
                { title: 'Lock', value: 'lock' },
                { title: 'File Check', value: 'fileCheck' },
                { title: 'Alert Circle', value: 'alertCircle' },
                { title: 'Check Circle', value: 'checkCircle' },
                { title: 'Scale', value: 'scale' },
                { title: 'Database', value: 'database' },
                { title: 'Eye', value: 'eye' }
              ]
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'colorScheme',
            title: 'Color Scheme',
            type: 'string',
            options: {
              list: [
                { title: 'Green', value: 'green' },
                { title: 'Blue', value: 'blue' },
                { title: 'Purple', value: 'purple' }
              ]
            },
            validation: Rule => Rule.required()
          }
        ]
      }],
      validation: Rule => Rule.required().min(3).max(3)
    }),

    // Data Broker Comparison Section
    defineField({
      name: 'dataBrokerSection',
      title: 'Data Broker Comparison Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Why You Won\'t Be Classified as a Data Broker'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
          validation: Rule => Rule.required(),
          initialValue: 'Data brokers sell or license data to third parties. With Precise, you never do either.'
        },
        {
          name: 'traditionalBroker',
          title: 'Traditional Data Broker',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required(),
              initialValue: 'Traditional Data Broker'
            },
            {
              name: 'points',
              title: 'Points',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.required().min(4)
            }
          ]
        },
        {
          name: 'withPrecise',
          title: 'With Precise',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required(),
              initialValue: 'With Precise'
            },
            {
              name: 'points',
              title: 'Points',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.required().min(4)
            }
          ]
        }
      ]
    }),

    // Technical Architecture Section
    defineField({
      name: 'architectureSection',
      title: 'Technical Architecture Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Privacy-Preserving Architecture'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
          validation: Rule => Rule.required(),
          initialValue: 'Our federated learning infrastructure ensures compliance through technical design.'
        },
        {
          name: 'features',
          title: 'Architecture Features',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Feature Title',
                type: 'string',
                validation: Rule => Rule.required()
              },
              {
                name: 'description',
                title: 'Feature Description',
                type: 'text',
                rows: 3,
                validation: Rule => Rule.required()
              },
              {
                name: 'codeExample',
                title: 'Code Example',
                type: 'string',
                validation: Rule => Rule.required()
              },
              {
                name: 'iconType',
                title: 'Icon Type',
                type: 'string',
                options: {
                  list: [
                    { title: 'Database', value: 'database' },
                    { title: 'Lock', value: 'lock' },
                    { title: 'Eye', value: 'eye' }
                  ]
                },
                validation: Rule => Rule.required()
              },
              {
                name: 'colorScheme',
                title: 'Color Scheme',
                type: 'string',
                options: {
                  list: [
                    { title: 'Blue', value: 'blue' },
                    { title: 'Green', value: 'green' },
                    { title: 'Purple', value: 'purple' }
                  ]
                },
                validation: Rule => Rule.required()
              }
            ]
          }],
          validation: Rule => Rule.required().min(3)
        }
      ]
    }),

    // Compliance Standards Section
    defineField({
      name: 'standardsSection',
      title: 'Compliance Standards Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Compliance Standards We Support'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
          validation: Rule => Rule.required(),
          initialValue: 'Our architecture is designed to meet the strictest global privacy regulations.'
        },
        {
          name: 'standards',
          title: 'Standards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'name',
                title: 'Standard Name',
                type: 'string',
                validation: Rule => Rule.required()
              },
              {
                name: 'description',
                title: 'Standard Description',
                type: 'text',
                rows: 3,
                validation: Rule => Rule.required()
              },
              {
                name: 'colorScheme',
                title: 'Color Scheme',
                type: 'string',
                options: {
                  list: [
                    { title: 'Blue', value: 'blue' },
                    { title: 'Green', value: 'green' },
                    { title: 'Purple', value: 'purple' }
                  ]
                },
                validation: Rule => Rule.required()
              }
            ]
          }],
          validation: Rule => Rule.required().min(3)
        }
      ]
    }),

    // CTA Section
    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'CTA Title',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Ready to Enable Compliant Collaboration?'
        },
        {
          name: 'description',
          title: 'CTA Description',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Join leading brands who collaborate without compromising compliance.'
        },
        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Get Started'
        },
        {
          name: 'primaryButtonLink',
          title: 'Primary Button Link',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: '/get-started'
        },
        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Talk to Compliance Team'
        },
        {
          name: 'secondaryButtonLink',
          title: 'Secondary Button Link',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: '/contact'
        }
      ]
    })
  ]
});