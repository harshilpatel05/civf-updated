import React from "react";
import AccelarationHero from "@/components/AccelarationHero";
import AccFeatures from "@/components/AccFeatures";
import Flow from "@/components/Flow";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import AccelarationForm from "@/components/AccelerationForm";
const acceleration = () => {
  return (
    <div>
      <Header/>
      <Navbar/>
      <section id="accHero">
        <AccelarationHero />
      </section>
      <section id="accFeatures">
        <AccFeatures />
      </section>
      <section id="flow">
        <Flow />
      </section>
      <section id="form">
        <AccelarationForm/>
      </section>
      <Contact/>
    </div>
  );
};

export default acceleration;