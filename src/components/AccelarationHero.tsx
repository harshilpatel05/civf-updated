'use client';

import React from 'react';
import Image from 'next/image';

const AccelarationHero = () => {
  return (
    <section className="pt-16 bg-color7 bg-gradient-to-tr from-blue-900 to-orange-500">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-8">
          <h1 className="max-w-2xl mb-4 text-gray-50 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl">
            Launchpad Acceleration Program
          </h1>
          <span className="text-gray-s text-gray-50 text-3xl font-bold">
            Global Flagship Accelerator Program
          </span>
          <p className="max-w-2xl mb-8 text-gray-50 text-xl font-medium text-justify">
            <br />
            Based in Gujarat, our sector-agnostic accelerator program invites applications from transformative businesses to create solutions for today’s rapidly changing environment. We continue to offer founders the opportunity to connect with individual as well as institutional investors and a full program focused on growth and scaling their business.
          </p>
        </div>

        <div className="hidden lg:mt-0 lg:col-span-4 lg:flex">
          <Image
            src="/mobile-app.svg"
            alt="mockup"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default AccelarationHero;
