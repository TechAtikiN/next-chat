'use client'

// named imports
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useSubscriptionStore } from '@/store/store'
import { StarIcon } from 'lucide-react'

// default imports
import LoadingSpinner from '../LoadingSpinner'
import UserAvatar from './UserAvatar'

function UserButton({ session }: { session: Session | null }) {
  const subscription = useSubscriptionStore((state) => state.subscription)

  if (!session) return (
    <Button variant={'outline'} onClick={() => signIn()}>
      Sign in
    </Button>
  )

  return session && (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar image={session.user?.image} name={session.user?.name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {subscription === undefined && (
          <DropdownMenuItem onClick={() => signOut()}>
            <LoadingSpinner />
          </DropdownMenuItem>
        )}

        {subscription?.role === 'pro' && (
          <>
            <DropdownMenuLabel className='text-sm flex items-center justify-center space-x-1 text-pink-700 animate-pulse'>
              <StarIcon fill='#E953C1' />
              <p>PRO</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              Manage
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem className='' onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
