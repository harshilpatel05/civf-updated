'use client'
import Image from 'next/image'
export default function Facility() {
    return (
        <div className="bg-amber-50 min-h-screen">
            <div className="bg-gradient-to-tr from-blue-900 to-orange-500">   <h1 className="text-center text-4xl font-bold text-blue p-10">Infrastructural Facilities</h1></div>
        <div>
            <h1 className='text-center text-2xl font-bold text-black p-10'>Co-Working Space</h1>
        </div>
        <div className="flex flex-row justify-center items-center">
            <div className='p-5'>
                <Image className="rounded-3xl h-60"src="/Benefits/Facilities/co-working-space/1.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            <div className='p-5'>
                <Image className="rounded-3xl w-190 h-60 object-cover"src="/Benefits/Facilities/co-working-space/2.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            
        </div>
        <div className="flex flex-row justify-center items-center">
        <div className='p-5'>
                <Image className="rounded-3xl w-190 h-60 object-cover"src="/Benefits/Facilities/co-working-space/3.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>
            <div className='p-5'>
                <Image className="rounded-3xl h-60"src="/Benefits/Facilities/co-working-space/4.jpg" alt="Co-Working Space" width={500} height={500}/>
            </div>     
        </div>
        <div>
            <h1 className='text-center text-2xl font-bold text-black p-10 pb-2'>E-resources/Online Journal Database</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center -mx-1 -my-1 p-10 pt-0">
          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center m-1 w-80 h-80">
            <Image src="/Benefits/Facilities/e-resource/1.jpg" alt="E-resource 1" width={250} height={120} className="object-contain max-w-full max-h-full" />
          </div>
          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center m-1 w-80 h-80">
            <Image src="/Benefits/Facilities/e-resource/2.jpg" alt="E-resource 2" width={250} height={120} className="object-contain max-w-full max-h-full" />
          </div>
          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center m-1 w-80 h-80">
            <Image src="/Benefits/Facilities/e-resource/3.jpg" alt="E-resource 3" width={250} height={120} className="object-contain max-w-full max-h-full" />
          </div>
          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center m-1 ww-80 h-80">
            <Image src="/Benefits/Facilities/e-resource/4.jpg" alt="E-resource 4" width={250} height={120} className="object-contain max-w-full max-h-full" />
          </div>
        </div>
        </div>
    )
}