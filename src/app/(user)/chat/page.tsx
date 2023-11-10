import ChatList from "@/components/chats/ChatList"

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

      {/* Chat list */}
      <ChatList />

    </div>
  )
}

export default ChatsPage