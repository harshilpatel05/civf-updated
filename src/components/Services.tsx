'use client'
import Image from 'next/image'

export default function Services() {
    return (
        <div className='bg-amber-50 min-h-screen'>
        <div className="shadow-sm"> <h1 className="text-center   text-4xl font-bold text-black bg-white p-10">Services</h1></div>
        <div className="py-8 flex flex-wrap justify-center items-stretch">

            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow p-0 flex flex-col items-center w-96 m-4">
                <Image src="/benefits/services/legal-support.jpg" alt="Legal Support" width={384} height={288} className="rounded-t-2xl w-full h-72 object-cover" />
                <div className="py-6 text-center w-full">
                    <span className="text-xl font-semibold text-black">Legal Support</span>
                </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow p-0 flex flex-col items-center w-96 m-4">
                <Image src="/benefits/services/prototype-development.jpg" alt="Prototype Development" width={384} height={288} className="rounded-t-2xl w-full h-72 object-cover" />
                <div className="py-6 text-center w-full">
                    <span className="text-xl font-semibold text-black">Prototype Development</span>
                </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow p-0 flex flex-col items-center w-96 m-4">
                <Image src="/benefits/services/business-plan-development.jpg" alt="Business Plan Development" width={384} height={288} className="rounded-t-2xl w-full h-72 object-cover" />
                <div className="py-6 text-center w-full">
                    <span className="text-xl font-semibold text-black">Business Plan Development</span>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-0 flex flex-col items-center w-96 m-4">
                <Image src="/benefits/services/it-support.jpg" alt="Legal Support" width={384} height={288} className="rounded-t-2xl w-full h-72 object-cover" />
                <div className="py-6 text-center w-full">
                    <span className="text-xl font-semibold text-black">IT Support</span>
                </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow p-0 flex flex-col items-center w-96 m-4">
                <Image src="/benefits/services/financial-and-accounting-services.jpg" alt="Prototype Development" width={384} height={288} className="rounded-t-2xl w-full h-72 object-cover" />
                <div className="py-6 text-center w-full">
                    <span className="text-xl font-semibold text-black">Financial & Accounting Services</span>
                </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow p-0 flex flex-col items-center w-96 m-4">
                <Image src="/benefits/services/ipr-services.jpg" alt="Business Plan Development" width={384} height={288} className="rounded-t-2xl w-full h-72 object-cover" />
                <div className="py-6 text-center w-full">
                    <span className="text-xl font-semibold text-black">IPR Services</span>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-0 flex flex-col items-center w-96 m-4">
                <Image src="/benefits/services/market-survey.jpg" alt="Legal Support" width={384} height={288} className="rounded-t-2xl w-full h-72 object-cover" />
                <div className="py-6 text-center w-full">
                    <span className="text-xl font-semibold text-black">Market Survey</span>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-0 flex flex-col items-center w-96 m-4">
                <Image src="/benefits/services/training-workshop-and-seminar-services.jpg" alt="Prototype Development" width={384} height={288} className="rounded-t-2xl w-full h-72 object-cover" />
                <div className="py-6 text-center w-full">
                    <span className="text-xl font-semibold text-black">Training Workshops & Seminars</span>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-0 flex flex-col items-center w-96 m-4">
                <Image src="/benefits/services/growth-enhancing-services.jpg" alt="Business Plan Development" width={384} height={288} className="rounded-t-2xl w-full h-72 object-cover" />
                <div className="py-6 text-center w-full">
                    <span className="text-xl font-semibold text-black">Growth Enhancing Services</span>
                </div>
            </div>
        </div>
        </div>
    )
}