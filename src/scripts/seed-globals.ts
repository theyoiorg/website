import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

const PUBLIC_DIR = path.resolve(__dirname, '../../public')

async function seed() {
  const payload = await getPayload({ config })

  // ── Header global ──────────────────────────────────────────────────────────
  const navItems = require(path.resolve(__dirname, '../components/navigation/nav_items.json'))

  // Flatten nav_items into simple URL links for the CMS header
  // The link field shape: { link: { type, url, label, newTab } }
  const makeNavItem = (href: string, title: string, newTab = false) => ({
    link: { type: 'custom' as const, url: href, label: title, newTab },
  })

  // Header only supports 6 rows max — use top-level categories only
  const headerNavItems = navItems.map((category: any) =>
    makeNavItem(category.root, category.category),
  )

  await payload.updateGlobal({
    slug: 'header',
    data: { navItems: headerNavItems },
    context: { disableRevalidate: true },
  })
  console.log('✅ Header seeded')

  // ── Footer global ──────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      navItems: [
        makeNavItem('https://www.instagram.com/youth_oceanic_initiative/', 'Instagram', true),
        makeNavItem('https://www.tiktok.com/@youthoceanicinitiative', 'TikTok', true),
        makeNavItem('mailto:hello@theyoi.org', 'Email'),
        makeNavItem('mailto:webmaster@theyoi.org?subject=YOI%20Website%20Issue', 'Website Problems?'),
      ],
    },
    context: { disableRevalidate: true },
  })
  console.log('✅ Footer seeded')

  // ── Media uploads ──────────────────────────────────────────────────────────
  // Find all images in public/ (excluding public/media which is Payload's own dir)
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']

  function findImages(dir: string, base = dir): string[] {
    const results: string[] = []
    if (!fs.existsSync(dir)) return results
    for (const entry of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, entry)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        // Skip Payload's own media dir and fonts
        if (entry === 'media' || entry === 'fonts') continue
        results.push(...findImages(fullPath, base))
      } else if (imageExtensions.includes(path.extname(entry).toLowerCase())) {
        results.push(fullPath)
      }
    }
    return results
  }

  const images = findImages(PUBLIC_DIR)
  console.log(`📸 Uploading ${images.length} images to Media collection...`)

  let uploaded = 0
  let skipped = 0

  for (const imagePath of images) {
    const relativePath = '/' + path.relative(PUBLIC_DIR, imagePath).replace(/\\/g, '/')
    const filename = path.basename(imagePath)

    // Check if already uploaded (by alt text matching the path)
    const existing = await payload.find({
      collection: 'media',
      where: { alt: { equals: relativePath } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      skipped++
      continue
    }

    try {
      const fileBuffer = fs.readFileSync(imagePath)
      const mimeType = getMimeType(filename)

      await payload.create({
        collection: 'media',
        data: { alt: relativePath },
        file: {
          data: fileBuffer,
          mimetype: mimeType,
          name: filename,
          size: fileBuffer.length,
        },
      })
      uploaded++
      process.stdout.write(`  ✓ ${relativePath}\n`)
    } catch (err: any) {
      console.error(`  ✗ ${relativePath}: ${err.message}`)
    }
  }

  console.log(`\n✅ Media: ${uploaded} uploaded, ${skipped} skipped (already existed)`)
  console.log('\n🌊 Globals + media seeded successfully!')
  process.exit(0)
}

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  const map: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  }
  return map[ext] ?? 'application/octet-stream'
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
