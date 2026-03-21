import { redirect } from 'next/navigation'

export default function RedirectSite() {
  redirect('/about/team')

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-yoi-white text-center text-yoi-black dark:bg-yoi-black dark:text-yoi-white">
      <h1 className="text-4xl">Automatic Redirect</h1>
      <p>
        Redirecting you to{' '}
        <a href="/about/team" className="text-yoi-blue-1 dark:text-yoi-blue-5">
          theyoi.org/about/team
        </a>
        ...
      </p>
      <p>If you are not automatically redirected, use the link above.</p>
    </main>
  )
}
