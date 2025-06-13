import { EmailIcon, LocationIcon, WhatsAppIcon, YoutubeIcon } from '@/assets/svg'
import { Divider } from '@jamsr-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <section className='bg-[#213343]'>
      <div className='container mx-auto max-w-7xl p-6 pt-12'>
        <Image src="/images/home/Logo.png" alt="Footer Logo" width={200} height={50} className='w-auto h-10 mb-8' />

        <div className='md:flex gap-4'>
          <div className='basis-3/8'>
            <p className='text-white text-md mb-4'>
              The starting point for your next project with Jamsr.in, built on the newest version of Material-UI©, ready to be customized to your style.
            </p>
            <Link href="/" className='inline-block p-2 rounded-full hover:bg-neutral-500' >
            <YoutubeIcon className="h-10 w-10 fill-red-500" />
            </Link>
          </div>

          <div className='basis-5/8 grid md:grid-cols-3 gap-2'>
            {[
              {
                title: 'Company',
                links: ['About us', 'Contact us', 'FAQs', 'Plans'],
              },
              {
                title: 'Legal',
                links: ['Terms and Condition', 'Privacy Policy', 'Refund Policy', 'Commission Policy'],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h1 className='text-slate-400 text-lg uppercase'>{section.title}</h1>
                <ul className='text-slate-100 text-md mt-4 space-y-4'>
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link href="/" className='hover:underline underline-offset-2'>{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h1 className='text-slate-400 text-lg uppercase'>Contact</h1>
              <ul className='text-slate-100 text-md mt-4 space-y-4'>
                <li className="flex items-center gap-2 "><EmailIcon className=" w-6 h-6 fill-blue-600"/> princeraj9137@gmail.com</li>
                <li className="flex items-center gap-2"><WhatsAppIcon className="w-4 h-4" /> +91 97717 01893</li>
                <li className="flex items-center gap-2"><LocationIcon className="w-4 h-4 fill-red-500" /> India</li>
              </ul>
            </div>
          </div>
        </div>

        <Divider className='mt-4' />
        <h1 className='text-slate-200 text-md mt-4 text-center'>© 2025. All Rights Reserved</h1>
      </div>
    </section>
  )
}

export default Footer
