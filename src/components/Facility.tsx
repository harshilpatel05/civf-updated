'use client'
import Image from 'next/image'

export default function Facility() {
    return (
        <div className="bg-amber-50 min-h-screen">
            <div className="shadow-sm">  <h1 className="text-center text-4xl font-bold text-black bg-white p-10">Infrastructural Facilities</h1></div>
        <div>
            <h1 className='text-center text-2xl font-bold text-black pt-10 pb-0'>Co-Working Space</h1>
        </div>
        <div className="flex flex-row justify-center items-center">
            <div className='p-5'>
                <Image className="rounded-xl h-60" src="/Benefits/Facilities/co-working-space/1.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            <div className='p-5'>
                <Image className="rounded-xl w-190 h-60 object-cover" src="/Benefits/Facilities/co-working-space/2.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            
        </div>
        <div className="flex flex-row justify-center items-center">
        <div className='p-5'>
                <Image className="rounded-xl w-190 h-60 object-cover" src="/Benefits/Facilities/co-working-space/3.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            <div className='p-5'>
                <Image className="rounded-xl h-60" src="/Benefits/Facilities/co-working-space/4.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>     
        </div>
        <div>
            <h1 className='text-center text-3xl font-bold text-black pt-10 pb-2'>E-resources/Online Journal Database</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center -mx-1 -my-1 p-10 pt-0">
          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center m-1 w-80 h-80">
            <Image src="/Benefits/Facilities/e-resource/1.jpg" alt="E-resource 1" width={250} height={120} className="rounded-xl object-contain max-w-full max-h-full" />
          </div>
          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center m-1 w-80 h-80">
            <Image src="/Benefits/Facilities/e-resource/2.jpg" alt="E-resource 2" width={250} height={120} className="rounded-xl object-contain max-w-full max-h-full" />
          </div>
          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center m-1 w-80 h-80">
            <Image src="/Benefits/Facilities/e-resource/3.jpg" alt="E-resource 3" width={250} height={120} className="rounded-xl object-contain max-w-full max-h-full" />
          </div>
          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center m-1 ww-80 h-80">
            <Image src="/Benefits/Facilities/e-resource/4.jpg" alt="E-resource 4" width={250} height={120} className="rounded-xl object-contain max-w-full max-h-full" />
          </div>
        </div>
        <div>
            <h1 className='text-center text-3xl font-bold text-black pt-10 pb-2'>Information Resource Centre</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center">
        <div className='p-5'>
                <Image className="rounded-xl w-190 h-60 object-cover" src="/Benefits/Facilities/irc/1.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            <div className='p-5'>
                <Image className="rounded-xl w-190 h-60 object-cover" src="/Benefits/Facilities/irc/2.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            </div>
            <div>
            <h1 className='text-center text-3xl font-bold text-black pt-10 pb-2'>Auditorium</h1>
        </div>
            <div className="flex flex-row p-5 pt-0 justify-center items-center">
            <div>
                <Image className="rounded-xl w-auto h-60" src="/Benefits/Facilities/auditorium/2.jpg" alt="Co-Working Space" width={500} height={500}/> 
                </div>
                <div className='p-5'>
                <Image className="rounded-xl w-120 h-60 object-cover" src="/Benefits/Facilities/auditorium/1.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
                <div>
                <Image className="rounded-xl w-auto h-60" src="/Benefits/Facilities/auditorium/3.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
        
            </div>
            <div className="flex flex-wrap justify-center items-center space-x-10">
            </div>
            <div>
            <h1 className='text-center text-3xl font-bold text-black pt-10 pb-2'>Conference Room</h1>
        </div>
        <div className="flex flex-row justify-center items-center">
        <div className='p-5'>
                <Image className="rounded-xl w-190 h-60 object-cover" src="/Benefits/Facilities/conference-room/1.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            <div className='p-5'>
                <Image className="rounded-xl w-80 h-60 object-cover" src="/Benefits/Facilities/conference-room/2.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            </div>
            <div>
        <h1 className='text-center text-3xl font-bold text-black pt-10 pb-2'>Boardroom</h1>
        </div>
        <div className="flex flex-row justify-center items-center">
        <div className='p-5'>
                <Image className="rounded-xl w-80 h-60 object-cover" src="/Benefits/Facilities/boardroom/1.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
        <div className='p-5'>
                <Image className="rounded-xl w-190 h-60 object-cover" src="/Benefits/Facilities/boardroom/2.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            </div>
            <div>
            <h1 className='text-center text-3xl font-bold text-black pt-10 pb-2'>Tinkering Lab</h1>
        </div>
            <div className="flex flex-row p-5 pt-0 justify-center items-center">
            <div>
                <Image className="rounded-xl w-auto h-60" src="/Benefits/Facilities/tinkering-lab/2.jpg" alt="Co-Working Space" width={500} height={500}/> 
                </div>
                <div className='p-5'>
                <Image className="rounded-xl w-120 h-60 object-cover" src="/Benefits/Facilities/tinkering-lab/1.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
                <div>
                <Image className="rounded-xl w-auto h-60" src="/Benefits/Facilities/tinkering-lab/3.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
        
            </div>
            <div>
            <h1 className='text-center text-3xl font-bold text-black pt-10 pb-2'>Seminar & Workshop Rooms</h1>
        </div>
            <div className="flex flex-wrap justify-center items-center space-x-10">
            <div>
                <Image className="rounded-xl w-auto h-60" src="/Benefits/Facilities/seminar/1.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            <div>
                <Image className="rounded-xl w-auto h-60" src="/Benefits/Facilities/seminar/2.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            <div>
                <Image className="rounded-xl w-auto h-60" src="/Benefits/Facilities/seminar/3.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            <div className='p-5 flex flex-row justify-center items-center space-x-10'>
            <div className=''>
                <Image className="rounded-xl object-cover h-60" src="/Benefits/Facilities/seminar/4.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            <div>
                <Image className="rounded-xl w-auto h-60" src="/Benefits/Facilities/seminar/5.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            </div>
            </div>
            </div>
    )
}