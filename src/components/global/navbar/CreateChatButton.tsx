'use client'

// named imports
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MessageSquarePlusIcon } from 'lucide-react'
import { useSubscriptionStore } from '@/store/store'
import { useToast } from '@/components/ui/use-toast'
import { v4 as uuidv4 } from 'uuid'

// default imports
import LoadingSpinner from '../LoadingSpinner'
import { serverTimestamp, setDoc } from 'firebase/firestore'
import { addChatRef } from '@/converters/ChatMembers'

function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const subscription = useSubscriptionStore((state) => state.subscription)

  const createNewChat = async () => {
    if (!session?.user.id) return

    setLoading(true)
    toast({
      title: 'Creating new chat...',
      description: 'Hold tight while we create your new chat!',
      duration: 3000,
    })

    // TODO: Check if user is pro and limit them creating a new chat

    const chatId = uuidv4()

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session?.user.image || '',
    })
      .then(() => {
        toast({
          title: 'Success!',
          description: 'Your new chat has been created!',
          duration: 3000,
          className: 'bg-green-600 text-white'
        })
        router.push(`/chat/${chatId}`)
      })
      .catch((err) => {
        console.error(err)
        toast({
          title: 'Error!',
          description: 'Something went wrong creating your chat!',
          duration: 3000,
          variant: 'destructive'
        })
      })
      .finally(() => {
        setLoading(false)
      })

  }

  if (isLarge)
    return (
      <div>
        <Button variant={"default"} onClick={createNewChat}>
          {loading ? <LoadingSpinner /> : 'Create a new chat'}
        </Button>
      </div>
    )

  return (
    <Button onClick={createNewChat} variant={'ghost'}>
      <MessageSquarePlusIcon />
    </Button>
  )
}

export default CreateChatButton
