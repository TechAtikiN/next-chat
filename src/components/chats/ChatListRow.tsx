'use client'

// named imports
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Message, limitedSortedMessagesRef } from '@/converters/Message'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useLanguageStore } from '@/store/store'
import { Skeleton } from '../ui/skeleton'

// default imports
import UserAvatar from '../global/navbar/UserAvatar'

function ChatListRow({ chatId }: { chatId: string }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [language] = useLanguageStore((state) => [state.language])

  const [messages, loading, error] = useCollectionData<Message>(
    limitedSortedMessagesRef(chatId)
  )

  function prettyUUID(n = 4) {
    return chatId.substring(0, n)
  }

  const row = (message?: Message) => (
    <div
      key={chatId}
      onClick={() => router.push(`/chat/${chatId}`)}
      className='flex p-5 items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'
    >
      <UserAvatar
        name={message?.user.name || session?.user.name}
        image={message?.user.image || session?.user.image}
      />

      <div className='flex-1'>
        <p className='font-bold'>
          {!message && 'New chat'}
          {
            message &&
            [message?.user.name || session?.user.name].toString().toString().split(' ')[0]
          }
        </p>

        <p className='text-gray-400 line-clamp-1'>
          {message?.translated?.[language] || 'Get the conversation started!'}
        </p>
      </div>

      <div className='text-xs text-gray-400 text-right'>
        <p className='mb-auto'>
          {message ? new Date(message.timestamp).toLocaleDateString() : 'No messages yet'}
        </p>
        <p>chat #{prettyUUID()}</p>
      </div>

    </div>
  )

  return (
    <div>
      {loading && (
        <div className='flex p-5 items-center space-x-2'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='space-y-2 flex-1'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-1/4' />
          </div>
        </div>
      )}

      {messages?.length === 0 && !loading && row()}

      {messages?.map((message) => row(message))}

    </div>
  )
}

export default ChatListRow