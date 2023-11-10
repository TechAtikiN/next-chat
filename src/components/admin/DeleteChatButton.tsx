'use client'
// named imports
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useToast } from '../ui/use-toast'

// default imports
import useAdminId from '@/hooks/useAdminId'
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

function DeleteChatButton({ chatId }: { chatId: string }) {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const adminId = useAdminId({ chatId })

  const handleDelete = async () => {
    toast({
      title: 'Deleting chat',
      description: 'Please wait while we delete the chat',
    })
    console.log('deleting chat', chatId)

    await fetch('/api/chat/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId }),
    }).then((res) => {
      toast({
        title: 'Success',
        description: 'Your chat has been deleted',
        className: 'bg-green-600 text-white',
        duration: 3000,
      })
      router.replace('/chat')
    }).catch((error) => {
      toast({
        title: 'Error',
        description: 'There was an error deleting your chat',
        className: 'bg-red-600 text-white',
        duration: 3000,
      })
      console.log(error)
    }).finally(() => {
      setOpen(false)
    })
  }

  return (
    session?.user?.id === adminId && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='destructive'>Delete Chat</Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will delete the chat for all users
            </DialogDescription>
          </DialogHeader>

          <div className='grid gric-cols-2 space-x-2'>
            <Button variant={'destructive'} onClick={handleDelete}>Delete</Button>
            <Button variant={'outline'} onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  )
}

export default DeleteChatButton
