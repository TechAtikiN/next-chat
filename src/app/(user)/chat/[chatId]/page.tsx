// named imports
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../auth'
import { sortedMessagesRef } from '@/converters/Message'
import { getDocs } from 'firebase/firestore'
import { redirect } from 'next/navigation'
import { chatMembersRef } from '@/converters/ChatMembers'

// default imports
import ChatInput from '@/components/chats/ChatInput'
import ChatMessages from '@/components/chats/ChatMessages'
import ChatMembersBadge from '@/components/chats/ChatMembersBadge'
import AdminControls from '@/components/admin/AdminControls'

interface Props {
  params: {
    chatId: string
  }
}

async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions)
  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  )

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id).includes(session?.user?.id!)

  if (!hasAccess) redirect('/chat?error=permission')

  return (
    <>
      {/* Admin controls */}
      <AdminControls chatId={chatId} />

      {/* Chat members badge  */}
      <ChatMembersBadge chatId={chatId} />

      {/* Chat messages */}
      <div className='flex-1'>
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>

      {/* Chat input */}
      <ChatInput chatId={chatId} />
    </>
  )
}

export default ChatPage
