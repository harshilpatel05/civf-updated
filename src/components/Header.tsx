'use client'
import Image from "next/image"

export default function Header() {
  return (
    <div className="bg-white py-4 space-y-0">
      
      <div className="flex flex-wrap justify-center items-center gap-6 px-4">
        <Image src="/logos/charusat.png" height={80} width={150} className="h-15 w-auto" alt="CHARUSAT Logo" />
        <Image src="/logos/naac a+.png" height={80} width={150} className="h-15 w-auto" alt="NAAC A+ Logo" />
        <Image src="/logos/25 year.png" height={80} width={88} className="h-15 w-auto" alt="25 Year Logo" />
        <Image src="/logos/coe.jpg" height={80} width={88} className="h-30 w-auto" alt="COE Logo" />
        <Image src="/logos/dst.jpg" height={80} width={88} className="h-25 w-auto" alt="DST Logo" />
        <Image src="/logos/civfLogo.png" height={80} width={150} className="h-25 w-auto" alt="CIVF Logo" />
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 px-4">
        <Image src="/logos/startupindia.png" height={80} width={150} className="h-20 w-auto" alt="Startup India Logo" />
        <Image src="/logos/msme.png" height={80} width={100} className="h-20 w-auto" alt="MSME Logo" />
        <Image src="/logos/ic.png" height={80} width={88} className="h-15 w-auto" alt="IC Logo" />
        <Image src="/logos/STARTUP GUJARAT LOGO.png" height={80} width={88} className="h-30 w-auto" alt="Startup Gujarat Logo" />
        <Image src="/logos/nste.png" height={80} width={100} className="h-20 w-auto" alt="NSTE Logo" />
      </div>

      {/* Row 3 */}
      <div className="flex flex-wrap justify-center items-center gap-6 px-4">
        <Image src="/logos/isba.png" height={80} width={100} className="h-20 w-auto" alt="ISBA Logo" />
        <Image src="/logos/i hub logo.png" height={80} width={88} className="h-15 w-auto" alt="I-Hub Logo" />
        <Image src="/logos/ssip.png" height={80} width={100} className="h-15 w-auto" alt="SSIP Logo" />
        <Image src="/logos/MOE LOGO.png" height={80} width={88} className="h-15 w-auto" alt="MOE Logo" />
        <Image src="/logos/iic logo.png" height={80} width={88} className="h-15 w-auto" alt="IIC Logo" />
        <Image src="/logos/CED.png" height={80} width={88} className="h-15 w-auto" alt="CED Logo" />
        <Image src="/logos/EDII LOGO.jpg" height={80} width={88} className="h-15 w-auto" alt="EDII Logo" />
      </div>
    </div>
  )
}
