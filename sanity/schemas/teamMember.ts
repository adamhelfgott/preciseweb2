export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'background',
      title: 'Background Companies',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Short bio or description',
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'string',
      description: 'Path to image file',
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    },
    {
      name: 'twitter',
      title: 'Twitter URL',
      type: 'url',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
    },
  },
};