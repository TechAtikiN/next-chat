'use client'
// named imports
import { useRouter } from 'next/navigation'
import { User, limitedMessagesRef, messagesRef } from '@/converters/Message'
import { useSubscriptionStore } from '@/store/store'
import { addDoc, getDocs, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import { ToastAction } from '../ui/toast'

// default imports
import * as z from 'zod'

const formSchema = z.object({
  input: z.string().max(1000)
})

function ChatInput({ chatId }: { chatId: string }) {
  const router = useRouter()
  const subscription = useSubscriptionStore((state) => state.subscription)
  const { data: session } = useSession()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      input: ""
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const inputCopy = values.input.trim()
    form.reset()

    if (inputCopy.length === 0) return

    if (!session?.user) return

    const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length

    const isPro = subscription?.role === 'pro' && subscription.status === 'active'

    if (!isPro && messages >= 20) {
      toast({
        title: 'Free Plan Limit exceeded',
        description: 'Please upgrade to Pro to continue chatting',
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
    }

    const userToStore: User = {
      id: session.user.id,
      name: session.user.name!,
      image: session.user.image!,
      email: session.user.email!
    }

    addDoc(messagesRef(chatId), {
      input: inputCopy,
      timestamp: serverTimestamp(),
      user: userToStore
    })

  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800'
        >
          <FormField
            control={form.control}
            name='input'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <Input
                    className='border-none bg-transparent dark:placeholder:text-white/70'
                    placeholder='Enter message in ANY language...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='bg-violet-600 text-white'>
            Send
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ChatInput
