'use client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './Navbar';
import Image from 'next/image';
export default function Values() {
  return (
    <div>
      <Navbar />

      <h1 className="text-center text-4xl font-extrabold p-5 bg-rose-100 text-black">
        Values
      </h1>

      <div className="flex flex-row space-x-20 p-5 justify-center bg-rose-100">
        
        <div className="text-center flex flex-col rounded-b-2xl bg-orange-500 w-90 h-120">
          <div className="bg-white/20 rounded-b-full flex flex-col justify-center h-60">
            <i className="fas fa-hand-holding-heart text-6xl text-white"></i>
          </div>
          <div className="p-10 pb-0.5">
            <h1 className="text-2xl font-bold">Honesty</h1>
          </div>
          <div>
            <p className="text-lg px-15">
              Ensuring an environment of trust and respect (with our clients and all stakeholders) 
              by adhering to the utmost standards of honesty.
            </p>
          </div>
        </div>

        <div className="text-center flex flex-col rounded-b-2xl bg-green-500 w-90 h-120">
          <div className="bg-white/20 rounded-b-full flex flex-col justify-center h-60">
            <i className="fas fa-handshake text-6xl text-white"></i>
          </div>
          <div className="p-10 pb-0.5">
            <h1 className="text-2xl font-bold">Integrity</h1>
          </div>
          <div>
            <p className="text-lg px-15">
              Practicing harmony in our thinking, saying, and doing.
            </p>
          </div>
        </div>

        <div className="text-center flex flex-col rounded-b-2xl bg-yellow-500 w-90 h-120">
          <div className="bg-white/20 rounded-b-full flex flex-col justify-center h-60">
            <i className="fas fa-eye text-6xl text-white"></i>
          </div>
          <div className="p-10 pb-0.5">
            <h1 className="text-2xl font-bold">Transparency</h1>
          </div>
          <div>
            <p className="text-lg px-15">
              Striving for transparent culture by encouraging open communication, 
              access to information, participation and accountability.
            </p>
          </div>
        </div>
      </div>
     
     <div className='bg-white'>
      <h1 className="text-center text-4xl font-extrabold p-5 text-black">
        Cherishment
      </h1>
      <div className='flex flex-row justify-center space-x-15 p-5 pb-10'>
        <div className='shadow-xl flex flex-col justify-between w-75 h-120'>
          <div className=' bg-purple-500 flex justify-center items-center w-75 h-30 rounded-b-full'>
            <div className='flex flex-col items-center space-y-0.5'><div className='bg-white/80 rounded-full text-4xl  w-16 h-16 text-black flex justify-center items-center'>
            <h1 style={{ fontFamily: '"Times New Roman", serif' }} className='font-extrabold  text-purple-500'>I</h1>
            </div><div className='text-2xl font-bold'>Innovation</div></div>
            <div className='text-center text-2xl'><h1 className=''></h1></div>
          </div>
          <div className='fas fa-lightbulb text-center text-purple-500 text-7xl'></div>
          <div className=' bg-purple-500 flex flex-col justify-center items-center w-75 h-50 rounded-t-full'>
            <div className='px-10 text-center text-md'><p>Effective deployment of technology with new ideas reflecting new
               possibilities and new ways of working for the benefits to our stakeholders.</p></div>
          </div>
        </div>




        <div className='shadow-xl flex flex-col justify-between w-75 h-120'>
          <div className=' bg-orange-400 flex justify-center items-center w-75 h-30 rounded-b-full'>
            <div className='flex flex-col items-center space-y-0.5'><div className='bg-white/80 rounded-full text-4xl  w-16 h-16 text-black flex justify-center items-center'>
            <h1 style={{ fontFamily: '"Times New Roman", serif' }} className='font-extrabold  text-orange-400'>E</h1>
            </div><div className='text-2xl font-bold'>Excellence</div></div>
            <div className='text-center text-2xl'><h1 className=''></h1></div>
          </div>
          <div className='fas fa-trophy text-center text-orange-400 text-7xl'></div>
          <div className=' bg-orange-400 flex flex-col justify-center items-center w-75 h-50 rounded-t-full'>
            <div className='px-10 text-center text-md'><p>Driven by high professional 
              standards in delivering quality services to stakeholders.</p></div>
          </div>
        </div>





        <div className='shadow-xl flex flex-col justify-between w-75 h-120'>
          <div className=' bg-green-500 flex justify-center items-center w-75 h-30 rounded-b-full'>
            <div className='flex flex-col items-center space-y-0.5'><div className='bg-white/80 rounded-full text-4xl  w-16 h-16 text-black flex justify-center items-center'>
            <h1 style={{ fontFamily: '"Times New Roman", serif' }} className='font-extrabold  text-green-500'>L</h1>
            </div><div className='text-2xl font-bold'>Leadership</div></div>
            <div className='text-center text-2xl'><h1 className=''></h1></div>
          </div>
          <div className='fas fa-user-tie text-center text-green-500 text-7xl'></div>
          <div className=' bg-green-500 flex flex-col justify-center items-center w-75 h-50 rounded-t-full'>
            <div className='px-10 text-center text-md'><p>Leading with an agile approach to problem-solving and creating a balance between grassroots experience, 
              strategic thinking and policy making.</p></div>
          </div>
        </div>





        <div className='shadow-xl flex flex-col justify-between w-75 h-120'>
          <div className=' bg-yellow-500 flex justify-center items-center w-75 h-30 rounded-b-full'>
            <div className='flex flex-col items-center space-y-0.5'><div className='bg-white/80 rounded-full text-4xl  w-16 h-16 text-black flex justify-center items-center'>
            <h1 style={{ fontFamily: '"Times New Roman", serif' }} className='font-extrabold  text-yellow-500'>I</h1>
            </div><div className='text-2xl font-bold'>Impact</div></div>
            <div className='text-center text-2xl'><h1 className=''></h1></div>
          </div>
          <div className='fas fa-line-chart text-center text-yellow-500 text-7xl'></div>
          <div className=' bg-yellow-500 flex flex-col justify-center items-center w-75 h-50 rounded-t-full'>
            <div className='px-10 text-center text-md'><p>Creating transformational, sustainable and scalable 
              economic acceleration in emerging economies with high-impact outcomes.</p></div>
          </div>
        </div>
        
        
      </div>
     </div>
     <div className='bg-yellow-500'>
      <div><h1 className='text-4xl text-red-900 font-extrabold text-center p-5'>Message from the Desk of the Director</h1></div>
     <div className="flex flex-col md:flex-row items-center justify-center p-6 space-y-6 md:space-y-0 md:space-x-10">
  <div className="flex-shrink-0">
    <Image
      src="/face-cards/rvupadhyay.png"
      className="w-48 h-auto rounded-2xl shadow-lg"
      width={192}
      height={192}
      alt="Image"
    />
    <h1 className='text-center text-lg p-0.5 text-black font-bold'>Dr. R. V. Upadhyay</h1>
  </div>
  <div className="max-w-2xl text-justify">
    <p className="text-black italic text-lg  leading-relaxed"><span className='fas fa-quote-left pr-5'></span>

      We are excited to share the news of launching a Section-8 company focused on promoting entrepreneurship and innovation.
      We believe that entrepreneurship is a key driver of innovation, and we are committed to supporting and nurturing entrepreneurs
      within our company. They are essential to developing new ideas and products that will help us grow and succeed.

      Our company is continually seeking ways to support the next generation of entrepreneurs. We've built an ecosystem for entrepreneurship
      and innovation designed to help unlock potential and shape our collective future. Innovation is the lifeblood of any organization
      and a constant source of inspiration. Organizations that embrace innovation thrive in good times and remain resilient during challenges.

      Creating an environment that encourages continuous learning, new ideas, and risk-taking is key to building a strong foundation
      for growth. Innovation and entrepreneurship are critical drivers of economic progress. As the world becomes more interconnected,
      investing in innovation is more important than ever—delivering returns through higher productivity, better wages, and improved
      quality of life.

      We are grateful for your continued support and look forward to building a successful future together.
      <span className='fas fa-quote-right pl-5'></span>
    </p>
  </div>
</div>

     </div>
      </div>
      
    
  );
}
