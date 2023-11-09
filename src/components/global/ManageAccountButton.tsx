'use client'
// default imports
import generatePortalLink from '../../actions/generatePortalLink'

function ManageAccountButton({ userId }: { userId: string | undefined }) {
  const generatePortalLinkWithId = generatePortalLink.bind(null, userId)

  return <form action={generatePortalLinkWithId}>
    <button type='submit'>Manage Billing</button>
  </form>

}

export default ManageAccountButton
