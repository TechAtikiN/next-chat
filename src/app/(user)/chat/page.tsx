// defualt imports
import ChatList from '@/components/chats/ChatList'
import ChatPermissionError from '@/components/chats/ChatPermissionError'

interface Props {
  params: {}
  searchParams: {
    error?: string
  }
}

function ChatsPage({ searchParams: { error } }: Props) {
  return (
    <div className='py-3'>
      {/* Chat permission */}
      {error && (
        <div className='m-2'>
          <ChatPermissionError />
        </div>
      )}

      {/* Chat list */}
      <ChatList />

    </div>
  )
}

export default ChatsPage
