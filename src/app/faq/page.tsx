"use client";

import { SetStateAction, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';

function Icon(e: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        e.id === e.open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: SetStateAction<number>) => {
    setOpen(open === value ? 0 : value);
  };

  const data = [
    {
      question: "What is the application process at CIVF?",
      answer:
        "Submit your application online at: www.civf.co.in/apply You will have to fill the application form once it is available on CIVF's website and send it to us in the requisite manner for screening. Post screening of all the applications, short-listed applicants will be required to send their Pitch deck. The final selection is based on the assessment of your performance in Pitch deck presentation in front of the Selection Committee. And based on the decision of the Committee you will be registered at CIVF.",
    },
    {
      question: "What sets CIVF apart from other similar institutions?",
      answer:
        "CIVF's model, scope, scale and approach differentiate it from other institutions. Its scope covers student entrepreneurs, intrapreneurs, social entrepreneurs, micro-enterprises, women entrepreneurs, MSMEs, differently-abled entrepreneurs and high-growth companies. CIVF's holistic approach nurtures registered companies by participating throughout the entrepreneurial journey. CIVF has not limited the entry of entrepreneurs based on their field of operations. Entrepreneur operating in any sector becomes eligible to apply for acceleration at CIVF. Even applications are open throughout the year. There are no strict deadlines to be met for application at CIVF. We are also not for profit organization, which makes our services pocket friendly comparative to other investment firms claiming for huge stakes.",
    },
    {
      question: "What does the infrastructure consist of?",
      answer:
        "CHARUSAT University's campus is spread across 120 acres in the outskirts of Anand district. The campus is self-contained with all the necessary facilities for nurturing the next generation entrepreneurs such as co-working space, auditorium, conference room, board-room, workshop and seminar hall, digital media centre, High end Tele and Video Conferencing and Projection Facilities. ",
    },
    {
      question: "What are the benefits offered by CIVF?",
      answer:
        "CIVF offers manifold and far-reaching benefits through a rich pool of intellectual capital with a high level of global connectivity and affiliations. It offers some of the best programs, events, forums, special interest groups, networking with the industry as well as mentoring programs for all participants. With access to mentors, money and market, CIVF is a one-stop-shop to provide end-to-end solutions for entrepreneurs like legal support, prototype development, business Plan development, IT Support, financial and accounting services, training, workshop and seminar services, availability of student interns, business mentors and investors connect, seed funding support etc.",
    },
    {
      question:
        "What measures will CIVF take to protect intellectual property rights?",
      answer:
        "Understanding the importance and critical aspects of the business, CIVF respects each and every business idea along with the intellectual property rights associated with it. Therefore, it has designed an elaborate system of non-disclosure agreements for all the Enterprises that are registered at CIVF. CIVF also promotes the protection of new Technology via IPR cell of Charusat University. ",
    },
    {
      question: "What are the major areas for registration at CIVF?",
      answer:
        "Enterprises from any sector are eligible to apply for Acceleration. It is not limited to few selective sectors.",
    },
    {
      question: "Is there a timeline to apply for incubation?",
      answer: "There is no strict timeline. You can apply round the year.",
    },
    {
      question: "Is there any application fees?",
      answer:
        "The Enterprises do not need to pay any fees to apply for acceleration except the case when they are seeking some professional services from the agency.",
    },
    {
      question: "What is expected in the presentation for the incubation?",
      answer:
        "Entrepreneurs are expected to provide details of their enterprise, a growth plan, business model, and purpose to be the part of the CIVF. A sample Pitch Deck can be found by clicking the lin.",
    },
    {
      question: "Do we need to write a business plan for Seed Funding?",
      answer:
        "When you are applying for Seed Funding, a detailed business plan and financials will be required.",
    },
    {
      question: "We've already raised funding. Can we still apply?",
      answer:
        "Yes, you can apply to avail more funding and for seeking other benefits.",
    },
  ];

  return (
    <div className="bg-amber-50 min-h-screen">
      <Header />
      <Navbar />
      <div className="w-full flex justify-center p-4 items-center">
        <h1 className="text-3xl lg:text-5xl font-bold text-center text-black">
          FAQs
        </h1>
      </div>
      <section className="grid grid-cols-1 xl:grid-cols-4 xl:gap-5 px-4 py-8 pt-0">
        <div className="px-4 text-left col-span-4">
          {data.map((item, index) => (
            <Accordion
              key={index}
              open={open === index + 1}
              icon={<Icon id={index + 1} open={open} />}
              placeholder={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <AccordionHeader
                onClick={() => handleOpen(index + 1)}
                className="py-8 font-bold text-black"
                placeholder={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {index + 1}. {item.question}
              </AccordionHeader>
              <AccordionBody className="py-8 text-md font-semibold text-black ">
                {item.answer}{" "}
                {index === 8 && (
                  <a
                    target={"_blank"}
                    className="underline"
                    href="/docs/Pitch Deck template.pdf"
                  >
                    Click here
                  </a>
                )}
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </section>
      <Contact />
    </div>
  );
}
