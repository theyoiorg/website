import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'department'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'pronouns',
      type: 'text',
    },
    {
      name: 'department',
      type: 'text',
      required: true,
    },
    {
      name: 'departmentOrder',
      type: 'number',
    },
    {
      name: 'image',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
