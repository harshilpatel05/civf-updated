'use client'
import Values from "@/components/Values"
import Header from "@/components/Header"
import Contact from "@/components/Contact"
import ClientMembers from "@/components/ClientMembers"
import ClientSarthi from "@/components/ClientSarthi"
export default function AboutUs(){
    return(
        <div>
        <Header/>
        <Values/>
        <ClientMembers/>
        <ClientSarthi/>
        <Contact/>
        </div>
    )
}