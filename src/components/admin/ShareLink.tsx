// named imports
import { Dispatch, SetStateAction } from 'react'
import { useToast } from '../ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Copy } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { DialogClose } from '@radix-ui/react-dialog'

function ShareLink({
  isOpen,
  setIsOpen,
  chatId
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  chatId: string
}) {
  const { toast } = useToast()
  const host = window.location.host

  const linkToChat =
    process.env.NODE_ENV === 'development' ?
      `http://${host}/chat/${chatId}` :
      `https://${host}/chat/${chatId}`

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(linkToChat)
      console.log('copied to clipboard')

      toast({
        title: 'Copied to clipboard',
        description: 'You can now share the link with your friends',
        className: 'bg-green-600 text-white',
      })
    } catch (error) {
      console.log('error copying to clipboard')
    }
  }

  return (
    <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Copy className='mr-1' />
          Share Link
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
          <DialogDescription>
            Any user who has been
            <span className='text-indigo-600 font-bold'>granted access</span>
            can use this link
            <span className='text-indigo-600 font-bold'>(Note they must be registered) </span>
          </DialogDescription>
        </DialogHeader>

        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>Link</Label>
            <Input id='link' defaultValue={linkToChat} readOnly />
          </div>
          <Button type='submit' onClick={() => copyToClipboard()} size='sm' className='px-3'>
            <span className='sr-only'>Copy</span>
            <Copy className='h-4 w-4' />
          </Button>
        </div>

        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>Close</Button>
          </DialogClose>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default ShareLink