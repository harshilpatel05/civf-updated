"use client";
import React, { Fragment } from "react";
import { Disclosure, Tab } from "@headlessui/react";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
const page = () => {
  const data = {
    Openings: [
      {
        title: "Program Manager",
        des: "",
        link: "https://forms.gle/QK1kqqp7dzDD1U8L6",
      },
      {
        title: "Project Coordinator",
        des: "",
        link: "https://forms.gle/QK1kqqp7dzDD1U8L6",
      },
      {
        title: "Incubation Manager",
        des: "",
        link: "https://forms.gle/QK1kqqp7dzDD1U8L6",
      },
      { title: "CEO", des: "", link: "https://forms.gle/QK1kqqp7dzDD1U8L6" },
      {
        title: "Entrepreneur Educator",
        des: "",
        link: "https://forms.gle/QK1kqqp7dzDD1U8L6",
      },
      {
        title: "Content Writer",
        des: "",
        link: "https://forms.gle/QK1kqqp7dzDD1U8L6",
      },
      {
        title: "Graphic designer ",
        des: "",
        link: "https://forms.gle/QK1kqqp7dzDD1U8L6",
      },
      {
        title: "General Manager",
        des: "",
        link: "https://forms.gle/QK1kqqp7dzDD1U8L6",
      },
      {
        title: "Legal/Law/Company Secretary ",
        des: "",
        link: "https://forms.gle/QK1kqqp7dzDD1U8L6",
      },
      {
        title: "Accountant",
        des: "",
        link: "https://forms.gle/QK1kqqp7dzDD1U8L6",
      },
      {
        title: "Financial Analyst ",
        des: "",
        link: "https://forms.gle/QK1kqqp7dzDD1U8L6",
      },
      {
        title: "HR Manager",
        des: "",
        link: "https://forms.gle/QK1kqqp7dzDD1U8L6",
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen">
        <Header/>
      <div>
        <section className="mb-40">
          <div
            className="relative overflow-hidden bg-[url('/images/cr.jpg')] bg-no-repeat bg-cover"
            style={{
              backgroundPosition: "50%",
              height: "500px",
            }}
          >
            <div className="absolute h-full w-full bg-gradient-to-b from-black/70"></div>
          </div>

          <div className="container mx-auto px-6 md:px-12 xl:px-32">
            <div className="text-center text-gray-800">
              <div
                className="block rounded-lg shadow-lg px-6 py-12 md:py-16 md:px-12"
                style={{
                  marginTop: " -170px",
                  background: "hsla(0, 0%, 100%, 0.7)",
                  backdropFilter: "blur(30px)",
                }}
              >
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                  Find the career of your dreams
                </h1>

                <div className="w-full flex justify-around flex-col">
                  <Tab.Group as="div" className="lg:flex lg:flex-col">
                    <Tab.List className="w-full flex justify- flex-col lg:flex-row">
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              selected
                                ? "py-3 px-7 outline-none hover:bg-gray-50 border bg-gray-50 lg:border-b-0"
                                : "py-3 px-7 outline-none hover:bg-gray-50 border"
                            }
                          >
                            Current Openings
                          </button>
                        )}
                      </Tab>

                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              selected
                                ? "py-3 px-7 outline-none hover:bg-gray-50 border bg-gray-50 lg:border-b-0"
                                : "py-3 px-7 outline-none hover:bg-gray-50 border"
                            }
                          >
                            Associate with Us
                          </button>
                        )}
                      </Tab>
                    </Tab.List>
                    <Tab.Panels className="w-full bg-gray-50 border border-t-0 p-10">
                      <Tab.Panel>
                        {data.Openings.map((item, i) => (
                          <Disclosure as="div" className="transition-all my-3" key={i}>
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={
                                    open
                                      ? "py-3 drop-shadow-sm rounded-t-lg px-10 flex justify-between items-center bg-white w-full"
                                      : "py-3 drop-shadow-sm rounded-lg px-10 flex justify-between items-center bg-white w-full"
                                  }
                                >
                                  <p className="text-xl text-rose-700">
                                    {item.title}
                                  </p>
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    className="hidden md:block px-5 py-3 font-bold bg-rose-500 transition-all rounded-full text-white hover:bg-rose-700"
                                  >
                                    Apply Now
                                  </a>
                                </Disclosure.Button>
                                <Disclosure.Panel
                                  className={
                                    open
                                      ? "drop-shadow-sm bg-white rounded-b-lg p-10 pt-0 text-left"
                                      : "drop-shadow-sm bg-white rounded-lg p-10 pt-0 text-left"
                                  }
                                >
                                  <p className="mb-10">{item.des}...</p>
                                  <a
                                    href={item.link}
                                    target={"_blank"}
                                    className="md:hidden mt-10 px-5 py-3 font-bold bg-rose-500 transition-all rounded-full text-white hover:bg-rose-700"
                                  >
                                    Apply Now
                                  </a>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-6">
                        <a
                          href="https://forms.gle/pWvqAAsVJVhHs32s8"
                          target={"_blank"}
                          className="px-5 py-3 font-bold bg-rose-500 transition-all rounded-full text-white hover:bg-rose-700"
                        >
                          Become Mentor
                        </a>
                        <a
                          href="https://forms.gle/UfHPAZXkFLpdtDYg6"
                          target={"_blank"}
                          className="px-5 py-3 font-bold bg-rose-500 transition-all rounded-full text-white hover:bg-rose-700"
                        >
                          Become Investor
                        </a>
                        <a
                          href="https://forms.gle/rRhoYg5WobG1jjKb9"
                          target={"_blank"}
                          className="px-5 py-3 font-bold bg-rose-500 transition-all rounded-full text-white hover:bg-rose-700"
                        >
                          Intern with us
                        </a>
                        <a
                          href="https://forms.gle/7cEajSprqmJmcbFt7"
                          target={"_blank"}
                          className="px-5 py-3 font-bold bg-rose-500 transition-all rounded-full text-white hover:bg-rose-700"
                        >
                          Volunteer with us
                        </a>
                        <a
                          href="https://forms.gle/zwMeEEQyipSSVRX88"
                          target={"_blank"}
                          className="px-5 py-3 font-bold bg-rose-500 transition-all rounded-full text-white hover:bg-rose-700"
                        >
                          CSR Partnership
                        </a>
                        <a
                          href="https://forms.gle/kFbDozVxTSTNRYWX8"
                          target={"_blank"}
                          className="px-5 py-3 font-bold bg-rose-500 transition-all rounded-full text-white hover:bg-rose-700"
                        >
                          Co-create a program with us
                        </a>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Contact/>
    </div>
  );
};

export default page;
