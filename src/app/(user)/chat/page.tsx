import ChatList from "@/components/chats/ChatList"

interface Props {
  params: {}
  searchParams: {
    error?: string
  }

}

function ChatsPage({ searchParams: { error } }: Props) {
  return (
    <div>
      {/* Chat permission */}
      <h1>chats</h1>

      {/* Chat list */}
      <ChatList />

    </div>
  )
}

export default ChatsPage