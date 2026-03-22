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
import { SheetTrigger, SheetClose, SheetContent, Sheet } from '@/components/ui/sheet'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'
import nav_items from './nav_items.json'

// Sidebar-specific NavigationMenu — no Viewport (renders content inline, not in a floating panel)
const SidebarNav = ({ children }: { children: React.ReactNode }) => (
  <NavigationMenuPrimitive.Root orientation="vertical" className="w-full py-2">
    <NavigationMenuPrimitive.List className="flex flex-col space-y-1 list-none m-0 p-0">
      {children}
    </NavigationMenuPrimitive.List>
    {/* No <NavigationMenuViewport> — content renders inline */}
  </NavigationMenuPrimitive.Root>
)

const SidebarNavItem = NavigationMenuPrimitive.Item

const SidebarNavTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      'group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 focus:outline-none',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden />
  </NavigationMenuPrimitive.Trigger>
))
SidebarNavTrigger.displayName = 'SidebarNavTrigger'

const SidebarNavContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn('pl-2 pb-1', className)}
    {...props}
  />
))
SidebarNavContent.displayName = 'SidebarNavContent'

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

type SidebarProps = {
  className?: string
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { setTheme } = useTheme()

  return (
    <header
      className={
        'flex w-screen items-center bg-gradient-to-b from-yoi-blue-4 dark:from-yoi-blue-1 from-30% to-transparent to-75% px-4 py-4 pb-8 lg:px-6' +
        (className ? ' ' + className : '')
      }
    >
      <Link className="flex flex-none items-center justify-center gap-2" href="/">
        <div className="">
          <Image src="/yoi_logo.png"  alt="YOI Logo" width={50} height={50} />
          <span className="sr-only">The Youth Oceanic Initiative</span>
        </div>
        <div className="text-m leading-4">
          <h1 className="m-0">Youth</h1>
          <h1 className="m-0">Oceanic</h1>
          <h1 className="m-0 mb-2 underline decoration-yoi-blue-4 decoration-wavy decoration-2 underline-offset-4">
            Initiative
          </h1>
        </div>
      </Link>
      <div className="w-full"></div>
      <Sheet>
        <SheetTrigger asChild className="h-12 min-w-12">
          <Button className="rounded-full" size="icon" variant="ghost">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-72 bg-yoi-black text-yoi-white" side="right">
          <div className="flex h-20 items-center justify-between border-b border-gray-700 px-0">
            <Link className="flex flex-none items-center justify-center gap-2" href="#">
              <div className="">
                <Image
                  src="/yoi_logo.png"
                  
                  alt="YOI Logo"
                  width={50}
                  height={50}
                />
                <span className="sr-only">The Youth Oceanic Initiative</span>
              </div>
              <div className="text-m leading-4">
                <h1 className="m-0">Youth</h1>
                <h1 className="m-0">Oceanic</h1>
                <h1 className="m-0 mb-2 underline decoration-yoi-blue-4 decoration-wavy decoration-2 underline-offset-4">
                  Initiative
                </h1>
              </div>
            </Link>
            <SheetClose asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <XIcon className="h-6 w-6" />
                <span className="sr-only">Close navigation menu</span>
              </Button>
            </SheetClose>
          </div>
          <SidebarNav>
            {nav_items.map((item: NavCategory) => (
              <SidebarNavItem key={item.category}>
                <SidebarNavTrigger>{item.category}</SidebarNavTrigger>
                <SidebarNavContent>
                  <ul className="flex flex-col gap-0.5 py-1">
                    {item.links.map((link) => (
                      <li key={link.title}>
                        <SheetClose asChild>
                          <Link
                            href={link.href}
                            className="block rounded-md px-3 py-1.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                          >
                            {link.title}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </SidebarNavContent>
              </SidebarNavItem>
            ))}
          </SidebarNav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="w-full">
                <div className="flex gap-3 px-4 text-foreground">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span>Toggle theme</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme(null)}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Sidebar

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}


