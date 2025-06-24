import { defineType, defineField } from 'sanity';
import { FileText, Target, Database } from 'lucide-react';

export default defineType({
  name: 'howItWorksPage',
  type: 'document',
  title: 'How It Works Page',
  icon: FileText,
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      type: 'string',
      title: 'Hero Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      type: 'text',
      title: 'Hero Subtitle',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    
    // Tab Labels
    defineField({
      name: 'mediaBuyerTabLabel',
      type: 'string',
      title: 'Media Buyer Tab Label',
      initialValue: 'For Media Buyers',
    }),
    defineField({
      name: 'dataControllerTabLabel',
      type: 'string',
      title: 'Data Controller Tab Label',
      initialValue: 'For Data Controllers',
    }),
    
    // Media Buyer Section
    defineField({
      name: 'mediaBuyerSection',
      type: 'object',
      title: 'Media Buyer Section',
      icon: Target,
      fields: [
        // Benefits Section
        defineField({
          name: 'benefitsTitle',
          type: 'string',
          title: 'Benefits Section Title',
        }),
        defineField({
          name: 'benefits',
          type: 'array',
          title: 'Key Benefits',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'iconName',
                  type: 'string',
                  title: 'Icon Name',
                  description: 'Lucide icon name (e.g., Brain, Layers, AlertTriangle)',
                }),
                defineField({
                  name: 'iconColor',
                  type: 'string',
                  title: 'Icon Color',
                  description: 'Color class (e.g., brand-green, electric-blue, bright-purple)',
                  options: {
                    list: [
                      { title: 'Brand Green', value: 'brand-green' },
                      { title: 'Electric Blue', value: 'electric-blue' },
                      { title: 'Bright Purple', value: 'bright-purple' },
                      { title: 'Warm Coral', value: 'warm-coral' },
                      { title: 'Golden Amber', value: 'golden-amber' },
                    ],
                  },
                }),
                defineField({
                  name: 'title',
                  type: 'string',
                  title: 'Benefit Title',
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  title: 'Benefit Description',
                  rows: 2,
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.max(3),
        }),
        
        // Process Section
        defineField({
          name: 'processTitle',
          type: 'string',
          title: 'Process Section Title',
        }),
        defineField({
          name: 'steps',
          type: 'array',
          title: 'Process Steps',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'stepNumber',
                  type: 'number',
                  title: 'Step Number',
                  validation: (Rule) => Rule.required().min(1),
                }),
                defineField({
                  name: 'title',
                  type: 'string',
                  title: 'Step Title',
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  title: 'Step Description',
                  rows: 3,
                }),
                defineField({
                  name: 'bulletPoints',
                  type: 'array',
                  title: 'Bullet Points',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'iconName',
                          type: 'string',
                          title: 'Icon Name',
                          description: 'Lucide icon name',
                        }),
                        defineField({
                          name: 'text',
                          type: 'string',
                          title: 'Bullet Text',
                        }),
                      ],
                    },
                  ],
                }),
                defineField({
                  name: 'visualExample',
                  type: 'object',
                  title: 'Visual Example',
                  description: 'Optional visual example for this step',
                  fields: [
                    defineField({
                      name: 'type',
                      type: 'string',
                      title: 'Example Type',
                      options: {
                        list: [
                          { title: 'Dashboard', value: 'dashboard' },
                          { title: 'Code', value: 'code' },
                          { title: 'Chart', value: 'chart' },
                          { title: 'Custom', value: 'custom' },
                        ],
                      },
                    }),
                    defineField({
                      name: 'content',
                      type: 'text',
                      title: 'Example Content',
                      description: 'JSON or text content for the example',
                      rows: 10,
                    }),
                  ],
                }),
              ],
            },
          ],
        }),
        
        // Results Section
        defineField({
          name: 'resultsTitle',
          type: 'string',
          title: 'Results Section Title',
        }),
        defineField({
          name: 'results',
          type: 'array',
          title: 'Results Metrics',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'metric',
                  type: 'string',
                  title: 'Metric Value',
                  description: 'e.g., -47%, 3.2x, 92%',
                }),
                defineField({
                  name: 'metricColor',
                  type: 'string',
                  title: 'Metric Color',
                  options: {
                    list: [
                      { title: 'Brand Green', value: 'brand-green' },
                      { title: 'Electric Blue', value: 'electric-blue' },
                      { title: 'Bright Purple', value: 'bright-purple' },
                    ],
                  },
                }),
                defineField({
                  name: 'label',
                  type: 'string',
                  title: 'Metric Label',
                }),
                defineField({
                  name: 'sublabel',
                  type: 'string',
                  title: 'Metric Sublabel',
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.max(4),
        }),
        
        // CTA Section
        defineField({
          name: 'ctaTitle',
          type: 'string',
          title: 'CTA Title',
        }),
        defineField({
          name: 'ctaSubtitle',
          type: 'string',
          title: 'CTA Subtitle',
        }),
        defineField({
          name: 'ctaButtonText',
          type: 'string',
          title: 'CTA Button Text',
        }),
        defineField({
          name: 'ctaButtonLink',
          type: 'string',
          title: 'CTA Button Link',
          initialValue: '/get-started',
        }),
      ],
    }),
    
    // Data Controller Section
    defineField({
      name: 'dataControllerSection',
      type: 'object',
      title: 'Data Controller Section',
      icon: Database,
      fields: [
        // Benefits Section
        defineField({
          name: 'benefitsTitle',
          type: 'string',
          title: 'Benefits Section Title',
        }),
        defineField({
          name: 'benefits',
          type: 'array',
          title: 'Key Benefits',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'iconName',
                  type: 'string',
                  title: 'Icon Name',
                  description: 'Lucide icon name',
                }),
                defineField({
                  name: 'iconColor',
                  type: 'string',
                  title: 'Icon Color',
                  options: {
                    list: [
                      { title: 'Brand Green', value: 'brand-green' },
                      { title: 'Electric Blue', value: 'electric-blue' },
                      { title: 'Bright Purple', value: 'bright-purple' },
                      { title: 'Warm Coral', value: 'warm-coral' },
                      { title: 'Golden Amber', value: 'golden-amber' },
                    ],
                  },
                }),
                defineField({
                  name: 'title',
                  type: 'string',
                  title: 'Benefit Title',
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  title: 'Benefit Description',
                  rows: 2,
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.max(3),
        }),
        
        // Process Section
        defineField({
          name: 'processTitle',
          type: 'string',
          title: 'Process Section Title',
        }),
        defineField({
          name: 'steps',
          type: 'array',
          title: 'Process Steps',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'stepNumber',
                  type: 'number',
                  title: 'Step Number',
                }),
                defineField({
                  name: 'title',
                  type: 'string',
                  title: 'Step Title',
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  title: 'Step Description',
                  rows: 3,
                }),
                defineField({
                  name: 'bulletPoints',
                  type: 'array',
                  title: 'Bullet Points',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'iconName',
                          type: 'string',
                          title: 'Icon Name',
                        }),
                        defineField({
                          name: 'text',
                          type: 'string',
                          title: 'Bullet Text',
                        }),
                      ],
                    },
                  ],
                }),
                defineField({
                  name: 'visualExample',
                  type: 'object',
                  title: 'Visual Example',
                  fields: [
                    defineField({
                      name: 'type',
                      type: 'string',
                      title: 'Example Type',
                      options: {
                        list: [
                          { title: 'Dashboard', value: 'dashboard' },
                          { title: 'Code', value: 'code' },
                          { title: 'Chart', value: 'chart' },
                          { title: 'Custom', value: 'custom' },
                        ],
                      },
                    }),
                    defineField({
                      name: 'content',
                      type: 'text',
                      title: 'Example Content',
                      rows: 10,
                    }),
                  ],
                }),
              ],
            },
          ],
        }),
        
        // Trust/Comparison Section
        defineField({
          name: 'trustTitle',
          type: 'string',
          title: 'Trust Section Title',
        }),
        defineField({
          name: 'comparisonCards',
          type: 'array',
          title: 'Comparison Cards',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  type: 'string',
                  title: 'Card Title',
                }),
                defineField({
                  name: 'isHighlighted',
                  type: 'boolean',
                  title: 'Highlight Card',
                  description: 'Add green border to highlight this card',
                }),
                defineField({
                  name: 'items',
                  type: 'array',
                  title: 'Comparison Items',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'isPositive',
                          type: 'boolean',
                          title: 'Is Positive',
                          description: 'Shows checkmark (true) or X (false)',
                        }),
                        defineField({
                          name: 'text',
                          type: 'string',
                          title: 'Item Text',
                        }),
                      ],
                    },
                  ],
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.max(2),
        }),
        
        // CTA Section
        defineField({
          name: 'ctaTitle',
          type: 'string',
          title: 'CTA Title',
        }),
        defineField({
          name: 'ctaSubtitle',
          type: 'string',
          title: 'CTA Subtitle',
        }),
        defineField({
          name: 'ctaButtonText',
          type: 'string',
          title: 'CTA Button Text',
        }),
        defineField({
          name: 'ctaButtonLink',
          type: 'string',
          title: 'CTA Button Link',
          initialValue: '/get-started',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare(selection) {
      return {
        title: 'How It Works Page',
        subtitle: selection.title,
      };
    },
  },
});