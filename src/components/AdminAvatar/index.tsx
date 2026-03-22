'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@payloadcms/ui'
import type { User } from '@/payload-types'

export const AdminAvatar: React.FC = () => {
  const { user } = useAuth<User>()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const name = user?.name || (user as any)?.email || ''
  const initials = name
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?'

  useEffect(() => {
    if (!user?.avatar) return

    // If already populated (object with url)
    if (typeof user.avatar === 'object' && 'url' in user.avatar && user.avatar.url) {
      setAvatarUrl(user.avatar.url as string)
      return
    }

    // If it's just an ID, fetch the media document
    const id = typeof user.avatar === 'string' ? user.avatar : (user.avatar as any)?.id
    if (!id) return

    fetch(`/api/media/${id}?depth=0`)
      .then((r) => r.json())
      .then((doc) => {
        if (doc?.url) setAvatarUrl(doc.url)
      })
      .catch(() => {})
  }, [user?.avatar])

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
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
