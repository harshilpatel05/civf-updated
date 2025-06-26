'use client'
import Image from 'next/image'
import { Phone,Mail,MessageCircle,Linkedin } from "@deemlol/next-icons";
import Link from 'next/link';
export default function Contact(){
    return(
        <div>
      <div className="bg-gradient-to-tr from-blue-900 from-10% to-orange-600">
        <div className="flex flex-row space-x-20 p-5 justify-center">
            <div className="flex flex-col items-center text-center p-2  w-100 h-100">
                <Image className='bg-white p-3 h-25 w-55 rounded'
                 src='/logos/civfLogo.png' width={100} height={100} alt='Image'/>
                 <div>
                    <h1 className=' font-bold italic p-2'>&quot;A Section - 8  Company&quot;</h1>     
                 </div>
                 <div>
                    <Image className='bg-white p-2 h-15 w-45 rounded'
                 src='/logos/charusat.png' width={100} height={100} alt='Image'/>
                    
                 </div>
                 <div className='w-60 outline-1 outline-white m-4'></div>
                 <div className='p-1 pt-0 flex'><Phone size={24} color="#FFFFFF" /> <h1 className='px-1 font-bold'>02697-265401</h1></div>
                <div className='p-1 pb-0 pt-0 flex'><Mail size={24} color="#FFFFFF" /> <h1 className='px-1 font-bold'>civf@charusat.ac.in </h1></div>
                <div className='w-60 outline-1 outline-white mb-2 m-4'></div>
                <div className='font-bold pt-0'>Follow Us</div>
                <div className='flex flex-row space-x-3 p-3'>
                <a href="https://api.whatsapp.com/message/TDBNDOFJPC5AE1?autoload=1&app_absent=0"><MessageCircle size={24} color="#FFFFFF"/></a>
                <a href='https://www.linkedin.com/company/charusat-innovative-ventures-foundation ' target='_blank'><div className='p-1 pb-0 pt-0'><Linkedin size={24} color="#FFFFFF" /> </div></a>
                </div>

            </div>
            <div className="w-150 h-100">
              <div className='text-center text-2xl font-bold p-2'><h1>Quick Links</h1></div>
              <div className='flex flex-row justify-center'>
              <div className='w-90 outline-1 outline-white mb-2 m-4'></div>
              </div>
              <div className='flex justify-center  pt-10 flex-row space-x-32'>
              <div className='p-5 pt-0  '>
                <ul className='text-xl space-y-4'>
                  <li><Link href='/aboutUs'>About Us</Link></li>
                  <li><Link href='/startup'>Start Up Portfolio</Link></li>
                  <li><Link href='/services'>Services</Link></li>
                  <li><Link href=''>Donate</Link></li>
                  <li><Link href='/career'>Career at CIVF</Link></li>
                </ul>
              </div>
              <div className='p-5 pt-0'>
                <ul className='text-xl space-y-4'>
                  <li><Link href='/accelaration-program'>Acceleration Program</Link></li>
                  <li><Link href='/facilities'>Facilities</Link></li>
                  <li><Link href='/blog'>Blog/Reports</Link></li>
                  <li><Link href='/faq'>FAQs</Link></li>
                  <li><Link href='/contact'>Contact Us</Link></li>
                </ul>
              </div>
              </div>
            </div>
            <div className=" w-100 h-100 flex-col flex items-center justify-center">
                <div><h1 className='font-bold pb-2'>Reach us out on WhatsApp</h1></div>
                <a href="https://wa.me/message/TDBNDOFJPC5AE1" target='_blank'><Image src='/logos/civfWhatsappQR.png' height={100} width={100} alt='Whatsapp' className=' w-50 h-50'/></a></div>
        </div>
        <div className='text-2xl font-bold text-center pb-5'>© CIVF 2025</div>
      </div>
      </div>
    )
}