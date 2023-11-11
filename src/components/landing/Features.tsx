'use client'

// named imports
import { useState } from 'react'

// default imports
import Image from 'next/image'

const features = [
  {
    title: 'Chat in any Language',
    description: 'Chat in any language you want. Have a look at the supported languages',
    image: '/app/chats.png'
  },
  {
    title: 'Subscribe to PRO',
    description: 'Subscribe to PRO and get access to all the features for eg. more languages support, number of chats etc',
    image: '/app/chats.png'
  },
  {
    title: 'Manage billing',
    description: 'Keep track of your billing and manage your subscription. You can also cancel your subscription anytime you want',
    image: '/app/chats.png'
  },
  {
    title: 'Best chatting experience',
    description: 'Chat with your friends by simply sending invites. Manage and delete your chats with ease',
    image: '/app/chats.png'
  },
]

function Features() {
  const [selectedFeature, setSelectedFeature] = useState(features[0])
  return (
    <div className='py-36 bg-gradient-to-tr from-sky-200 via-slate-200 to-purple-200 dark:from-sky-800 dark:via-slate-950 dark:to-purple-950'>
      <div className='flex flex-col space-y-5 justify-center items-center px-10 sm:px-0'>
        <h2 className='text-4xl font-semibold text-center'>
          Everything you need for effortless an chatting experience
        </h2>
        <p className='text-lg font-light'>Well everything if you aren&apos;t that picky about minor details like archiving chats</p>
      </div>

      <div className='md:flex justify-center ml-40 pt-52 hidden'>
        <ul className='flex flex-col space-y-3'>
          {features.map((feature, index) => (
            <li
              onClick={() => setSelectedFeature(feature)}
              key={index}
              className={`
              ${selectedFeature.title === feature.title ? 'glass-style' : null}   
              p-4 flex flex-col space-y-1 hover:glass-style w-[490px] cursor-pointer h-28
          `}
            >
              <h3 className='text-lg font-semibold'>{feature.title}</h3>
              <p className='font-light text-sm'>{feature.description}</p>
            </li>
          ))}
        </ul>
        <div className='relative z-30 h-[700px] w-[1100px] -mt-24'>
          <Image
            fill
            className='rounded-xl'
            alt={selectedFeature.title}
            src={selectedFeature.image}
          />
        </div>
      </div>
    </div>
  )
}

export default Features