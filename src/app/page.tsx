import { getServerSession } from "next-auth"
import { authOptions } from "../../auth"

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div>
      <h1 className="">Home</h1>
    </div>
  )
}
