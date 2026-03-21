'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from '@/providers/Theme'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { cn } from '@/utilities/ui'
import nav_items from '@/components/navigation/nav_items.json'
import 'material-icons/iconfont/round.css'

import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Sidebar from '@/components/navigation/sidebar'

type NavCatLinks = {
  title: string
  href: string
  description: string
}

type NavCategory = {
  category: string
  root: string
  links: NavCatLinks[]
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const cmsNavItems = data?.navItems || []
  const { setTheme } = useTheme()

  return (
    <>
      {/* Desktop Navbar */}
      <header className="hidden items-center bg-gradient-to-b from-yoi-header-from from-50% to-transparent px-4 py-4 pb-8 md:flex lg:px-6">
        <Link className="flex flex-none items-center justify-center gap-1" href="/">
          <div className="pr-4">
            <Image src="/yoi_logo.png" alt="YOI Logo" width={75} height={75} />
            <span className="sr-only">The Youth Oceanic Initiative</span>
          </div>
          <div className="text-xl leading-5">
            <h1 className="m-0">Youth</h1>
            <h1 className="m-0">Oceanic</h1>
            <h1 className="m-0 mb-2 underline decoration-yoi-blue-2 decoration-wavy decoration-2 underline-offset-4 dark:decoration-yoi-blue-4">
              Initiative
            </h1>
          </div>
        </Link>
        <div className="ml-auto flex gap-4 pr-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme(null)}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {cmsNavItems.length > 0 ? (
            <nav className="flex items-center gap-3">
              {cmsNavItems.map(({ link }, i) => (
                <CMSLink key={i} {...link} appearance="link" />
              ))}
            </nav>
          ) : (
            <NavigationMenu className="flex items-center">
              <NavigationMenuList>
                {nav_items.map((item: NavCategory) => (
                  <NavigationMenuItem key={item.category}>
                    <NavigationMenuTrigger>
                      <Link href={item.root}>{item.category}</Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[500px] p-2 md:grid-cols-2">
                        {item.links.map((link) => (
                          <ListItem key={link.title} title={link.title} href={link.href}>
                            {link.description !== '' ? link.description : ''}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          )}

          <Button variant="default" size="default" className="text-yoi-white">
            <Link href="/donate">
              <div className="flex items-center gap-2">
                <span className="material-icons-round">payments</span>
                <span>Donate</span>
              </div>
            </Link>
          </Button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className="block md:hidden">
        <Sidebar />
      </div>
    </>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'
