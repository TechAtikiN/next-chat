// named imports
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button'
import { AlertCircle } from 'lucide-react'

// default imports
import Link from 'next/link'

function ChatPermissionError() {
  return (
    <Alert variant={'destructive'}>
      <AlertCircle className='w-4 h-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className='flex'>
        <p className='flex-1'>You do not have permission to view this chat
          <br />
          <span className='font-bold'>
            Please ask the chat admin to add you to the chat
          </span>
        </p>

        <Link href='/chat' replace>
          <Button variant={'destructive'}>Dismiss</Button>
        </Link>
      </AlertDescription>
    </Alert>
  )
}

export default ChatPermissionError