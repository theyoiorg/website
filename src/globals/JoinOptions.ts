import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const JoinOptions: GlobalConfig = {
  slug: 'join-options',
  admin: {
    group: 'Content',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'options',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'link',
          type: 'text',
        },
        {
          name: 'image',
          type: 'text',
        },
        {
          name: 'imageLeft',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
