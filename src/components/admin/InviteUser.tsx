'use client'

//named imports
import { useSession } from 'next-auth/react'
import { useToast } from '../ui/use-toast'
import { useSubscriptionStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { addChatRef, chatMembersRef } from '@/converters/ChatMembers'
import { getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import { ToastAction } from '../ui/toast'
import { getUserByEmailRef } from '@/converters/User'

// default imports
import * as z from 'zod'
import useAdminId from '@/hooks/useAdminId'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

function InviteUser({ chatId }: { chatId: string }) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const adminId = useAdminId({ chatId })
  const subscription = useSubscriptionStore((state) => state.subscription)
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [openInviteLink, setOpenInviteLink] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      email: '',
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user?.id) return

    toast({
      title: 'Sending invite',
      description: 'Please wait while we send the invite to the user',
    })

    // we need to get the number of users in the chat to cehck if they are about to exceed the limit
    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length

    const isPro = subscription?.role === 'pro' && subscription?.status === 'active'

    if (!isPro && noOfUsersInChat >= 2) {
      toast({
        title: 'Free plan limit reached',
        description: 'You have exceeded the limit of users in a single chat for the FREE plan. Please upgrade to PRO to continue adding users to chat',
        variant: 'destructive',
        action: (
          <ToastAction
            altText='Upgrade to PRO'
            onClick={() => router.push('/register')}
          >
            Upgrade to PRO
          </ToastAction>
        )
      })
      return
    }

    const querySnapshot = await getDocs(getUserByEmailRef(values.email))

    if (querySnapshot.empty) {
      toast({
        title: 'User not found',
        description: 'Please enter an email address of a registered user OR resend the invitation once they have signed up',
        variant: 'destructive',
      })

      return
    } else {
      const user = querySnapshot.docs[0].data()

      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id!,
        email: user.email!,
        timestamp: serverTimestamp(),
        chatId,
        isAdmin: false,
        image: user.image || '',
      }).then(() => {
        setOpen(false)

        toast({
          title: 'Added to chat',
          description: 'The user has been added to the chat successfully!',
          className: 'bg-green-600 text-white',
          duration: 3000,
        })

        setOpenInviteLink(true)
      }).catch(() => {
        toast({
          title: 'Error',
          description: 'Whoops! There was an error adding the user to the chat. Please try again later.',
          variant: 'destructive',
        })

        setOpen(false)
      })
    }

    form.reset()
  }

  return (
    adminId === session?.user?.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className='mr-1' />
              Add User to Chat
            </Button>
          </DialogTrigger>

          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Add User to Chat</DialogTitle>
              <DialogDescription>
                Simply enter the email address of the user you want to invite to this chat! &nbsp;
                <span className='text-indigo-600 font-bold'>(Note they must be registered) </span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col space-y-3'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='johndoe@doe.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' className='ml-auto sm:w-fit w-full'>Add to Chat</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* <ShareLink
          isOpen={openInviteLink}
          setIsOpen={setOpenInviteLink}
          chatId={chatId}
        /> */}
      </>
    )
  )
}

export default InviteUser