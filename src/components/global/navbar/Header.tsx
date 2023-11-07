// named imports
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../auth'
import { DarkModeToggle } from './DarkModeToggle'
import { MessagesSquareIcon } from 'lucide-react'

// default imports
import Logo from './Logo'
import UserButton from './UserButton'
import Link from 'next/link'
import CreateChatButton from './CreateChatButton'

async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className='sticky top-0 z-50 bg-white dark:bg-slate-900'>
      <nav
        className='flex flex-col sm:flex-row items-center p-4 pl-2 bg-white dark:bg-slate-900 max-w-7xl sm:mx-auto'
      >
        <Logo />

        <div className='flex-1 flex items-center justify-end space-x-4'>
          {/* LanguageSelect */}

          {session ? (
            <>
              <Link href={'/chat'} prefetch={false}>
                <MessagesSquareIcon className='text-black dark:text-white' />
              </Link>
              <CreateChatButton />
            </>
          ) : (
            <>
              <Link href={'/pricing'}>Pricing</Link>
            </>
          )}

          <DarkModeToggle />

          <UserButton session={session} />

        </div>
      </nav>

      {/* Upgrade Banner */}
    </header>
  )
}

export default Header
