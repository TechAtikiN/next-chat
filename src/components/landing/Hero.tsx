// named imports
import { ArrowRight } from 'lucide-react'

// default imports
import Link from 'next/link'

function Hero() {
  return (
    <div className='flex flex-col justify-center py-40'>
      <div className='flex justify-center mx-auto'>
        <div className='flex flex-col space-y-3'>
          <h2
            className='text-6xl py-1 font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400 via-purple-500 font-bold text-center'
          >
            Chat with Anyone,<br /> Anywhere!
          </h2>
          <p className='w-3/4 mx-auto text-center text-lg font-light dark:text-purple-200 text-slate-900 animate-pulse'>
            Chat in any language, explore exciting PRO features, like group chats, pleasant UI, dark mode and much more! Start chit-chatting today
          </p>
        </div>
      </div>

      <div className='mx-auto py-8 space-x-3'>
        <Link href='/pricing' className='home-btn bg-white text-slate-700 hover:text-white'>
          <span>Get Started</span>
          <ArrowRight className='inline-block ml-2' size={16} />
        </Link>
        <Link href='/register' className='home-btn'>Manage Account</Link>
      </div>
    </div>
  )
}

export default Hero