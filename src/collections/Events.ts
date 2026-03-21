import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'date',
      type: 'text',
    },
    {
      name: 'link',
      type: 'text',
    },
    {
      name: 'buttonText',
      type: 'text',
    },
  ],
}
