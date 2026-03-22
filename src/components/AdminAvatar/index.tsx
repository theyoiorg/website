'use client'

import React from 'react'
import { useAuth } from '@payloadcms/ui'

export const AdminAvatar: React.FC = () => {
  const { user } = useAuth()

  const avatar = (user as any)?.avatar
  const src = typeof avatar === 'object' && avatar?.url ? avatar.url : null
  const name: string = (user as any)?.name || (user as any)?.email || 'U'
  const initials = name
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
    )
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: '#04328d',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500,
        fontSize: '0.8rem',
      }}
    >
      {initials}
    </div>
  )
}
