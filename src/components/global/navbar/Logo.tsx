// default imports
import LogoImage from '@assets/logos/logo.png'
import Link from 'next/link'
import Image from 'next/image'

function Logo() {
  return (
    <Link
      href='/'
      prefetch={false}
      className='overflow-hidden'
    >
      <div className='flex justify-center items-center'>
        <Image
          src={LogoImage}
          alt='logo'
          height={50}
          width={50}
          className='dark:filter dark:invert'
        />
        <p
          className='text-xl text-slate-900 dark:text-slate-100'
        >
          nextChat
        </p>
      </div>
    </Link>
  )
}

export default Logo
