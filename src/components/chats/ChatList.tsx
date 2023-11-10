// named imports
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth'
import { getDocs } from 'firebase/firestore'
import { chatMembersCollectionGroupRef } from '@/converters/ChatMembers'

// default imports
import ChatListRows from './ChatListRows'

async function ChatList() {
  const session = await getServerSession(authOptions)

  const chatsSnapshot = await getDocs(
    chatMembersCollectionGroupRef(session?.user.id!)
  )

  const initialChats = chatsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timesatmp: null
  }))

  return (
    <ChatListRows initialChats={initialChats} />
  )
}

export default ChatList