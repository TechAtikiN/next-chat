// named imports
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth'
import { getDocs } from 'firebase/firestore'

async function ChatList() {
  const session = await getServerSession(authOptions)

  // const chatsSnapshot = await getDocs(
  //   chatMemberCollectionGroupRef(session?.user.id)
  // )

  return (
    <div>ChatList</div>
  )
}

export default ChatList