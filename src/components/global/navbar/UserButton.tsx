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

// default imports
import UserAvatar from './UserAvatar'

function UserButton({ session }: { session: Session | null }) {
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
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default UserButton
